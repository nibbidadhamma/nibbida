# Editing the site

The website is built from plain text files in the `src` folder. Everything can be edited in GitHub's web or mobile editor (open the file, tap the pencil, change the text, commit).

## Where things are

| To change | Edit this file |
|---|---|
| The Pali Resource Guide | `src/resources/pali.md` |
| The home page text | `src/index.njk` (the text between the tags) |
| The menu and footer links | `src/_data/site.yaml` |
| Colors and layout | `src/assets/*.css` (needs care) |

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

## The menu

In `src/_data/site.yaml`, each page has `ready: false` until it exists. Greyed items show "coming soon". Change it to `ready: true` when the page is built.

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
