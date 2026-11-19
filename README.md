# sharmajai.com

Portfolio of Jai Sharma, data scientist and machine learning engineer in Boston.
Live at **[sharmajai.com](https://sharmajai.com)**.

A static site with no build step and no dependencies: plain HTML, CSS and
JavaScript, served by GitHub Pages straight from the `main` branch.

---

## Editing content

**Almost everything lives in [`js/data.js`](js/data.js).** Every page reads from it,
so a change there shows up everywhere at once.

| To change… | Edit in `js/data.js` |
|---|---|
| Live products (browser-window cards on the home page) | `PRODUCTS` |
| System-design diagrams (quick views and case studies) | `ARCH` |
| All projects, filters and quick views | `PROJECTS` |
| Case-study cards | `CASES` |
| Jobs and education | `WORK.roles`, `WORK.education` |
| Certifications | `CERTS` |
| Publications | `PAPERS` |
| Skill areas, interests, life outside work | `PILLARS`, `INTERESTS`, `LIFE` |
| Blog posts | `POSTS` (generate with `python3 tools/docx-to-post.py my-post.docx`) |
| Downloadable reports | `DOCS` |

Long-form writing (the case studies, the About page) is in the HTML files
themselves.

### Adding a live product

1. Save a screenshot, at least 1200 px wide, to `assets/products/`. Frames are
   16:10 unless the entry sets `ratio` (the job portal uses `'2 / 1'`). They crop
   from the top.
2. Add an entry to `PRODUCTS` with `name`, `url`, `host` (the address shown in
   the address bar), `repo`, `shot`, `shotAlt`, `summary`, three `facts` and `tech`.
3. Add the same project to `PROJECTS` with `live:` set to its URL.

### System-design diagrams

Every project has an entry in `ARCH`, keyed by its exact name in `PROJECTS`. Each
diagram is a list of layers, top to bottom, built with
`L('Layer name', [['Component', 'detail'], …], true)`. The final `true` highlights
the layer that does the core work, and `note` adds a "Design choice" line under it.
The same diagram appears in the project's Quick view and, for case studies, in the
page's System design section via `<div data-render="arch" data-project="Name">`.

### Adding a certification

Add `{ name, issuer, date, id, url }` to `CERTS`. Use the issuer's own verification
link for `url`, not a LinkedIn redirect. Leave `url` empty if there isn't one.

### Résumé

Save it as `assets/documents/resume.pdf`. The download buttons stay hidden until
that file exists, then appear by themselves.

---

## Contact form

Submissions go to Formspree (`SITE.formspreeId` in `js/data.js`), which emails
`sharmajai.us@gmail.com`. If a send fails, the visitor's mail app opens with the
message already written. A hidden honeypot field drops bot submissions.

The first submission triggers a confirmation email from Formspree. Click the link
in it once, or later messages are held rather than delivered.

---

## Publishing

Pushing to `main` publishes the site. GitHub Pages rebuilds within a minute or two.

```bash
git add -A
git commit -m "Describe the change"
git push
```

**Domain.** `CNAME` tells GitHub Pages to serve the site at `sharmajai.com`. The
domain is registered at GoDaddy, with DNS managed in Cloudflare:

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `sharmajai.com` | `185.199.108.153` | DNS only |
| A | `sharmajai.com` | `185.199.109.153` | DNS only |
| A | `sharmajai.com` | `185.199.110.153` | DNS only |
| A | `sharmajai.com` | `185.199.111.153` | DNS only |
| CNAME | `www` | `jai0812.github.io` | DNS only |

`jobs.sharmajai.com` and `mbta.sharmajai.com` have their own records and are not
affected by these.

---

## Files

```
index.html                 home: hero, live products, case studies, projects,
                           publications, experience, certifications, contact
experience.html            roles, education, certifications, interests, papers
research.html              the four papers with expandable write-ups
projects.html              every project, filterable and searchable
writing.html               blog index
about.html                 bio, life outside work, documents
contact.html               form and direct links
case-*.html                case studies
post-*.html                blog posts
404.html                   not-found page

css/site.css               the whole visual system
js/data.js                 content
js/site.js                 header, renderers, filters, quick view, contact form

assets/products/           live-product screenshots
assets/thumbs/             case-study images (16:10, about 1600 × 1000)
assets/figures/            research charts
assets/documents/          reports and slides (resume.pdf goes here)
assets/experience/         role diagrams
assets/photo/, branding/   headshot, favicon, social-share image

CNAME, .nojekyll           GitHub Pages settings
sitemap.xml, robots.txt    search engines
```

---

## Design notes

Light and card-based, with one deep emerald accent (`#0B6B4B`) for links, live
status and measured results. Type is Plus Jakarta Sans for headings and
interface, Source Serif 4 for the paragraphs meant to be read, and DM Mono for
numbers, IDs and web addresses.

The one distinctive element is the live-products section. Each product is shown
inside a browser window whose address bar carries its real web address, because
the strongest evidence on the page is that these things are running right now.

Motion is limited to a short fade-in as sections scroll into view and to hover
states. All of it switches off for visitors who have reduced motion turned on.
The headshot is never animated.

---

## Local preview

```bash
python3 -m http.server 8747
```

Then open <http://localhost:8747>.
