# Site audit

Checked on the built site: all 10 pages, at phone (360 px), tablet (820 px) and laptop (1366 px) widths, in the dark and light themes, plus a read of the text and styles.

## What passed

- No horizontal scrolling at any width. No broken images, no 404 requests, no script errors.
- Every image has alt text. Every page has a title and a description. No duplicate ids.
- Text contrast meets WCAG AA in both themes (body text 14:1 dark and 12.8:1 light; secondary text 8.5:1 and 6.8:1; accent 9:1 and 6.4:1).
- The menu, the theme button, the archive search, the links search and the passage carousel work, and the page still reads without JavaScript.

## A. Small fixes I can make without asking

1. **Two main headings on the start page.** The Leonard Cohen quote and "Books for slow reading." are both `h1`. The second should be `h2`.
2. **Resources overview skips a heading level** (title, then straight to the small headings). Use the next level down.
3. **License page is out of date.** It still mentions "the placeholder verse on the home page". It should name the quotations in the passage carousel instead.
4. **Double space** in the Pali guide: "The guide begins  with tools".
5. **Straight and curly apostrophes are mixed** in the text (37 straight, 18 curly). Make the text written for this site curly. Quotations stay as they are.
6. **Smooth scrolling ignores the "reduce motion" setting.** Add the setting.
7. **Fonts load without `font-display: swap`**, so text can be invisible for a moment on a slow phone.
8. **Small tap targets on phones.** Footer links are 25 px tall, and the arrow links ("Open the archive ↗") 22 px. Give them more padding.
9. **Card title:** the start page says "Jaya's Audio Dhamma", the page and menu say "Audio Dhamma". Use "Audio Dhamma" everywhere.
10. **Donate page repeats itself.** The text and "Ways to give" both say to write by email. While there are no payment details, show only one.

## B. Needs your decision

1. **Pali or Pāli.** The text uses "Pali" 93 times and "Pāli" 44 times. You chose "Pali" for the guide title, but the Links headings (including your example "Pāli Nikāyas") use the diacritic. One spelling everywhere is more consistent.
2. **Name on the About page.** The signature reads "Hampus Haraldssson" with three s's. Is it Haraldsson? And should a real name be on a public page?
3. **Menu item "Books".** It leads to the "In preparation" slot on the start page. Should it go to the Dhamma-Dāna Archive until real books exist?
4. **Contact.** The footer has no contact link. Add "Contact" (email) next to Audio, Links, Donate and License?
5. **Two page styles.** About, Resources, Archive, Pali and License use a boxed page. Audio, Links and Donate use a large header with the labyrinth. It is deliberate and looks fine, but you could unify them later.

## C. Bigger improvements

1. **Automatic publishing.** The site is published by hand each time. If you edit from your phone, nothing goes live until I do it. A GitHub Actions workflow would publish after every change. You would set Pages to use it (one setting), then I add the workflow.
2. **Speed on phones.** The site is 4.5 MB. The two fonts are 1.1 MB as TTF, and the pictures are up to 330 KB each. Converting the fonts to WOFF2 and the pictures to WebP would cut the weight by more than half.
3. **Before the real launch:** add a canonical address, preview text for sharing links (title, description, picture), and a simple print style. Remove "noindex" when you want search engines to find the site.
4. **Delete the 8 sample books** and add the real list.
5. **Link check on a schedule.** I can add an automatic check of all outside links every month, so dead links are reported.
