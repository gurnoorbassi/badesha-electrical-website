import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("keeps the authentic Badesha home and contact information", async () => {
  const [page, shell, layout, content] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("components/SiteShell.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/content.ts", root), "utf8"),
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
  assert.match(content, /12777 76A Ave Unit 1A/);
  assert.match(layout, /streetAddress: "12777 76A Ave Unit 1A"/);
  assert.match(layout, /postalCode: "V3W 1S9"/);
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
  assert.ok(socialCard.byteLength > 100_000 && socialCard.byteLength < 500_000);
});

test("uses the new Badesha logo across site and search surfaces", async () => {
  const [shell, layout, logo, logoMark, footerLogo] = await Promise.all([
    readFile(new URL("components/SiteShell.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("public/images/logo.png", root)),
    readFile(new URL("public/images/logo-mark.png", root)),
    readFile(new URL("public/images/logo-footer-blue.png", root)),
  ]);
  assert.match(shell, /\/images\/logo\.png/g);
  assert.match(shell, /\/images\/logo-footer-blue\.png/);
  assert.match(layout, /\/images\/logo-mark\.png/);
  assert.match(layout, /logo:\s*`\$\{siteUrl\}\/images\/logo\.png`/);
  assert.doesNotMatch(layout, /icon:\s*["']\/favicon\.svg/);
  assert.ok(logo.byteLength > 50_000 && logo.byteLength < 250_000);
  assert.ok(logoMark.byteLength > 10_000 && logoMark.byteLength < 100_000);
  assert.ok(footerLogo.byteLength > 5_000 && footerLogo.byteLength < 250_000);
});

test("uses one deep-blue surface and keeps the inquiry introduction in normal flow", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /--ink:\s*#1b252e/);
  assert.match(css, /\.site-footer\s*\{[^}]*background:\s*var\(--ink\)/s);
  assert.match(css, /\.inquiry-section\s*\{[^}]*background:\s*var\(--ink\)/s);
  assert.match(css, /\.inquiry-intro\s*\{[^}]*position:\s*static/s);
  assert.doesNotMatch(css, /\.inquiry-intro\s*\{[^}]*position:\s*sticky/s);
});

test("prerenders the full SEO route set with unique discovery metadata", async () => {
  const appOutput = new URL(".next/server/app/", root);
  const files = await readdir(appOutput, { recursive: true });
  const htmlFiles = files.filter((file) => file.endsWith(".html") && !file.startsWith("_")).sort();
  assert.equal(htmlFiles.length, 33);

  const titles = new Set();
  const descriptions = new Set();
  const canonicals = new Set();
  for (const file of htmlFiles) {
    const html = await readFile(new URL(file.replaceAll("\\", "/"), appOutput), "utf8");
    if (file.replaceAll("\\", "/") === "thank-you.html") {
      assert.match(html, /name="robots" content="noindex, nofollow"/);
      continue;
    }
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

test("publishes verified customer reviews and links to the Google review profile", async () => {
  const [home, about, content] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/about/page.tsx", root), "utf8"),
    readFile(new URL("app/content.ts", root), "utf8"),
  ]);
  assert.match(home, /5\.0 \/ 5 from 6 reviews/);
  assert.doesNotMatch(about, /Based on 6 Google reviews/);
  assert.match(about, /Gurbaj Gill · Google review/);
  assert.match(about, /J S Badesha · Google review/);
  assert.match(about, /Balkar Singh · Google review/);
  assert.match(content, /google\.com\/search\?q=Badesha\+Electrical\+Ltd\+Surrey\+reviews/);
  assert.match(content, /google\.com\/maps\/search/);
});

test("shows the Surrey office map and consistent weekday hours", async () => {
  const [contact, shell, layout, nextConfig, netlify] = await Promise.all([
    readFile(new URL("app/contact/page.tsx", root), "utf8"),
    readFile(new URL("components/SiteShell.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("next.config.ts", root), "utf8"),
    readFile(new URL("netlify.toml", root), "utf8"),
  ]);
  assert.match(contact, /google\.com\/maps\?q=12777/);
  assert.match(contact, /7:00 a\.m\. to 5:00 p\.m\./);
  assert.match(shell, /7:00 a\.m\. to 5:00 p\.m\./);
  assert.match(layout, /opens: "07:00"/);
  assert.match(nextConfig, /frame-src https:\/\/www\.google\.com/);
  assert.match(netlify, /frame-src https:\/\/www\.google\.com/);
});

test("ships a transfer-ready project inquiry form", async () => {
  const [contact, formComponent, shell, layout, handoff, nextConfig, netlify] = await Promise.all([
    readFile(new URL("app/contact/page.tsx", root), "utf8"),
    readFile(new URL("components/ContactForm.tsx", root), "utf8"),
    readFile(new URL("components/SiteShell.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("README.md", root), "utf8"),
    readFile(new URL("next.config.ts", root), "utf8"),
    readFile(new URL("netlify.toml", root), "utf8"),
  ]);
  assert.match(contact, /<ContactForm \/>/);
  assert.match(`${contact}${shell}${layout}`, /projects@badeshaelectrical\.com/);
  assert.match(formComponent, /name="project-inquiry"/);
  assert.match(formComponent, /https:\/\/formsubmit\.co\/ajax\/projects@badeshaelectrical\.com/);
  assert.match(formComponent, /https:\/\/formsubmit\.co\/projects@badeshaelectrical\.com/);
  assert.doesNotMatch(formComponent, /data-netlify/);
  assert.match(formComponent, /name="_honey"/);
  assert.match(nextConfig, /connect-src 'self' https:\/\/formsubmit\.co/);
  assert.match(netlify, /form-action 'self' https:\/\/formsubmit\.co mailto:/);
  assert.match(handoff, /Client transfer checklist/);
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
  const [shell, mobileMenu, css, services, projects, residential] = await Promise.all([
    readFile(new URL("components/SiteShell.tsx", root), "utf8"),
    readFile(new URL("components/MobileMenu.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("app/services/page.tsx", root), "utf8"),
    readFile(new URL("app/projects/page.tsx", root), "utf8"),
    readFile(new URL("app/services/[slug]/page.tsx", root), "utf8"),
  ]);
  assert.match(shell, /Upcoming projects/);
  assert.match(shell, /Residential & multi-family/);
  assert.match(shell, /Hospitality/);
  assert.match(shell, /<MobileMenu items=\{nav\} \/>/);
  assert.match(mobileMenu, /View all \{item\.label\.toLowerCase\(\)\}/);
  assert.match(mobileMenu, /onClick=\{closeMenu\}/);
  assert.match(css, /\.mobile-menu nav\s*\{[^}]*position:\s*fixed[^}]*overflow-y:\s*auto/s);
  assert.match(css, /body:has\(\.mobile-menu\[open\]\)\s*\{\s*overflow:\s*hidden/);
  assert.match(services, /id="residential"/);
  assert.match(services, /id="commercial"/);
  assert.match(services, /id="emergency"/);
  assert.match(projects, /id="upcoming"/);
  assert.match(projects, /id="completed"/);
  assert.match(projects, /\/projects\/residential-multi-family/);
  assert.match(projects, /\/projects\/commercial-industrial/);
  assert.match(projects, /\/projects\/hospitality/);
  assert.match(residential, /residentialGallery/);
  assert.doesNotMatch(residential, /duplex/i);
});

test("ships a site-wide motion system with accessible reduced-motion behavior", async () => {
  const [layout, motion, css] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("components/MotionEnhancements.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);
  assert.match(layout, /<MotionEnhancements \/>/);
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /motion-scroll-progress/);
  assert.match(css, /\.motion-reveal\.motion-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@view-transition/);
});

test("uses an optimized homepage hero video with a still-image fallback", async () => {
  const [home, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);
  assert.match(home, /<video[^>]+autoPlay[^>]+muted[^>]+loop[^>]+playsInline/);
  assert.match(home, /poster="\/images\/residential-modern-farmhouse\.jpg"/);
  assert.match(home, /\/videos\/hero-building\.mp4/);
  assert.match(css, /\.hero-video \{ display: none; \}/);
});

test("provides standalone project category pages with the approved residential photo library", async () => {
  const [category, residential, commercial, hospitality] = await Promise.all([
    readFile(new URL("components/ProjectCategory.tsx", root), "utf8"),
    readFile(new URL("app/projects/residential-multi-family/page.tsx", root), "utf8"),
    readFile(new URL("app/projects/commercial-industrial/page.tsx", root), "utf8"),
    readFile(new URL("app/projects/hospitality/page.tsx", root), "utf8"),
  ]);
  assert.match(residential, /path="\/projects\/residential-multi-family"/);
  assert.match(commercial, /path="\/projects\/commercial-industrial"/);
  assert.match(hospitality, /path="\/projects\/hospitality"/);
  for (const image of ["modern-farmhouse", "fairfield", "fairfield-infill", "macdonald-park", "alberg-lane", "fairfield-east", "linwood", "mcdonald-residences", "mt-douglas", "south-oak-bay"]) {
    assert.match(category, new RegExp(`residential-${image}\\.jpg`));
  }
  assert.doesNotMatch(category, /duplex/i);
});

test("project detail pages include researched profiles and useful facts", async () => {
  const [content, page] = await Promise.all([
    readFile(new URL("app/content.ts", root), "utf8"),
    readFile(new URL("app/projects/[slug]/page.tsx", root), "utf8"),
  ]);
  for (const project of ["chronicle", "centro", "nova", "rockridge-living", "park-maven", "four-points-victoria-gateway", "flora-fauna", "element-1", "partap-complex", "unison", "verge"]) {
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

test("includes the client-confirmed Four Points hospitality project", async () => {
  const content = await readFile(new URL("app/content.ts", root), "utf8");
  const hotelImage = await readFile(new URL("public/images/four-points-victoria.jpg", root));
  assert.match(content, /Four Points by Sheraton Victoria Gateway/);
  assert.match(content, /117-room hospitality property/);
  assert.match(content, /829 McCallum Road/);
  assert.ok(hotelImage.byteLength > 100_000);
});

test("preserves legacy search equity and hardened delivery headers", async () => {
  const config = await readFile(new URL("netlify.toml", root), "utf8");
  for (const legacyPath of ["/contact-us", "/book-a-service", "/about-us", "/reviews", "/flora-fauna-20267-72-avenue-langley", "/verge-langley-city"]) {
    assert.match(config, new RegExp(`from = "${legacyPath.replaceAll("/", "\\/")}"`));
  }
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /script-src-attr 'none'/);
  assert.match(config, /style-src 'self'; style-src-attr 'unsafe-inline'/);
  assert.match(config, /Strict-Transport-Security/);
  assert.match(config, /X-Frame-Options = "DENY"/);
});

test("Next.js responses include the production security policy", async () => {
  const config = await readFile(new URL("next.config.ts", root), "utf8");

  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /script-src-attr 'none'/);
  assert.match(config, /Cross-Origin-Opener-Policy/);
  assert.match(config, /X-Frame-Options", value: "DENY"/);
  assert.match(config, /Strict-Transport-Security/);
});
