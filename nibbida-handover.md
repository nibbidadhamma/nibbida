# Nibbidā Dhamma — Handover for Claude Code

Written 21 October 2026 and updated 22 October 2026, from a planning conversation with Jayadhamma Bhikkhu. It separates what is decided, what is known, and what is still open. Please do not treat open items as decided.

## 1. The task of this first session

**Survey only. Do not build anything yet.**

Look at the old website and the Astra design files, then write a single file, `SURVEY.md`, in the repository. It should contain:

1. A list of every page on the old site (https://www.nibbida.com), with its type: text page, embedded Google resource, audio player, or other.
2. For each page, how its content could be stored as plain Markdown or a simple data file, and what could not be.
3. An inventory of the Astra design files: HTML, CSS, images, SVGs, fonts, scripts. List everything the design loads from outside the repository (fonts, CDN scripts, remote images).
4. A recommendation for the static site generator, with reasons. Eleventy and Astro (the framework) were mentioned as candidates, but the choice is open and should come from reading the files.
5. A list of questions for Jayadhamma that block the next step.

If you cannot reach nibbida.com from this environment, say so in `SURVEY.md`, survey the Astra files only, and stop. Commit `SURVEY.md` and stop. Ask before starting any build.

## 2. Who and what

- **Owner:** Jayadhamma Bhikkhu, a Buddhist monk working on texts, editing, and writing.
- **Project:** Nibbidā Dhamma (ND), an umbrella for Dhamma projects. It started as a website and is becoming a small publishing project.
- **Old site:** nibbida.com, built in Google Sites. Half of its content is Swedish.
- **Goal:** Rebuild nibbida.com as a static site on GitHub Pages. Move the Swedish material to dhammadana.se (also Google Sites at present), which becomes a Swedish counterpart.
- **Deadline:** The site should be finished well before the first book, *Insight Is the End: Short teachings by Ayya Khema* (ITE), is printed. Printing is hoped for in March 2027.
- **Retreat:** In July 2027 Jayadhamma goes on a long retreat, probably without electricity, internet, or AI subscriptions. After that, the site must keep working and allow small edits from a phone or tablet.
- **Credit:** About $70 in Claude Code credit, expiring within a few weeks of this handover. How cloud usage is metered against it is unknown. Check usage after the first session and scale the scope.

## 3. Decisions made

- Static site only. No server, no database, and no build step that Jayadhamma must run himself. The site publishes automatically when a file is changed on GitHub.
- Content lives in plain Markdown files and simple data files (for example, one entry per place for the map). The goal is that **existing content is easy to edit on a phone through GitHub's web or mobile editor**. Adding new kinds of pages may require a computer, which is acceptable.
- The design can be complex and attractive. Jayadhamma already has a home page design made with the ChatGPT "Astra" model, supplied as HTML plus PNG and SVG files. Only the home page is designed.
- Everything the design needs must be stored in the repository. Fonts and scripts must be copied locally, so nothing breaks years from now when nobody is there to fix it.
- Two repositories, one per domain, with the design finished before the retreat. They are independent, not linked by any automatic push. A push needs a credential that could expire while he is away.
- The planned order of work:
  1. Decisions and survey (this session).
  2. Skeleton site with the home page, plus a shared header, footer, and layout.
  3. A design system extended from the home page to inner pages.
  4. Two sample inner pages: a text page (Pali Resource Guide) and a data-driven page (a few meditation places).
  5. A test deployment on a temporary GitHub Pages address.
  6. Later: remaining pages, Swedish site, domain switch, an editing test from a phone in about May 2027, fixes in June.

## 4. Rules

- **Do not change the live nibbida.com.** The domain stays pointed at Google Sites until Jayadhamma decides otherwise.
- Do not overwrite or delete originals. Keep the Astra files untouched in a `design/` folder and work on copies. Commit after each task so every step can be reversed.
- Do not enter or ask for passwords, tokens, or other credentials. Jayadhamma handles all sign-ins himself.
- Do not put ITE material or Ayya Khema's texts into either repository. The repositories may become public, and history stays public even after files are deleted, so commit only what could be published. Those texts belong in separate private repositories.
- Do not process the 300+ PDFs and EPUBs of the Dhamma-Dana Archive. Only a catalogue is needed (see section 6).
- Preserve existing text exactly, including Swedish text and Pāli diacritics. Do not "improve" quotations or someone else's words. Fix only what is clearly broken, and list such changes.
- Do not guess. If something is unclear, ask, and do not fill gaps with plausible assumptions.
- Prefer American English spelling in new text, and write plainly. Avoid promotional language.

## 5. The old site: what is known

Only the Dhamma-Dana Archive page was read in detail. The rest is taken from the navigation menu and from Jayadhamma's description. Verify all of it.

**Menu structure:**

- Home
- Texter (Swedish): Superkort om buddhismen; Mindfulness i korthet (översättning); Mindfulness rötter; Om pali och dess kanon; Ratana Sutta: Munkliv under COVID-19
- Poesi (Swedish): De fem Buddha-drömmarna; Myrstacken; Spjutet; Sömnbubbla; Jag erkänner!
- Resources: Dhamma-Dana Archive; Meditation Map of the Dhamma; Pali Resource Guide; Three-step Reboot (a guided meditation); How to make a Myanmar Meditation Visa
- Audio, Blog, Donate, Links, About

**Projects, as Jayadhamma described them:**

- **MMD, Meditation Map of the Dhamma.** More than 60 meditation places, kept as a saved list in Google Maps with notes. He has no photos of his own.
- **DDA, Dhamma-Dana Archive.** More than 300 PDFs and EPUBs in a public Google Drive folder, linked from the page.
- **Myanmar meditation visa guide.** A text page with photos.
- **Pali Resource Guide.** A list of free Pali resources, organized around books.
- **Audio Dhamma.** Talks edited by Jayadhamma, stored on archive.org and streamed through a player plugin on the page.

## 6. Two special cases

### Dhamma-Dana Archive (DDA)

- The Google Drive folder ID is `1s-rswO7c5EMIc5LBfcrccVbLBXK7MBwB`. It has subfolders: Various Authors, Buddhist Canon & Tipitaka, Chanting Books, Dictionaries & Guides, Swedish, German, and a public Upload folder.
- Concerns: the redistribution terms of many books are unknown, so the archive is not safe to rehost. Anyone can add to the Upload folder, which should be closed. The archive depends on a personal Google account that nobody will use during the retreat.
- **Recommended direction, not yet decided:** replace it with a catalogue, meaning one data file with an entry per book (title, author, folder, format, original source link, license note), shown as a searchable page. Nothing is rehosted.
- The inventory (folder, filename, format, size) should be produced from a local sync of the folder through Google Drive for desktop, as the Drive connector in chat could not list it. Titles and authors can be taken from filenames where patterns exist, with gaps marked for manual completion. The source and license columns are for Jayadhamma to fill in, not for Claude Code to infer.

### Meditation Map (MMD)

- The data is a Google Maps saved list, not a My Maps map, and Google offers no direct export for it. Jayadhamma will request a Google Takeout export of his saved places (a CSV, probably without coordinates). It is unconfirmed what the CSV will contain.
- Plan: convert it into one data file, one entry per place (name, country, coordinates, description, website link). Look up coordinates from names and Maps links. **Write any place that cannot be resolved with confidence to a separate list for review. Do not guess coordinates.**
- Display: a map using Leaflet and OpenStreetMap, plus a plain list view. Leaflet must be copied into the repository. Map tiles will still come from another server, which is why the list view must work without them. OpenStreetMap's usage policy for its public tiles should be read, and a fallback chosen.

## 7. GitHub setup

- GitHub organization: `nibbidadhamma`, owned by the personal account `jayadhamma`. A second owner may be added for continuity during the retreat. The earlier personal account `nibbida-dhamma` could not be converted into an organization and has been deleted.
- Repositories in `nibbidadhamma`: `nibbida` (for nibbida.com) and `dhammadana` (for dhammadana.se). Both exist and are currently **private**. This handover and the Astra files are in `nibbida`. Work in `nibbida` only, and leave `dhammadana` untouched until asked.
- GitHub Pages probably requires a public repository on the free plan, which is unconfirmed. Do not change visibility or enable Pages without asking. When a repository becomes public, its whole commit history becomes public too.
- An older repository holding Ayya Khema material has been deleted. No such material should be added to either repository.
- `jayadhamma` also holds the Obsidian vault sync repository. It is separate from Nibbidā and should stay that way.
- Domains: nibbida.com and dhammadana.se. A programmer friend pays for them and for the Claude account. The registered owner of each domain is **not yet confirmed**. Renewals should be automatic or paid several years ahead, and registrar details kept where two people can reach them.

## 8. Open items

- Where the Astra files are, and whether they run as a mockup or a working page (inline styles, hard-coded text, external resources).
- Whether Pages works from a private repository on the current plan, or the repositories must become public.
- Whether this cloud environment can reach nibbida.com. If not, say so in `SURVEY.md` and stop.
- How phone editing on GitHub behaves for larger files. Test it early.
- Whether GitHub Pages' free tier and its size limits fit every part of the plan. Check current terms.
- Contents of the Google Takeout export for the map.
- Which Archive books can be linked, as opposed to hosted, and with what license notes.

## 9. Other projects

These are outside this phase. The structure should leave room for them without a rebuild.

- ITE and its spin-offs: Jhāna Library (private Markdown), *Ayya Khema on Jhāna*, a Thanissaro Bhikkhu jhāna collection.
- Pali projects: Pāli Text Library (PTL), Pāli Learning Texts (PLT), and the first book in that series, Pāli Learning Recitations (PLR).
- Literary books: *Insight to the Body: The Buddha's Anatomy* (ITB) and *Masks: Hide & Seek* (MHS).
