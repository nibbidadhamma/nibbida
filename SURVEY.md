# Survey of nibbida.com and the Astra design files

Written 22 October 2026, following section 1 of `nibbida-handover.md`. Survey only: nothing was built, installed, or changed except the addition of this file.

## 0. Summary

- **nibbida.com is reachable** from this environment, through the host `www.nibbida.com`. The bare host `nibbida.com` was refused by the egress proxy (it is probably only a redirect). All 24 pages in the site menu were fetched and read as HTML.
- **The Astra files are not in the repository.** The branch contains only `README.md` and `nibbida-handover.md` (commits `f57ff55`, `8218af9`; no other branches). There is no `design/` folder. Section 3 below is therefore empty, and section 4 is provisional. This is the first blocking question.
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

**Not found.** The repository contains no HTML, CSS, images, SVGs, fonts, or scripts. Only these files exist:

```
README.md
nibbida-handover.md
```

I did not search outside the repository. I could not therefore check whether the design runs as a mockup or as a working page, nor what it loads from outside the repository. Please see question 1.

## 4. Static site generator: provisional recommendation

This is provisional because the Astra files were not available. I based it on the old site and the decisions in the handover.

**Recommendation: Eleventy (11ty), unless the Astra files turn out to need component-style interactivity.**

Reasons, from what I read:

1. **The content is text.** Of 24 pages, about 20 are Markdown prose. Eleventy treats Markdown plus front matter as its main input and leaves the HTML you supply alone, so the Astra home page can be used as a template almost as it stands. This keeps the existing design intact rather than rewriting it into another framework.
2. **Data files are first-class.** Eleventy reads YAML, JSON, and CSV from a data folder and exposes them to templates, which is what the Links, Audio, Archive catalogue, and Map pages need.
3. **Phone editing.** Content files are plain `.md` and `.yml`, and the layout is separate, so an edit in GitHub's web or mobile editor cannot break the design.
4. **Small footprint and long life.** Eleventy has few dependencies and outputs ordinary HTML and CSS with no client-side JavaScript by default. That suits the requirement that the site keeps working for years without maintenance.
5. **No build step for you.** Both Eleventy and Astro build in GitHub Actions on each change, so you never run a build. This is the same for both.

Astro would be the better choice if the Astra home page contains interactive components that you want to keep as components, or if you expect many more interactive features. Astro has more dependencies and more frequent major versions, which is a maintenance risk for a site left alone for a long time. I have not verified this against current release notes; it is my judgment from general knowledge, so please treat it as an opinion.

What would change my recommendation: the contents of the Astra files, and the answer to whether GitHub Pages is available for a private repository on your plan (GitHub Actions deployment is assumed but not verified; I have not checked current terms).

## 5. Questions for Jayadhamma that block the next step

**Blocking**

1. **Where are the Astra files?** They are not in the `nibbida` repository, on any branch. Could you add them (to `design/`, untouched, as the handover says), or tell me where they are?
2. **Google Docs for "Mindfulness i korthet" and "Ratana Sutta".** Do you want these converted to Markdown? If so, please export the two Docs (Markdown or .docx) and add them to the repository, or paste the text. I cannot read them from the page.
3. **Which texts are yours to publish?** "Mindfulness i korthet" is a translation of a text by Sayadaw U Tejaniya, and "Reboot" quotes instructions from James Kingsland's book and the Dhammapada translation by Eknath Easwaran. Is the translation permitted? This matters if the repository becomes public.
4. **Swedish material.** Should I move the Swedish pages into a staging folder now (to go to `dhammadana.se`), or leave them out of this repository until that site exists? Pages 1, 18, 22, and 24 mix both languages.
5. **"Jag erkänner!"** The interactive poem uses a Google Form. Keep the embed, link to it, or keep the poem text only?

**Needed soon, not blocking this step**

6. **Donate page.** It contains a private person's bank details (IBAN, account, address), a phone number for Swish, and a Revolut link. I have not copied any of it into this file. If the repository becomes public, these details become public, and remain in the history. Do you want them in the repository at all, and does the person concerned agree?
7. **Images.** The About page says that for a few images no copyright holder could be found. Which images are those? Should unlicensed images be left out of the repository? Should I list the images per page with their sources for you to review?
8. **Audio.** Keep the archive.org embeds, or use a plain audio element with a download link (see section 2)?
9. **Blog.** Is the single post the whole blog, and will new posts be added later as separate files?
10. **Analytics.** The old site uses Google Analytics. I would not carry it over. Is that correct?
11. **Inconsistent counts.** The archive is described as "300+" books on the home page and archive page, and "250" on the Resources index. Should the new text say 300+ or use the real number from the catalogue?
12. **Bare domain.** `nibbida.com` was blocked for this session while `www.nibbida.com` worked. Nothing is needed from you, but it means I have not seen what the bare domain does. The redirect behavior will matter at the domain switch.

## 6. Not done

- No files were downloaded into the repository, and no images were saved.
- I did not read the Google Drive archive, the Google Maps list, or the embedded Google Docs, and did not use any credentials.
- I did not check GitHub Pages terms, Leaflet, or the OpenStreetMap tile policy; the handover marks those for later steps.
- The raw copies of the pages I fetched are in a temporary scratch folder outside the repository and are not committed.
