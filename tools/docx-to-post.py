#!/usr/bin/env python3
"""
docx-to-post.py — turn a Word document into a blog post on sharmajai.com.

    python3 tools/docx-to-post.py ~/Desktop/my-post.docx

What it does:
  · reads the .docx (which is just a zip of XML — no libraries needed)
  · keeps headings, paragraphs, bold, italic, links, bullet and numbered lists
  · pulls every embedded picture out into assets/blog/<slug>/
  · writes post-<slug>.html styled like the rest of the site
  · prints the entry to paste into POSTS in js/data.js

Options:
    --slug my-custom-url      override the URL slug
    --title "Real Title"      override the title (default: first heading)
    --force                   overwrite an existing post

Deliberately stdlib-only, so it keeps working on any machine with Python 3 and
never needs an install step.
"""

import argparse
import datetime
import html
import os
import re
import shutil
import sys
import zipfile
import xml.etree.ElementTree as ET

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
A = 'http://schemas.openxmlformats.org/drawingml/2006/main'
NS = {'w': W, 'r': R, 'a': A}

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def slugify(text):
    s = re.sub(r'[^\w\s-]', '', text.lower()).strip()
    s = re.sub(r'[\s_-]+', '-', s)
    return s[:60].strip('-') or 'post'


def esc(t):
    return html.escape(t, quote=False)


# ---------------------------------------------------------------- runs → HTML
def render_runs(para, rels, images, image_dir_rel):
    """Turn the runs inside one paragraph into inline HTML."""
    out = []
    for node in para.iter():
        tag = node.tag.split('}')[-1]

        if tag == 'r':
            props = node.find('w:rPr', NS)
            bold = props is not None and props.find('w:b', NS) is not None
            ital = props is not None and props.find('w:i', NS) is not None

            text = ''.join(t.text or '' for t in node.findall('.//w:t', NS))
            if text:
                piece = esc(text)
                if bold:
                    piece = '<strong>' + piece + '</strong>'
                if ital:
                    piece = '<em>' + piece + '</em>'
                out.append(piece)

            if node.findall('.//w:br', NS):
                out.append('<br>')

            # a picture anchored in this run
            for blip in node.findall('.//a:blip', NS):
                rid = blip.get('{%s}embed' % R)
                target = rels.get(rid)
                if not target:
                    continue
                fname = os.path.basename(target)
                if fname in images:
                    out.append(
                        '<figure class="post__fig">'
                        '<img src="%s/%s" alt="" loading="lazy">'
                        '<figcaption>TODO: caption this image, or delete this line.</figcaption>'
                        '</figure>' % (image_dir_rel, fname)
                    )

        elif tag == 'hyperlink':
            rid = node.get('{%s}id' % R)
            href = rels.get(rid, '')
            label = ''.join(t.text or '' for t in node.findall('.//w:t', NS))
            if label:
                out.append('<a class="link" href="%s" target="_blank" rel="noopener">%s</a>'
                           % (esc(href), esc(label)))

    return ''.join(out)


def para_style(para):
    pstyle = para.find('./w:pPr/w:pStyle', NS)
    return (pstyle.get('{%s}val' % W) or '') if pstyle is not None else ''


def is_list(para):
    return para.find('./w:pPr/w:numPr', NS) is not None


def list_kind(para, numbering):
    """Best-effort bullet vs numbered. Falls back to bullet."""
    num = para.find('./w:pPr/w:numPr/w:numId', NS)
    if num is None:
        return 'ul'
    return numbering.get(num.get('{%s}val' % W), 'ul')


# ------------------------------------------------------------------- the body
def convert(docx_path, slug, title_override):
    z = zipfile.ZipFile(docx_path)

    # relationship id -> target (images, links)
    rels = {}
    with z.open('word/_rels/document.xml.rels') as f:
        for rel in ET.parse(f).getroot():
            rels[rel.get('Id')] = rel.get('Target')

    # numbering: numId -> ul/ol
    numbering = {}
    try:
        with z.open('word/numbering.xml') as f:
            nroot = ET.parse(f).getroot()
            abstract = {}
            for an in nroot.findall('w:abstractNum', NS):
                aid = an.get('{%s}abstractNumId' % W)
                fmt = an.find('./w:lvl/w:numFmt', NS)
                v = fmt.get('{%s}val' % W) if fmt is not None else 'bullet'
                abstract[aid] = 'ul' if v == 'bullet' else 'ol'
            for n in nroot.findall('w:num', NS):
                aid = n.find('w:abstractNumId', NS)
                if aid is not None:
                    numbering[n.get('{%s}numId' % W)] = abstract.get(
                        aid.get('{%s}val' % W), 'ul')
    except KeyError:
        pass

    # extract pictures
    image_dir = os.path.join(ROOT, 'assets', 'blog', slug)
    os.makedirs(image_dir, exist_ok=True)
    images = set()
    for name in z.namelist():
        if name.startswith('word/media/'):
            base = os.path.basename(name)
            if not base:
                continue
            with z.open(name) as src, open(os.path.join(image_dir, base), 'wb') as dst:
                shutil.copyfileobj(src, dst)
            images.add(base)

    image_dir_rel = 'assets/blog/' + slug

    with z.open('word/document.xml') as f:
        body = ET.parse(f).getroot().find('w:body', NS)

    blocks, open_list, heading_text = [], None, None

    def close_list():
        nonlocal open_list
        if open_list:
            blocks.append('</%s>' % open_list)
            open_list = None

    for para in body.findall('w:p', NS):
        inner = render_runs(para, rels, images, image_dir_rel)
        style = para_style(para)

        if not inner.strip():
            continue

        if is_list(para):
            kind = list_kind(para, numbering)
            if open_list != kind:
                close_list()
                blocks.append('<%s class="post__list">' % kind)
                open_list = kind
            blocks.append('<li>%s</li>' % inner)
            continue

        close_list()

        # The first non-empty paragraph is the title, whatever style it carries.
        # Word documents are usually typed title-first, and plenty of people
        # never apply the Title style. --title overrides when that guess is wrong.
        if heading_text is None and not inner.startswith('<figure'):
            heading_text = re.sub(r'<[^>]+>', '', inner).strip()
            continue

        m = re.match(r'Heading(\d)', style)
        if m or style == 'Title':
            lvl = int(m.group(1)) if m else 1
            tag = 'h%d' % min(lvl + 1, 4)
            blocks.append('<%s>%s</%s>' % (tag, inner, tag))
        elif style in ('Quote', 'IntenseQuote'):
            blocks.append('<blockquote class="post__quote">%s</blockquote>' % inner)
        elif inner.startswith('<figure'):
            blocks.append(inner)
        else:
            blocks.append('<p>%s</p>' % inner)

    close_list()

    title = title_override or heading_text or slug.replace('-', ' ').title()
    return title, '\n      '.join(blocks), len(images)


# ---------------------------------------------------------------- page output
TEMPLATE = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title_esc} — Jai Sharma</title>
<meta name="description" content="{excerpt}">
<link rel="canonical" href="https://sharmajai.com/post-{slug}.html">
<link rel="icon" href="assets/branding/favicon.ico" sizes="32x32">
<link rel="icon" href="assets/branding/icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="assets/branding/apple-touch-icon.png">
<meta property="og:type" content="article">
<meta property="og:title" content="{title_esc}">
<meta property="og:description" content="{excerpt}">
<meta property="og:image" content="https://sharmajai.com/assets/branding/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..500;1,6..72,200..400&amp;family=Archivo:wght@400;500;600&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/site.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="nav">
  <div class="nav__in">
    <a class="brand" href="index.html">
      <span class="brand__mark" aria-hidden="true">JS</span>
      <span class="brand__name">Jai Sharma</span>
    </a>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Open menu" aria-controls="nav-links">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 4h14M1 8h14M1 12h14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
    </button>
    <nav class="nav__links" id="nav-links" data-open="false" aria-label="Primary">
      <a class="nav__link" href="experience.html">Experience</a>
      <a class="nav__link" href="research.html">Research</a>
      <a class="nav__link" href="projects.html">Projects</a>
      <a class="nav__link" href="writing.html">Writing</a>
      <a class="nav__link" href="about.html">About</a>
      <a class="nav__link" href="contact.html">Contact</a>
    </nav>
  </div>
</header>

<main id="main">
  <article class="wrap post">
    <a class="back" href="writing.html" data-back>All writing</a>
    <div class="post__meta">
      <span class="label post__date">{date_label}</span>
      <span class="post__reading">{reading_time} min read</span>
    </div>
    <h1 class="display">{title_esc}</h1>

    <div class="post__body prose">
      {body}
    </div>

    <footer class="post__foot">
      <a class="back" href="writing.html" data-back>All writing</a>
    </footer>
  </article>
</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot__base">
      <span>© <span data-year>2026</span> Jai Sharma</span>
      <span>Boston, Massachusetts</span>
    </div>
  </div>
</footer>

<script src="js/data.js"></script>
<script src="js/site.js"></script>
</body>
</html>
'''


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('docx')
    ap.add_argument('--slug')
    ap.add_argument('--title')
    ap.add_argument('--force', action='store_true')
    args = ap.parse_args()

    if not os.path.exists(args.docx):
        sys.exit('No such file: ' + args.docx)

    base = os.path.splitext(os.path.basename(args.docx))[0]
    slug = args.slug or slugify(base)

    out_path = os.path.join(ROOT, 'post-%s.html' % slug)
    if os.path.exists(out_path) and not args.force:
        sys.exit('post-%s.html already exists. Re-run with --force to overwrite.' % slug)

    title, body, n_images = convert(args.docx, slug, args.title)

    plain = re.sub(r'<[^>]+>', ' ', body)
    plain = re.sub(r'\s+', ' ', plain).strip()
    excerpt = html.escape(plain[:155].rsplit(' ', 1)[0] + '…', quote=True)

    word_count = len(plain.split())
    reading_time = max(1, round(word_count / 238))

    today = datetime.date.today()
    page = TEMPLATE.format(
        title_esc=html.escape(title, quote=True),
        slug=slug,
        excerpt=excerpt,
        date_label=today.strftime('%d %B %Y').lstrip('0'),
        reading_time=reading_time,
        body=body,
    )
    with open(out_path, 'w') as f:
        f.write(page)

    print('\n  Wrote  post-%s.html' % slug)
    print('  Images %d → assets/blog/%s/' % (n_images, slug))
    print('\n  Paste this into POSTS in js/data.js:\n')
    print("  {")
    print("    slug: 'post-%s.html'," % slug)
    print("    title: %s," % repr(title))
    print("    date: '%s'," % today.isoformat())
    print("    dateLabel: '%s'," % today.strftime('%d %B %Y').lstrip('0'))
    print("    readingTime: %d," % reading_time)
    print("    excerpt: %s," % repr(plain[:180].rsplit(' ', 1)[0] + '…'))
    print("    tags: ['TODO'],")
    print("    cover: ''   // e.g. 'assets/blog/%s/image1.png'" % slug)
    print("  },\n")
    print('  Then check the page, caption the figures, and fix the date if it')
    print('  is not today.\n')


if __name__ == '__main__':
    main()
