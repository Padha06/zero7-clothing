"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn, inr } from "@/lib/utils";
import { useCart } from "@/components/cart";
import { getProduct, type Product } from "@/lib/products";
import type { Look } from "@/lib/looks";

export function LookSection({ look, index }: { look: Look; index: number }) {
  const items = look.items
    .map((it) => ({ ...it, product: getProduct(it.slug) }))
    .filter((it): it is typeof it & { product: Product } => Boolean(it.product));

  const [active, setActive] = useState<number | null>(null);
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [addedAll, setAddedAll] = useState(false);
  const { add } = useCart();

  const sizeOf = (p: Product) => sizes[p.slug] ?? (p.sizes.includes("M") ? "M" : p.sizes[0]);
  const total = items.reduce((n, it) => n + it.product.price, 0);
  const flip = index % 2 === 1;

  const addLook = () => {
    items.forEach((it) => {
      add({
        id: it.product.id,
        slug: it.product.slug,
        name: it.product.name,
        price: it.product.price,
        image: it.product.images[0],
        size: sizeOf(it.product),
        color: it.product.colors[0].name,
      });
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 1800);
  };

  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-shell gap-10 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.85fr] lg:gap-16 lg:px-12">
        {/* Image + hotspots */}
        <div className={cn(flip && "lg:order-2")}>
          <div
            className="relative aspect-[2/3] w-full overflow-hidden bg-paper2"
            onClick={() => setActive(null)}
          >
            <Image
              src={look.image}
              alt={`${look.title} — shop the look`}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="img-grade object-cover"
            />

            {/* Hotspot pins */}
            {items.map((it, i) => (
              <button
                key={it.slug}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                style={{ left: `${it.x}%`, top: `${it.y}%` }}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                aria-label={`${it.garment}: ${it.product.name}`}
              >
                <span className="relative flex h-7 w-7 items-center justify-center">
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full rounded-full bg-paper/70",
                      active !== i && "animate-ping"
                    )}
                  />
                  <span
                    className={cn(
                      "relative flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[0.6rem] shadow-sm backdrop-blur-sm transition-colors",
                      active === i
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/20 bg-paper/90 text-ink"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              </button>
            ))}

            {/* Active item card */}
            <AnimatePresence>
              {active !== null && items[active] && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-3 bg-paper/95 p-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4"
                >
                  <Link
                    href={`/product/${items[active].product.slug}`}
                    className="relative h-16 w-14 shrink-0 overflow-hidden bg-paper2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={items[active].product.images[0]}
                      alt={items[active].product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <span className="label">{items[active].garment}</span>
                    <Link
                      href={`/product/${items[active].product.slug}`}
                      className="block truncate font-sans text-sm font-medium"
                    >
                      {items[active].product.name}
                    </Link>
                    <span className="text-sm tabular-nums">
                      {inr(items[active].product.price)}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      add({
                        id: items[active].product.id,
                        slug: items[active].product.slug,
                        name: items[active].product.name,
                        price: items[active].product.price,
                        image: items[active].product.images[0],
                        size: sizeOf(items[active].product),
                        color: items[active].product.colors[0].name,
                      })
                    }
                    className="shrink-0 bg-ink px-4 py-2.5 font-sans text-[0.62rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent"
                  >
                    Add
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Panel */}
        <div className={cn(flip && "lg:order-1")}>
          <span className="label">{look.kicker}</span>
          <h2 className="mt-3 font-display text-4xl leading-[0.98] tracking-tight sm:text-5xl">
            {look.title}
          </h2>
          <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink2">{look.blurb}</p>

          <ul className="mt-8 border-t border-line">
            {items.map((it, i) => (
              <li
                key={it.slug}
                className={cn(
                  "flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 border-b border-line py-3.5 sm:py-4 transition-colors",
                  active === i ? "bg-accent/[0.06]" : "hover:bg-ink/[0.03]"
                )}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={active === i}
                    aria-label={`Highlight ${it.product.name}`}
                    className={cn(
                      "font-mono text-[0.6rem] tabular-nums transition-colors",
                      active === i ? "text-accent" : "text-stone hover:text-ink"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                  <Link
                    href={`/product/${it.product.slug}`}
                    className={cn(
                      "relative h-14 w-12 sm:h-16 sm:w-14 shrink-0 overflow-hidden bg-paper2 transition-all",
                      active === i && "outline outline-1 outline-offset-2 outline-accent"
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.product.images[0]}
                      alt={it.product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <span className="label text-[0.6rem]">{it.garment}</span>
                    <Link
                      href={`/product/${it.product.slug}`}
                      className="block truncate font-sans text-xs sm:text-sm font-medium"
                    >
                      {it.product.name}
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto mt-1 sm:mt-0">
                  <span className="shrink-0 text-xs sm:text-sm tabular-nums">{inr(it.product.price)}</span>
                  <select
                    value={sizeOf(it.product)}
                    onChange={(e) =>
                      setSizes((s) => ({ ...s, [it.product.slug]: e.target.value }))
                    }
                    aria-label={`Size for ${it.product.name}`}
                    className="shrink-0 border border-line bg-transparent px-2 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] outline-none focus:border-ink"
                  >
                    {it.product.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      add({
                        id: it.product.id,
                        slug: it.product.slug,
                        name: it.product.name,
                        price: it.product.price,
                        image: it.product.images[0],
                        size: sizeOf(it.product),
                        color: it.product.colors[0].name,
                      })
                    }
                    className="shrink-0 border border-ink px-3 py-1.5 font-sans text-[0.6rem] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper"
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <span className="label">Full look</span>
              <p className="font-display text-2xl leading-none tabular-nums">{inr(total)}</p>
            </div>
            <button
              onClick={addLook}
              className={cn(
                "inline-flex items-center gap-2 px-7 py-3.5 font-sans text-[0.68rem] uppercase tracking-[0.18em] transition-colors",
                addedAll ? "bg-olive text-paper" : "bg-ink text-paper hover:bg-accent"
              )}
            >
              {addedAll ? "✓ Look added" : "Add the full look"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
