# NIBBIDĀ website: round two

Start with `comparison.html` to compare three directions. Open `refined-sheet.html` for the integrated recommended presentation, or `recommended.html` for the responsive local website preview. All files work together offline after extracting the ZIP.

Recommended: **A — The expanded labyrinth**, using a 2,350 CSS-pixel maze diameter. Its asymmetric introduction leaves the labyrinth open to the right, while the featured book and reading actions remain clear. B is more ceremonial and can feel like a halo; C gives priority to the library but reduces the maze to a margin.

## Included

- Three responsive studies: `direction-a.html`, `direction-b.html`, `direction-c.html`.
- Two background scales per direction. Add `?scale=large` to a study address to inspect its larger option. The comparison sheet includes both scales.
- Comparison and refined sheets in HTML, PDF, and 3,600-pixel-wide PNG. Smaller `-preview.png` files are for quick viewing.
- `assets/`: editable SVG color derivatives, accepted C5-B and E2 ornaments, local fonts and font license, and presentation styles.
- `reference/`: unchanged supplied 06A emblem and sixteen-band labyrinth.
- `previews/`: high-resolution desktop, mobile, full-page, reading, book-detail, and pattern images.
- `specifications.json`, `verification.json`, and browser/sheet checks.

The PDFs are oversized design boards intended for screen review or large-format printing. Website mockups within them are high-resolution screenshots; they are not all-vector website layouts. Use the HTML preview at 100% browser zoom to assess normal screen size. Use the SVG files for crisp artwork at any size.

## Artwork and layout

The original files are copied without changes. Every path and transform in the themed emblem and labyrinth matches its supplied source. Emblem derivatives recolor both the white artwork and the black background/details; all nine opaque inner detail paths remain present. Never remove all black elements as if they were merely a background. The typeset name beside the emblem is a website study, not a new master wordmark.

A: ground `#1b1917`, maze `#24211e`, primary text `#eee7da`, supporting text `#bbb4a8`, accent `#cab795`. The maze-to-ground contrast is approximately 1.09:1. Supporting text against the lighter maze color is approximately 7.78:1. These are computed color checks, not a claim of a full accessibility audit.

The maze is a single non-repeating SVG background. It remains 2,350 pixels across on mobile; only its position changes. Recommended desktop position: −125px, −775px. Mobile position: −650px, −900px. The center stays outside the phone viewport. Large-scale A uses 3,000px and adjusts placement to preserve the center position.

Reading and book-information panels have a plain ground. C5-B stays outside the verse, and E2 provides a closing transition. O3, E4, and the rejected non-star collection are not used.

## Content and scope

The book cover and supporting website copy are illustrative. The supplied verse is preserved with its four lines and without a footnote. No attribution has been invented. Links demonstrate local page navigation; this is not a published website, catalog, download service, or complete reading application.

## Verification

Rendered and inspected the comparison and refined PDF boards. Checked the three studies at 320, 390, 1,120, and 1,440 pixels: no page overflow, missing images, or browser errors. Verified source-reference checksums and derivative SVG geometry. The ZIP also includes a checksum manifest.
