"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const APPAREL = ["S", "M", "L", "XL", "XXL"];
const WAIST = ["28", "30", "32", "34", "36"];

function clamp(i: number, max: number) {
  return Math.max(0, Math.min(max, i));
}

export function FitFinderBar({
  sizes,
  mode = "apparel",
}: {
  sizes: string[];
  mode?: "apparel" | "waist";
}) {
  const [height, setHeight] = useState(mode === "waist" ? 32 : 172);
  const [build, setBuild] = useState<"lean" | "average" | "broad">("average");
  const [pref, setPref] = useState<"snug" | "true" | "oversized">("true");

  const result = useMemo(() => {
    if (mode === "waist") {
      const base = clamp(Math.round((height - 26) / 2), WAIST.length - 1);
      const buildAdj = build === "broad" ? 1 : build === "lean" ? -1 : 0;
      const prefAdj = pref === "oversized" ? 1 : pref === "snug" ? -1 : 0;
      return { size: WAIST[clamp(base + buildAdj + prefAdj, WAIST.length - 1)], note: "Taken from your waist, adjusted for fit." };
    }
    let base = 2;
    if (height < 165) base = 0;
    else if (height < 172) base = 1;
    else if (height < 178) base = 2;
    else if (height < 186) base = 3;
    else base = 4;
    const buildAdj = build === "broad" ? 1 : build === "lean" ? -1 : 0;
    const prefAdj = pref === "oversized" ? 1 : pref === "snug" ? -1 : 0;
    return { size: APPAREL[clamp(base + buildAdj + prefAdj, APPAREL.length - 1)], note: "Based on height + build, adjusted for your fit." };
  }, [height, build, pref, mode]);

  const active = sizes.includes(result.size);

  return (
    <div className="border border-line bg-paper2/60 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="label">Find my size</span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-stone">
          {mode === "waist" ? "Waist (in)" : "Height (cm)"}
        </span>
      </div>

      <div className="mt-5">
        <input
          type="range"
          min={mode === "waist" ? 26 : 150}
          max={mode === "waist" ? 40 : 200}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full accent-accent"
          aria-label={mode === "waist" ? "Waist size" : "Height"}
        />
        <div className="mt-1 flex justify-between font-mono text-[0.58rem] tabular-nums text-stone">
          <span>{mode === "waist" ? "26" : "150"}</span>
          <span className="text-ink">{height}{mode === "waist" ? " in" : " cm"}</span>
          <span>{mode === "waist" ? "40" : "200"}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Toggle
          label="Build"
          value={build}
          options={[
            ["lean", "Lean"],
            ["average", "Average"],
            ["broad", "Broad"],
          ]}
          onChange={(v) => setBuild(v as typeof build)}
        />
        <Toggle
          label="Fit"
          value={pref}
          options={[
            ["snug", "Snug"],
            ["true", "True"],
            ["oversized", "Oversized"],
          ]}
          onChange={(v) => setPref(v as typeof pref)}
        />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <div>
          <p className="label">We recommend</p>
          <p className="mt-1 font-display text-4xl leading-none">
            {result.size}
            {!active && <span className="ml-2 align-middle text-sm text-stone">—</span>}
          </p>
          <p className="mt-1 max-w-xs font-mono text-[0.56rem] uppercase tracking-[0.14em] text-stone">
            {result.note}
          </p>
        </div>
        <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-ink/20 text-center font-mono text-[0.55rem] uppercase leading-tight tracking-[0.14em] text-ink/60 sm:flex">
          Fit
          <br />
          check
        </span>
      </div>
    </div>
  );
}

function Toggle({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="label">{label}</span>
      <div className="mt-2 flex border border-line">
        {options.map(([val, lbl]) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className={cn(
              "flex-1 px-2 py-2 font-mono text-[0.58rem] uppercase tracking-[0.1em] transition-colors",
              value === val ? "bg-ink text-paper" : "text-stone hover:text-ink"
            )}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SizeGuide({
  mode = "apparel",
}: {
  mode?: "apparel" | "waist";
}) {
  const [open, setOpen] = useState(false);
  const rows =
    mode === "waist"
      ? [
          ["28", "28–29", "30", "31"],
          ["30", "30–31", "31", "31.5"],
          ["32", "32–33", "32", "32"],
          ["34", "34–35", "33", "32.5"],
          ["36", "36–37", "34", "33"],
        ]
      : [
          ["S", "36–38", "26", "27"],
          ["M", "38–40", "27", "28"],
          ["L", "40–42", "28", "29"],
          ["XL", "42–44", "29", "30"],
          ["XXL", "44–46", "30", "31"],
        ];
  const headers =
    mode === "waist"
      ? ["Size", "Waist (in)", "Inseam (in)", "Rise (in)"]
      : ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent"
      >
        Size guide
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto bg-paper p-6 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="label">Zero7</span>
                  <h3 className="mt-1 font-display text-3xl">Size Guide</h3>
                </div>
                <button onClick={() => setOpen(false)} className="label hover:text-ink">
                  Close
                </button>
              </div>
              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-stone">
                Measurements in inches · garment measured flat, doubled for chest/waist
              </p>
              <div className="mt-6 w-full overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-ink/20">
                      {headers.map((h) => (
                        <th key={h} className="pb-2 pr-3 text-left font-mono text-[0.58rem] uppercase tracking-[0.12em] text-stone whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r[0]} className="border-b border-line">
                        {r.map((c, ci) => (
                          <td key={ci} className={cn("py-2.5 pr-3 tabular-nums whitespace-nowrap", ci === 0 && "font-display text-lg")}>
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 border-t border-line pt-4">
                <p className="label">How to measure</p>
                <ul className="mt-2 space-y-1.5 text-sm text-ink2">
                  <li>• Chest — around the fullest part, keep the tape level.</li>
                  <li>• Length — from high point of shoulder to hem.</li>
                  <li>• Between sizes? Size up for an oversized drape.</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
