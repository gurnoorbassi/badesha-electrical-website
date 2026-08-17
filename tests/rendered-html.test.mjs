import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
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
  assert.match(page, /View all projects/);
  assert.match(page, />Residential</);
  assert.match(page, />Commercial</);
  assert.match(page, />Hospitality</);
  assert.match(shell, /604-780-6000/);
  assert.match(shell, /info@badeshaelectrical\.com/);
  assert.match(shell, /Web designed by/);
  assert.match(shell, /instagram\.com\/agdigitalz/);
  assert.match(layout, /application\/ld\+json/);
  assert.doesNotMatch(`${page}${shell}${layout}`, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("defines every primary route with route-specific metadata", async () => {
  const routes = ["services", "projects", "about", "safety", "contact", "book"];
  for (const route of routes) {
    const page = await readFile(new URL(`app/${route}/page.tsx`, root), "utf8");
    assert.match(page, /export const metadata/);
    assert.match(page, new RegExp(`(?:canonical|path):\\s*["']/${route}["']`));
  }
});

test("ships crawl and social discovery assets", async () => {
  const [sitemap, robots, content, socialCard] = await Promise.all([
    readFile(new URL("app/sitemap.ts", root), "utf8"),
    readFile(new URL("app/robots.ts", root), "utf8"),
    readFile(new URL("app/content.ts", root), "utf8"),
    readFile(new URL("public/og.png", root)),
  ]);
  assert.match(content, /https:\/\/badeshaelectrical\.com/);
  assert.match(sitemap, /servicePages/);
  assert.match(sitemap, /projects/);
  assert.match(robots, /sitemap\.xml/);
  assert.ok(socialCard.byteLength > 100_000);
});

test("uses the new Badesha logo across site and search surfaces", async () => {
  const [shell, layout, logo, logoMark] = await Promise.all([
    readFile(new URL("components/SiteShell.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("public/images/logo.png", root)),
    readFile(new URL("public/images/logo-mark.png", root)),
  ]);
  assert.match(shell, /\/images\/logo\.png/g);
  assert.match(layout, /\/images\/logo-mark\.png/);
  assert.match(layout, /logo:\s*`\$\{siteUrl\}\/images\/logo\.png`/);
  assert.doesNotMatch(layout, /icon:\s*["']\/favicon\.svg/);
  assert.ok(logo.byteLength > 1_000_000);
  assert.ok(logoMark.byteLength > 100_000);
});

test("prerenders the full SEO route set with unique discovery metadata", async () => {
  const appOutput = new URL(".next/server/app/", root);
  const files = await readdir(appOutput, { recursive: true });
  const htmlFiles = files.filter((file) => file.endsWith(".html") && !file.startsWith("_")).sort();
  assert.equal(htmlFiles.length, 28);

  const titles = new Set();
  const descriptions = new Set();
  const canonicals = new Set();
  for (const file of htmlFiles) {
    const html = await readFile(new URL(file.replaceAll("\\", "/"), appOutput), "utf8");
    const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
    const decodedTitle = title?.replaceAll("&amp;", "&");
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
    const decodedDescription = description?.replaceAll("&#x27;", "'").replaceAll("&amp;", "&");
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    assert.ok(decodedTitle && decodedTitle.length <= 60, `${file} needs a concise title`);
    assert.ok(decodedDescription && decodedDescription.length >= 90 && decodedDescription.length <= 170, `${file} needs a useful meta description`);
    assert.ok(canonical?.startsWith("https://badeshaelectrical.com"), `${file} needs the production canonical`);
    assert.equal((html.match(/<h1/g) || []).length, 1, `${file} needs one H1`);
    assert.match(html, /property="og:title"/);
    assert.match(html, /name="twitter:title"/);
    assert.equal(html.match(/<meta property="og:description" content="([^"]+)"/i)?.[1], description);
    assert.equal(html.match(/<meta name="twitter:description" content="([^"]+)"/i)?.[1], description);
    assert.match(html, /application\/ld\+json/);
    assert.ok(!titles.has(decodedTitle), `duplicate title: ${decodedTitle}`);
    assert.ok(!descriptions.has(decodedDescription), `duplicate description: ${decodedDescription}`);
    assert.ok(!canonicals.has(canonical), `duplicate canonical: ${canonical}`);
    titles.add(decodedTitle);
    descriptions.add(decodedDescription);
    canonicals.add(canonical);
  }
});

test("uses record-specific social images on representative detail routes", async () => {
  const [service, project, location] = await Promise.all([
    readFile(new URL(".next/server/app/services/residential-electrician-surrey.html", root), "utf8"),
    readFile(new URL(".next/server/app/projects/centro.html", root), "utf8"),
    readFile(new URL(".next/server/app/service-areas/surrey.html", root), "utf8"),
  ]);
  assert.match(service, /property="og:image" content="https:\/\/badeshaelectrical\.com\/images\/residential-fairfield-infill\.jpg"/);
  assert.match(project, /property="og:image" content="https:\/\/badeshaelectrical\.com\/images\/centro\.jpg"/);
  assert.doesNotMatch(service, /property="og:image" content="[^"]*\/og\.png"/);
  assert.doesNotMatch(project, /property="og:image" content="[^"]*\/og\.png"/);
  assert.doesNotMatch(location, /property="og:image"/);
});

test("uses client-approved Badesha Properties imagery for residential sections", async () => {
  const [home, about, content] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/about/page.tsx", root), "utf8"),
    readFile(new URL("app/content.ts", root), "utf8"),
  ]);
  assert.match(home, /residential-modern-farmhouse\.jpg/);
  assert.match(home, /residential-fairfield\.jpg/);
  assert.match(home, /residential-macdonald-park\.jpg/);
  assert.match(home, /Made for the way people live/);
  assert.match(about, /residential-fairfield\.jpg/);
  assert.match(content, /residential-fairfield-infill\.jpg/);
});

test("organizes services and projects into client-requested navigation tabs", async () => {
  const [shell, services, projects, residential] = await Promise.all([
    readFile(new URL("components/SiteShell.tsx", root), "utf8"),
    readFile(new URL("app/services/page.tsx", root), "utf8"),
    readFile(new URL("app/projects/page.tsx", root), "utf8"),
    readFile(new URL("app/services/[slug]/page.tsx", root), "utf8"),
  ]);
  assert.match(shell, /Upcoming projects/);
  assert.match(shell, /Residential & multi-family/);
  assert.match(services, /id="residential"/);
  assert.match(services, /id="commercial"/);
  assert.match(services, /id="emergency"/);
  assert.match(projects, /id="upcoming"/);
  assert.match(projects, /id="completed"/);
  assert.match(residential, /residentialGallery/);
  assert.doesNotMatch(residential, /duplex/i);
});

test("project detail pages include researched profiles and useful facts", async () => {
  const [content, page] = await Promise.all([
    readFile(new URL("app/content.ts", root), "utf8"),
    readFile(new URL("app/projects/[slug]/page.tsx", root), "utf8"),
  ]);
  for (const project of ["chronicle", "centro", "nova", "rockridge-living", "park-maven", "flora-fauna", "element-1", "partap-complex", "unison", "verge"]) {
    assert.match(content, new RegExp(`slug: "${project}"`));
  }
  assert.match(content, /372 total/);
  assert.match(content, /650 planned/);
  assert.match(content, /Public rental listings advertise homes as available/);
  assert.match(page, /Project profile/);
  assert.match(page, /Latest public update/);
  assert.match(page, /project\.facts\.map/);
  assert.match(page, /project\.highlights\.map/);
});

test("preserves legacy search equity and hardened delivery headers", async () => {
  const config = await readFile(new URL("netlify.toml", root), "utf8");
  for (const legacyPath of ["/contact-us", "/book-a-service", "/about-us", "/reviews", "/flora-fauna-20267-72-avenue-langley", "/verge-langley-city"]) {
    assert.match(config, new RegExp(`from = "${legacyPath.replaceAll("/", "\\/")}"`));
  }
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /Strict-Transport-Security/);
  assert.match(config, /X-Frame-Options = "DENY"/);
});

test("Next.js responses include the production security policy", async () => {
  const config = await readFile(new URL("next.config.ts", root), "utf8");

  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /X-Frame-Options", value: "DENY"/);
  assert.match(config, /Strict-Transport-Security/);
});
