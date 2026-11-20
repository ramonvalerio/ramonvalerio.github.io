// Injects the server-rendered page into dist/index.html after `vite build`.
// The app still mounts with createRoot in the browser and replaces this markup;
// it only exists so crawlers without JavaScript see the real content.
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const appHtml = render();

const placeholder = '<div id="root"></div>';
const html = await readFile(indexPath, "utf8");
if (!html.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`);
}
await writeFile(indexPath, html.replace(placeholder, `<div id="root">${appHtml}</div>`));
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: injected ${appHtml.length} chars of HTML into dist/index.html`);
