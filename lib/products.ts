export type CategoryId = "tees" | "shirts" | "jeans" | "streetwear";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  compareAt?: number;
  badge?: string;
  fit: string;
  fabric: string;
  colors: ColorOption[];
  sizes: string[];
  images: string[];
  blurb: string;
  details: string[];
  care: string[];
}

export const categories: {
  id: CategoryId;
  label: string;
  href: string;
  blurb: string;
  cover: string;
}[] = [
  {
    id: "tees",
    label: "T-Shirts",
    href: "/shop?c=tees",
    blurb: "Heavyweight oversized tees",
    cover: "/images/tee-02.jpg",
  },
  {
    id: "shirts",
    label: "Shirts",
    href: "/shop?c=shirts",
    blurb: "Overshirts, camp & flannel",
    cover: "/images/shirt-07.jpg",
  },
  {
    id: "jeans",
    label: "Jeans & Bottoms",
    href: "/shop?c=jeans",
    blurb: "Baggy, straight & cargo",
    cover: "/images/jeans-04.jpg",
  },
  {
    id: "streetwear",
    label: "Streetwear",
    href: "/shop?c=streetwear",
    blurb: "Hoodies, bombers & layers",
    cover: "/images/hood-10.jpg",
  },
];

const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];
const WAIST_SIZES = ["28", "30", "32", "34", "36"];
const CARE = [
  "Machine wash cold, inside out",
  "Do not bleach",
  "Tumble dry low or line dry",
  "Warm iron if needed",
];

export const products: Product[] = [
  // ---------------- T-SHIRTS ----------------
  {
    id: "z7-t01",
    slug: "monolith-oversized-tee",
    name: "Monolith Oversized Tee",
    category: "tees",
    price: 1099,
    badge: "Drop 03",
    fit: "Oversized",
    fabric: "260 GSM combed cotton",
    colors: [
      { name: "Washed Black", hex: "#1b1b1b" },
      { name: "Bone", hex: "#e8e3d8" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/monolith-oversized-tee-1.jpg"],
    blurb: "Drop-shoulder boxy fit with a structured collar that holds its shape.",
    details: [
      "260 GSM heavyweight combed cotton",
      "Drop shoulder, boxy body",
      "Ribbed collar with self-fabric taping",
      "Tonal Zero7 woven flag at hem",
    ],
    care: CARE,
  },
  {
    id: "z7-t02",
    slug: "flawless-graphic-tee",
    name: "Flawless Graphic Tee",
    category: "tees",
    price: 999,
    fit: "Regular",
    fabric: "200 GSM cotton jersey",
    colors: [
      { name: "Black", hex: "#141414" },
      { name: "Ash", hex: "#8f8b84" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/flawless-graphic-tee-1.jpg"],
    blurb: "Puff-print artwork across the chest. A wardrobe staple with attitude.",
    details: [
      "200 GSM soft cotton jersey",
      "High-density puff print",
      "Straight hem, regular body",
      "Screen-printed neck label",
    ],
    care: CARE,
  },
  {
    id: "z7-t03",
    slug: "macros-statement-tee",
    name: "Macros Statement Tee",
    category: "tees",
    price: 1099,
    fit: "Oversized",
    fabric: "240 GSM cotton",
    colors: [
      { name: "Fog Grey", hex: "#c9c6bf" },
      { name: "White", hex: "#f2f0ea" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/tee-03.jpg"],
    blurb: "Editorial front print on a heavyweight body. Loud, but cut clean.",
    details: [
      "240 GSM ring-spun cotton",
      "Oversized body, dropped shoulder",
      "Large front statement print",
      "Reinforced shoulder seams",
    ],
    care: CARE,
  },
  {
    id: "z7-t04",
    slug: "acid-utility-tee",
    name: "Acid Utility Tee",
    category: "tees",
    price: 949,
    fit: "Relaxed",
    fabric: "220 GSM garment-dyed cotton",
    colors: [
      { name: "Acid Pink", hex: "#b04a63" },
      { name: "Ink", hex: "#1a1a1a" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/tee-06.jpg", "/images/tee-07.jpg"],
    blurb: "Garment-dyed for a lived-in tone that fades on your terms.",
    details: [
      "220 GSM garment-dyed cotton",
      "Soft, broken-in hand feel",
      "Relaxed body",
      "Each piece fades uniquely",
    ],
    care: CARE,
  },
  {
    id: "z7-t05",
    slug: "blank-canvas-tee",
    name: "Blank Canvas Tee",
    category: "tees",
    price: 899,
    fit: "Regular",
    fabric: "200 GSM cotton",
    colors: [
      { name: "Bone", hex: "#ece7dc" },
      { name: "Black", hex: "#141414" },
      { name: "Olive", hex: "#3e452f" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/blank-canvas-tee-1.jpg"],
    blurb: "The tee you buy in three. Clean neck, honest weight, no logo noise.",
    details: [
      "200 GSM combed cotton",
      "Regular fit",
      "Clean unobtrusive branding",
      "Sold as a single — mix the colours",
    ],
    care: CARE,
  },

  // ---------------- SHIRTS ----------------
  {
    id: "z7-s01",
    slug: "resort-camp-shirt",
    name: "Resort Camp Shirt",
    category: "shirts",
    price: 1499,
    fit: "Relaxed",
    fabric: "Tencel blend, printed",
    colors: [
      { name: "Indigo Floral", hex: "#2a3d54" },
      { name: "Sand Print", hex: "#cdbb9a" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/shirt-01.jpg", "/images/shirt-07.jpg"],
    blurb: "Camp collar, open weave, printed in low-volume runs.",
    details: [
      "Soft Tencel-cotton blend",
      "Camp collar, straight hem",
      "Relaxed through the body",
      "Custom print, limited run",
    ],
    care: CARE,
  },
  {
    id: "z7-s02",
    slug: "quarry-overshirt",
    name: "Quarry Flannel Overshirt",
    category: "shirts",
    price: 1699,
    badge: "New",
    fit: "Oversized",
    fabric: "Brushed cotton flannel",
    colors: [
      { name: "Rust Check", hex: "#9c4a2a" },
      { name: "Slate Check", hex: "#5b6070" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/quarry-overshirt-1.jpg"],
    blurb: "Heavy brushed flannel built to layer over a tee and stay open.",
    details: [
      "Brushed cotton flannel, 200 GSM",
      "Chest flap pockets",
      "Boxy overshirt fit",
      "Wear open or buttoned",
    ],
    care: CARE,
  },
  {
    id: "z7-s03",
    slug: "atelier-poplin-shirt",
    name: "Atelier Poplin Shirt",
    category: "shirts",
    price: 1399,
    fit: "Regular",
    fabric: "Cotton poplin",
    colors: [
      { name: "Optic White", hex: "#f4f2ec" },
      { name: "Cobalt", hex: "#28407a" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/shirt-04.jpg", "/images/shirt-06.jpg"],
    blurb: "A clean, crisp shirt that reads dressy without trying.",
    details: [
      "Structured cotton poplin",
      "Point collar, single cuff",
      "Clean front placket",
      "Regular fit",
    ],
    care: CARE,
  },
  {
    id: "z7-s04",
    slug: "signal-hawker-shirt",
    name: "Signal Hawker Shirt",
    category: "shirts",
    price: 1449,
    fit: "Regular",
    fabric: "Yarn-dyed cotton",
    colors: [
      { name: "Signal Red", hex: "#b33528" },
      { name: "Deep Navy", hex: "#1f2a3d" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/shirt-05.jpg", "/images/shirt-06.jpg"],
    blurb: "Yarn-dyed colour that stays deep wash after wash.",
    details: [
      "Yarn-dyed cotton",
      "Regular fit",
      "Single chest pocket",
      "Reinforced buttons",
    ],
    care: CARE,
  },
  {
    id: "z7-s05",
    slug: "gallery-print-shirt",
    name: "Gallery Print Shirt",
    category: "shirts",
    price: 1599,
    fit: "Relaxed",
    fabric: "Viscose-cotton",
    colors: [
      { name: "Ochre Print", hex: "#c8943f" },
      { name: "Stone Print", hex: "#a9a292" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/gallery-print-shirt-1.jpg"],
    blurb: "Painted print, relaxed drape. The shirt that carries the outfit.",
    details: [
      "Viscose-cotton blend",
      "Relaxed drape",
      "Art-directed print",
      "Curved hem",
    ],
    care: CARE,
  },

  // ---------------- JEANS & BOTTOMS ----------------
  {
    id: "z7-j01",
    slug: "yardage-baggy-jeans",
    name: "Yardage Baggy Jeans",
    category: "jeans",
    price: 2199,
    badge: "Bestseller",
    fit: "Baggy",
    fabric: "14.5 oz rigid denim",
    colors: [
      { name: "Stone Indigo", hex: "#5c6b80" },
      { name: "Vintage Black", hex: "#2a2a2a" },
    ],
    sizes: WAIST_SIZES,
    images: ["/images/yardage-baggy-jeans-1.jpg"],
    blurb: "Full leg, low seat, stacked hem. The silhouette the drop is built on.",
    details: [
      "14.5 oz rigid cotton denim",
      "Baggy leg, mid-low rise",
      "Five-pocket construction",
      "Chain-stitched hem",
    ],
    care: CARE,
  },
  {
    id: "z7-j02",
    slug: "foundry-ripped-jeans",
    name: "Foundry Ripped Jeans",
    category: "jeans",
    price: 2299,
    fit: "Straight",
    fabric: "13 oz denim, distressed",
    colors: [
      { name: "Mid Blue", hex: "#47617f" },
      { name: "Rust Wash", hex: "#8a5a3a" },
    ],
    sizes: WAIST_SIZES,
    images: ["/images/jeans-01.jpg", "/images/jeans-03.jpg"],
    blurb: "Hand-finished distressing — every pair breaks a little differently.",
    details: [
      "13 oz denim",
      "Hand-distressed rips and repairs",
      "Straight leg",
      "Button fly",
    ],
    care: CARE,
  },
  {
    id: "z7-j03",
    slug: "palewash-wide-jeans",
    name: "Palewash Wide Jeans",
    category: "jeans",
    price: 1999,
    fit: "Wide",
    fabric: "12.5 oz washed denim",
    colors: [
      { name: "Ice Blue", hex: "#9fb0c2" },
      { name: "Bone Wash", hex: "#d8d1c2" },
    ],
    sizes: WAIST_SIZES,
    images: ["/images/jeans-05.jpg", "/images/jeans-02.jpg"],
    blurb: "Pale, clean, wide. Cut long so it pools over a sneaker.",
    details: [
      "12.5 oz washed denim",
      "Wide straight leg",
      "Soft hand feel",
      "Extra inseam for stacking",
    ],
    care: CARE,
  },
  {
    id: "z7-j04",
    slug: "site-cargo-pants",
    name: "Site Cargo Pants",
    category: "jeans",
    price: 2099,
    badge: "New",
    fit: "Relaxed",
    fabric: "Cotton ripstop",
    colors: [
      { name: "Olive", hex: "#4a5237" },
      { name: "Ink", hex: "#1c1c1c" },
    ],
    sizes: WAIST_SIZES,
    images: ["/images/site-cargo-pants-1.jpg"],
    blurb: "Ripstop cargos with real pockets — built for the city, not the runway.",
    details: [
      "Cotton ripstop, garment washed",
      "Six-pocket cargo layout",
      "Relaxed leg with cuff cinch",
      "Bar-tacked stress points",
    ],
    care: CARE,
  },
  {
    id: "z7-j05",
    slug: "loading-dock-cargos",
    name: "Loading Dock Cargos",
    category: "jeans",
    price: 1999,
    fit: "Baggy",
    fabric: "Heavy cotton twill",
    colors: [
      { name: "Concrete", hex: "#b7b2a6" },
      { name: "Deep Olive", hex: "#3b4230" },
    ],
    sizes: WAIST_SIZES,
    images: ["/images/jeans-09.jpg", "/images/jeans-06.jpg"],
    blurb: "Weapons-grade twill with a fall that stays sharp all day.",
    details: [
      "Heavy cotton twill",
      "Baggy leg with bellow pockets",
      "Drawcord hem",
      "Double-stitched seams",
    ],
    care: CARE,
  },

  // ---------------- STREETWEAR ----------------
  {
    id: "z7-x01",
    slug: "signal-heavy-hoodie",
    name: "Signal Heavyweight Hoodie",
    category: "streetwear",
    price: 2499,
    badge: "Bestseller",
    fit: "Oversized",
    fabric: "450 GSM loopback fleece",
    colors: [
      { name: "Bone", hex: "#e7e2d6" },
      { name: "Ash Grey", hex: "#8d8880" },
      { name: "Black", hex: "#141414" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/hood-01.jpg", "/images/hood-04.jpg"],
    blurb: "450 GSM loopback fleece with a double-lined hood that stands up.",
    details: [
      "450 GSM heavyweight loopback fleece",
      "Double-layer hood",
      "Kangaroo pocket, ribbed cuffs",
      "Embroidered Zero7 logo",
    ],
    care: CARE,
  },
  {
    id: "z7-x02",
    slug: "overpass-hoodie",
    name: "Overpass Zip Hoodie",
    category: "streetwear",
    price: 2399,
    fit: "Relaxed",
    fabric: "400 GSM brushed fleece",
    colors: [
      { name: "Cobalt", hex: "#26408a" },
      { name: "Charcoal", hex: "#39393a" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/hood-08.jpg", "/images/hood-01.jpg"],
    blurb: "Brushed inside, boxy outside. Layers clean under a jacket.",
    details: [
      "400 GSM brushed-back fleece",
      "Relaxed boxy fit",
      "Metal zip, split kangaroo pocket",
      "Tonal drawcords",
    ],
    care: CARE,
  },
  {
    id: "z7-x03",
    slug: "nightshift-hoodie",
    name: "Nightshift Hoodie",
    category: "streetwear",
    price: 2299,
    fit: "Oversized",
    fabric: "420 GSM cotton fleece",
    colors: [
      { name: "Black", hex: "#131313" },
      { name: "Rust", hex: "#9a4a2b" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/hood-11.jpg", "/images/hood-06.jpg"],
    blurb: "All-black blank with a rear print — quiet from the front, loud from behind.",
    details: [
      "420 GSM cotton fleece",
      "Oversized fit",
      "Rear graphic print",
      "Hidden phone pocket",
    ],
    care: CARE,
  },
  {
    id: "z7-x04",
    slug: "high-vis-hoodie",
    name: "High-Vis Hoodie",
    category: "streetwear",
    price: 2199,
    fit: "Relaxed",
    fabric: "400 GSM fleece",
    colors: [
      { name: "Signal Yellow", hex: "#d8a41f" },
      { name: "Cobalt", hex: "#26408a" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/hood-07.jpg", "/images/hood-08.jpg"],
    blurb: "Garment-dyed in colour picked to be seen across a street.",
    details: [
      "400 GSM fleece, garment dyed",
      "Relaxed fit",
      "Ribbed hem and cuffs",
      "Zero7 chest hit",
    ],
    care: CARE,
  },
  {
    id: "z7-x05",
    slug: "depot-bomber",
    name: "Depot Bomber Jacket",
    category: "streetwear",
    price: 3299,
    badge: "New",
    fit: "Relaxed",
    fabric: "Matte nylon shell",
    colors: [
      { name: "Ink", hex: "#161616" },
      { name: "Olive", hex: "#3f4630" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/depot-bomber-1.jpg"],
    blurb: "Matte nylon bomber with a clean shell and nothing to prove.",
    details: [
      "Matte nylon shell, satin lining",
      "Ribbed collar, cuffs and hem",
      "Zip utility sleeve pocket",
      "Zero7 zip pull",
    ],
    care: CARE,
  },
  {
    id: "z7-x06",
    slug: "workshop-overshirt-jacket",
    name: "Workshop Overshirt Jacket",
    category: "streetwear",
    price: 2799,
    fit: "Regular",
    fabric: "Heavy brushed check",
    colors: [
      { name: "Rust Check", hex: "#9c4a2a" },
      { name: "Pine Check", hex: "#3d4b3c" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/jack-03.jpg", "/images/shirt-02.jpg"],
    blurb: "The shirt-jacket that does the work of a coat in Nagpur winters.",
    details: [
      "Heavy brushed check fabric",
      "Two chest pockets",
      "Wear as shirt or jacket",
      "Brushed warm lining at yoke",
    ],
    care: CARE,
  },
  {
    id: "z7-x07",
    slug: "escort-leather-jacket",
    name: "Escort Leather Jacket",
    category: "streetwear",
    price: 3999,
    badge: "Limited",
    fit: "Regular",
    fabric: "Faux leather",
    colors: [
      { name: "Black", hex: "#131313" },
      { name: "Deep Brown", hex: "#3a2a20" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/escort-leather-jacket-1.jpg"],
    blurb: "Limited run. Clean panels, cropped body, ages with you.",
    details: [
      "Premium faux leather",
      "Cropped regular fit",
      "Asymmetric zip",
      "Quilted shoulder detail",
    ],
    care: ["Wipe clean with a damp cloth", "Do not machine wash", "Hang to dry", "Condition seasonally"],
  },
  {
    id: "z7-x08",
    slug: "field-utility-jacket",
    name: "Field Utility Jacket",
    category: "streetwear",
    price: 3199,
    fit: "Relaxed",
    fabric: "Cotton-nylon canvas",
    colors: [
      { name: "Stone", hex: "#b9b2a2" },
      { name: "Olive", hex: "#3f4630" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/field-utility-jacket-1.jpg"],
    blurb: "Four-pocket field jacket with a squared, workwear shoulder.",
    details: [
      "Cotton-nylon canvas",
      "Four-pocket layout",
      "Concealed hood in collar",
      "Relaxed workwear fit",
    ],
    care: CARE,
  },
  {
    id: "z7-x09",
    slug: "signal-knit-sweater",
    name: "Signal Knit Sweater",
    category: "streetwear",
    price: 2299,
    badge: "New",
    fit: "Relaxed",
    fabric: "7-gauge ribbed knit",
    colors: [
      { name: "Ember", hex: "#a84a2b" },
      { name: "Bone", hex: "#e7e2d6" },
    ],
    sizes: APPAREL_SIZES,
    images: ["/images/signal-knit-sweater-1.jpg"],
    blurb: "A chunky ribbed knit cut boxy — the sweater that does the work of a jacket indoors.",
    details: [
      "7-gauge chunky rib knit",
      "Boxy relaxed fit",
      "Ribbed crew neck, cuffs and hem",
      "Warm without the bulk",
    ],
    care: CARE,
  },
  {
    id: "z7-j06",
    slug: "site-chino-trousers",
    name: "Site Chino Trousers",
    category: "jeans",
    price: 1899,
    fit: "Straight",
    fabric: "Heavy cotton twill",
    colors: [
      { name: "Khaki", hex: "#b39b6d" },
      { name: "Olive", hex: "#3f4630" },
    ],
    sizes: WAIST_SIZES,
    images: ["/images/site-chino-trousers-1.jpg"],
    blurb: "A clean straight-leg chino in heavy twill — dress it up or beat it up.",
    details: [
      "Heavy cotton twill, garment washed",
      "Straight leg with a clean hem",
      "Side and back pockets",
      "Sits at the natural waist",
    ],
    care: CARE,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function byCategory(cat: CategoryId): Product[] {
  return products.filter((p) => p.category === cat);
}

export function categoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function relatedProducts(product: Product, count = 4): Product[] {
  const same = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  return [...same, ...others].slice(0, count);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.fit.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      categoryLabel(p.category).toLowerCase().includes(q)
  );
}

export const allSizes = {
  apparel: APPAREL_SIZES,
  waist: WAIST_SIZES,
};
