# Product

<!-- impeccable:product-schema 1 -->

## Platform

web (Next.js 14 App Router, statically generated)

## Users

- **The client — Zero7 Clothing** (a men's streetwear founder in Nagpur, Maharashtra). Situation: the demo is opened live, likely on his phone, next to the site he sent as reference (`stylishwodrobe.com`). Job: decide whether this builder can deliver a storefront that looks more premium and sells better than the Shopify template he knows.
- **Nagpur / PAN-India streetwear buyers** (18–30, mobile-first, price-aware but aesthetic-driven). Job: discover a fit that matches their style, trust the size, and check out without friction — ideally on UPI or COD.

Both matter equally: the buyer journey has to be convincing enough that the client believes real customers will convert.

## Product Purpose

Win the build and, once live, sell streetwear. This is an editorial-first storefront that beats the referred site on the five revenue patterns that matter for apparel (editorial hero, PDP, mobile, size confidence, checkout) — and adds streetwear-native mechanics the template has no answer for: **drop countdown, shop-by-silhouette intent navigation, a real fit-finder + size guide, and WhatsApp/COD-first India checkout.**

## Positioning

A working proof, not a mockup. Where the referred site is a discount-first catalogue of flat product grids, Zero7 is a "magazine you can buy from": warm editorial layout, one accent, type that leads, and merchandising built around fit rather than markdowns. The client can click every surface live — filters, fit-finder, size guide, cart, WhatsApp checkout — from one deployment.

## Operating Context

- Built as a static Next.js site; no backend, no database, no API keys required to demo.
- Cart persists to `localStorage`; "checkout" drafts a formatted order summary and hands off to WhatsApp, then clears the bag.
- Product data lives in `lib/products.ts`; brand/config in `lib/site.ts`.
- Imagery: the 3 lookbook looks and their 12 garments now use the client's AI-generated assets in `public/images` (compressed to ~0.75 MB total); the remaining SKUs still use Pexels placeholder photography. All are served through `next/image` (AVIF/WebP + lazy).

## Capabilities and Constraints

- **Confirmed working:** full catalogue (25 products across T-Shirts, Shirts, Jeans & Bottoms, Streetwear — incl. sweaters and trousers); shop with category/fit/size filters + sort; PDP with gallery zoom, colour + size selection, fit-finder, size-guide modal, details accordions and related products; **shoppable lookbook** (`/looks` — 3 editorial looks with hotspot pins, per-piece add, and "add the full look"; `/lookbook` 307-redirects here) with a journal strip; about; contact form; cart drawer with free-shipping progress; checkout with UPI/COD and WhatsApp handoff; JSON-LD (ClothingStore + Product), sitemap and robots; mobile bottom navigation.
- **Hard constraints:** no payment gateway and no order persistence (by design for a demo); contact details are placeholders until the client supplies real ones.
- **Explicitly undecided:** real brand logo/wordmark, real contact + studio address, real photography, live inventory/pricing, payment gateway choice (Razorpay/UPI vs Shopify/Medusa), hosting/domain, and whether "Drops" are a real cadence or marketing.

## Brand Commitments

- Working identity **"Zero7"** — men's streetwear, Nagpur. Visual system: warm bone paper, near-black ink, a single persimmon accent; Instrument Serif display + Inter + Space Mono.
- Voice established in the copy: direct, dry, confident ("Loud clothes. Quiet promises.").
- Honest-pricing stance is baked into the UI (no fake MRPs); only a restrained set of badges ("Bestseller", "New", "Drop 03", "Limited").

## Evidence on Hand

- **Confirmed real (client-supplied, safe to publish):** the name **Zero7 Clothing**; category **men's streetwear — T-Shirts, Shirts, Jeans, Streetwear**; city **Nagpur**; **PAN India shipping**.
- **Placeholder — must never be treated as real:** phone, email, Instagram handle, and the studio address (all marked `placeholder: true` in `lib/site.ts`); product names, prices, fabrics and copy are invented for the demo; the 12 look garments and 3 looks use AI-generated imagery, and the remaining SKUs use stock photography — not approved client product shots.

## Product Principles

1. **Editorial over catalogue** — one idea per screen, let typography and whitespace sell.
2. **Fit is the conversion lever** — size confidence (fit-finder + guide) is a first-class feature, not a link.
3. **Mobile is the store** — every pattern is designed phone-first and verified at 390px.
4. **Honest merchandising** — no discount theatre; quality and clarity over urgency.
5. **One-file simplicity** — runs with no infrastructure the client has to reason about.

## Accessibility & Inclusion

Reduced-motion is respected across reveals and the marquee; interactive controls are real buttons with labels; overlays (cart, menu, size guide) use Esc/click-away and lock scroll. Not yet audited to WCAG AA contrast — accent-on-paper CTA hover states and the light-on-dark mono labels should be re-checked at launch.
