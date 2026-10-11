import { chromium } from "playwright-core";

const BASE = "http://localhost:3007";
const browser = await chromium.launch({ channel: "chrome" });

async function measure(path) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);
  const m = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const res = performance.getEntriesByType("resource");
    const imgs = res.filter((r) => r.initiatorType === "img" || /\.(webp|jpg|png)/.test(r.name));
    const bytes = res.reduce((n, r) => n + (r.transferSize || 0), 0);
    const imgBytes = imgs.reduce((n, r) => n + (r.transferSize || 0), 0);
    return {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
      load: Math.round(nav.loadEventEnd),
      requests: res.length,
      images: imgs.length,
      totalKB: Math.round(bytes / 1024),
      imageKB: Math.round(imgBytes / 1024),
    };
  });
  console.log(`[${path}]  DCL=${m.domContentLoaded}ms  load=${m.load}ms  reqs=${m.requests}  imgs=${m.images}  total=${m.totalKB}KB  images=${m.imageKB}KB`);
  await ctx.close();
}

await measure("/");
await measure("/shop");
await measure("/looks");
await browser.close();
