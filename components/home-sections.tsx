"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn, inr } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem, Ticker, Countdown } from "@/components/motion";
import { Container, ArrowLink } from "@/components/ui";
import { ProductGrid } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter";
import { products, categories } from "@/lib/products";
import { getProduct } from "@/lib/products";
import { journal } from "@/lib/collections";
import { looks } from "@/lib/looks";
import { site, marquee } from "@/lib/site";

/* ----------------------------- HERO ----------------------------- */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden pt-[104px]">
      <Container className="grid min-h-[calc(92vh-104px)] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-0">
        <div className="order-1 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="label inline-flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Drop 03 · Live now
          </motion.span>

          <h1 className="mt-6 flex flex-wrap items-baseline gap-x-4 font-display text-[3rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.6rem]">
            {["Street", "wear", "from"].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="font-display italic text-accent"
            >
              Nagpur.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-ink2"
          >
            {site.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-ink px-8 py-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
            >
              Shop the drop
              <span className="transition-transform duration-500 ease-smooth group-hover:translate-x-1">→</span>
            </Link>
            <ArrowLink href="/looks">Shop the look</ArrowLink>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-stone">
            <span>{site.shipping}</span>
            <span>{site.payments}</span>
            <span>Made in India</span>
          </div>
        </div>

        <motion.div
          style={{ y, scale }}
          initial={{ opacity: 0, clipPath: "inset(12% 0 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-2"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-paper2 sm:aspect-[4/5] lg:aspect-[4/5.4]">
            <Image
              src="/images/hero-01.jpg"
              alt="Zero7 streetwear editorial"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="img-grade object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-paper/90 px-3 py-2 backdrop-blur-sm">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em]">
                Look 01 — Concrete Sundays
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* --------------------------- MARQUEE --------------------------- */
export function MarqueeStrip() {
  return (
    <div className="border-y border-line bg-paper2 py-3.5 text-ink">
      <Ticker items={marquee} />
    </div>
  );
}

/* ------------------------- CATEGORY RAIL ------------------------ */
export function CategoryRail() {
  return (
    <section className="cv-auto py-20 sm:py-28">
      <Container>
        <div className="flex items-end justify-between">
          <div>
            <span className="label">Shop the range</span>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
              Four ways to build a fit
            </h2>
          </div>
          <ArrowLink href="/shop" className="hidden sm:inline-flex">
            All pieces
          </ArrowLink>
        </div>

        <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((c, i) => (
            <StaggerItem key={c.id}>
              <Link href={c.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-paper2">
                  <Image
                    src={c.cover}
                    alt={c.label}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="img-grade object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-[1.06]"
                  />
                  <span className="absolute right-3 top-3 bg-paper/85 px-2 py-1 font-mono text-[0.55rem] tracking-[0.18em] text-ink backdrop-blur-sm">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-sans text-[0.86rem] font-medium uppercase tracking-[0.06em]">
                    {c.label}
                  </h3>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-stone">
                    {c.blurb}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

/* --------------------------- FIT RAIL --------------------------- */
const fits = [
  { label: "Oversized", note: "Boxy tees & hoodies", cat: "tees" },
  { label: "Baggy", note: "Full-leg denim", cat: "jeans" },
  { label: "Relaxed", note: "Open overshirts", cat: "shirts" },
  { label: "Layered", note: "Bombers & fleece", cat: "streetwear" },
];

export function FitRail() {
  return (
    <section className="cv-auto border-y border-line bg-ink py-16 text-paper sm:py-20">
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="label !text-paper/50">Don't know the name?</span>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
              Shop by silhouette
            </h2>
          </div>
          <p className="max-w-xs text-sm text-paper/60">
            Choose the shape you want. We'll show you what fits.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-paper/15 bg-paper/15 sm:grid-cols-4">
          {fits.map((f, i) => (
            <Link
              key={f.label}
              href={`/shop?c=${f.cat}`}
              className="group relative flex flex-col justify-between bg-ink p-6 transition-colors duration-500 hover:bg-paper hover:text-ink sm:p-8"
            >
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-paper/40 group-hover:text-ink/40">
                0{i + 1}
              </span>
              <div className="mt-14">
                <h3 className="font-display text-3xl leading-none tracking-tight sm:text-4xl">
                  {f.label}
                </h3>
                <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-paper/50 group-hover:text-ink/50">
                  {f.note}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------- DROP FEATURE ------------------------ */
export function DropFeature() {
  const feature = ["signal-heavy-hoodie", "yardage-baggy-jeans", "monolith-oversized-tee"]
    .map((s) => getProduct(s))
    .filter(Boolean);

  return (
    <section className="cv-auto py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="label">Drop 03</span>
              <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
                Built for the season between seasons.
              </h2>
            </div>
            <div>
              <p className="max-w-md text-[0.98rem] leading-relaxed text-ink2">
                Heavyweight fleece, full-leg denim and tees that hold their shape. Cut in small runs
                so the good ones stay good. Restocks are rare — that's the point.
              </p>
              <div className="mt-6">
                <span className="label">Drop 04 lands in</span>
                <Countdown target="2026-11-14T20:00:00+05:30" className="mt-3 text-ink" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {feature.map((p, i) => (
            <Reveal key={p!.id} delay={i * 0.08}>
              <Link href={`/product/${p!.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-paper2">
                  <Image
                    src={p!.images[0]}
                    alt={p!.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="img-grade object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-sans text-[0.86rem] font-medium">{p!.name}</h3>
                  <span className="text-[0.86rem] tabular-nums">{inr(p!.price)}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------- BESTSELLERS ------------------------- */
export function Bestsellers() {
  const picks = ["signal-heavy-hoodie", "yardage-baggy-jeans", "quarry-overshirt", "monolith-oversized-tee", "depot-bomber", "palewash-wide-jeans", "flawless-graphic-tee", "site-cargo-pants"]
    .map((s) => getProduct(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];

  return (
    <section className="cv-auto border-t border-line py-20 sm:py-24">
      <Container>
        <div className="flex items-end justify-between">
          <div>
            <span className="label">Most asked for</span>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
              The ones that keep selling out
            </h2>
          </div>
          <ArrowLink href="/shop" className="hidden sm:inline-flex">
            Shop all
          </ArrowLink>
        </div>
        <div className="mt-12">
          <ProductGrid products={picks} priorityCount={0} />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------ EDITORIAL BANNER ---------------------- */
export function EditorialBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[78vh] min-h-[520px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%]">
        <Image
          src="/images/edit-04.jpg"
          alt="Zero7 editorial"
          fill
          sizes="100vw"
          className="img-grade object-cover object-[50%_35%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/35" />
      <Container className="relative flex h-full items-center">
        <Reveal className="max-w-2xl text-paper">
          <span className="label !text-paper/70">The Zero7 standard</span>
          <p className="mt-5 font-display text-3xl italic leading-tight sm:text-5xl">
            "Clothes you reach for without thinking. Built heavy, priced honest, made for the street."
          </p>
          <div className="mt-8">
            <ArrowLink href="/about" className="!text-paper">
              Our story
            </ArrowLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------- TRANSPARENCY ------------------------ */
const promises = [
  { n: "01", t: "Small runs", d: "We cut limited quantities, not endless catalogues. Better fabric, no waste." },
  { n: "02", t: "Honest pricing", d: "No inflated MRPs and permanent 'sales'. One fair price, all year." },
  { n: "03", t: "Shipped from Nagpur", d: `${site.shipping}, COD available, dispatched within 24–48 hrs.` },
];

export function Transparency() {
  return (
    <section className="cv-auto py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="label">Why Zero7</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.98] tracking-tight sm:text-5xl">
              Loud clothes.
              <br />
              Quiet promises.
            </h2>
          </Reveal>
          <Stagger className="grid gap-px overflow-hidden border-t border-line">
            {promises.map((p) => (
              <StaggerItem key={p.n} className="border-b border-line">
                <div className="grid grid-cols-[auto_1fr] gap-6 py-7 sm:grid-cols-[48px_160px_1fr] sm:gap-8">
                  <span className="font-mono text-[0.62rem] text-stone">{p.n}</span>
                  <h3 className="font-display text-2xl tracking-tight">{p.t}</h3>
                  <p className="col-span-2 text-sm leading-relaxed text-ink2 sm:col-span-1">{p.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------- COMMUNITY ------------------------- */
export function Community() {
  const shots = [
    { img: "/images/comm-01.jpg", handle: "@zero7.clothing" },
    { img: "/images/edit-01.jpg", handle: "@arjun.k" },
    { img: "/images/hood-10.jpg", handle: "@streetnagpur" },
    { img: "/images/jack-05.jpg", handle: "@dailyfits" },
    { img: "/images/shirt-06.jpg", handle: "@zero7.clothing" },
    { img: "/images/jeans-05.jpg", handle: "@wearzeroseven" },
  ];
  return (
    <section className="cv-auto border-y border-line bg-paper2 py-20 sm:py-24">
      <Container>
        <div className="flex items-end justify-between">
          <div>
            <span className="label">Worn by Zero7</span>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
              Tag us. We'll repost.
            </h2>
          </div>
          <ArrowLink href={site.instagram} className="hidden sm:inline-flex">
            {site.instagramHandle}
          </ArrowLink>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {shots.map((s, i) => (
            <a
              key={i}
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-[4/5] overflow-hidden bg-paper lg:aspect-[3/4]"
            >
              <Image
                src={s.img}
                alt={s.handle}
                fill
                sizes="(max-width: 640px) 50vw, 16vw"
                className="img-grade object-cover transition-transform duration-[1.1s] ease-smooth group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 flex items-end bg-ink/0 p-3 transition-colors duration-500 group-hover:bg-ink/40">
                <span className="translate-y-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {s.handle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------- LOOKBOOK --------------------------- */
export function LookbookTeaser() {
  const picks = looks.slice(0, 3);
  return (
    <section className="cv-auto py-20 sm:py-24">
      <Container>
        <div className="flex items-end justify-between">
          <div>
            <span className="label">The lookbook</span>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
              Worn head to toe
            </h2>
          </div>
          <ArrowLink href="/looks" className="hidden sm:inline-flex">
            Shop the looks
          </ArrowLink>
        </div>
        <Stagger className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {picks.map((l) => (
            <StaggerItem key={l.slug}>
              <Link href="/looks" className="group block">
                <div className="relative aspect-[2/3] overflow-hidden bg-paper2">
                  <Image
                    src={l.image}
                    alt={l.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="img-grade object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-3 top-3 bg-paper/85 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] backdrop-blur-sm">
                    {l.items.length} pieces
                  </span>
                </div>
                <span className="mt-4 block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-stone">
                  {l.kicker}
                </span>
                <h3 className="mt-1 font-display text-2xl tracking-tight">{l.title}</h3>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

/* ------------------------ JOURNAL TEASER ------------------------ */
export function JournalTeaser() {
  return (
    <section className="cv-auto border-t border-line py-20 sm:py-24">
      <Container>
        <div className="flex items-end justify-between">
          <div>
            <span className="label">The Journal</span>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
              Reads, not ads
            </h2>
          </div>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {journal.map((j, i) => (
            <Reveal key={j.slug} delay={i * 0.06}>
              <Link href="/about" className="group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-paper2">
                  <Image
                    src={j.cover}
                    alt={j.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="img-grade object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-[1.05]"
                  />
                </div>
                <span className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-stone">
                  {j.date}
                </span>
                <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight group-hover:text-accent">
                  {j.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{j.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------- STORE ------------------------------ */
export function StoreStrip() {
  return (
    <section className="cv-auto border-y border-line bg-paper2 py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <span className="label">Visit us</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.98] tracking-tight sm:text-5xl">
              The Zero7 studio, {site.city}
            </h2>
            <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-ink2">
              Try the fits in person, pick up an online order, or just come argue about denim.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-2 gap-6 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink2">
              <div>
                <span className="label">Address</span>
                <p className="mt-2 normal-case tracking-normal text-sm text-ink">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </p>
              </div>
              <div>
                <span className="label">Hours</span>
                <p className="mt-2 text-sm text-ink">{site.hours}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex bg-ink px-7 py-3.5 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
              >
                Get directions
              </a>
              <ArrowLink href="/contact">Contact</ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden bg-paper">
              <Image
                src="/images/comm-02.jpg"
                alt="Zero7 studio"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="img-grade object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------- NEWSLETTER --------------------------- */
export function NewsletterBlock() {
  return (
    <section className="cv-auto py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="label">Join the list</span>
          <h2 className="mt-4 font-display text-4xl leading-[0.98] tracking-tight sm:text-6xl">
            First in line for Drop 04
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[0.98rem] leading-relaxed text-ink2">
            Get the drop dates, restocks and subscriber-only pieces before they hit the site.
          </p>
          <div className="mx-auto mt-8 max-w-md text-left">
            <NewsletterForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
