const fs = require("fs");
const yaml = require("js-yaml");
const MarkdownIt = require("markdown-it");

// Turns "Some Title: A.K. Warder" into "some-title-a-k-warder" for page anchors.
const slug = (text) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

module.exports = function (eleventyConfig) {
  // Data files in YAML (menu, footer) are easier to edit than JSON.
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy("src/assets");
  // Browsers ask for /favicon.ico by default.
  eleventyConfig.addPassthroughCopy({ "src/assets/icons/favicon.ico": "favicon.ico" });
  // Books hosted on this site are kept in src/archive/files and published at /archive/files/.
  eleventyConfig.addPassthroughCopy("src/archive/files");

  // Inline Markdown (for example *italic*) inside data files.
  const inlineMd = new MarkdownIt({ html: false });
  eleventyConfig.addFilter("mdInline", (s) => inlineMd.renderInline(String(s)));

  // "https://www.dhammawiki.com/path" -> "dhammawiki.com"
  eleventyConfig.addFilter("host", (u) => String(u).replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]);


  // An ornament from src/assets/ornaments as inline SVG, drawn in the current text color.
  // Inline SVG works in every browser, unlike CSS masks. Usage: {{ "C4-B" | ornament("orn-c4b") | safe }}
  eleventyConfig.addFilter("ornament", (name, cls) => {
    const svg = fs.readFileSync(`src/assets/ornaments/${name}.svg`, "utf8");
    const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1];
    const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>[\s\S]*$/, "").replace(/<title>[\s\S]*?<\/title>/, "");
    return `<svg class="orn ${cls || ""}" viewBox="${viewBox}" fill="currentColor" aria-hidden="true" focusable="false">${inner}</svg>`;
  });

  // --- Dhamma-Dāna Archive -------------------------------------------------
  const folders = yaml.load(fs.readFileSync("src/_data/archive.yaml", "utf8")).folders;

  // Folder name and cover color from a card's "folder" word.
  eleventyConfig.addFilter("folderInfo", (key, list) =>
    (list || folders).find((f) => f.slug === key) || { title: key, tone: "#b7a685" }
  );

  // Cover title size in em, smaller for longer titles.
  eleventyConfig.addFilter("coverSize", (t) => {
    const n = String(t).length;
    return n <= 22 ? 2.4 : n <= 40 ? 2.1 : n <= 64 ? 1.8 : 1.5;
  });

  // Lower case without accents, for the search box ("dhammadana" finds "Dhammadāna").
  eleventyConfig.addFilter("plain", (s) =>
    String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  );

  // All book cards, sorted by title. Prints a warning for cards with missing or unknown fields.
  eleventyConfig.addCollection("books", (api) => {
    const books = api.getFilteredByTag("book");
    const known = folders.map((f) => f.slug);
    let samples = 0;
    books.forEach((b) => {
      const d = b.data;
      const missing = ["title", "author", "folder", "formats"].filter((k) => !d[k] || (k === "formats" && !d.formats.length && !d.pending));
      if (missing.length) console.warn(`[archive] WARNING ${b.inputPath}: missing ${missing.join(", ")}`);
      if (d.folder && !known.includes(d.folder)) console.warn(`[archive] WARNING ${b.inputPath}: unknown folder "${d.folder}" (use one of: ${known.join(", ")})`);
      (d.formats || []).forEach((f) => {
        if (!f.name || !f.url) console.warn(`[archive] WARNING ${b.inputPath}: a format needs both name and url`);
      });
      if (d.hosted && !d.permission) console.warn(`[archive] WARNING ${b.inputPath}: hosted book without a permission note`);
      if (d.sample) samples++;
    });
    if (samples) console.warn(`[archive] NOTE: ${samples} sample entries are still present. Delete the files marked "sample: true" before publishing.`);
    return books.sort((a, b) => String(a.data.title).localeCompare(String(b.data.title), "en", { sensitivity: "base" }));
  });

  // A cover picture is used only if its file exists; otherwise the generated cover is shown.
  eleventyConfig.addFilter("coverFile", (p) => (p && fs.existsSync("src" + p) ? p : ""));

  // Only the folders that hold at least one book (the archive shows no empty folder buttons).
  eleventyConfig.addFilter("usedFolders", (list, books) => list.filter((f) => books.some((b) => b.data.folder === f.slug)));

  // The continents that have at least one place, in the order of first appearance.
  eleventyConfig.addFilter("continents", (items) => [...new Set(items.map((i) => i.continent))]);

  eleventyConfig.amendLibrary("md", (md) => {
    md.core.ruler.push("nibbida_rules", (state) => {
      const t = state.tokens;
      for (let i = 0; i < t.length; i++) {
        // Give each "##" heading an id so the "On this page" list can link to it.
        if (t[i].type === "heading_open" && t[i].tag === "h2") {
          t[i].attrSet("id", slug(t[i + 1].content));
        }
        // A paragraph that follows a "###" (or, on the Resources page, "##") heading and starts with a link is a row of buttons.
        if (
          t[i].type === "paragraph_open" &&
          i >= 3 &&
          t[i - 1].type === "heading_close" &&
          t[i - 3].type === "heading_open" &&
          (t[i - 3].tag === "h3" || t[i - 3].tag === "h2") &&
          t[i + 1].children &&
          t[i + 1].children[0] &&
          t[i + 1].children[0].type === "link_open"
        ) {
          t[i].attrJoin("class", "buttons");
          t[i + 1].children.forEach((c) => {
            if (c.type === "link_open") c.attrJoin("class", "btn");
          });
        }
      }
    });
  });

  // Inserts an "On this page" list before the first "##" heading of a page.
  eleventyConfig.addFilter("withToc", (html, label) => {
    const items = [...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)];
    if (items.length < 2) return html;
    const list = items.map((m) => `<li><a href="#${m[1]}">${m[2]}</a></li>`).join("");
    const box = `<nav class="toc" aria-label="${label}"><h2 class="toc-title">${label}</h2><ul>${list}</ul></nav>`;
    return html.replace(/<h2 id=/, box + "<h2 id=");
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    // For a test address such as /nibbida/, build with PATH_PREFIX=/nibbida/
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
