"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart";
import { inr } from "@/lib/utils";
import { site } from "@/lib/site";

const FREE = 1499;
const COD_FEE = 49;

export function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [pay, setPay] = useState<"upi" | "cod">("upi");
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  const shipping = subtotal >= FREE || subtotal === 0 ? 0 : 99;
  const codFee = pay === "cod" ? COD_FEE : 0;
  const total = subtotal + shipping + codFee;

  if (placed) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <span className="label">Order drafted</span>
        <h1 className="mt-4 font-display text-5xl leading-none tracking-tight">
          You're almost there.
        </h1>
        <p className="mt-5 text-[0.98rem] leading-relaxed text-ink2">
          We've opened WhatsApp with your order summary. Send the message and our team confirms
          stock, final shipping and payment within a few hours.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/shop"
            className="bg-ink px-7 py-3.5 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <span className="label">Checkout</span>
        <h1 className="mt-4 font-display text-5xl leading-none tracking-tight">
          Your bag is empty.
        </h1>
        <p className="mt-5 text-[0.98rem] text-ink2">
          Add a few pieces first — small runs, so don't wait too long.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex bg-ink px-7 py-3.5 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
        >
          Shop the drop
        </Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderLines = lines
      .map((l) => `• ${l.name} — ${l.color} / ${l.size} × ${l.qty} = ${inr(l.price * l.qty)}`)
      .join("%0A");
    const msg =
      `*ZERO7 order*%0A%0A${orderLines}%0A%0A` +
      `Subtotal: ${inr(subtotal)}%0A` +
      `Shipping: ${shipping === 0 ? "Free" : inr(shipping)}%0A` +
      (codFee ? `COD fee: ${inr(codFee)}%0A` : "") +
      `*Total: ${inr(total)}*%0A` +
      `Payment: ${pay === "cod" ? "Cash on Delivery" : "UPI / Online"}%0A%0A` +
      `*Ship to*%0A${form.name}%0A${form.phone}%0A${form.address}, ${form.city}, ${form.state} - ${form.pin}`;
    window.open(`https://wa.me/${site.phoneHref}?text=${msg}`, "_blank");
    setPlaced(true);
    clear();
  };

  return (
    <form onSubmit={submit} className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
      {/* Left: details */}
      <div className="space-y-10">
        <section>
          <h2 className="flex items-baseline gap-3 font-display text-2xl tracking-tight">
            <span className="font-mono text-xs text-stone">01</span> Contact
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <In label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <In label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <div className="sm:col-span-2">
              <In label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="flex items-baseline gap-3 font-display text-2xl tracking-tight">
            <span className="font-mono text-xs text-stone">02</span> Shipping
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <In label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
            </div>
            <In label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <In label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
            <In label="Pin code" value={form.pin} onChange={(v) => setForm({ ...form, pin: v })} />
          </div>
        </section>

        <section>
          <h2 className="flex items-baseline gap-3 font-display text-2xl tracking-tight">
            <span className="font-mono text-xs text-stone">03</span> Payment
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <PayOption
              active={pay === "upi"}
              onClick={() => setPay("upi")}
              title="UPI / Online"
              note="GPay, PhonePe, Cards · instant"
            />
            <PayOption
              active={pay === "cod"}
              onClick={() => setPay("cod")}
              title="Cash on Delivery"
              note={`Pay when it arrives · +${inr(COD_FEE)}`}
            />
          </div>
        </section>
      </div>

      {/* Right: summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-line bg-paper2/50 p-6">
          <span className="label">Order summary</span>
          <div className="mt-5 space-y-4">
            {lines.map((l) => (
              <div key={l.key} className="flex gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 justify-between gap-2">
                  <div>
                    <p className="font-sans text-sm font-medium leading-snug">{l.name}</p>
                    <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-stone">
                      {l.color} · {l.size} · ×{l.qty}
                    </p>
                  </div>
                  <span className="text-sm tabular-nums">{inr(l.price * l.qty)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
            <Row k="Subtotal" v={inr(subtotal)} />
            <Row k="Shipping" v={shipping === 0 ? "Free" : inr(shipping)} />
            {codFee > 0 && <Row k="COD fee" v={inr(codFee)} />}
            <div className="flex justify-between border-t border-line pt-3">
              <span className="font-sans text-[0.8rem] uppercase tracking-[0.14em]">Total</span>
              <span className="font-display text-2xl tabular-nums">{inr(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-ink py-4 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
          >
            Place order · WhatsApp
          </button>
          <p className="mt-3 text-center font-mono text-[0.58rem] uppercase tracking-[0.14em] text-stone">
            You'll confirm the order with our team on WhatsApp
          </p>
        </div>
        <p className="mt-4 text-center font-mono text-[0.58rem] uppercase tracking-[0.14em] text-stone">
          {site.shipping} · {site.payments}
        </p>
      </aside>
    </form>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-ink2">
      <span>{k}</span>
      <span className="tabular-nums">{v}</span>
    </div>
  );
}

function PayOption({
  active,
  onClick,
  title,
  note,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  note: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border p-4 text-left transition-colors ${
        active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
      }`}
    >
      <span className="flex items-center justify-between font-sans text-sm font-medium">
        {title}
        <span className={`h-3 w-3 rounded-full border ${active ? "border-paper bg-accent" : "border-ink/40"}`} />
      </span>
      <span className={`mt-1 block font-mono text-[0.56rem] uppercase tracking-[0.14em] ${active ? "text-paper/60" : "text-stone"}`}>
        {note}
      </span>
    </button>
  );
}

function In({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border-b border-ink/25 bg-transparent py-3 font-sans text-sm outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}
