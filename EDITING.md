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

- Each place is a file in `src/map/places/` (87 so far). Fields: `name` (in English), `continent`, `line` (where it is, for example "Near London, England"), `lat` and `lng` (leave out if unknown: the place is listed but has no pin), `google` (link), `website` (optional), `highlight: true` (shown first). The text under the `---` is the short overview shown on the card, for example "The biggest and most accessible monastery in the Ajahn Chah tradition. Dana-based."
- To add a place, copy a file, change the name and the fields, and commit. The map, the cards, the list, the dropdown and the continent buttons all follow the files. A link like `/resources/map/#amaravati-buddhist-monastery` opens that place.
- Most places have only the location line so far. The overview sentences are for Jayadhamma to add. The 87 places come from the old page's highlights and from his Google reviews and saved places (Buddhist places only; no hotels or private places). A few names were translated to English (Golden Temple, Mahabodhi Temple, International Theravāda Buddhist Missionary University, Sirisampanno Buddhist Monastery, Wat Thai Norway).
- On the page: a card shows one place at a time with Previous and Next (like the quotes on the start page). It follows the continent buttons, the "Jump to a place" menu and the pins; pins that are close together merge into numbered circles.

## Map: website buttons and English names

- Each place in `map.yaml` can have `website` (its own site). The card on the map and the list then show "Visit the website ↗" next to "Open in Google Maps ↗". Panditarama Lumbini has none yet (its address, panditarama-lumbini.info, could not be confirmed).
- Names on the map: OpenStreetMap's tiles write each country's names in its own language. For English only, use a tile style without labels (for example CARTO `light_nolabels` and `dark_nolabels`, free key from carto.com/basemaps/apikey), put the addresses and the key in `tiles:` in `map.yaml` and set `labels: false`. The page then writes English names of countries (`src/assets/countries-en.json`) and of the places itself.
- With light and dark tile addresses (`url` and `dark_url`), the map follows the Light/Dark button.

## Cover pictures

- A book can show its real cover: set `cover_image: /assets/covers/NAME.webp` and `cover_credit:` in its file. The picture is used only when the file exists in `src/assets/covers/`; otherwise the generated cover is shown. Covers are shown unchanged, as small thumbnails (about 420 px high, WebP), with the credit on the book's page.
- The 13 recommended books are already set up. Their thumbnails are a separate download (`dda-covers-thumbnails.zip`) and must be uploaded to `src/assets/covers/` by Jayadhamma (decision of 2026-10-23: all 13 as thumbnails, since they are free Dhamma publications). To remove one cover, delete its file.

- Google Maps is shown in one place only: the button on the place card (the card you get by clicking a pin or a name in the list). The card says that the button leaves nibbida.com. The old "Open the map in Google Maps" section and the share images were removed from the page; the list shows plain names.
