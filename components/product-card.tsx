"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn, inr } from "@/lib/utils";
import { useCart } from "@/components/cart";
import type { Product } from "@/lib/products";

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  const { add } = useCart();
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const second = product.images[1];

  return (
    <motion.article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper2">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "img-grade object-cover transition-all duration-[1.1s] ease-smooth",
              hover && second ? "opacity-0" : "opacity-100",
              hover && "scale-[1.04]"
            )}
          />
          {second && (
            <Image
              src={second}
              alt={`${product.name} alternate`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "img-grade object-cover transition-opacity duration-[1.1s] ease-smooth",
                hover ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          {product.badge && (
            <span className="absolute left-3 top-3 bg-paper/90 px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
              {product.badge}
            </span>
          )}

          {product.compareAt && (
            <span className="absolute right-3 top-3 bg-accent px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.2em] text-paper">
              Sale
            </span>
          )}

          {/* Quick add */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 translate-y-full bg-ink/95 px-3 py-3 backdrop-blur-sm transition-transform duration-500 ease-smooth",
              hover && "translate-y-0"
            )}
          >
            {added ? (
              <p className="py-1 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper">
                ✓ Added to bag
              </p>
            ) : (
              <div className="flex items-center justify-center gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => {
                      e.preventDefault();
                      add({
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                        size: s,
                        color: product.colors[0].name,
                      });
                      setAdded(true);
                      setTimeout(() => setAdded(false), 1400);
                    }}
                    className="min-w-8 px-1.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-wide text-paper/80 transition-colors hover:bg-paper hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <Link href={`/product/${product.slug}`} className="min-w-0">
          <h3 className="truncate font-sans text-[0.82rem] font-medium leading-snug text-ink">
            {product.name}
          </h3>
          <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-stone">
            {product.fit} · {product.fabric.split(",")[0]}
          </p>
        </Link>
        <div className="shrink-0 text-right">
          <span className="font-sans text-[0.82rem] tabular-nums">{inr(product.price)}</span>
          {product.compareAt && (
            <span className="ml-2 font-sans text-[0.72rem] tabular-nums text-stone line-through">
              {inr(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProductGrid({
  products,
  columns = 4,
  priorityCount = 0,
}: {
  products: Product[];
  columns?: 3 | 4;
  priorityCount?: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-y-14",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} priority={i < priorityCount} />
      ))}
    </div>
  );
}
