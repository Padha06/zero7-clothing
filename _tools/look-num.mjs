import { chromium } from "playwright-core";

const BASE = "http://localhost:3007";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(BASE + "/looks", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const secs = await page.locator("section").count();
console.log("sections:", secs);

// full look sections
for (let i = 1; i <= secs; i++) {
  const el = page.locator("section").nth(i - 1);
  const box = await el.boundingBox();
  if (!box || box.height < 300) continue;
  await el.screenshot({ path: `_shots/look-sec-${i}.png` });
  console.log(`section ${i}: ${Math.round(box.width)}x${Math.round(box.height)}`);
}

// dump pin numbers + list numbers
const data = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("section").forEach((s, si) => {
    const pins = [...s.querySelectorAll("button[aria-label]")].map((b) => {
      const r = b.getBoundingClientRect();
      return { n: b.textContent.trim(), label: b.getAttribute("aria-label"), x: Math.round(r.x), y: Math.round(r.y) };
    });
    const rows = [...s.querySelectorAll("ul li")].map((li) => ({
      num: li.querySelector("span")?.textContent.trim(),
      name: li.querySelector("a.block")?.textContent.trim(),
    }));
    if (pins.length || rows.length) out.push({ si, pins, rows });
  });
  return out;
});
console.log(JSON.stringify(data, null, 1));

await browser.close();
