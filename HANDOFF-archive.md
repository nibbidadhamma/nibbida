# Handoff: Dhamma-Dāna Archive (for a new chat)

Internal note. Leave this file out of the fresh public repository (see LAUNCH-CHECKLIST.md). Written 2026-10-23.

Start the new chat with: "Read HANDOFF-archive.md and work on the branch `archive`."

## The project in two lines
nibbida.com is being rebuilt as a static Eleventy site (Markdown and data files, editable from a phone on GitHub). It is a small independent Dhamma publisher site by Jayadhamma Bhikkhu. The test site is https://nibbidadhamma.github.io/nibbida/ (branch `gh-pages`, published by hand; the old nibbida.com is not touched).

## Rules that always apply
- The repository is public and its history stays public. No credentials, no private information, no donation details, no names of the mother or the kappiya.
- The assistant never signs in anywhere. The user handles sign-ins and settings (GitHub, Pages, keys).
- Show choices as pictures before building, explain in plain language, ask before substantial changes, and do not build anything without a clear idea.
- Do not change the old live nibbida.com. Leave the `dhammadana` repository alone unless asked. Swedish and German material belongs on dhammadana.se, not here.
- Language: American English, em dash without spaces, en dash for ranges. "Pali" without the diacritic in the site's own titles and text; names of other people's works and quotations keep their spelling. Do not change the wording of quotations or of other people's text.
- Covers and third-party files: the user decided on 2026-10-23 that real cover thumbnails may be shown for all 13 recommended books (unchanged, small, with credit). He uploaded the thumbnails himself, because the assistant's attempt to add third-party files to the public repository was blocked. Ask him before adding other third-party files, and expect him to upload them.
- Only one chat publishes the test site (see "Publishing").

## What exists for the archive
- Pages: `/resources/archive/` (shelf with search and folder buttons, starts on "Recommended") and one page per book at `/resources/archive/<slug>/`.
- Files: `src/archive/books/*.md` (one per book; fields are described in EDITING.md, section "Archive entries"), `src/_data/archive.yaml` (folders and cover colors), templates `src/_includes/archive.njk`, `book.njk`, `cover.njk`, script `src/assets/archive.js`, styles `src/assets/archive.css`, cover thumbnails `src/assets/covers/*.webp`, hosted files go in `src/archive/files/`.
- A book uses its real cover only if the file in `src/assets/covers/` exists; otherwise a generated cover is shown.
- 13 books so far, all recommended: eight link to the publisher, five wait for a file ("file soon").
- Data: `import/dda-books.csv` and `import/dda-files.csv` list all 541 files (about 503 works) in the public Google Drive archive, made with `tools/list-drive-folder.py` (no sign-in needed). `import/dda-recommended.yaml` has the verified data for the 13 recommended titles (author, publisher, ISBN, license, source, permission notes).
- The Drive archive: https://drive.google.com/drive/folders/1s-rswO7c5EMIc5LBfcrccVbLBXK7MBwB (the archive page links to it).

## Decisions already made
- Link to the publisher's book page for books with a stable official page. Books without one get a file in `src/archive/files/`, uploaded by the user.
- Hosting depends on the book's own terms (see `hosting` in `import/dda-recommended.yaml`): Creative Commons Attribution-NonCommercial and similar allow it with credit; the BPS books (The Life of the Buddha, Dhamma Reflections), Dhamma Everywhere and Buddhadhamma need the publisher's agreement first. The user will email the Buddhadhamma Foundation (draft written). Ānandajoti Bhikkhu approved the Jātaka. Wings to Awakening: the Drive copy is old; use the current edition from dhammatalks.org.
- Aṅguttara Nikāya means Bhikkhu Sujato's translation (SuttaCentral). Sutta Nipāta means Laurence Khantipalo Mills' (SuttaCentral). The wish not to use Bhikkhu Sujato applies only to the start-page quotes.

## Open items for the archive chat
1. Which of the ~500 works from Drive get an entry on the site, and which only stay in Drive. Add entries in the same format as the 13.
2. The five "file soon" books: get the files from the user (he uploads them), set `hosted: true` and a `permission:` note.
3. Real covers for more books (same rule as above).
4. Wings: replace with the current edition. Breathing Like a Buddha: the user will check ISBN, pages and license on the Amaravati page.
5. The remaining ~135 Ayya Khema quotes for "A passage to sit with" (`src/_data/passages.yaml`, 4 so far; the user has permission for 139 short quotes; keep wording exactly and add the source reference).
6. The archive page text (`src/resources/archive.md`) still says "more than 300 books"; the Drive holds about 500 works.

## How to work
- Build: `PATH_PREFIX=/nibbida/ NOINDEX=1 npx eleventy --output=_site` (Eleventy 3.1.7, pinned). Test with Playwright/Chromium (only Chromium is available; Safari is untested). The site must work on phones, tablets and laptops, in both light and dark themes.
- Git: work on branch `archive` (created from `build-skeleton`). Merge into `build-skeleton` when a piece is ready, after pulling. The user also uploads files on GitHub straight to `build-skeleton`.
- A stop hook may warn about "unpushed commits" after a push; it is a stale tracking ref. Check with `git ls-remote origin <branch>` against `git rev-parse HEAD` and refresh with `git update-ref refs/remotes/origin/<branch> HEAD`.
- Never edit the user's own commits or re-author them.

## Publishing
The test site is built by hand: build with `PATH_PREFIX=/nibbida/ NOINDEX=1`, copy the output into a worktree of `gh-pages`, commit and push. Whoever publishes replaces the whole site from their checkout, so only publish from a checkout that contains all work (merge first). Automatic publishing (GitHub Actions) is planned and would remove this risk.

## Other work going on in the main chat (do not touch)
The Meditation Map (`src/resources/map.njk`, `src/map/places/`, `src/assets/map.js`, `map.css`, `src/_data/map.yaml`), the wallpaper, the start page text, and the launch checklist.
