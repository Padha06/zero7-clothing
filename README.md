# ZERO7 — Men's Streetwear

An editorial-first e-commerce storefront for **Zero7 Clothing**, a men's streetwear label from **Nagpur, India** (T-Shirts · Shirts · Jeans · Streetwear · PAN India shipping).

Built as a **Next.js 14 (App Router) + Tailwind CSS + Framer Motion** static site. No backend required.

## Run

```bash
npm install
npm run dev      # http://localhost:3000  (dev: slow first paint, images optimise on demand)
npm run build && npm start   # production — ALWAYS demo/deploy from this, not dev
```

## Performance

- Images are pre-compressed (all ≤ ~1400px; total ~3.4 MB) and served through `next/image` as **WebP** (`next.config.mjs`). AVIF is deliberately off — its slow encode was the cause of laggy image loads.
- Offscreen sections use `content-visibility: auto` (`cv-auto`), everything below the fold lazy-loads, only the hero is `priority`.
- Optimised images cache for 30 days (`minimumCacheTTL`); subsequent loads are near-instant.
- Run the **production** server when showing the client — `next dev` optimises images on every request and feels slow.

## Structure

```
app/            pages: home, shop, product/[slug], looks (lookbook), about, contact, checkout, sitemap, robots
                    (/lookbook → 307 redirect to /looks, see next.config.mjs)
components/     header, footer, cart, mobile nav, product card/detail, shop browser, fit finder, shop-the-look, checkout
lib/            site.ts (brand + config), products.ts (catalogue), looks.ts (shoppable lookbook), collections.ts (journal)
public/images/  staged stock imagery (swap for client photography)
_tools/         Playwright screenshot helper (node _tools/shoot.mjs)
SHOP-THE-LOOK-PROMPTS.md   image-generation prompts for the /looks page
```

## What to edit when the client signs

| What | Where |
| --- | --- |
| Phone, email, Instagram, studio address | `lib/site.ts` (`placeholder: true`) |
| Products, prices, sizes, copy, imagery | `lib/products.ts` + `public/images/` |
| Announcements / marquee copy | `lib/site.ts` |
| Brand accent colour, fonts | `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx` |

## Notes

- Imagery is **Pexels stock** (free for commercial use) as a placeholder; replace with the client's own shots.
- Cart is client-side (`localStorage`); checkout drafts a WhatsApp order — wire a real gateway (Razorpay/UPI) or headless commerce before launch.
- Contact details and product data are deliberately **placeholders** and labelled as such in `PRODUCT.md`.
