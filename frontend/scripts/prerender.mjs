// Runs after `vite build`. For every public page in src/seo/pages.js it writes
// dist/<route>/index.html with the correct <title>, description, canonical,
// social tags and a real <h1> + intro text inside #root.
// React replaces that content as soon as the app loads, so visitors see no
// difference, but Google reads the right content without running JavaScript.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES, NAV_LINKS, SITE } from "../src/seo/pages.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const templatePath = join(dist, "index.html");

if (!existsSync(templatePath)) {
  console.error("prerender: dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const template = readFileSync(templatePath, "utf8");
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function setTag(html, regex, replacement, label) {
  if (!regex.test(html)) throw new Error(`prerender: could not find ${label} in dist/index.html`);
  return html.replace(regex, replacement);
}

function render(path, page) {
  const url = `${SITE}${path === "/" ? "/" : path}`;
  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`, "<title>");
  html = setTag(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(page.description)}" />`,
    "meta description"
  );
  html = setTag(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
    "canonical"
  );
  html = setTag(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    "og:title"
  );
  html = setTag(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    "og:description"
  );
  html = setTag(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
    "og:url"
  );

  const links = NAV_LINKS.map(([href, label]) => `<a href="${href}">${esc(label)}</a>`).join(" · ");
  const seed =
    `<div style="max-width:48rem;margin:0 auto;padding:6rem 1.5rem;text-align:center;font-family:Georgia,serif;color:#333">` +
    `<h1 style="font-weight:300;font-size:2.25rem;line-height:1.2">${esc(page.h1)}</h1>` +
    `<p style="margin-top:1rem;line-height:1.6">${esc(page.intro)}</p>` +
    `<nav style="margin-top:1.5rem;font-size:.9rem">${links}</nav>` +
    `</div>`;
  return setTag(html, /<div id="root">\s*<\/div>/, `<div id="root">${seed}</div>`, '<div id="root">');
}

// Neutral app shell for every route that is NOT pre-rendered (blog posts, admin,
// checkout...). netlify.toml serves this file as the SPA fallback, so those
// pages never inherit the home page's canonical/heading.
const shell = template
  .replace(/<link rel="canonical" href="[^"]*"\s*\/?>\s*/, "")
  .replace(/<meta property="og:url" content="[^"]*"\s*\/?>\s*/, "");
writeFileSync(join(dist, "app-shell.html"), shell);

let count = 0;
for (const [path, page] of Object.entries(PAGES)) {
  const out = path === "/" ? templatePath : join(dist, path, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(path, page));
  count++;
}
console.log(`prerender: wrote ${count} pages`);
