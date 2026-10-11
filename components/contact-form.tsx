"use client";

import { useState } from "react";

const topics = ["Order help", "Sizing", "Returns & exchange", "Wholesale", "Something else"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(topics[0]);

  if (sent) {
    return (
      <div className="border border-line bg-paper2/60 p-8">
        <p className="font-display text-3xl leading-tight">Message received.</p>
        <p className="mt-3 text-sm text-ink2">
          We reply within one working day, {`Mon–Sat`}. For anything urgent, message us on Instagram.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name">
          <input required className={inputCls} placeholder="Your name" />
        </Field>
        <Field label="Email">
          <input type="email" required className={inputCls} placeholder="you@email.com" />
        </Field>
      </div>
      <Field label="Phone">
        <input className={inputCls} placeholder="+91 …" />
      </Field>
      <div>
        <span className="label">What's this about?</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] transition-colors ${
                topic === t ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <Field label="Message">
        <textarea required rows={4} className={inputCls} placeholder="Tell us what you need…" />
      </Field>
      <button
        type="submit"
        className="w-full bg-ink py-4 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent sm:w-auto sm:px-10"
      >
        Send message
      </button>
    </form>
  );
}

const inputCls =
  "w-full border-b border-ink/25 bg-transparent py-3 font-sans text-sm outline-none transition-colors placeholder:text-stone focus:border-ink";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
