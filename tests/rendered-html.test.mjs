import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the Badesha Electrical home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Badesha Electrical Ltd\./i);
  assert.match(html, /Built right\./i);
  assert.match(html, /604-780-6000/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("renders every primary route", async () => {
  for (const [path, marker] of [["/services", "From first wire"], ["/projects", "Powering communities"], ["/about", "Pride in the work"], ["/safety", "Safety is a way"], ["/contact", "Tell us what needs power"], ["/book", "Clear starting prices"]]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(marker, "i"), path);
  }
});
