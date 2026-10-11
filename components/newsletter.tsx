"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
      }}
      className="w-full"
    >
      <div
        className={cn(
          "flex items-center border-b",
          dark ? "border-paper/30" : "border-ink/30"
        )}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={cn(
            "w-full bg-transparent py-3 font-sans text-sm outline-none placeholder:text-stone",
            dark ? "text-paper" : "text-ink"
          )}
        />
        <button
          type="submit"
          className={cn(
            "shrink-0 px-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] transition-colors",
            dark ? "text-paper/70 hover:text-accent" : "text-ink/70 hover:text-accent"
          )}
        >
          Join
        </button>
      </div>
      <p
        className={cn(
          "mt-2 font-mono text-[0.58rem] uppercase tracking-[0.16em]",
          dark ? "text-paper/50" : "text-stone"
        )}
      >
        {done ? "You're on the list. First drop news hits your inbox." : "Early access to drops · no spam"}
      </p>
    </form>
  );
}
