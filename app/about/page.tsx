import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHero, ArrowLink } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ZERO7 is a men's streetwear label from Nagpur, India. Small runs, honest prices, heavyweight fabrics and layers built to last.",
};

const values = [
  {
    n: "01",
    t: "Small runs",
    d: "Each drop is cut in limited quantity. When it's gone it's usually gone — we'd rather sell out than discount dead stock.",
  },
  {
    n: "02",
    t: "Honest pricing",
    d: "No fake MRPs, no permanent 70%-off theatre. One fair price that holds until the piece sells through.",
  },
  {
    n: "03",
    t: "Real fabric",
    d: "Heavyweight cottons, rigid denim and brushed fleece. We pick for how it wears after fifty washes, not the sample rail.",
  },
  {
    n: "04",
    t: "Straight from the studio",
    d: `Cut and dispatched from ${site.city}. No middlemen between you and the make.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker={`${site.established} · ${site.city}`}
        title={
          <>
            A wardrobe
            <br />
            <span className="font-display italic text-accent">built to last.</span>
          </>
        }
        intro="ZERO7 started with a simple frustration: streetwear in India was either disposable or overpriced. So we built the middle — heavy, honest, and made here."
      />

      {/* Story */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper2">
              <Image
                src="/images/edit-02.jpg"
                alt="Zero7 studio"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="img-grade object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="label">The idea</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.98] tracking-tight sm:text-5xl">
              Clothes for the between.
            </h2>
            <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-ink2">
              <p>
                Not fast fashion. Not luxury. ZERO7 lives in the middle ground — the heavyweight tee
                you reach for weekly, the denim that fades into exactly your shape, the fleece that
                actually winds out a Nagpur winter.
              </p>
              <p>
                Every piece is designed around a season and a street, made in small batches, and
                priced so you can build a rotation without wincing. We'd rather make fewer things
                and make them properly.
              </p>
              <p>
                This is Drop 03. If it sells through, restocks aren't guaranteed — that's how we keep
                the runs small and the quality where it should be.
              </p>
            </div>
            <div className="mt-8 flex gap-6">
              <ArrowLink href="/shop">Shop Drop 03</ArrowLink>
              <ArrowLink href="/looks">See it worn</ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-ink py-16 text-paper sm:py-24">
        <Container>
          <span className="label !text-paper/50">How we work</span>
          <h2 className="mt-3 max-w-xl font-display text-4xl leading-[0.98] tracking-tight sm:text-5xl">
            Four rules we don't break
          </h2>
          <Stagger className="mt-12 grid gap-px overflow-hidden border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.n} className="bg-ink p-7">
                <span className="font-mono text-[0.62rem] text-paper/40">{v.n}</span>
                <h3 className="mt-16 font-display text-2xl tracking-tight">{v.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{v.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Nagpur */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <span className="label">The city</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.98] tracking-tight sm:text-5xl">
              Nagpur runs through all of it.
            </h2>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-ink2">
              Zero, the centre of India. We're named for the point on the map where everything meets
              — and we build our fits the same way: a little of everything, cut sharp, made to move
              with the city.
            </p>
            <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink2">
              {site.shipping} means a ZERO7 piece reaches you anywhere in the country. {site.payments}
              {" "}for those who'd rather not pay online first.
            </p>
            <div className="mt-8">
              <ArrowLink href="/contact">Visit the studio</ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper2">
              <Image
                src="/images/edit-06.jpg"
                alt="Nagpur"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="img-grade object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-line py-20 text-center sm:py-28">
        <Container>
          <span className="label">Drop 03</span>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
            Go get the good stuff.
          </h2>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/shop"
              className="inline-flex bg-ink px-8 py-4 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
            >
              Shop the range
            </a>
            <a
              href="/looks"
              className="inline-flex border border-ink px-8 py-4 font-sans text-[0.72rem] uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper"
            >
              Lookbook
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
