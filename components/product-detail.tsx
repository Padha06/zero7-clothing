"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn, inr } from "@/lib/utils";
import { useCart } from "@/components/cart";
import { FitFinderBar, SizeGuide } from "@/components/fit-finder";
import { site } from "@/lib/site";
import type { Product } from "@/lib/products";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <div
        className="group relative aspect-[4/5] w-full overflow-hidden bg-paper2"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <Image
          src={product.images[active]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
          className={cn(
            "img-grade object-cover transition-transform duration-[1.4s] ease-smooth",
            zoom ? "scale-[1.35]" : "scale-100"
          )}
        />
        {product.badge && (
          <span className="absolute left-4 top-4 bg-paper/90 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.2em] backdrop-blur-sm">
            {product.badge}
          </span>
        )}
      </div>
      {product.images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/5] w-20 overflow-hidden bg-paper2 transition-opacity",
                active === i ? "opacity-100" : "opacity-50 hover:opacity-80"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img} alt="" fill sizes="80px" className="img-grade object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function BuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [fitOpen, setFitOpen] = useState(false);
  const isBottoms = product.category === "jeans";

  return (
    <div className="lg:sticky lg:top-28">
      <div className="flex flex-wrap items-center gap-3">
        <span className="label">{product.fit}</span>
        <span className="h-3 w-px bg-line" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-stone">
          {product.fabric}
        </span>
      </div>

      <h1 className="mt-4 font-display text-4xl leading-[0.98] tracking-tight sm:text-5xl">
        {product.name}
      </h1>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-sans text-xl tabular-nums">{inr(product.price)}</span>
        {product.compareAt && (
          <span className="text-stone line-through tabular-nums">{inr(product.compareAt)}</span>
        )}
        <span className="label">Incl. of all taxes</span>
      </div>

      <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink2">{product.blurb}</p>

      {/* Colour */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <span className="label">Colour</span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink">
            {color.name}
          </span>
        </div>
        <div className="mt-3 flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c)}
              aria-label={c.name}
              className={cn(
                "h-9 w-9 rounded-full border transition-all",
                color.name === c.name
                  ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper"
                  : "border-line hover:border-ink/50"
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <span className="label">Size</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFitOpen((v) => !v)}
              className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent underline decoration-accent/40 underline-offset-4"
            >
              {fitOpen ? "Close fit finder" : "Not sure? Find my size"}
            </button>
            <SizeGuide mode={isBottoms ? "waist" : "apparel"} />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                "border py-3 text-center font-mono text-[0.68rem] uppercase tracking-[0.1em] transition-colors",
                size === s
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink hover:border-ink"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {fitOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 overflow-hidden"
          >
            <FitFinderBar sizes={product.sizes} mode={isBottoms ? "waist" : "apparel"} />
          </motion.div>
        )}
      </div>

      {/* Qty + add */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch">
        <div className="flex items-center border border-line">
          <button
            className="px-4 py-3 hover:text-accent"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease"
          >
            −
          </button>
          <span className="min-w-8 text-center tabular-nums">{qty}</span>
          <button
            className="px-4 py-3 hover:text-accent"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase"
          >
            +
          </button>
        </div>
        <button
          disabled={!size}
          onClick={() => {
            if (!size) return;
            add(
              {
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size,
                color: color.name,
              },
              qty
            );
          }}
          className={cn(
            "flex flex-1 items-center justify-center py-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-all duration-300",
            size
              ? "bg-ink text-paper hover:bg-accent"
              : "cursor-not-allowed bg-paper2 text-stone"
          )}
        >
          {size ? "Add to bag" : "Select a size"}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-stone">
        <span>✦ {site.shipping}</span>
        <span>✦ {site.payments}</span>
        <span>✦ 7-day exchange</span>
      </div>

      <Accordion
        items={[
          { title: "Details", body: product.details },
          { title: "Fabric & care", body: [product.fabric, ...product.care] },
          {
            title: "Shipping & returns",
            body: [
              "Dispatched within 24–48 hrs from Nagpur.",
              "Free PAN-India shipping over ₹1,499. COD available.",
              "7-day exchange for size or fit. See policies at checkout.",
            ],
          },
        ]}
      />
    </div>
  );
}

function Accordion({ items }: { items: { title: string; body: string[] }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-10 border-t border-line">
      {items.map((it, i) => (
        <div key={it.title} className="border-b border-line">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between py-4 text-left"
          >
            <span className="font-sans text-[0.8rem] uppercase tracking-[0.14em]">{it.title}</span>
            <span className="font-mono text-lg leading-none text-stone">
              {open === i ? "−" : "+"}
            </span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-1.5 pb-5 text-sm text-ink2">
              {it.body.map((b, bi) => (
                <li key={bi}>• {b}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
