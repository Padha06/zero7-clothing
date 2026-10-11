import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-32">
      <Container>
        <span className="label">404</span>
        <h1 className="mt-5 font-display text-6xl leading-[0.92] tracking-tight sm:text-8xl">
          Wrong turn.
        </h1>
        <p className="mt-5 max-w-md text-[1.02rem] text-ink2">
          This page isn't in the drop. Head back to the range and find something better.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/shop"
            className="bg-ink px-7 py-3.5 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
          >
            Shop the range
          </Link>
          <Link
            href="/"
            className="border border-ink px-7 py-3.5 font-sans text-[0.72rem] uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper"
          >
            Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
