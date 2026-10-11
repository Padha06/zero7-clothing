import { chromium } from "playwright-core";

const BASE = "http://localhost:3007";
const browser = await chromium.launch({ channel: "chrome" });

async function run(label, viewport, url, clickFn) {
  const page = await browser.newPage({ viewport });
  const errs = [];
  page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text()));
  page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
  await page.goto(BASE + url, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(600);
  await clickFn(page).catch((e) => errs.push("clickerr: " + e.message));
  await page.waitForTimeout(1000);
  console.log(`[${label}] url=${page.url()}  errors=${errs.length}`);
  errs.slice(0, 5).forEach((e) => console.log("   ", e));
  await page.close();
}

// 1. desktop home
await run("desktop-home", { width: 1440, height: 900 }, "/", async (p) => {
  await p.click('header a[href="/looks"]');
});
// 2. desktop shop
await run("desktop-shop", { width: 1440, height: 900 }, "/shop", async (p) => {
  await p.click('header a[href="/looks"]');
});
// 3. mobile: open hamburger, click Shop the Look
await run("mobile-menu", { width: 390, height: 844 }, "/", async (p) => {
  await p.click('button[aria-label="Open menu"]');
  await p.waitForTimeout(500);
  await p.click('a[href="/looks"]');
});
// 4. mobile bottom nav Looks
await run("mobile-bottomnav", { width: 390, height: 844 }, "/", async (p) => {
  await p.click('nav.fixed a[href="/looks"]');
});

await browser.close();
