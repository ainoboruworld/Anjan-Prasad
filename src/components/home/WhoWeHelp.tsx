"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  GraduationCap,
  Rocket,
  Sparkles,
  Store,
  type LucideIcon,
} from "lucide-react";
import { PERSONAS } from "@/lib/data";
import { SectionHeading } from "../ui/Primitives";
import { easeSmooth } from "../motion";

/** One icon per identity — keyed to the persona ids in the content layer. */
const PERSONA_ICON: Record<string, LucideIcon> = {
  student: GraduationCap,
  professional: Briefcase,
  founder: Rocket,
  owner: Store,
  "woman-entrepreneur": Sparkles,
  enterprise: Building2,
};

/**
 * "I am…" — an interactive identity selector. Choosing a path reveals
 * pains, goals, and a tailored route through the ecosystem, so every
 * visitor immediately sees themselves in the platform.
 */
export function WhoWeHelp() {
  const [activeId, setActiveId] = useState(PERSONAS[0].id);
  const active = PERSONAS.find((p) => p.id === activeId) ?? PERSONAS[0];

  return (
    <section className="border-t border-border bg-background-elevated/60 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Who this is for"
          title={
            <>
              I am<span className="editorial-accent text-brand">…</span>
            </>
          }
          lead="Pick the description that fits — and see exactly how AP.com meets you where you are."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Identity list */}
          <div role="tablist" aria-label="Choose your path" className="flex flex-col">
            {PERSONAS.map((p) => {
              const selected = p.id === activeId;
              const Icon = PERSONA_ICON[p.id] ?? Sparkles;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(p.id)}
                  onMouseEnter={() => setActiveId(p.id)}
                  className={`group relative flex items-center gap-4 border-b border-border py-5 text-left transition-colors duration-300 ${
                    selected ? "text-foreground" : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {/* Active rail */}
                  <motion.span
                    aria-hidden
                    animate={{ scaleY: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: easeSmooth }}
                    className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 origin-center rounded-full bg-brand"
                  />
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                      selected
                        ? "border-brand/40 bg-brand/10 text-brand"
                        : "border-border bg-background text-foreground-muted group-hover:border-border-strong"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="flex-1 font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
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
                className="card p-8 lg:p-10"
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
                <div className="mt-4 space-y-1.5">
                  {active.path.map((step, i) => (
                    <Link
                      key={step.href + step.label}
                      href={step.href}
                      className="group flex items-center gap-4 rounded-2xl border border-transparent px-3 py-3 transition-colors duration-300 hover:border-border hover:bg-background-sunken"
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
