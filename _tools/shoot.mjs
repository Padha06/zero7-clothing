import { chromium } from "playwright-core";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const BASE = process.env.BASE || "http://localhost:3007";
const OUT = fileURLToPath(new URL("../_shots/", import.meta.url));
fs.mkdirSync(OUT, { recursive: true });

const jobs = JSON.parse(fs.readFileSync(new URL("./shots.json", import.meta.url), "utf8"));

const browser = await chromium.launch({ channel: "chrome" });
let ok = 0;
for (const j of jobs) {
  const ctx = await browser.newContext({
    viewport: { width: j.w, height: j.h },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + j.url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1200);

  const target = j.scrollY ?? 0;
  await page.evaluate(async (ty) => {
    const step = Math.floor(window.innerHeight * 0.6);
    for (let y = 0; y <= ty + window.innerHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo(0, ty);
  }, target);
  await page.waitForTimeout(900);

  if (j.clickSel) {
    await page.click(j.clickSel).catch(() => {});
    await page.waitForTimeout(500);
  }
  if (j.hoverSel) {
    await page.hover(j.hoverSel).catch(() => {});
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: OUT + j.name + ".png", fullPage: false });
  await ctx.close();
  console.log("shot", j.name);
  ok++;
}
await browser.close();
console.log("done", ok);
