"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { nav, announcements, site } from "@/lib/site";
import { useCart } from "@/components/cart";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-baseline gap-[1px]", className)}>
      <span className="font-sans text-[1.35rem] font-extrabold leading-none tracking-tightest">
        ZERO
      </span>
      <span className="font-display text-[1.7rem] italic leading-none text-accent transition-transform duration-500 ease-smooth group-hover:rotate-12">
        7
      </span>
    </Link>
  );
}

function AnnouncementStrip() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % announcements.length), 3800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative h-9 overflow-hidden bg-ink text-paper">
      <div className="mx-auto flex h-full max-w-shell items-center justify-between px-5 sm:px-8 lg:px-12">
        <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/60 sm:block">
          {site.established}
        </span>
        <div className="relative h-full flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center font-mono text-[0.6rem] uppercase tracking-[0.22em]"
            >
              {announcements[i]}
            </motion.span>
          </AnimatePresence>
        </div>
        <Link
          href="/shop"
          className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/60 hover:text-accent sm:block"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  const solid = scrolled || !overHero;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <AnnouncementStrip />
        <header
          className={cn(
            "transition-colors duration-500",
            solid ? "border-b border-line bg-paper/90 backdrop-blur-md" : "bg-transparent"
          )}
        >
          <div
            className={cn(
              "mx-auto flex max-w-shell items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12",
              solid ? "py-4" : "py-5"
            )}
          >
            <div className="flex items-center gap-8">
              <Logo className="text-ink" />
              <nav className="hidden items-center gap-7 lg:flex">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="link-underline font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink/80 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-5">
              <Link
                href="/shop"
                className="hidden font-mono text-[0.62rem] uppercase tracking-[0.2em] text-stone transition-colors hover:text-ink sm:block"
              >
                Search
              </Link>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open bag"
                className="relative flex items-center gap-2 text-ink transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 7h12l-1.4 12.5a2 2 0 0 1-2 1.5h-5.2a2 2 0 0 1-2-1.5L6 7z" />
                  <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
                <span className="font-mono text-[0.62rem] tabular-nums">({count})</span>
              </button>
              <button
                onClick={() => setMenu(true)}
                aria-label="Open menu"
                className="text-ink lg:hidden"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[110] flex flex-col bg-ink text-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-5 py-6 sm:px-8">
              <Logo className="text-paper" />
              <button onClick={() => setMenu(false)} className="label text-paper/70 hover:text-paper">
                Close
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6 sm:px-10">
              {nav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block py-2 font-display text-5xl leading-tight tracking-tight hover:text-accent sm:text-6xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/15 px-6 py-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/60 sm:px-10">
              <span>{site.shipping}</span>
              <span>{site.payments}</span>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-paper">
                {site.instagramHandle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
