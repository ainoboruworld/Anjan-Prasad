"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRANDS_ADVISED, CAREER_MARKS, COMPANIES_BUILT, type Organisation } from "@/lib/data";
import { Eyebrow } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { easeSmooth } from "../motion";

/*
 * Organisations as a constellation, not a logo wall. Typographic marks
 * connect as you scroll; hovering a mark reveals role → contribution →
 * impact in the detail plate. Swap the wordmarks for official SVG logos
 * when the brand-approved files are supplied.
 */

function MarkButton({
  org,
  active,
  onActivate,
}: {
  org: Organisation;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      data-cursor="node"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={active}
      className={`group relative rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
        active
          ? "border-brand/60 bg-background shadow-[var(--shadow-soft)]"
          : "border-border bg-background/40 hover:border-border-strong"
      }`}
    >
      <span
        aria-hidden
        className={`absolute -top-1.5 left-6 h-3 w-3 rotate-45 border transition-colors duration-300 ${
          active ? "border-brand bg-brand" : "border-border-strong bg-background"
        }`}
      />
      <span className="block font-display text-lg font-semibold tracking-tight text-foreground">
        {org.name}
      </span>
      <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-foreground-muted">
        {org.role}
      </span>
    </button>
  );
}

export function Constellation() {
  const orgs = [...COMPANIES_BUILT, ...CAREER_MARKS];
  const [activeName, setActiveName] = useState(orgs[0].name);
  const active = orgs.find((o) => o.name === activeName) ?? orgs[0];

  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>The record</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            Companies built. Enterprises operated.{" "}
            <span className="editorial-accent text-brand">Brands grown.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Marks, grouped by relationship */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
              Founded &amp; co-founded
            </p>
            <RevealGroup className="mt-4 grid gap-3 sm:grid-cols-3">
              {COMPANIES_BUILT.map((org) => (
                <RevealItem key={org.name}>
                  <MarkButton
                    org={org}
                    active={activeName === org.name}
                    onActivate={() => setActiveName(org.name)}
                  />
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="mt-8 text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
              Operated inside
            </p>
            <RevealGroup className="mt-4 grid gap-3 sm:grid-cols-3">
              {CAREER_MARKS.map((org) => (
                <RevealItem key={org.name}>
                  <MarkButton
                    org={org}
                    active={activeName === org.name}
                    onActivate={() => setActiveName(org.name)}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Detail plate: role → contribution → impact */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="bg-blueprint relative overflow-hidden rounded-3xl border border-border bg-background-elevated p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: easeSmooth }}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-foreground-muted">
                    {active.kind === "built" ? "Built" : "Operated"}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground">
                    {active.name}
                  </h3>

                  <dl className="mt-8 space-y-6">
                    {(
                      [
                        ["Role", active.role],
                        ["Contribution", active.contribution],
                        ["Impact", active.impact],
                      ] as const
                    ).map(([label, value], i) => (
                      <div key={label} className="flex gap-5">
                        <dt className="flex w-28 shrink-0 items-start gap-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                          <span
                            aria-hidden
                            className="mt-1 h-1.5 w-1.5 rotate-45 bg-brand"
                            style={{ opacity: 1 - i * 0.25 }}
                          />
                          {label}
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-foreground">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Brands index — editorial, not a wall */}
        <Reveal className="mt-16 border-t border-border pt-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
            Brands advised across agency &amp; consulting years
          </p>
          <p className="mt-5 flex max-w-5xl flex-wrap items-baseline gap-x-3 gap-y-2 font-display text-xl tracking-tight text-foreground-muted sm:text-2xl">
            {BRANDS_ADVISED.map((b, i) => (
              <span key={b} className="flex items-baseline gap-x-3">
                {i > 0 && (
                  <span aria-hidden className="text-brand">
                    ·
                  </span>
                )}
                <span className="whitespace-nowrap transition-colors duration-300 hover:text-foreground">
                  {b}
                </span>
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
