"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { products, categories, searchProducts, type Product, type CategoryId } from "@/lib/products";
import { ProductGrid } from "@/components/product-card";

type Sort = "featured" | "low" | "high" | "new";

const FITS = ["Oversized", "Relaxed", "Regular", "Straight", "Wide", "Baggy"];
const SIZES = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];

export function ShopBrowser() {
  const params = useSearchParams();
  const initialCat = (params.get("c") as CategoryId | null) ?? "all";
  const q = params.get("q") ?? "";

  const [cat, setCat] = useState<CategoryId | "all">(initialCat);
  const [fits, setFits] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setCat(initialCat);
  }, [initialCat]);

  const source = q ? searchProducts(q) : products;

  const filtered = useMemo(() => {
    let list: Product[] = source;
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (fits.length) list = list.filter((p) => fits.includes(p.fit));
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    const sorted = [...list];
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "new") sorted.sort((a, b) => (b.badge === "New" || b.badge === "Drop 03" ? 1 : 0) - (a.badge === "New" || a.badge === "Drop 03" ? 1 : 0));
    return sorted;
  }, [source, cat, fits, sizes, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const activeCount = fits.length + sizes.length + (cat !== "all" ? 1 : 0);

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <span className="label">Category</span>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip active={cat === "all"} onClick={() => setCat("all")}>All</Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <span className="label">Fit</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {FITS.map((f) => (
            <Chip key={f} active={fits.includes(f)} onClick={() => toggle(fits, setFits, f)}>
              {f}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <span className="label">Size</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <Chip key={s} active={sizes.includes(s)} onClick={() => toggle(sizes, setSizes, s)}>
              {s}
            </Chip>
          ))}
        </div>
      </div>
      {activeCount > 0 && (
        <button
          onClick={() => {
            setCat("all");
            setFits([]);
            setSizes([]);
          }}
          className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent underline underline-offset-4"
        >
          Clear all ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-stone">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          {q && <> · “{q}”</>}
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="font-mono text-[0.65rem] uppercase tracking-[0.18em] lg:hidden"
          >
            Filters {activeCount > 0 && `(${activeCount})`}
          </button>
          <label className="flex items-center gap-3">
            <span className="label">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border-b border-ink/30 bg-transparent py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] outline-none"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="low">Price ↑</option>
              <option value="high">Price ↓</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-[220px_1fr] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{FilterPanel}</div>
        </aside>

        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden pb-8 lg:hidden"
          >
            {FilterPanel}
          </motion.div>
        )}

        <div>
          {filtered.length === 0 ? (
            <p className="py-24 text-center font-display text-3xl text-stone">
              Nothing matches — try a different fit.
            </p>
          ) : (
            <ProductGrid products={filtered} priorityCount={4} />
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-colors",
        active ? "border-ink bg-ink text-paper" : "border-line text-ink/80 hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}
