# Decisions so far

Recorded from conversations with Jayadhamma Bhikkhu, 22 October 2026. Only what was stated is listed. Open items are marked as open.

## Decided

**Design and devices**
- The site must work well on phones, tablets and laptops.
- Home page: Astra direction A, with the smallest text enlarged ("larger" version).
- Menu: Books, Resources and About are the main links. Resources opens a list of its pages. Audio, Links and Donate are in the footer. Pages not built yet appear greyed out as "coming soon".
- Inner pages: a narrow reading column, a small label above the title ("Resources"), and an "On this page" box on long pages. Links appear as buttons, not as raw addresses.
- A light option will be added. Visitors get it both ways: the site follows the device's light or dark setting by default, and a small Light / Dark button lets them choose and remembers the choice.
- Light colors: to follow the light color scheme already made for dhammadana.se, or one of its alternative schemes, instead of the colors in `previews/light-option/`. Not yet seen.
- Light artwork: Jayadhamma has inverted versions of all logos and ornaments and will supply them, to replace the recolors.
- Ornaments and logos: Jayadhamma has many sizes and will supply them.

**Structure**
- A Resources overview page exists at `/resources/` (text from the old overview; the Pali guide is added; the YouTube channel is dropped on purpose). The Resources menu has an "All resources" entry.
- The Three-step Reboot page is dropped from the new site: removed from the menu and the Resources overview, and it will not move to dhammadana.se. The old page on Google Sites is not touched by this project.
- The Archive text on the Resources overview says "more than 300 books" (the old overview said 250; the old Archive page said 300+).
- Keep the old addresses (for example `/resources/pali`), so existing links keep working.
- People suggest additions (map places, archive books) by email link. No Google forms or folders.
- One shared book-list format, to serve the Dhamma-Dana Archive now and other book lists later.
- Tool: Eleventy.
- Footer and menu show Audio, Links and Donate as "coming soon" until those pages exist.

**Dhamma-Dana Archive (DDA)**
- Rebuilt on this site, no Google Drive.
- Links between nibbida.com and dhammadana.se (for example to hosted books) are acceptable.
- Hosting only the books that are allowed. Jayadhamma is considering keeping the hosted books in the `dhammadana` repository, because of the planned Swedish translation of the resources.
- A bookshelf with generated covers in the site's own style. Each book has a title, author and download button.
- Shelf look: covers colored by folder (option B in `previews/bookshelf/`), with a search box and folder buttons. Cover imprint: DHAMMA-DĀNA.
- Built (with fake sample entries to delete before publishing): the shelf at `/resources/archive/`, generated covers, a page per book, search and folder buttons, and one card file per book. See `EDITING.md`.
- On the archive page: the quotation and the acknowledgements are kept; the format and e-book notes are kept (under "New to e-books?"); the Drive-specific text and the folder walkthrough are left out for now.
- Book data: one small text file per book. The real list of books is to be solved later (the handover suggests listing a synced Drive folder on Jayadhamma's computer).
- Most buttons link to the original publisher. A book is hosted on this site only after its terms are confirmed.
- Root texts may be stored in a DDA folder in the repository, but only texts whose source and license are known. A public repository's history stays public after a file is deleted.
- Each book's catalogue entry records its source, its terms, and who agreed and when. Jayadhamma fills these in. Permission is asked from the publisher; the publishers' friendliness is not permission.

**Meditation Map (MMD)**
- Rebuilt on this site with no Google Maps. The list view must work without map tiles.
- A one-time Google Takeout export of the saved places is still needed.

## Open

- DDA: which books to host, and the real list of books.
- Whether GitHub Pages works from a private repository, or the repositories must become public.
- Remaining questions in `SURVEY.md`, section 5 (for example the Swedish page split, the "Jag erkänner!" form, image licenses, and audio hosting).
