import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("keeps the authentic Badesha home and contact information", async () => {
  const [page, shell, layout] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("components/SiteShell.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
  ]);
  assert.match(page, /Built right\./i);
  assert.match(page, /30\+/);
  assert.match(shell, /604-780-6000/);
  assert.match(shell, /info@badeshaelectrical\.com/);
  assert.match(layout, /application\/ld\+json/);
  assert.doesNotMatch(`${page}${shell}${layout}`, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("defines every primary route with route-specific metadata", async () => {
  const routes = ["services", "projects", "about", "safety", "contact", "book"];
  for (const route of routes) {
    const page = await readFile(new URL(`app/${route}/page.tsx`, root), "utf8");
    assert.match(page, /export const metadata/);
    assert.match(page, new RegExp(`canonical:\\s*["']/${route}["']`));
  }
});

test("ships crawl and social discovery assets", async () => {
  const [sitemap, robots, socialCard] = await Promise.all([
    readFile(new URL("app/sitemap.ts", root), "utf8"),
    readFile(new URL("app/robots.ts", root), "utf8"),
    readFile(new URL("public/og.png", root)),
  ]);
  assert.match(sitemap, /badeshaelectrical\.com/);
  assert.match(robots, /sitemap\.xml/);
  assert.ok(socialCard.byteLength > 100_000);
});
