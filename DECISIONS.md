# Decisions so far

Recorded from conversations with Jayadhamma Bhikkhu, 22 October 2026. Only what was stated is listed. Open items are marked as open.

## Decided

**Design and devices**
- The site must work well on phones, tablets and laptops.
- Home page: Astra direction A, with the smallest text enlarged ("larger" version).
- Menu: Books, Resources and About are the main links. Resources opens a list of its pages. Audio, Links and Donate are in the footer. Pages not built yet appear greyed out as "coming soon".
- Inner pages: a narrow reading column, a small label above the title ("Resources"), and an "On this page" box on long pages. Links appear as buttons, not as raw addresses.
- A light option will be added (not designed yet).
- Ornaments and logos: Jayadhamma has many sizes and will supply them.

**Structure**
- Keep the old addresses (for example `/resources/pali`), so existing links keep working.
- People suggest additions (map places, archive books) by email link. No Google forms or folders.
- One shared book-list format, to serve the Dhamma-Dana Archive now and other book lists later.
- Tool: Eleventy.
- Footer and menu show Audio, Links and Donate as "coming soon" until those pages exist.

**Dhamma-Dana Archive (DDA)**
- Rebuilt on this site, no Google Drive.
- A bookshelf with generated covers in the site's own style. Each book has a title, author and download button.
- Most buttons link to the original publisher. A book is hosted on this site only after its terms are confirmed.
- Root texts may be stored in a DDA folder in the repository, but only texts whose source and license are known. A public repository's history stays public after a file is deleted.
- Each book's catalogue entry records its source, its terms, and who agreed and when. Jayadhamma fills these in. Permission is asked from the publisher; the publishers' friendliness is not permission.

**Meditation Map (MMD)**
- Rebuilt on this site with no Google Maps. The list view must work without map tiles.
- A one-time Google Takeout export of the saved places is still needed.

## Open

- DDA: the book data format, the cover approach, and which books to host.
- Whether GitHub Pages works from a private repository, or the repositories must become public.
- Remaining questions in `SURVEY.md`, section 5 (for example the Swedish page split, the "Jag erkänner!" form, image licenses, and audio hosting).
