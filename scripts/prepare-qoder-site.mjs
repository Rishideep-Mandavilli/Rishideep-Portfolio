// Qoder Sites disables directory indexes, so /about does not resolve — only the
// emitted .html file does. Rewrites the exported links, leaving the source (and
// the Vercel deploy) on clean URLs.
import { readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const PAGES = ["about", "resume"];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return walk(path);
    if (entry === ".DS_Store") {
      rmSync(path);
      return [];
    }
    return path.endsWith(".html") ? [path] : [];
  });
}

let changed = 0;
for (const file of walk(OUT)) {
  const html = readFileSync(file, "utf8");
  const next = PAGES.reduce(
    (text, page) => text.replaceAll(`href="/${page}"`, `href="/${page}.html"`),
    html,
  );
  if (next !== html) {
    writeFileSync(file, next);
    changed += 1;
  }
}

console.log(`qoder-site: rewrote links in ${changed} file(s)`);
