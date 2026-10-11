"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { inr } from "@/lib/utils";
import { site } from "@/lib/site";

export interface CartLine {
  key: string;
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

type Action =
  | { type: "add"; line: Omit<CartLine, "key" | "qty">; qty?: number }
  | { type: "remove"; key: string }
  | { type: "qty"; key: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const key = `${action.line.id}-${action.line.size}-${action.line.color}`;
      const qty = action.qty ?? 1;
      const existing = state.find((l) => l.key === key);
      if (existing) {
        return state.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      }
      return [...state, { ...action.line, key, qty }];
    }
    case "remove":
      return state.filter((l) => l.key !== action.key);
    case "qty":
      return state
        .map((l) => (l.key === action.key ? { ...l, qty: Math.max(1, action.qty) } : l))
        .filter((l) => l.qty > 0);
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  lastAdded: string | null;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("zero7-cart");
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("zero7-cart", JSON.stringify(lines));
    } catch {}
  }, [lines]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0);
    return {
      lines,
      count,
      subtotal,
      open,
      setOpen,
      add: (line, qty) => {
        dispatch({ type: "add", line, qty });
        setLastAdded(`${line.name} · ${line.size}`);
        setOpen(true);
      },
      remove: (key) => dispatch({ type: "remove", key }),
      setQty: (key, qty) => dispatch({ type: "qty", key, qty }),
      clear: () => dispatch({ type: "clear" }),
      lastAdded,
    };
  }, [lines, open, lastAdded]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CartDrawer />
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

const FREE_SHIP = 1499;

export function CartDrawer() {
  const { lines, open, setOpen, subtotal, remove, setQty, count } = useCart();
  const remaining = Math.max(0, FREE_SHIP - subtotal);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-paper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between border-b border-line px-6 py-5">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl">Your Bag</span>
                <span className="label">({count})</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close bag"
                className="label hover:text-ink"
              >
                Close
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <p className="font-display text-3xl leading-tight">Nothing in the bag yet.</p>
                <p className="max-w-xs text-sm text-stone">
                  The good stuff goes fast — small runs only.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="mt-2 bg-ink px-7 py-3.5 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
                >
                  Shop the drop
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-line bg-paper2 px-6 py-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink2">
                    {remaining > 0
                      ? `Add ${inr(remaining)} for free shipping`
                      : "✓ Free PAN-India shipping unlocked"}
                  </p>
                  <div className="mt-2 h-1 w-full bg-line">
                    <div
                      className="h-1 bg-accent transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6">
                  {lines.map((l) => (
                    <div key={l.key} className="flex gap-4 border-b border-line py-5">
                      <Link
                        href={`/product/${l.slug}`}
                        onClick={() => setOpen(false)}
                        className="relative h-28 w-24 shrink-0 overflow-hidden bg-paper2"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <Link
                            href={`/product/${l.slug}`}
                            onClick={() => setOpen(false)}
                            className="font-sans text-sm font-medium leading-snug"
                          >
                            {l.name}
                          </Link>
                          <span className="text-sm tabular-nums">{inr(l.price * l.qty)}</span>
                        </div>
                        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-stone">
                          {l.color} · Size {l.size}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-line">
                            <button
                              className="px-3 py-1 text-sm hover:text-accent"
                              onClick={() => setQty(l.key, l.qty - 1)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="min-w-7 text-center text-sm tabular-nums">
                              {l.qty}
                            </span>
                            <button
                              className="px-3 py-1 text-sm hover:text-accent"
                              onClick={() => setQty(l.key, l.qty + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => remove(l.key)}
                            className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-stone hover:text-accent"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="border-t border-line px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="label">Subtotal</span>
                    <span className="font-display text-2xl tabular-nums">{inr(subtotal)}</span>
                  </div>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-stone">
                    Shipping &amp; COD calculated at checkout
                  </p>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="mt-4 flex w-full items-center justify-center bg-ink py-4 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-3 w-full text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone hover:text-ink"
                  >
                    Continue shopping
                  </button>
                  <p className="mt-4 text-center font-mono text-[0.58rem] uppercase tracking-[0.16em] text-stone">
                    {site.shipping} · {site.payments}
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
