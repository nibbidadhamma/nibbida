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

### Changes made when these three pages were converted from the old site

- Audio: the typo `("n tune")` became `("in tune")`. The old "Stream here or download here" links became a player, a Download button and an "On archive.org" button. The Solitude MP3 address was changed from a numbered archive.org server to the stable form.
- Links: "Meditation Map of the Dharma" became "...of the Dhamma", "Pali Resoure Guide" became "Pali Resource Guide", and the heading lines were rewritten for the new design ("Good places to read and listen", "Dhamma sites, publishers and podcasts."). The Swedish group of links was left out. "BuddhaDharma:" lost its colon.
- Donate: the headline is the proverb. The intro no longer names the mother and the kappiya, and the bank, Swish and Revolut details are not on the page (see above).

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
