# Decisions so far

Recorded from conversations with Jayadhamma Bhikkhu, 22 October 2026. Only what was stated is listed. Open items are marked as open.

## Decided

**Design and devices**
- The site must work well on phones, tablets and laptops.
- Home page: Astra direction A, with the smallest text enlarged ("larger" version).
- Menu: Books, Resources and About are the main links. Resources opens a list of its pages. Audio, Links and Donate are in the footer. Pages not built yet appear greyed out as "coming soon".
- Inner pages: a narrow reading column, a small label above the title ("Resources"), and an "On this page" box on long pages. Links appear as buttons, not as raw addresses.
- A light option will be added. Visitors get it both ways: the site follows the device's light or dark setting by default, and a small Light / Dark button lets them choose and remembers the choice.
- Light colors: a middle way between the dhammadana.se palette (Brown #542300, Ivory #FFF9E8, Clay #9A5B3F, Sand #E7D6B9) and the first neutral paper palette. Chosen by Claude as asked ("find the sweet spot, still a light theme"): ground #FAF5E8, text #3F2713, supporting text #6F4F3C, accent #7A4F33, lines #E2D6C1. Contrast on the ground: text 12.8:1, supporting text 6.8:1, accent 6.4:1. Values are in `src/assets/theme.css`. The dark theme is unchanged.
- Emblem in the header: 06A, the star in a ring (choice A). Warm copies of the artwork, shapes untouched: the light version uses the text color.
- Tab icon: 02C white-on-black (`src/assets/icons/`).
- Labyrinth: the 12-band one, tried as the home page background in both themes (the 16-band file is still in `design/` if we go back).
- Ornaments (Jayadhamma likes C3-B, C4-B, D3-B and O2 and left the placing to Claude): C5-B beside the verse on the home page; C4-B in the footer; D3-B under the title of inner pages; O2 at the end of inner pages; C3-B before the acknowledgements on the archive page. They are drawn in the current text color, so they follow the theme.
- Fonts: EB Garamond stays (the dhammadana.se headings use Alegreya; item 7 of the choices was left blank).

**Structure**
- A Resources overview page exists at `/resources/` (text from the old overview; the Pali guide is added; the YouTube channel is dropped on purpose). The Resources menu has an "All resources" entry.
- The Three-step Reboot page is dropped from the new site: removed from the menu and the Resources overview, and it will not move to dhammadana.se. The old page on Google Sites is not touched by this project.
- The Archive text on the Resources overview says "more than 300 books" (the old overview said 250; the old Archive page said 300+).
- Keep the old addresses (for example `/resources/pali`), so existing links keep working.
- People suggest additions (map places, archive books) by email link. No Google forms or folders.
- One shared book-list format, to serve the Dhamma-Dāna Archive now and other book lists later.
- Tool: Eleventy.
- Footer and menu show Audio, Links and Donate as "coming soon" until those pages exist.

**Dhamma-Dāna Archive (DDA)**
- Rebuilt on this site, no Google Drive.
- Links between nibbida.com and dhammadana.se (for example to hosted books) are acceptable.
- Hosting only the books that are allowed. Jayadhamma is considering keeping the hosted books in the `dhammadana` repository, because of the planned Swedish translation of the resources.
- A bookshelf with generated covers in the site's own style. Each book has a title, author and download button.
- Shelf look: covers colored by folder (option B in `previews/bookshelf/`), with a search box and folder buttons. Cover imprint: DHAMMA-DĀNA.
- Built (with fake sample entries to delete before publishing): the shelf at `/resources/archive/`, generated covers, a page per book, search and folder buttons, and one card file per book. See `EDITING.md`.
- On the archive page: the quotation and the acknowledgements are kept; the format and e-book notes are kept (under "New to e-books?"); the folder walkthrough is back with the old wording adapted to the new shelf (the draft was shown; Jayadhamma said "sure" and left the folder names to Claude, who chose the names from the old text); the Drive-specific text is left out.
- Book data: one small text file per book. The real list of books is to be solved later (the handover suggests listing a synced Drive folder on Jayadhamma's computer).
- Most buttons link to the original publisher. A book is hosted on this site only after its terms are confirmed.
- Root texts may be stored in a DDA folder in the repository, but only texts whose source and license are known. A public repository's history stays public after a file is deleted.
- Each book's catalogue entry records its source, its terms, and who agreed and when. Jayadhamma fills these in. Permission is asked from the publisher; the publishers' friendliness is not permission.

**Meditation Map (MMD)**
- Rebuilt on this site with no Google Maps. The list view must work without map tiles.
- A one-time Google Takeout export of the saved places is still needed.

**Other**
- License: Creative Commons CC BY-NC-ND 4.0 for the text, design and artwork, with the exclusions listed on the License page (`src/license.md`): the font, photographs, quotations, other people's books and tools, and the design study. The official legal text is in `LICENSE`. The copyright holder is written as "Nibbidā Dhamma (Jayadhamma Bhikkhu)"; Jayadhamma should confirm this.
- Start page and About page: copied from the old nibbida.com (English part); the Swedish half goes to the Swedish site.
- Wallpaper: the 16-band labyrinth tiles very faintly behind all inner pages.

## Ideas (not decided, not started)

- An outline for phones and tablets. The meaning is not yet clear: a button that stays visible while scrolling and jumps to a section of the page, or an outline of the whole site. Jayadhamma asked to leave it for now.

## Open

- DDA: which books to host, and the real list of books.
- Whether GitHub Pages works from a private repository, or the repositories must become public.
- Remaining questions in `SURVEY.md`, section 5 (for example the Swedish page split, the "Jag erkänner!" form, image licenses, and audio hosting).
