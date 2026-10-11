export interface LookItem {
  slug: string; // product slug in lib/products.ts
  garment: string; // display label: Tee / Shirt / Jeans / Pants / Jacket / Sweater
  x: number; // hotspot position, % from left
  y: number; // hotspot position, % from top
}

export interface Look {
  slug: string;
  kicker: string;
  title: string;
  blurb: string;
  image: string;
  items: LookItem[];
}

/**
 * Look imagery lives at /images/look-01.jpg … /images/look-03.jpg.
 * Generation prompts for each are in SHOP-THE-LOOK-PROMPTS.md.
 */
export const looks: Look[] = [
  {
    slug: "concrete-sundays",
    kicker: "Look 01",
    title: "Concrete Sundays",
    blurb:
      "Bone-on-stone, denim to the ground. The daytime uniform — layered but never fussy.",
    image: "/images/look-01.jpg",
    items: [
      { slug: "monolith-oversized-tee", garment: "Tee", x: 50, y: 28 },
      { slug: "quarry-overshirt", garment: "Shirt", x: 50, y: 39 },
      { slug: "depot-bomber", garment: "Jacket", x: 63, y: 45 },
      { slug: "yardage-baggy-jeans", garment: "Jeans", x: 50, y: 70 },
    ],
  },
  {
    slug: "after-hours",
    kicker: "Look 02",
    title: "After Hours",
    blurb:
      "All black, one texture at a time. Knit over tee, leather over everything, cargos to finish.",
    image: "/images/look-02.jpg",
    items: [
      { slug: "flawless-graphic-tee", garment: "Tee", x: 47, y: 25 },
      { slug: "signal-knit-sweater", garment: "Sweater", x: 49, y: 36 },
      { slug: "escort-leather-jacket", garment: "Jacket", x: 59, y: 42 },
      { slug: "site-cargo-pants", garment: "Pants", x: 50, y: 70 },
    ],
  },
  {
    slug: "field-notes",
    kicker: "Look 03",
    title: "Field Notes",
    blurb:
      "Workwear cut clean. Printed shirt, utility jacket, chinos rolled just so.",
    image: "/images/look-03.jpg",
    items: [
      { slug: "blank-canvas-tee", garment: "Tee", x: 50, y: 26 },
      { slug: "gallery-print-shirt", garment: "Shirt", x: 57, y: 35 },
      { slug: "field-utility-jacket", garment: "Jacket", x: 63, y: 41 },
      { slug: "site-chino-trousers", garment: "Pants", x: 50, y: 70 },
    ],
  },
];
