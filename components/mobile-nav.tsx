"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart";

const items = [
  {
    label: "Home",
    href: "/",
    match: (p: string) => p === "/",
    icon: (
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
    ),
  },
  {
    label: "Shop",
    href: "/shop",
    match: (p: string) => p.startsWith("/shop") || p.startsWith("/product"),
    icon: (
      <>
        <path d="M4 7h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </>
    ),
  },
  {
    label: "Looks",
    href: "/looks",
    match: (p: string) => p.startsWith("/looks"),
    icon: (
      <>
        <path d="M12 3.5 14 9l5.5 2-4 3.2 1 5.8L12 17l-4.5 3 1-5.8-4-3.2L10 9z" />
      </>
    ),
  },
  {
    label: "Bag",
    href: "/checkout",
    match: (p: string) => p.startsWith("/checkout"),
    icon: (
      <>
        <path d="M6 7h12l-1.4 12.5a2 2 0 0 1-2 1.5h-5.2a2 2 0 0 1-2-1.5z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </>
    ),
  },
];

export function MobileNav() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-4">
        {items.map((it) => {
          const active = it.match(pathname);
          const isBag = it.label === "Bag";
          const inner = (
            <>
              <span className="relative">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={active ? 1.9 : 1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {it.icon}
                </svg>
                {isBag && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[0.5rem] text-paper">
                    {count}
                  </span>
                )}
              </span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em]">
                {it.label}
              </span>
            </>
          );
          return isBag ? (
            <button
              key={it.label}
              onClick={() => setOpen(true)}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 transition-colors",
                active ? "text-ink" : "text-stone"
              )}
            >
              {inner}
            </button>
          ) : (
            <Link
              key={it.label}
              href={it.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 transition-colors",
                active ? "text-ink" : "text-stone"
              )}
            >
              {inner}
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
