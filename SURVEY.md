# Survey of nibbida.com and the Astra design files

Written 22 October 2026, following section 1 of `nibbida-handover.md`. Survey only: nothing was built, installed, or changed except this file.

## 0. Summary

- **nibbida.com is reachable** from this environment, through the host `www.nibbida.com`. The bare host `nibbida.com` was refused by the egress proxy (it is probably only a redirect). All 24 pages in the site menu were fetched and read as HTML.
- **The Astra files were not on my branch when I started**, so my first version of this file said they were missing. They were added to `main` (commit `e7ef89e`, "Astra made website draft") as the folder `nibbida-website-chatgpt-sketch/`. I have now inspected them without merging or moving anything; section 3 is based on that. On Jayadhamma's instruction (22 October) it has been moved, with `git mv`, to `design/nibbida-website-chatgpt-sketch/` on this branch.
- The old site is small: 24 pages, about 18,000 words, almost all plain text with images. Only a few pages depend on something outside the page itself (see section 2).
- Facts below come from the fetched HTML. Where I could not see something (for example the contents of embedded Google Docs), I say so.

## 1. Pages on the old site

All URLs are under `https://www.nibbida.com`. Language: EN = English, SV = Swedish. "Words" is a rough count of the visible page text, excluding the repeated menu and footer. Embedded Google Docs are not counted.

| # | Path | Title | Lang | Type | Words |
|---|------|-------|------|------|-------|
| 1 | `/home` | Home | EN + SV (Swedish below English on one page) | Text page with links to projects | 930 |
| 2 | `/texter` | Texter | SV | Index (landing) page | 396 |
| 3 | `/texter/superkort` | Superkort om buddhismen ("En kort introduktion till Dhamma") | SV | Text page with images; links to a Drive folder | 1,378 |
| 4 | `/texter/mindfulness` | Mindfulness i korthet | SV | **Embedded Google resource** (a Google Doc preview) with a short intro | 453 |
| 5 | `/texter/rotter` | Mindfulness rötter | SV | Text page (excerpt) plus links to a PDF and an EPUB on Google Drive | 2,141 |
| 6 | `/texter/om-pali-och-dess-kanon` | Om pali och dess kanon | SV | Text page | 471 |
| 7 | `/texter/ratana` | Ratana Sutta: Munkliv under COVID-19 | SV | **Embedded Google resource** (a Google Doc preview) with a short intro | 214 |
| 8 | `/poesi` | Poesi | SV | Index page | 261 |
| 9 | `/poesi/de-fem-buddha-drömmarna` | De fem Buddha-drömmarna | SV | Text page (long poem/text), 2 images | 2,424 |
| 10 | `/poesi/myrstacken` | Myrstacken | SV | Text page with images | 467 |
| 11 | `/poesi/spjutet` | Spjutet | SV | Text page | 206 |
| 12 | `/poesi/sömnbubbla` | Sömnbubbla | SV | Text page; one link to a file on Google Drive | 227 |
| 13 | `/poesi/jag-erkänner` | Jag erkänner! | SV | **Embedded Google resource**: a Google Form that collects responses | 52 |
| 14 | `/resources` | Resources | EN | Index page | 326 |
| 15 | `/resources/archive` | Dhamma-Dana Archive | EN | **Embedded Google resource**: a Drive folder view (`embeddedfolderview`), plus text and acknowledgements | 721 |
| 16 | `/resources/map` | Meditation Map of the Dhamma | EN | Text and links. **No map is embedded.** It links to the Google Maps saved list (short links `goo.gl/maps/…`, `bit.ly/3s2BB0h`), shows highlight images, and lists related guides (Google Docs and Drive files) | 428 |
| 17 | `/resources/pali` | Pali Resource Guide | EN | Text page: a long list of tools, courses, and PDFs with external links | 2,178 |
| 18 | `/resources/reboot` | Three-step Reboot: A Guided Meditation | EN + SV | Text page with an embedded YouTube video | 959 |
| 19 | `/resources/visa` | How to make a Myanmar Meditation Visa | EN | Text page with 4 images and external links (e.g. the Myanmar e-visa site) | 1,240 |
| 20 | `/audio` | Audio Dhamma | EN | **Audio player page**: 6 embedded players from archive.org, plus stream/download links | 642 |
| 21 | `/blog` | Blog | EN | Text page. One post seen ("A Fulfilled Intention", 2 December 2025), written as a single page, not a Google Sites blog feed | 592 |
| 22 | `/donate` | Donate | EN + SV | Text page (see the privacy note in section 5) | 168 |
| 23 | `/links` | Links | EN | Text page: about 30 external links with one-line descriptions | 371 |
| 24 | `/about` | About | EN + SV | Text page with images | 675 |

Corrections to the handover's description of the site:

- The menu in the handover matches the site. The home page says the archive has "more than 300" books, but the Resources index says "more than 250". This is an inconsistency on the old site, not something I changed.
- The Meditation Map page has no embedded map and no list of places. All place data is behind the Google Maps links.
- Pages 4 and 7 (the Swedish texts) hold their main text in Google Docs, not on the page. I could not read those documents from the page HTML, so I do not know their length or formatting. The Google Doc IDs are `1_rFYML61Cn3oT6iJv9XrqUiUP8_3fIrmktlKLxSDneM` (Mindfulness i korthet) and `1_zEUQxomkI-3VhXsEd1kqs5aL2kC7AxI8Cz5ry4KKFg` (Ratana Sutta).

### 1.1 Other things the old site loads

- **Images:** all page images are hosted by Google (`lh*.googleusercontent.com`). Each page uses 1–9. They would need to be downloaded and stored in the repository. The About page says some images come from Freepik, Rawpixel, and Wikimedia, and that "in a few cases" the copyright holder could not be found (see question 7).
- **Fonts (Google Fonts):** Cormorant Unicase, Gentium Book Plus, Lato, Source Sans 3, plus Google Sans, Roboto, and Source Code Pro that are part of the Google Sites template.
- **Scripts:** Google Analytics (`G-R39MKV6WNC`), the Google API client, and the Google Sites runtime. None would be carried over.

## 2. How each page's content could be stored

"Markdown" means one `.md` file with front matter. "Data file" means YAML, JSON, or CSV. This section describes what is feasible, not what has been decided.

**Plain Markdown, no loss expected (pages 1–3, 5, 6, 8–12, 14, 17–19, 21–24).**
These are headings, paragraphs, lists, quotations, links, and a few images. Images become files in the repository, referenced from the Markdown. Pāli diacritics and Swedish characters are ordinary UTF-8 and survive unchanged.

Points to check page by page:
- Pages 1, 18, 22, and 24 contain English and Swedish on the same page. In the new structure the Swedish part may move to dhammadana.se (your decision). Until then, one Markdown file with two clearly marked sections works.
- The Google Sites text has stray line breaks inside words and sentences in the HTML (for example "Dhammad / ā / na" broken into pieces). These come from the editor's formatting, not from the text itself. When converting, I would join them and list each case, as section 4 of the handover requires.
- Page 17 (Pali Resource Guide) is a long list of tools and courses with download links. It fits Markdown, and each item could also be one entry in a data file if you later want it sortable.
- Page 23 (Links) is better as a **data file** (title, URL, description) rendered by a template, so a link can be added from a phone without touching layout.

**Text in Markdown, with a decision needed (pages 4, 7).**
The text lives in Google Docs. To store it as Markdown, someone has to export the documents (File → Download → Markdown or .docx) and give them to me, or give me the text. I have not retrieved them. The alternative, keeping the Google Doc embed, would keep a dependency on a personal Google account.

**Markdown plus downloadable files (pages 3, 5, 12).**
The PDF and EPUB of "Mindfulness rötter" and the Drive file on "Sömnbubbla" are hosted on Google Drive. The files could be copied into the repository (if they are yours to publish), or the links could stay as they are. The Drive folder linked from page 3 is a separate question.

**Data file, one entry per item (pages 15, 16, 20).**
- Page 15, Dhamma-Dana Archive: see the handover's catalogue proposal. The embedded Drive folder view cannot be stored; the catalogue replaces it. The text and the acknowledgements list are ordinary Markdown.
- Page 16, Meditation Map: the intro text is Markdown. The places themselves are not on the site at all; they depend on the Google Takeout export. The "popular highlights" images and the related guides (Google Docs, Drive files) are separate items to decide on.
- Page 20, Audio: six entries (title, description, date/place of talk, archive.org identifier, download URL). Each player is an `<iframe>` to `archive.org/embed/…`. Two ways to keep it: (a) keep the archive.org iframe, which depends on archive.org being up, or (b) use a plain HTML `<audio>` element pointing at the archive.org MP3 link, with a download link, which degrades more gracefully. One of the six MP3 links points to a numbered server (`ia904504.us.archive.org`) that may change; the stable `archive.org/download/…` form should be used instead.

**Cannot be stored as plain content (page 13).**
"Jag erkänner!" is an interactive poem: a Google Form collects people's responses. A static site cannot collect responses itself. Options: keep embedding the Google Form (depends on the Google account), link to it, or drop the interactive part and keep the poem's text. Whichever is chosen is your decision, not a technical one. The form's responses, if you want to keep them, are in Google.

**Also not storable as content:** the Google Sites search box, the "Page updated" footer, and the analytics. These would be omitted.

**Video (page 18).** The YouTube embed is a link to `youtube.com/embed/GdbFUqzfS2I`. It can be stored as a single line of data (the video ID). A plain link is the more durable option.

## 3. Astra design files

Location: `design/nibbida-website-chatgpt-sketch/` (added to `main` at the root in commit `e7ef89e`, then moved here). Files are otherwise untouched. Its own `MANIFEST.sha256` verified without errors.

**What it is.** A design study for one page, in three directions (A "expanded labyrinth", B "quiet center", C "edge of the page") with A recommended. It is a mockup: the copy is illustrative (its README says so), the links are in-page anchors only, and nothing is a real catalogue or reading page. It is a working HTML page that opens offline, but not a site.

**Inventory** (about 13 MB in total; about 12 MB of that is review images and PDFs that the site would not need):

| Kind | Files | Notes |
|------|-------|-------|
| HTML | `direction-a.html`, `direction-b.html`, `direction-c.html`, `recommended.html`, `index.html`, `comparison.html`, `refined-sheet.html` | `recommended.html` is byte-identical to `direction-a.html`, and `index.html` to `comparison.html`. The three direction pages are the actual page designs (about 4 KB each). `comparison.html` and `refined-sheet.html` are presentation boards for reviewing the designs, not site pages. |
| CSS | `assets/site.css` (9 KB), `board.css` (2 KB, boards only) | Plain CSS, one breakpoint (`max-width:700px`), mostly fixed pixel sizes. Colors are set as custom properties in an inline `style` on `<html>`. |
| JavaScript | One small inline script in each direction page | It only reads `?scale=large` and `?swatch` from the address, to preview alternatives. The site does not need it. |
| Fonts | `assets/EBGaramond.ttf`, `assets/EBGaramond-Italic.ttf`, `assets/FONT-LICENSE.txt` | EB Garamond, SIL Open Font License 1.1, already stored locally (1.1 MB). |
| SVG | `assets/emblem-A/B/C.svg` (70 KB each), `assets/maze-A/B/C.svg`, `labyrinth-white.svg`, `maze-explanation.svg` (9.5 KB each), `assets/C5-B.svg`, `assets/E2.svg` (ornaments), `assets/crop-diagram.svg`, plus `reference/` holding the two supplied originals | The emblem and maze are recolored copies of the supplied originals. Their README says the geometry is unchanged and that checksums of the originals were verified. |
| Images | `previews/*.png` (21 files), `comparison*.png`, `refined-sheet*.png`, `comparison.pdf`, `refined-sheet.pdf` | Screenshots and boards for review. Not used by the site. |
| Data | `specifications.json`, `verification.json`, `browser-checks.json`, `sheet-checks.json` | Colors, positions, and the designer's own checks. Not used by the site. |

**Loaded from outside the repository: nothing found.** I searched all HTML, CSS, and SVG for `http(s)://`, `//`, `@import`, `url(…)`, `<script src>`, `<link>`, and embedded images. The only URL is the SVG namespace string `http://www.w3.org/2000/svg`, which is not fetched. Fonts, SVGs, and CSS are all local. Two small caveats:
- Small labels and buttons use `Arial, sans-serif`, which is a system font and is not shipped. It will render as a different font on different devices.
- The CSS declares the font three times with different paths (`EBGaramond.ttf` and `assets/EBGaramond.ttf`, in `site.css` and `board.css`). They work from their own location, but the paths would need checking if the files move.

**What I noticed about the design itself** (observations, not decisions):
- Structure: header (emblem, name, three links: Books / Read / About), hero, one featured book, three "ways into the reading", one quoted passage, a book detail section, and a footer. It presents Nibbidā as a small publisher.
- It does **not** match the old site's content. The navigation has none of Texter, Poesi, Resources, Audio, Blog, Donate, or Links. How those fit is a design question that the sketch does not answer.
- The labyrinth is one 2,350 px SVG used as a background, positioned by fixed pixel offsets (a different offset for phones). It stays 2,350 px wide on a phone and is cropped. It is a very low-contrast background (the designer's figure is about 1.09:1 against the ground), by intent.
- Some text is very small: 10 px labels, and 7 px text on the book cover. Body text is 21 px. The README says its contrast numbers are computed checks and not a full accessibility audit.
- Pāli diacritics: the sketch's text uses ā in "Jhāna" and "nibbāna". I could not check whether EB Garamond covers the full set (ṭ ḍ ṇ ḷ ṃ ṅ ñ), because that needs a font tool I did not install. This should be tested before the font is chosen for good.
- The sketch shows the title *Insight Is the End*, Ayya Khema's name, and a four-line verse. Jayadhamma says the verse is the Buddha's, and asked not to be consulted on small copyright matters for now. I have not raised it further.

## 5. Decisions received, and remaining questions

**Decided by Jayadhamma, 22 October**
- The Astra sketch goes in `design/` (done).
- The Google Docs texts (*Mindfulness i korthet*, *Ratana Sutta*) are not needed now.
- The site is republished around the Dhamma projects, focusing on Resources and the English material.
- The Swedish material moves to the new dhammadana.se site. That covers Texter, Poesi, and the Swedish parts of the mixed pages (home, Reboot, About, Donate). "Jag erkänner!" is a poem and goes with the Swedish poems.
- Small copyright questions are set aside for now.
- A Donate page stays, with bank transfer details, so people can donate by bank. I will keep the details in one data file, separate from the page text, so they can be changed in one place. Nothing has been copied yet.
- The blog is cancelled and will not be rebuilt. The audio players are to be included.
- Images: Jayadhamma made them himself, using material found online, mostly from free websites, and believes they are without copyright. He asked me to double-check; see the note under "Still open".
- The home page leads as a publisher, as in the sketch. The Dhamma projects (Resources, Audio, and so on) are what people already know Nibbidā for, so they get a prominent place on the home page and in the navigation, not a small link.

**What this leaves for nibbida.com** (my reading of the decisions; please correct): Home (English part), Resources (Archive, Map, Pali guide, Reboot English part, Myanmar visa guide), Audio, Links, About (English part), and Donate if kept. That is about 10 pages instead of 24. Pages 2–13 are out of scope here, and the English halves of pages 1, 18, 22, and 24 would need to be separated from the Swedish.

**Still open**
1. **Donate page, details.** Decided: the bank details from the old page go into the new Donate page, as a data file. Jayadhamma thinks his mother agrees and will confirm later. I will copy them when the Donate page is built, not before; nothing is copied in this survey.
2. **Images: I cannot double-check the licenses.** I looked at the in-scope pages (Home, About, Audio, Links, Donate, Resources and its subpages, about 39 image elements in all, a few of them small icons). None has alt text, a caption, or a source note (only the visa page has descriptive alt text, for three photos taken at the Myanmar embassy in Bangkok). The files sit on Google's servers with no author or license data. So from the site alone I can tell neither who made an image nor under what terms it was published. The About page names Freepik, Rawpixel, and Wikimedia as sources and says that a few images have no known holder. What I can do when images are copied in: record, per image, the page, the file, and a source field for Jayadhamma to fill in, with known cases (own photos, Wikimedia) marked. Freepik and Rawpixel images often carry attribution or account conditions, which I cannot judge. A reverse image search would need your accounts or an outside service, so I have not run one.
3. **Audio.** To be included. Jayadhamma will decide after seeing both options: the archive.org embeds, and a plain HTML audio player (the browser's own player) with a download link. I will build a small sample of each when we reach the skeleton step.
4. **Analytics.** I would not carry over Google Analytics. Correct?
5. **Archive count.** "300+" on the home and archive pages, "250" on the Resources index. Use the real count from the catalogue?
6. **Bare domain.** `nibbida.com` was blocked here, so I haven't seen what it does. No action needed now.

## 6. Not done

- No files were downloaded into the repository, and no images were saved. The Astra files were inspected in a temporary folder outside the repository.
- I did not read the Google Drive archive, the Google Maps list, or the embedded Google Docs, and did not use any credentials.
- I did not check GitHub Pages terms, Leaflet, or the OpenStreetMap tile policy; the handover marks those for later steps.
- The raw copies of the pages I fetched are in a temporary scratch folder outside the repository and are not committed.
