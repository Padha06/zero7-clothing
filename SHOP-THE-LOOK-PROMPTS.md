# Lookbook — image & video generation prompts

The **Lookbook / Shop the Look** page (`/looks`) uses three full-body look images:

| File | Look | Used on |
| --- | --- | --- |
| `public/images/look-01.jpg` | Look 01 — Concrete Sundays | `/looks` + hotspot pins |
| `public/images/look-02.jpg` | Look 02 — After Hours | `/looks` + hotspot pins |
| `public/images/look-03.jpg` | Look 03 — Field Notes | `/looks` + hotspot pins |

Save stills as **portrait 4:5** (1200 × 1500) JPEG into `public/images/` with the exact filenames. Use the **video** prompts if you're generating clips (6–10s, portrait) — you can drop a `<video>` in the same image slot later.

---

## The Zero7 muse — reuse this person in every look

> A young Indian man, mid-20s, 5 ft 11 in, lean-athletic build, warm brown skin, short black textured hair with a soft fade, light stubble, strong clean jawline, calm and self-assured expression. He is the same person across every look — same face, same body, same hair.

Keeping the same model is what makes a lookbook read as one brand, not a stock dump. Generate each look with the same seed / reference image if your tool supports it.

## Technical baseline (append to every prompt)

> Shot on a 35mm prime at f/2.0, full-body head-to-toe framing, subject centred with breathing room on all sides, natural light, warm neutral colour grade (bone, stone, olive, ochre), cinematic but true-to-life skin tones, shallow depth of field with a soft background, vertical 4:5, photorealistic editorial fashion photography. No text, no logos, no watermarks, no props cluttering the body, no extra people.

**Universal negatives:** *text, logo, watermark, extra limbs, deformed hands, extra people, busy background, harsh flash, HDR, oversaturated, cartoon, plastic skin.*

---

## Look 01 — Concrete Sundays

**Wardrobe (in order of layering):**
- **Tee** — Heavyweight oversized bone-white t-shirt (thick 260 GSM cotton, boxy drop-shoulder fit).
- **Shirt** — Open rust-and-slate plaid brushed flannel overshirt over the tee, sleeves loose, unbuttoned.
- **Jacket** — Matte-black nylon bomber jacket worn open over the overshirt.
- **Jeans** — Baggy stone-indigo rigid denim jeans, stacking/breaking over the sneakers.
- **Feet / extra** — Chunky white leather sneakers, plain white crew socks; a simple steel watch; optional black baseball cap on the head.

### Image prompt
> Full-body editorial fashion photograph of the Zero7 muse — a young Indian man, mid-20s, lean-athletic, short black textured hair, light stubble, calm confident look — standing on a sunlit concrete city street. He wears a heavyweight oversized **bone-white t-shirt** under an open **rust-and-slate plaid flannel overshirt**, with a matte-black **nylon bomber jacket** worn open on top, **baggy stone-indigo denim jeans** stacking over chunky **white sneakers**, a plain white crew sock peeking out, and a simple steel watch. Hands loosely in pockets, relaxed upright stance, chin slightly up. Backdrop of plain concrete paving, a low graffiti-free wall and a sliver of grey sky. Soft directional afternoon daylight from camera-left, gentle shadow across the ground. 35mm f/2.0, full frame head to feet, generous negative space, warm neutral grade. Vertical 4:5, photorealistic, no text, no logos.

### Video prompt (6–8s)
> Cinematic slow-motion clip of the Zero7 muse walking a few steps toward camera on a sunlit concrete street, hands in pockets, then stopping and turning slightly to look off-frame. Wardrobe exactly as above: bone-white oversized tee, open rust-and-slate plaid flannel overshirt, open matte-black bomber, baggy stone-indigo denim, white sneakers. Slow dolly-in on a 35mm lens, f/2.0, gentle natural light, warm neutral grade, subtle motion in fabric, shallow depth of field. Vertical 4:5, 60 fps for a 0.5× slow-motion feel. No text, no logos.

---

## Look 02 — After Hours

**Wardrobe (in order of layering):**
- **Tee** — Black graphic t-shirt with a tonal puff-print, worn as the base layer.
- **Sweater** — Chunky ribbed knit sweater in burnt ember / rust, crew neck, boxy, worn over the tee.
- **Jacket** — Open black leather jacket over the sweater, collar up.
- **Pants** — Baggy black ripstop cargo pants with drawcord hems and roomy pockets.
- **Feet / extra** — Dark suede sneakers; a slim black wristwatch; optional silver chain necklace.

### Image prompt
> Full-body editorial fashion photograph of the Zero7 muse — a young Indian man, mid-20s, lean-athletic, short black textured hair, light stubble — at night in a moody urban setting. He wears a black tonal-graphic **t-shirt** under a chunky **burnt-ember ribbed knit sweater** (crew neck, boxy), with an open **black leather jacket** over it, **baggy black cargo pants** with drawcord hems, and dark suede sneakers; a slim black watch on one wrist. Hands in pockets, shoulders relaxed, direct calm gaze. Background of a dark city wall, wet asphalt with soft reflections and a distant warm streetlight. Cinematic low-key lighting — deep teal-black shadows, a single warm rim light on his shoulder and hair. 35mm f/1.8, full frame head to feet, quiet negative space, subtle film grain, warm-cool contrast. Vertical 4:5, photorealistic, no text, no logos.

### Video prompt (6–8s)
> Moody cinematic clip of the Zero7 muse standing still at night, then slowly turning his head to look at camera as a car's headlights sweep past behind him. Outfit: black graphic tee, chunky burnt-ember ribbed knit sweater, open black leather jacket, baggy black cargo pants, dark sneakers. Slow push-in on a 35mm lens, f/1.8, deep teal-black shadows with a single warm rim light, wet-asphalt reflections, light film grain, subtle breathing motion in the knit fabric. Vertical 4:5, 24 fps, 0.5× slow motion. No text, no logos.

---

## Look 03 — Field Notes

**Wardrobe (in order of layering):**
- **Tee** — Cream/bone 200 GSM plain t-shirt (unbranded), worn as base.
- **Shirt** — Open ochre-printed camp shirt over the tee, an easy relaxed cut.
- **Jacket** — Stone cotton-nylon field utility jacket with four pockets, worn open over the shirt, sleeves relaxed.
- **Pants** — Salvage-olive chino trousers, straight leg, cuffs rolled once.
- **Feet / extra** — Cream canvas sneakers; a tan field watch; optional plain cap.

### Image prompt
> Full-body editorial fashion photograph of the Zero7 muse — a young Indian man, mid-20s, lean-athletic, short black textured hair, light stubble — standing against a weathered concrete-and-canvas backdrop in daylight. He wears a cream heavyweight **t-shirt** under an open **ochre-printed camp shirt**, a stone **cotton-nylon field utility jacket** with four pockets worn open on top, **salvage-olive chino trousers** with the cuffs rolled once, and cream **canvas sneakers**; a tan field watch on one wrist. Hands relaxed at his sides, calm expression, weight shifted comfortably. Soft overcast daylight, muted earthy palette — bone, olive, ochre, khaki — with a natural documentary feel. 35mm f/2.8, full frame head to feet, breathing room around the subject. Vertical 4:5, photorealistic, no text, no logos.

### Video prompt (6–8s)
> Cinematic documentary-style clip of the Zero7 muse standing against a weathered wall, slowly looking down at his rolled chino cuffs and then back up to the horizon, one hand adjusting the open utility jacket. Outfit: cream tee, open ochre-printed camp shirt, stone four-pocket field utility jacket, olive chinos with rolled cuffs, cream canvas sneakers. Gentle handheld 35mm, f/2.8, soft overcast light, earthy muted grade, natural motion in the fabric. Vertical 4:5, 24 fps. No text, no logos.

---

## After you generate the images

Drop the three stills into `public/images/` as `look-01.jpg`, `look-02.jpg`, `look-03.jpg`. Then fine-tune the hotspot pins in `lib/looks.ts` so each number lands on the right garment:

```ts
{ slug: "yardage-baggy-jeans", garment: "Jeans", x: 47, y: 66 }
```

`x` / `y` are percentages from the left / top of the image. The trouser pin usually sits around `y: 66–73`, the tee around `y: 30–34`, the jacket around `y: 44–48`. Keep 3–4 pins per look and make sure the subject is fully visible.
