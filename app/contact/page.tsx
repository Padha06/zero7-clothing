import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Store",
  description:
    "Reach ZERO7 — order help, sizing, returns and the Nagpur studio. PAN India shipping with COD.",
};

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched from Nagpur within 24–48 hrs. Metro cities usually see delivery in 3–5 days, the rest of India in 4–8 days.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes — COD is available across India. A small handling fee may apply at checkout depending on your pin code.",
  },
  {
    q: "What if the size doesn't fit?",
    a: "We offer a 7-day exchange for size or fit. Start an exchange from your order confirmation, or message us on Instagram.",
  },
  {
    q: "Can I visit the studio?",
    a: `Yes. The ${site.city} studio is open ${site.hours}. Come try the fits before you buy, or collect an online order in person.`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Say hello"
        title={
          <>
            Talk to
            <br />
            <span className="font-display italic text-accent">a human.</span>
          </>
        }
        intro="Questions on an order, sizing, or a collab? Drop us a line — we answer everything ourselves."
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <h2 className="font-display text-3xl tracking-tight">Send a message</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <span className="label">The studio</span>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-stone">
                {site.hours}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex bg-ink px-6 py-3 font-sans text-[0.68rem] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-accent"
              >
                Open in Maps
              </a>
            </div>

            <div className="space-y-4 border-t border-line pt-8">
              <span className="label">Direct</span>
              <a href={`tel:${site.phoneHref}`} className="block text-[0.95rem] hover:text-accent">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block text-[0.95rem] hover:text-accent">
                {site.email}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="block text-[0.95rem] hover:text-accent"
              >
                {site.instagramHandle}
              </a>
            </div>

            <div className="space-y-3 border-t border-line pt-8 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-stone">
              <p>✦ {site.shipping}</p>
              <p>✦ {site.payments}</p>
              <p>✦ 7-day exchange</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-20">
        <Container>
          <span className="label">FAQ</span>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
            Answering the usual
          </h2>
          <div className="mt-8 max-w-3xl border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-sans text-[0.95rem]">{f.q}</span>
                  <span className="font-mono text-lg text-stone transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink2">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
