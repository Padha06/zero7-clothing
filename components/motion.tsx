"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Ticker({
  items,
  className,
  speed = 34,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className="flex shrink-0 animate-marquee items-center whitespace-nowrap"
        style={{ animationDuration: `${speed}s` }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-mono text-[0.7rem] uppercase tracking-[0.28em]">
              {t}
            </span>
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Countdown({ target, className }: { target: string; className?: string }) {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: [number | null, string][] = t
    ? [
        [t.d, "days"],
        [t.h, "hrs"],
        [t.m, "min"],
        [t.s, "sec"],
      ]
    : [
        [null, "days"],
        [null, "hrs"],
        [null, "min"],
        [null, "sec"],
      ];

  return (
    <div className={cn("flex gap-4", className)}>
      {cells.map(([v, label]) => (
        <div key={label} className="text-center">
          <div className="font-display text-3xl leading-none tabular-nums sm:text-4xl">
            {v === null ? "—" : String(v).padStart(2, "0")}
          </div>
          <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] opacity-60">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
