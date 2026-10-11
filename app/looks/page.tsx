import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { LookSection } from "@/components/shop-the-look";
import { looks } from "@/lib/looks";
import { journal } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Lookbook — Shop the Look",
  description:
    "The Zero7 lookbook, shoppable head to toe. Editorial fits styled with tees, shirts, jackets, sweaters, jeans and pants — tap a pin to buy any piece, or take the whole look. PAN India shipping with COD.",
};

export default function LooksPage() {
  return (
    <>
      <PageHero
        kicker="Lookbook · Drop 03"
        title={
          <>
            Worn head
            <br />
            <span className="font-display italic text-accent">to toe.</span>
          </>
        }
        intro="Every look is shoppable. Tap a pin to add the piece, or take the entire fit in one click."
      />

      {looks.map((look, i) => (
        <LookSection key={look.slug} look={look} index={i} />
      ))}

      {/* The Journal — editorial reads */}
      <section className="cv-auto border-t border-line py-16 sm:py-24">
        <div className="mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12">
          <span className="label">The Journal</span>
          <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
            How to wear it
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {journal.map((j, i) => (
              <Reveal key={j.slug} delay={i * 0.06}>
                <a href="/about" className="group flex flex-col">
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
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 text-center sm:py-20">
        <div className="mx-auto max-w-shell px-5 sm:px-8 lg:px-12">
          <span className="label">More fits</span>
          <h2 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Want the whole range?
          </h2>
          <a
            href="/shop"
            className="mt-7 inline-flex bg-ink px-8 py-4 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
          >
            Shop everything
          </a>
        </div>
      </section>
    </>
  );
}
