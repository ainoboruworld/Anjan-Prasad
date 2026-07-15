"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONSULTING_OUTCOMES } from "@/lib/data";
import { easeSmooth } from "../motion";

const STAGES = [
  ["Challenge", "challenge"],
  ["Approach", "approach"],
  ["Execution", "execution"],
  ["Outcome", "outcome"],
  ["Proof", "proof"],
] as const;

/**
 * Consulting practices explored as transformations: an index of outcomes
 * on the left, and the Challenge → Approach → Execution → Outcome → Proof
 * arc for the selected practice on the right.
 */
export function OutcomeExplorer() {
  const [activeId, setActiveId] = useState(CONSULTING_OUTCOMES[0].id);
  const active =
    CONSULTING_OUTCOMES.find((o) => o.id === activeId) ?? CONSULTING_OUTCOMES[0];

  return (
    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
      {/* Outcome index */}
      <nav aria-label="Consulting practices">
        <ol className="divide-y divide-border border-y border-border">
          {CONSULTING_OUTCOMES.map((o, i) => {
            const selected = o.id === activeId;
            return (
              <li key={o.id}>
                <button
                  type="button"
                  data-cursor="node"
                  onClick={() => setActiveId(o.id)}
                  onMouseEnter={() => setActiveId(o.id)}
                  aria-current={selected}
                  className={`group flex w-full items-baseline gap-4 py-4 text-left transition-colors duration-300 ${
                    selected ? "text-foreground" : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <span
                    className={`font-display text-sm font-semibold ${
                      selected ? "text-brand" : "text-foreground-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {o.title}
                  </span>
                  <motion.span
                    aria-hidden
                    className="ml-auto h-px flex-1 max-w-16 origin-left bg-brand"
                    animate={{ scaleX: selected ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: easeSmooth }}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Transformation arc */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: easeSmooth }}
            className="rounded-3xl border border-border bg-background-elevated p-8 lg:p-10"
            aria-live="polite"
          >
            <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground">
              {active.title}
            </h3>
            <div className="mt-8 space-y-0">
              {STAGES.map(([label, key], i) => (
                <div key={key} className="relative flex gap-6 pb-8 last:pb-0">
                  {/* Arc spine */}
                  {i < STAGES.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[5px] top-4 h-full w-px bg-border-strong"
                    />
                  )}
                  <span
                    aria-hidden
                    className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 rotate-45 ${
                      key === "proof" ? "bg-brand" : "border border-border-strong bg-background"
                    }`}
                  />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                      {label}
                    </p>
                    <p
                      className={`mt-1.5 text-[15px] leading-relaxed ${
                        key === "proof"
                          ? "editorial-accent text-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {active[key]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
