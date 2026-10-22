const yaml = require("js-yaml");

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

  eleventyConfig.amendLibrary("md", (md) => {
    md.core.ruler.push("nibbida_rules", (state) => {
      const t = state.tokens;
      for (let i = 0; i < t.length; i++) {
        // Give each "##" heading an id so the "On this page" list can link to it.
        if (t[i].type === "heading_open" && t[i].tag === "h2") {
          t[i].attrSet("id", slug(t[i + 1].content));
        }
        // A paragraph that follows a "###" heading and starts with a link is a row of buttons.
        if (
          t[i].type === "paragraph_open" &&
          i >= 3 &&
          t[i - 1].type === "heading_close" &&
          t[i - 3].type === "heading_open" &&
          t[i - 3].tag === "h3" &&
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
