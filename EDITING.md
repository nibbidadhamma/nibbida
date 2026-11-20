# Editing the site

The website is built from plain text files in the `src` folder. Everything can be edited in GitHub's web or mobile editor (open the file, tap the pencil, change the text, commit).

## Where things are

| To change | Edit this file |
|---|---|
| The Pali Resource Guide | `src/resources/pali.md` |
| The home page text | `src/index.njk` (the text between the tags) |
| The menu and footer links | `src/_data/site.yaml` |
| Colors of the dark and light themes | `src/assets/theme.css` (the light values appear twice; change both) |
| Layout | `src/assets/*.css` (needs care) |

## The Pali Resource Guide

Each resource is written the same way:

```
### Title of the resource

[Download](https://example.org/file.pdf) [Online version](https://example.org/)

A description of the resource.
```

- `##` starts a section. Sections appear in the "On this page" box automatically.
- `###` starts a resource.
- The line of links directly under a `###` heading becomes buttons. The words in square brackets are the button text.
- To add a resource, copy an existing one, including the blank lines, and change the words.
- Keep the blank lines between parts. A missing blank line can merge two parts.

## Light and dark

The site follows the visitor's device setting. A Light / Dark button in the header (inside the Menu on phones) lets a visitor choose; the choice is remembered in that browser. Without JavaScript the device setting still applies and the button is hidden.

## The menu

In `src/_data/site.yaml`, each page has `ready: false` until it exists. Greyed items show "coming soon". Change it to `ready: true` when the page is built.

## The Dhamma-Dāna Archive

Each book is one small file in `src/archive/books/`. The file name becomes the book's web address, so use lowercase words with dashes, for example `ajahn-chah-a-still-forest-pool.md`. To add a book, copy an existing file, change the words, and save it under a new name.

```
---
title: A Sample Book Title
author: Sample Author
folder: various
language: English
formats:
  - name: PDF
    url: https://publisher.example/book.pdf
  - name: EPUB
    url: https://publisher.example/book.epub
source: Sample Publisher
source_url: https://publisher.example/
terms: Free distribution, not for sale
---
```

- `folder` is one of: `various`, `canon`, `chanting`, `dictionaries`, `swedish`, `german`. The folders and their cover colors are in `src/_data/archive.yaml`.
- Keep the two lines of three dashes (`---`) and the spaces at the start of the `formats` lines exactly as they are.
- The cover is drawn automatically from the title, author and folder.
- A book hosted on this site also has `hosted: true` and a `permission:` line (the publisher's name, the date, and a short reference; no email addresses). Its `url` lines then start with `/archive/files/` and the file itself goes in `src/archive/files/`.
- Cards with `sample: true` are fake examples. Delete them before publishing. The build prints a warning while any remain, and a warning for any card with missing fields or an unknown folder.
- The search box and folder buttons need JavaScript. Without it, the page shows every book.
- The page text above and below the shelf is in `src/resources/archive.md`.

### Changes made when the archive text was converted from the old page

- Left out: the sentence "Download or read directly by clicking in the window below!", the Google Drive links, and the sharing images and short link.
- The folder walkthrough ("A quick walkthrough of the archive") keeps the old wording, with these changes: the Drive links, the sentences about how each folder was sorted, and the Upload folder sentence were removed; ", sorted by its original author" was removed from the Swedish sentence; and a closing paragraph says the shelf is sorted by title. The folder buttons use the names from the old text (Dictionaries, Guides etc.; Swedish Dhamma Writings; German Dhamma Writings).
- Added back at Jayadhamma's request: the format and e-book notes. The paragraph about the PDF and EPUB formats came from the old "quick walkthrough" section; it now opens the new "New to e-books?" section, in front of the two paragraphs that were already under that heading.
- The upload-folder sentence was shortened to "You can send your favorites with an e-mail", and the e-mail address is now nibbidadhamma@gmail.com.

## Audio, Links and Donate

- **Audio:** `src/_data/audio.yaml`. One block per recording: title, kind, length, a short line (`tagline`), the description (`text`), the archive.org page (`page`) and the MP3 address (`file`). Copy a block to add a recording.
- **Links:** `src/_data/links.yaml`. Groups with one line per link: `{name, url, text}`.
- **Donate:** `src/_data/donate.yaml`. The "Ways to give" section appears when `methods` has entries. An example is in the file as a comment. Add bank or phone details only with the account owner's agreement; the site and its history are public.

### The merged links list (October 2026)

The Links page now combines Jayadhamma's older list with *Online Dhamma Resources* by Kusalacāra Bhikkhu (from the Early Buddhist Obsidian Vault), who is credited at the top of the page. Where both lists had the same site, the newer list's entry was kept:

- Removed from the older list: Dhamma Wiki, Dhamma Talks, Buddha Dharma Education Association (BuddhaNet), Sutta Central, Ancient Buddhist Texts, Buddhist Publication Society, Reading Faithfully and Pali Audio.
- Removed from the newer list: "Ancient-Buddhist-Texts.net" (same as "Ancient Buddhist Texts") and "NORBU (AI)" (same address as "NORBU Early Buddhist Texts").
- Kept although they share a site, because they are different pages: Pariyatti and Pariyatti podcasts; ReadingFaithfully and its Sutta Tools Lab; Buddha-Vacana and its French page; two NORBU pages; two Old Buddhist Objects pages.
- Changes to the newer list: addresses that contained template markers such as `{{suttacode}}` now point to the site's main address; "Open.tipitaka.lk" and the Simsapa entry became links; two typos were fixed ("Excelent", "scipts"); the entry for Bhikkhu Anālayo's meditation instructions got a name and the opening words "This is a page from" became "A page from"; the group and sub-group headings were rewritten as a name plus what you find there, in the style of "Translations (Pāli Nikāyas & related)" (for example "Early Buddhist texts (the canon, where to read it)"). Each group also has a short label (`short:` in `links.yaml`) for the jump list at the top.
- The old Swedish group (Buddhist groups in Sweden) is not on this page.

### Changes made when these three pages were converted from the old site

- Audio: the typo `("n tune")` became `("in tune")`. The old "Stream here or download here" links became a player, a Download button and an "On archive.org" button. The Solitude MP3 address was changed from a numbered archive.org server to the stable form.
- Links: "Meditation Map of the Dharma" became "...of the Dhamma", "Pali Resoure Guide" became "Pali Resource Guide", and the heading lines were rewritten for the new design ("Good places to read and listen", "Dhamma sites, publishers and podcasts."). The Swedish group of links was left out. "BuddhaDharma:" lost its colon.
- Donate: the headline is the proverb. The intro no longer names the mother and the kappiya, and the bank, Swish and Revolut details are not on the page (see above).

## Pictures

Pictures from the old site get the two-tone treatment and the frame automatically when they are placed with the `frame` helper (see `src/about.md` for an example). The two tones for each theme are `--duo-dark` and `--duo-light` in `src/assets/theme.css`. Pictures are stored in `src/assets/images/`.

## Before editing from a phone

A mistake in the top block of a file (between the `---` lines) can stop the site from building. Leave that block alone unless you are sure.

## Changes made when the Pali page was converted from the old site

The page text was copied unchanged, except for these points:

- The title "Pali  Resource Guide" had a double space; it is now "Pali Resource Guide".
- An invisible character (U+FEFF) after `Tipiṭaka"` in the Oberlies sentence was removed.
- An invisible trailing space after the heading "Further reading: Commercial books" was removed.
- Link lines such as "Download: https://..." are now buttons ("Download"). The addresses are no longer shown as text.
- The "reach out" link in the introduction now points to nibbidadhamma@gmail.com (the old page had a different address), as Jayadhamma instructed on 22 October 2026.
- Not changed, but noticed: "The guide begins  with" has a stray double space in the original.

## Publisher text (start page and inner pages)

- The start page, About, the Resources overview and the project cards were rewritten in a calmer, more formal publisher voice. Nibbidā is described as an independent Dhamma publisher; no book titles or authors are named as Nibbidā publications.
- "A passage to sit with" on the start page is a small carousel. The passages are in `src/_data/passages.yaml` (four Ayya Khema quotes so far). Each passage carries its own credit line. Add passages there; keep the wording unchanged. If the list is empty the section is hidden.
- The featured slot "The first Nibbidā editions" is a placeholder until real books are ready.
- Text changes in About: "It blew my mind" became "It changed how I saw my own mind"; the robes sentence and the closing wish were shortened; "The informative part" became "Background". A paragraph about Nibbidā as a publisher was added at the top.
- "Pali" is written without the diacritic in titles, by choice.

## Audit fixes

- Headings: the start page has one main heading; the Resources overview uses level-2 headings (page option `pageclass: entries`, `notoc: true`).
- "Pali" is written without the diacritic in the site's own headings and text. Names of other people's works ("Digital Pāli Reader", "Pāli Text Society") and the descriptions in the shared links list keep their original spelling.
- Apostrophes in the site's own text are curly. Quotations keep their original characters.
- Menu item "Books" opens the Dhamma-Dāna Archive. The footer has a "Contact" link (email).
- Donate page: one email invitation (the second sentence of the intro moved into "Ways to give").
- Fonts use `font-display: swap`. Smooth scrolling is off for visitors who ask for reduced motion. Stand-alone links on phones have a 44 px tap area.
- The signature on the About page is spelled "Haraldsson".

## Page weight

- The site went from 4.5 MB to 1.7 MB. The two fonts are now WOFF2 files (about 150 KB each instead of 520–590 KB), and the pictures are WebP, at most 900 px wide.
- The original pictures are kept in `design/original-images/` and the original TTF fonts in `design/original-fonts/`. To add a picture, save it as WebP (about 800 px wide, quality about 75) in `src/assets/images/`.

## Meditation Map page

- `/resources/map/` is built from `src/resources/map.njk` and the data file `src/_data/map.yaml`. The map itself is the saved Google Maps list (`map_url`). The page also lists the eleven "popular highlights" from the old page, other maps and lists, and guides from the archive.
- Text changes from the old page (grammar only): "it's now even more easy" → "it is now even easier", "The places gives" → "give", "who wants" → "who want", "try find" → "try to find", "contribute with" → "contribute", and the contact address is nibbidadhamma@gmail.com instead of the old one.
- The highlights have coordinates (lat/lng, taken from the Google Maps links) for a map on this site later. Na Uyana has none yet.
- To add a place, add a line under `highlights:`.

## Map on the Meditation Map page

- Continent buttons and a real map (Leaflet with OpenStreetMap tiles). The map loads only when the visitor presses "Show the map"; the list of places works without JavaScript.
- Every place in `src/_data/map.yaml` (under `highlights:`) needs a `continent`. A button appears for each continent that has a place. Places without `lat` and `lng` are listed but have no pin.
- To change the map style or provider, edit `tiles:` in the same file (`url`, optional `dark_url`, and `attribution`). OpenStreetMap's own server is meant for light use; for more traffic use a provider with a key and set its credit line.

## Archive entries (recommended shelf)

- Each book is one file in `src/archive/books/`. Fields: `title`, `author`, `folder` (various, canon, chanting, dictionaries, swedish, german), `language`, `recommended: true` (shown under the "Recommended" button), `available` (the formats shown on the shelf), `formats` (the buttons: `name`, `label`, `url`), `about`, `source`, `source_url`, `terms`.
- A book whose file is not on this site yet has `pending: true` and no `formats`. The page says "The file will be added here soon." To host a file, put it in `src/archive/files/`, add a format with `url: /archive/files/NAME.pdf`, set `hosted: true` and a `permission:` note, and remove `pending`.
- The shelf starts on "Recommended"; a search always looks through all books. Folder buttons appear only for folders that have a book.
- The first 13 entries are the recommended titles (data in `import/dda-recommended.yaml`). Linked at the publisher: Numbered Discourses, Stillness Flowing, Breathing Like a Buddha, Wings to Awakening, the Jātaka, Sutta Nipāta, Buddhadhamma, Uncommon Wisdom. File to be added: The Life of the Buddha, The Anatomy of Awakening, The Concise Buddhist Monastic Code, Dhamma Everywhere, Dhamma Reflections. The covers are generated; real covers need the publishers' permission.
- The eight sample books were deleted.

## Meditation Map: one file per place

- Each place is a file in `src/map/places/` (70: the places of the old Google list "Meditation Map of The Dhamma"). Fields: `name` (in English), `continent`, `line` (where it is, starting with a place readers know, for example "Near London, England"), `traditions` (one or two, as a list, for sorting later: for example Mahāsi, Goenka, Sayagyi U Ba Khin, Pa-Auk, Ajahn Chah), `lat` and `lng` (leave out if unknown: the place is listed but has no pin), `google` (link), `website` (optional), `highlight: true` (shown first). The text under the `---` is the short overview shown on the card and on the small cards in the grid, for example "The biggest and most accessible monastery in the Ajahn Chah tradition. Dana-based."
- To add a place, copy a file, change the name and the fields, and commit. The map, the cards, the list, the dropdown and the continent buttons all follow the files. A link like `/resources/map/#amaravati-buddhist-monastery` opens that place.
- Most places have only the location line so far. The overview sentences are for Jayadhamma to add. The 70 places are the list Jayadhamma pasted from the old Google map. Coordinates were taken from his Google data where the place was in it (25 pins so far); other places are listed without a pin until their coordinates are checked. A place without a `continent` appears only under "All places" and in the menu group "Other places". Names were made English (for example Muttodaya Forest Monastery). 82 more candidate places from his reviews and saved places are kept in `import/map-candidates.csv` for later.
- On the page: a card shows one place at a time with Previous and Next (like the quotes on the start page). It follows the continent buttons, the "Jump to a place" menu and the pins; pins that are close together merge into numbered circles.

## Map: website buttons and English names

- Each place in `map.yaml` can have `website` (its own site). The card on the map and the list then show "Visit the website ↗" next to "Open in Google Maps ↗". Panditarama Lumbini has none yet (its address, panditarama-lumbini.info, could not be confirmed).
- Names on the map: OpenStreetMap's tiles write each country's names in its own language. For English only, use a tile style without labels (for example CARTO `light_nolabels` and `dark_nolabels`, free key from carto.com/basemaps/apikey), put the addresses and the key in `tiles:` in `map.yaml` and set `labels: false`. The page then writes English names of countries (`src/assets/countries-en.json`) and of the places itself.
- With light and dark tile addresses (`url` and `dark_url`), the map follows the Light/Dark button.

## Cover pictures

- A book can show its real cover: set `cover_image: /assets/covers/NAME.webp` and `cover_credit:` in its file. The picture is used only when the file exists in `src/assets/covers/`; otherwise the generated cover is shown. Covers are shown unchanged, as small thumbnails (about 420 px high, WebP), with the credit on the book's page.
- The 13 recommended books are already set up. Their thumbnails are a separate download (`dda-covers-thumbnails.zip`) and must be uploaded to `src/assets/covers/` by Jayadhamma (decision of 2026-10-23: all 13 as thumbnails, since they are free Dhamma publications). To remove one cover, delete its file.

- Google Maps is shown in one place only: the button on the place card (the card you get by clicking a pin or a name in the list). The card says that the button leaves nibbida.com. The old "Open the map in Google Maps" section and the share images were removed from the page; the list shows plain names.

## Archive collections

- A collection is a book file with `collection: true` and a list `items:` instead of `formats:`. On the shelf it shows a picture of book spines (colors follow the folder) and "Collection · N books". Its page lists every book in it, each with buttons. The search box also finds the books inside a collection.
- Each item has `title`, optional `author` and `about`, and `formats` (`name`, `url`, optional `label`). Items are shown in the order written: larger works first.
- Example: `src/archive/books/anandajoti-bhikkhu-canon-texts.md`. The build warns if a collection has no items or an item has no title or format.
- Items link to files in the Dhamma-Dāna Drive archive. Nothing is hosted on this site.

## Link check, 5 November 2026

- Checked every outbound link reachable from the built pages (166 links) with an automated fetch, then verified every failure by hand in a real browser, since several sites are known to block automated checks (see `LAUNCH-CHECKLIST.md`).
- Fixed: the Sāsanārakkha NotebookLM link on the Pali Resource Guide (`src/resources/pali.md`, "Sāsanārakkha: Notebook LM collections") pointed to `https://sasanarakkha.github.io/study-tools/notebook_lm.html`, which now 404s. The site (now titled "SBS DhammaVinaya Learning Tools") moved the page to `https://sasanarakkha.github.io/study-tools/7-notebook-lm/`, confirmed working and listing the same kind of NotebookLM notebooks (Early Suttas, Vinaya, Pātimokkha, and others). Updated the link.
- Flagged, not fixed: both Buddha-Vacana links on the Links page (`src/_data/links.yaml`, "La Parole du Bouddha" and "Buddha-Vacana") return 503 "Website unavailable" from OVHcloud, the host, not a transient error. No replacement address is known. Left in place since this may be a temporary hosting lapse rather than the site being gone for good; worth rechecking before the next link audit, and removing if still down.

## Link check, 20 November 2026

- Rechecked every outbound link (171, including the new Myanmar visa page), same method as 5 November: automated fetch, then every failure verified by hand in a real browser.
- Fixed: John Kelly's "Answer Key for Warder" on the Pali Resource Guide pointed to `audiobuddha.org/.../Answers.pdf`; that whole site is down (502, confirmed repeatedly, including its homepage). Replaced with the Access to Insight page for the same text (`https://accesstoinsight.org/lib/authors/kelly/warder-key/`), a long-established, stable source; changed the button from "Download PDF" to "Read online" since this source is HTML, not a PDF.
- Flagged, not fixed: the Warder "Introduction to Pali" PDF on the same page also points to `audiobuddha.org`, now down the same way. A copy exists at `wiswo.org/books/_resources/book-reference-pdfs/Warder-2001-Introduction-to-Pali.pdf` (confirmed a real ~30 MB PDF, matching filename and size for the right book) — but the page already carries its own caution about wiswo.org further down ("This link might be flagged as dangerous for some reason"), so this wasn't swapped in without asking. No Wayback Machine snapshot of the original file exists. Left as-is pending Jayadhamma's own judgment on the wiswo.org domain.
- Buddha-Vacana (flagged 5 November, still down): now returns 502 on the main domain and 404 "Site not installed" on the French page, rather than 503 — if anything, a stronger sign of a lasting lapse (sounds like the hosting account itself was dropped), not a transient outage. Still no replacement address found. Worth a decision now rather than another wait-and-see.
- www.suanmokkh.org: failed consistently (tunnel/connection failure, both through this tool's network path and a plain `curl`) across repeated attempts, unlike 5 November when it loaded fine in a browser after an automated check flagged it. Could not fully rule out that this is specific to this environment's network path rather than the site itself; worth a plain check from an ordinary browser.
- Everything else flagged by the automated pass (GitHub, Buddhist University, DhammaWheel, DhammaWiki, Buddhist Door, Freepik, Rawpixel, Oxford Bibliographies, and a few transient connection hiccups) was confirmed fine by hand — same bot-blocking pattern as 5 November, nothing new.

## Donate page, 20 November 2026

- The mother and the kappiya have agreed: `src/_data/donate.yaml` now has three methods (bank transfer, Revolut, Swish). Added `url` support to a method's `lines` entry (`src/donate.njk`) so the Revolut line renders as a clickable link instead of plain text; other lines are unchanged plain text.

## Myanmar Meditation Visa guide, 20 November 2026

- Built `src/resources/visa.md` from the old page (`nibbida.com/resources/visa`), text copied exactly except: "adress" → "address", "bath" → "baht" (currency), a doubled space, and "Meditation Map of the Dharma" → "...of the Dhamma" in the closing note, matching the same fix already made elsewhere (see the Links page notes above). The old page's "contact me" link went to a different, older email address; it now points to nibbidadhamma@gmail.com, as already done for the Pali guide and other pages.
- The "Look where the Embassy is on Google maps here" link went through a Tumblr redirect wrapper; replaced with the direct Google Maps link it pointed to (`https://goo.gl/maps/HyANxTgL6Zt`), confirmed still resolving.
- Images: the old page had three photos. Two downloaded and converted to WebP as `src/assets/images/visa-embassy.webp` and `src/assets/images/visa-photo-shop.webp`. The third (an "opening office hours" sign photo) could not be downloaded — its Google-hosted URL returns 403 to every method tried (plain fetch, browser fetch with referer). The page is built without it; the paragraph it illustrated is unchanged. Worth another attempt later, or asking Jayadhamma for his own copy of that photo.
- Marked `ready: true` in `src/_data/site.yaml` and `src/_data/projects.yaml`, and turned the Resources-overview entry (`src/resources/index.md`) into a working link. This was the last "coming soon" page.

## Meditation Map pins, 20 November 2026

- Of the 8 places without coordinates, only one could be confidently resolved: **Penang Bodhi Heart Sanctuary**, 5.436908, 100.297098 (from a place listing that names it specifically, cross-checked against its street address). Added to `src/map/places/penang-bodhi-heart-sanctuary.md`.
- The other 7 could not be resolved with confidence (no geocodable address, an address OSM/Nominatim couldn't resolve to a building, or — in one case — a published address that turned out to be in a different city than the place's name). Left without coordinates; see the chat record of 20 November 2026 for what was found on each, to hand to Jayadhamma for confirmation.
