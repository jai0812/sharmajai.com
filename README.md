# sharmajai.com

Static portfolio site. No build step, no dependencies, no npm — plain HTML, CSS
and JavaScript. Open `index.html` in a browser and it works.

---

## Editing content

**Almost everything lives in one file: [`js/data.js`](js/data.js).**

Projects, publications, skills, extracurriculars, your email and links are all
defined there, and every page reads from it. Change a project description once
and it updates on the home page, the projects page and the case study together.

Long-form prose (the case studies, the About page bio) is written directly in
the HTML, because it's one-off writing rather than repeated data.

### The five things still waiting on you

Each is marked `TODO(Jai)` in `js/data.js` so you can search for them.

| # | What | Where |
|---|------|-------|
| 1 | **Résumé PDF** | Save it as `assets/documents/resume.pdf`. The download buttons are hidden until that file exists, then appear on their own — nothing else to change. |
| 2 | **Confirm your Formspree address** | The form posts to `formspree.io/f/mzeprezw`. Send yourself one test message and click the confirmation link Formspree emails you — until you do, submissions are held, not delivered. |
| 3 | **PSPCL bullets** | The Punjab State Power internship in `WORK.roles` has one deliberately plain bullet. No achievements were invented for it. The comment above the entry lists the kinds of detail that would make it pull its weight — send any of it and it can be written up properly. |
| 4 | **Per-project GitHub URLs** | Every project's `repo` currently points at your profile. Replace with the individual repository. |
| 5 | **Co-authors** | The centrality paper (`PAPERS`, id `centrality`) has an empty `authors` array, since you aren't sole author. Names are omitted rather than shown wrongly. |

### Role images

Each entry in `WORK.roles` can carry `image` + `imageAlt`, rendered as a 640px
figure under the bullets. The three in `assets/experience/` are **schematics I
drew** — a lateral knee joint with a segmentation contour, the Insighta
verification funnel, and an illustrative demand curve. They are diagrams of the
problem domain, deliberately not company logos and not real output. The knee one
is labelled "schematic — not patient data" inside the image so it can never be
mistaken for a clinical result. Swap any of them by overwriting the file.

The strip under the hero reads only `SITE.based` — "Boston University, MA". There is
deliberately no "open to work" badge, no role wishlist and no relocation line
anywhere on the site: the work argues the case instead.

Smaller gaps, also marked in the file: co-authors for the centrality paper,
a deep-dive write-up for the Springer chapter, and real org names and years for
two of the extracurriculars.

---

## Swapping the case study images

**Put them in `assets/thumbs/`.** Use these exact filenames and they replace the
current placeholders with no code change at all:

| File | Which card |
|------|-----------|
| `assets/thumbs/hand-oa.png` | Hand OA X-ray synthesis |
| `assets/thumbs/lane.jpg` | Lane advantage in sprinting |
| `assets/thumbs/disability.jpg` | Household disability prediction |

**Size:** roughly **1600 × 1000 px** (a 16:10 rectangle). Anything close to that
shape works — the panel crops from the centre, so keep the important part of the
picture away from the edges. Landscape only; a portrait or square image will get
cropped hard.

If you'd rather use different filenames or a `.png`, change the `thumb:` line for
that case in `js/data.js` to match.

### Using video instead of a still

Same folder. Drop an `.mp4` in `assets/thumbs/` and fill in the `video:` line for
that case in `js/data.js`:

```js
video: 'assets/thumbs/hand-oa.mp4',
```

**Keep the `thumb:` line as well.** The still becomes the video's poster frame,
which is what shows before the video loads, if the browser blocks autoplay, and
for visitors who have reduced motion turned on. A card with a video but no
poster looks broken for the first second; with one, it never does.

How it behaves: muted, looped, no controls, and it only plays while the card is
actually on screen. It's an ambient loop, not a player — nobody has to press
anything, and nothing makes noise.

What to give it:

| | |
|---|---|
| Format | MP4, H.264, `yuv420p` (this combination plays everywhere) |
| Size | **under ~4 MB each** — this matters more than quality |
| Length | 8–15 seconds, cut so the loop point isn't jarring |
| Dimensions | 1600 × 1000, same 16:10 rectangle as the stills |
| Audio | none — strip the track entirely, it's muted anyway |

Three videos at 4 MB is a 12 MB page. That's the real constraint: a recruiter
opening this on hotel wifi should still see the page immediately, which they
will, because the posters render first and the video streams in behind them.
If a clip won't compress under about 4 MB, it's better as a still.

You can mix freely — video on one card, stills on the others. Set `video:` on
the ones you have footage for and leave the rest as `''`.

The images currently in there are placeholders I generated from your research
figures — a filmstrip of X-ray panels, the win-probability chart recoloured to
fit the dark page, and a 9 × 4 lattice standing in for the 36 pipelines.

---

## Where contact form submissions go

**Formspree** — endpoint `https://formspree.io/f/mzeprezw`, set in
`SITE.formspreeId`. It is live and wired up; nothing further to configure.

Every message someone sends gives you:

- an **email** to `sharmajai.us@gmail.com` each time someone writes
- a **dashboard** of every submission at [formspree.io](https://formspree.io)
- a **CSV export**, which opens directly in Excel

The free tier covers **50 submissions a month**. If a portfolio form ever
exceeds that, switch to Netlify Forms (below) for 100.

### Before it works: confirm the address once

Formspree sends a confirmation email the first time a form receives a
submission. Until you click the link in it, messages are held rather than
delivered. So **send yourself one test message** and confirm — otherwise the
form looks like it is working while nothing reaches your inbox.

Unlike Netlify, Formspree accepts submissions from any origin, so you can test
it from `localhost` right now — it does not need to be deployed first.

### Switching to Netlify Forms instead

1. In `js/data.js`: set `netlifyForms: true` and `formspreeId: ''`.
2. In `contact.html`, add back to the `<form>` tag:
   `name="contact" data-netlify="true" data-netlify-honeypot="bot-field"`
   and inside it `<input type="hidden" name="form-name" value="contact">`
   (the exact snippet is in a comment above the form).
3. Deploy, then in Netlify: **Site configuration → Forms → Form notifications
   → Add notification → Email notification** → your Gmail.

Netlify only captures forms on a deployed Netlify site, so this route cannot be
tested locally at all.

### Optional: mirror into a live Google Sheet

If you'd rather watch messages land in a spreadsheet in real time instead of
exporting a CSV, add a Google Apps Script and paste its URL into
`SITE.sheetWebhook`. Submissions then go to **both** places — Netlify stays the
reliable record, the Sheet is the convenient view.

1. Create a new Google Sheet. Put these headers in row 1:
   `Timestamp` · `Email` · `Subject` · `Message`
2. **Extensions → Apps Script**, delete what's there, paste this:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     var data  = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.email   || '',
       data.subject || '',
       data.message || ''
     ]);
     return ContentService.createTextOutput('ok');
   }
   ```

3. **Deploy → New deployment → Web app.** Set *Execute as* **Me**, and
   *Who has access* **Anyone**. Authorise it when Google asks.
4. Copy the web app URL and paste it into `SITE.sheetWebhook` in `js/data.js`.

A note on that last step: *Who has access: Anyone* is what lets your own website
post to it. The URL is effectively a public write endpoint, so anyone who finds
it could append rows — worst case is junk in the spreadsheet, and Netlify's copy
is unaffected. That's the trade for a no-server setup. If it ever gets abused,
delete the deployment and the URL dies with it.

### What happens when it fails

The form never leaves someone stranded. If the request fails for any reason —
network, quota, an outage — it opens the visitor's own mail app with their
message already written in, so someone who took the time to write still reaches
you.

The form also carries a honeypot field: invisible to people, hidden from screen
readers and skipped by keyboard tabbing, but bots fill it in and those
submissions are dropped silently.

## Deploying to Netlify

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this
   whole folder onto the page. It's live in about ten seconds.
2. In **Site settings → Domain management**, add `sharmajai.com`.
3. Choose **Set up Netlify DNS** and copy the four nameservers it gives you.
4. In GoDaddy, open your domain → **Nameservers** → **Change** → **I'll use my
   own nameservers**, and paste all four.

DNS takes anywhere from a few minutes to a few hours to propagate. This also
removes GoDaddy's "coming soon" parking page.

The `clientTransferProhibited` and `clientUpdateProhibited` statuses on your
domain are standard registrar locks, not a problem.

`netlify.toml` is already configured: HTML is never cached (so a content edit
goes live immediately), assets are cached for a week, and basic security headers
are set.

To redeploy after an edit, drag the folder onto Netlify again.

---

## Files

```
index.html              home
experience.html         education, interests, publications
research.html           the four papers, expandable write-ups
projects.html           all 14 projects, filterable
about.html              bio, extracurriculars, documents
contact.html            form and direct links
case-hand-oa.html       case study — hand OA X-ray synthesis
case-lane-advantage.html case study — lane advantage in sprinting
case-disability.html    case study — household disability prediction
404.html                not-found page

css/site.css            the entire visual system
js/data.js              ← content lives here
js/site.js              navigation, renderers, contact form

assets/photo/           headshot, plus a background-removed cutout
assets/thumbs/          ← case study images go here (see above)
assets/figures/         research charts, as exported from the notebooks
assets/documents/       reports, slides, poster (resume.pdf goes here)
assets/branding/        favicon and the social-share image

netlify.toml            cache and security headers
sitemap.xml             update if you add pages
robots.txt
```

---

## Design notes

The look is a radiology reading room, taken from the hand-OA research: a dark
blue-black page, content on faintly lit panels, and research figures presented
on white "view boxes" the way a radiograph is read against a backlit screen.

Everything on the site is greyscale **except** one warm orange, which appears
only on numbers that represent a measured result. If you add a new accent
somewhere decorative, that rule stops meaning anything — so try not to.

Type is Newsreader (headlines and introductory paragraphs), Archivo (body), and
IBM Plex Mono (labels, metrics, navigation), loaded from Google Fonts.

Case study cards are split 40 / 60 — write-up left, wide image right.

Images generated for the site rather than taken from the research exports
directly:
- `assets/photo/jai-cutout.png` — your headshot with the white background
  removed, used translucent behind the home page headline.
- `assets/thumbs/hand-oa.png` — your own title card (replaced the generated
  filmstrip). `hand-oa-web.jpg` sits beside it as a 242 KB version of the same
  image if you want the page lighter.
- `assets/thumbs/lane.jpg` — the win-probability chart, colour-inverted so it
  sits on the dark page instead of glaring against it.
- `assets/thumbs/disability.jpg` — a 9 × 4 lattice standing in for the 36
  pipelines, with the winning column lit.

The Experience page lists **interest areas**, not a tech-stack grid. The tools
still appear on every project card and case study, where they're attached to
something you actually built.

---

## Local preview

```bash
python3 -m http.server 8747 --directory /Users/jshrma/Documents/newfileswebui
```

Then open <http://localhost:8747>. A plain file-open works too, but the résumé
button can't check whether the PDF exists over `file://`, so it always shows.
