import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Checkout } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout your ZERO7 order — UPI or Cash on Delivery, PAN India shipping.",
};

export default function CheckoutPage() {
  return (
    <section className="pb-20 pt-36 sm:pt-44">
      <Container>
        <span className="label">Checkout</span>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
          Almost yours.
        </h1>
        <div className="mt-12">
          <Checkout />
        </div>
      </Container>
    </section>
  );
}
