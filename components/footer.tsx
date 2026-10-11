import Link from "next/link";
import { site, nav } from "@/lib/site";
import { Container, Rule } from "@/components/ui";
import { NewsletterForm } from "@/components/newsletter";
import { categories } from "@/lib/products";

const help = [
  { label: "Shipping & Returns", href: "/contact" },
  { label: "Size Guide", href: "/shop" },
  { label: "Track Order", href: "/contact" },
  { label: "Contact", href: "/contact" },
];

const company = [
  { label: "About Zero7", href: "/about" },
  { label: "Shop the Look", href: "/looks" },
  { label: "Visit the studio", href: "/contact" },
  { label: "The Journal", href: "/about" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="flex items-baseline gap-[1px]">
              <span className="font-sans text-2xl font-extrabold leading-none tracking-tightest">
                ZERO
              </span>
              <span className="font-display text-3xl italic leading-none text-accent">7</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-paper/70">{site.intro}</p>
            <div className="mt-7 max-w-xs">
              <span className="label !text-paper/50">Join the drop list</span>
              <div className="mt-3">
                <NewsletterForm dark />
              </div>
            </div>
          </div>

          <FooterCol title="Shop" links={categories.map((c) => ({ label: c.label, href: c.href }))} />
          <FooterCol title="Help" links={help} />
          <FooterCol title="Company" links={company} />
        </div>

        <Rule className="my-12 bg-paper/15" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-paper/60">
            <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-accent">
              {site.instagramHandle}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
            <span>{site.address.line1}</span>
            <span>{site.address.line2}</span>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-paper/60 lg:items-end">
            <span>{site.shipping}</span>
            <span>{site.payments}</span>
            <span>{site.hours}</span>
          </div>
        </div>

        <Rule className="my-8 bg-paper/15" />

        <div className="flex flex-col gap-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.legalName} · {site.city}</span>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-paper">Privacy</Link>
            <Link href="/contact" className="hover:text-paper">Terms</Link>
            <Link href="/contact" className="hover:text-paper">Shipping Policy</Link>
          </div>
          <span className="text-paper/30">Demo storefront — imagery for presentation</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="label !text-paper/50">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-paper/75 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
