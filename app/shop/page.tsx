import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui";
import { ShopBrowser } from "@/components/shop-browser";

export const metadata: Metadata = {
  title: "Shop — T-Shirts, Shirts, Jeans & Streetwear",
  description:
    "Browse the full ZERO7 range — heavyweight oversized tees, overshirts, baggy denim and streetwear layers. Filter by fit and size.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        kicker="The full range"
        title={
          <>
            Every piece,
            <br />
            <span className="font-display italic text-accent">one page.</span>
          </>
        }
        intro="Filter by category, fit and size. Small runs mean some cuts sell through — if you see it, take it."
      />
      <section className="py-12 sm:py-16">
        <Suspense fallback={<div className="label px-5 sm:px-8 lg:px-12">Loading range…</div>}>
          <ShopBrowserWrapper />
        </Suspense>
      </section>
    </>
  );
}

function ShopBrowserWrapper() {
  return (
    <div className="mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12">
      <ShopBrowser />
    </div>
  );
}
