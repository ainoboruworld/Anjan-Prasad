"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PERSONAS } from "@/lib/data";
import { Eyebrow } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";
import { easeSmooth } from "../motion";

/**
 * "I am…" — an interactive identity selector. Choosing a path reveals
 * pains, goals, and a tailored route through the ecosystem, so every
 * visitor immediately sees themselves in the platform.
 */
export function WhoWeHelp() {
  const [activeId, setActiveId] = useState(PERSONAS[0].id);
  const active = PERSONAS.find((p) => p.id === activeId) ?? PERSONAS[0];

  return (
    <section className="border-t border-border bg-background-elevated py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            I am<span className="editorial-accent text-brand">…</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Identity list */}
          <div role="tablist" aria-label="Choose your path" className="flex flex-col">
            {PERSONAS.map((p) => {
              const selected = p.id === activeId;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(p.id)}
                  onMouseEnter={() => setActiveId(p.id)}
                  className={`group flex items-center justify-between border-b border-border py-5 text-left transition-colors duration-300 ${
                    selected ? "text-foreground" : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <span className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {p.label}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{
                      x: selected ? 0 : -8,
                      opacity: selected ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: easeSmooth }}
                    className="text-brand"
                  >
                    <ArrowUpRight className="h-6 w-6" strokeWidth={2} />
                  </motion.span>
                </button>
              );
            })}
          </div>

          {/* Revealed path */}
          <div className="relative min-h-[26rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: easeSmooth }}
                className="rounded-3xl border border-border bg-background p-8 shadow-[var(--shadow-soft)] lg:p-10"
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {active.headline}
                </h3>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                      What&apos;s in the way
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {active.pain.map((t) => (
                        <li key={t} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground-muted">
                          <span aria-hidden className="mt-2 h-1 w-3 shrink-0 bg-border-strong" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                      Where you&apos;re headed
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {active.goals.map((t) => (
                        <li key={t} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground">
                          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-9 text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                  Your path through AP.com
                </p>
                <div className="mt-3 divide-y divide-border">
                  {active.path.map((step, i) => (
                    <Link
                      key={step.href + step.label}
                      href={step.href}
                      className="group flex items-center gap-4 py-3.5"
                    >
                      <span className="w-6 shrink-0 font-display text-sm font-semibold text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block text-[15px] font-medium text-foreground transition-colors group-hover:text-brand">
                          {step.label}
                        </span>
                        <span className="block text-[13px] text-foreground-muted">
                          {step.note}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 text-foreground-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                        strokeWidth={2}
                      />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
