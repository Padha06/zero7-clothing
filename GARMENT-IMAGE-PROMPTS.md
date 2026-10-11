# Garment-level generation prompts (per piece)

Each look has **4 pieces**. This file gives a prompt for **every individual garment** — twice:
1. **On-model** (worn by the Zero7 muse) — for PDP / look images.
2. **Product shot** (flat-lay / clean studio) — for the card and gallery.

Generate **both** for every item so the catalogue and the looks match.

---

## Shared blocks (prepend/append as noted)

**MUSE (only for on-model prompts):**
> the Zero7 muse — a young Indian man, mid-20s, 5 ft 11 in, lean-athletic, warm brown skin, short black textured hair with a soft fade, light stubble, calm expression.

**STUDIO (append to both):** *plain warm bone-grey seamless studio backdrop, soft even diffused light, sharp focus on fabric texture and stitching, subtle natural shadow, vertical 4:5, photorealistic commercial fashion photography, no text, no logos, no watermarks.*

**FLAT-LAY background:** *top-down flat-lay on warm bone textured paper, soft daylight.*

**Universal negatives:** *text, logo, watermark, extra limbs, deformed hands, mannequin, busy background, harsh flash, HDR, oversaturated, cartoon, plastic skin.*

**Naming:** save as `public/images/<slug>-1.jpg` (main) and `<slug>-2.jpg` (second gallery shot), then point the product's `images` array in `lib/products.ts` at them.

---

# LOOK 01 — Concrete Sundays

## 1. Monolith Oversized Tee — slug `monolith-oversized-tee`
- **On-model:** > Full-body upper shot of the Zero7 muse wearing a **heavyweight oversized bone-white t-shirt** with a boxy drop-shoulder fit and a thick structured ribbed collar that stands up; 260 GSM cotton, visible fabric weight; cropped chest-to-thigh; relaxed upright stance. [STUDIO]
- **Product:** > Flat-lay of a **bone-white heavyweight oversized t-shirt**, boxy cut, ribbed collar, tonal woven flag at the hem. [FLAT-LAY background]
- **Files:** `monolith-oversized-tee-1.jpg`, `-2.jpg`

## 2. Quarry Flannel Overshirt — slug `quarry-overshirt`
- **On-model:** > The Zero7 muse wearing an **unbuttoned rust-and-charcoal checked brushed flannel overshirt** over a plain tee; boxy overshirt fit, chest flap pockets, soft brushed cotton texture; cropped chest-to-thigh, sleeves loose. [STUDIO]
- **Product:** > Flat-lay of a **rust-and-charcoal checked flannel overshirt**, two chest flap pockets, brushed cotton weave. [FLAT-LAY background]
- **Files:** `quarry-overshirt-1.jpg`, `-2.jpg`

## 3. Depot Bomber Jacket — slug `depot-bomber`
- **On-model:** > The Zero7 muse wearing a **matte-black nylon bomber jacket**, relaxed fit, ribbed collar/cuffs/hem, satin lining sheen, worn open; cropped shoulder-to-waist. [STUDIO]
- **Product:** > Flat-lay of a **matte-black nylon bomber jacket**, ribbed trims, zip utility sleeve pocket, subtle satin sheen. [FLAT-LAY background]
- **Files:** `depot-bomber-1.jpg`, `-2.jpg`

## 4. Yardage Baggy Jeans — slug `yardage-baggy-jeans`
- **On-model:** > The Zero7 muse in **baggy stone-indigo rigid denim jeans**, full leg with stacked/creased hems over white sneakers; 14.5 oz denim with visible weave; cropped waist-to-ankle, front-on. [STUDIO]
- **Product:** > Flat-lay of **baggy stone-indigo rigid denim jeans**, folded once, five-pocket, chain-stitched hem, visible denim twill. [FLAT-LAY background]
- **Files:** `yardage-baggy-jeans-1.jpg`, `-2.jpg`

---

# LOOK 02 — After Hours

## 1. Flawless Graphic Tee — slug `flawless-graphic-tee`
- **On-model:** > The Zero7 muse wearing a **black 200 GSM cotton tee** with a tonal puff-print across the chest; regular fit; cropped chest-to-thigh. Deep-teal studio, low-key light. [STUDIO, but dark charcoal backdrop]
- **Product:** > Flat-lay of a **black cotton t-shirt** with a raised tonal puff-print graphic, screen-printed neck label. [FLAT-LAY background]
- **Files:** `flawless-graphic-tee-1.jpg`, `-2.jpg`

## 2. Signal Knit Sweater — slug `signal-knit-sweater`
- **On-model:** > The Zero7 muse wearing a **chunky burnt-ember (rust) ribbed knit crew-neck sweater**, boxy fit, 7-gauge chunky ribs visible on body and cuffs; cropped chest-to-thigh. [STUDIO]
- **Product:** > Flat-lay of a **burnt-ember ribbed knit crew-neck sweater**, chunky 7-gauge texture, ribbed neck/cuffs/hem. [FLAT-LAY background]
- **Files:** `signal-knit-sweater-1.jpg`, `-2.jpg`

## 3. Escort Leather Jacket — slug `escort-leather-jacket`
- **On-model:** > The Zero7 muse wearing a **black faux-leather biker jacket**, cropped regular fit, asymmetric zip, quilted shoulder detail, collar up. [STUDIO, dark backdrop]
- **Product:** > Flat-lay of a **black faux-leather biker jacket**, asymmetric zip, quilted shoulders. [FLAT-LAY background]
- **Files:** `escort-leather-jacket-1.jpg`, `-2.jpg`

## 4. Site Cargo Pants — slug `site-cargo-pants`
- **On-model:** > The Zero7 muse in **olive cotton-ripstop cargo pants**, relaxed leg with roomy bellow pockets and drawcord hems, slight stacking; cropped waist-to-ankle. [STUDIO]
- **Product:** > Flat-lay of **olive cotton-ripstop cargo pants**, six-pocket layout, bar-tacked stress points, drawcord hem. [FLAT-LAY background]
- **Files:** `site-cargo-pants-1.jpg`, `-2.jpg`

---

# LOOK 03 — Field Notes

## 1. Blank Canvas Tee — slug `blank-canvas-tee`
- **On-model:** > The Zero7 muse wearing a **cream (bone) 200 GSM plain t-shirt**, regular fit, clean unobtrusive branding at the hem; cropped chest-to-thigh. [STUDIO]
- **Product:** > Flat-lay of a **cream plain cotton t-shirt**, clean neck, minimal hem flag. [FLAT-LAY background]
- **Files:** `blank-canvas-tee-1.jpg`, `-2.jpg`

## 2. Gallery Print Shirt — slug `gallery-print-shirt`
- **On-model:** > The Zero7 muse wearing an **ochre art-printed short-sleeve camp/relaxed shirt** in a soft viscose-cotton blend, relaxed drape, curved hem, worn open over a tee; cropped chest-to-thigh. [STUDIO]
- **Product:** > Flat-lay of an **ochre printed relaxed shirt**, painted-print pattern, curved hem, soft drape. [FLAT-LAY background]
- **Files:** `gallery-print-shirt-1.jpg`, `-2.jpg`

## 3. Field Utility Jacket — slug `field-utility-jacket`
- **On-model:** > The Zero7 muse wearing a **stone cotton-nylon canvas field jacket**, relaxed workwear fit, four pockets, concealed hood in collar, worn open; cropped shoulder-to-waist. [STUDIO]
- **Product:** > Flat-lay of a **stone utility field jacket**, four-pocket layout, squared workwear shoulders, concealed collar hood. [FLAT-LAY background]
- **Files:** `field-utility-jacket-1.jpg`, `-2.jpg`

## 4. Site Chino Trousers — slug `site-chino-trousers`
- **On-model:** > The Zero7 muse in **khaki heavy cotton-twill chino trousers**, straight leg with a clean hem, cuffs rolled once, sitting at the natural waist; cropped waist-to-ankle. [STUDIO]
- **Product:** > Flat-lay of **khaki straight-leg chino trousers**, heavy twill, clean hem, side and back pockets. [FLAT-LAY background]
- **Files:** `site-chino-trousers-1.jpg`, `-2.jpg`

---

## Wiring it up (once images exist)

1. Save files into `public/images/` with the filenames above.
2. In `lib/products.ts`, update each product's `images` array, e.g.:
   ```ts
   images: ["/images/monolith-oversized-tee-1.jpg", "/images/monolith-oversized-tee-2.jpg"],
   ```
3. The look images (`look-01/02/03.jpg`) use the **on-model full-body** prompts from `SHOP-THE-LOOK-PROMPTS.md`.
4. Re-run `npm run build` — everything (cards, PDP, looks) picks up the new imagery.
