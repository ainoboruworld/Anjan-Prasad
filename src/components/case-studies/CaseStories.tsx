"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CASE_FILTERS, CASE_STUDIES } from "@/lib/data";
import { easeSmooth } from "../motion";
import { TextLink } from "../ui/Primitives";

type FilterKey = keyof typeof CASE_FILTERS;

/**
 * Case studies as filterable transformation stories — each one told as an
 * editorial dossier (challenge → strategy → execution → results → lesson),
 * not a testimonial card.
 */
export function CaseStories() {
  const [filters, setFilters] = useState<Partial<Record<FilterKey, string>>>({});

  const list = CASE_STUDIES.filter((c) => {
    if (filters.Industry && c.industry !== filters.Industry) return false;
    if (filters.Stage && c.stage !== filters.Stage) return false;
    if (filters.Service && c.service !== filters.Service) return false;
    return true;
  });

  const toggle = (key: FilterKey, value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? undefined : value }));

  return (
    <div>
      {/* Filters */}
      <div className="space-y-4">
        {(Object.keys(CASE_FILTERS) as FilterKey[]).map((key) => (
          <div key={key} className="flex flex-wrap items-center gap-2">
            <span className="w-20 text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
              {key}
            </span>
            {CASE_FILTERS[key].map((v) => {
              const on = filters[key] === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => toggle(key, v)}
                  aria-pressed={on}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-300 ${
                    on
                      ? "border-brand bg-brand font-semibold text-brand-ink"
                      : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Dossiers */}
      <div className="mt-16 space-y-16">
        <AnimatePresence mode="popLayout">
          {list.map((c, idx) => (
            <motion.article
              key={c.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: easeSmooth }}
              className="overflow-hidden rounded-3xl border border-border"
            >
              {/* Dossier header */}
              <header className="bg-blueprint flex flex-wrap items-baseline justify-between gap-4 border-b border-border bg-background-elevated px-8 py-6 sm:px-12">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
                    Transformation {String(idx + 1).padStart(2, "0")} · {c.industry} · {c.stage}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
                    {c.business}
                  </h3>
                </div>
                <p className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground">
                  {c.service}
                </p>
              </header>

              <div className="grid gap-10 px-8 py-10 sm:px-12 lg:grid-cols-[1.15fr_0.85fr]">
                {/* Narrative */}
                <div data-cursor="text">
                  <h4 className="font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
                    {c.headline}
                  </h4>
                  <dl className="mt-8 space-y-7">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                        The challenge
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                        {c.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                        The strategy
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                        {c.strategy}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                        The execution
                      </dt>
                      <dd className="mt-2">
                        <ul className="space-y-2">
                          {c.execution.map((e) => (
                            <li key={e} className="flex gap-3 text-[15px] leading-relaxed text-foreground-muted">
                              <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-brand" />
                              {e}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>

                  <blockquote className="mt-10 border-l-2 border-brand pl-6">
                    <p className="editorial-accent text-lg leading-relaxed text-foreground">
                      &ldquo;{c.quote.text}&rdquo;
                    </p>
                    <footer className="mt-3 text-sm text-foreground-muted">
                      {c.quote.name} · {c.quote.title}
                    </footer>
                  </blockquote>
                </div>

                {/* Results ledger */}
                <aside className="self-start rounded-2xl border border-border bg-background-elevated p-7 lg:sticky lg:top-32">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                    Results · {c.timeline}
                  </p>
                  <ul className="mt-5 divide-y divide-border">
                    {c.results.map((r) => (
                      <li key={r.label} className="py-4 first:pt-0 last:pb-0">
                        <p className="font-display text-3xl font-semibold tracking-tight text-brand">
                          {r.metric}
                        </p>
                        <p className="mt-1 text-sm leading-snug text-foreground-muted">
                          {r.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-foreground">
                    <span className="font-semibold">The lesson: </span>
                    {c.lesson}
                  </p>
                  <div className="mt-6">
                    <TextLink href="/consulting">The practice behind it</TextLink>
                  </div>
                </aside>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {list.length === 0 && (
          <p className="py-10 text-sm text-foreground-muted">
            No transformations match that combination yet —{" "}
            <Link href="/contact" className="font-medium text-foreground underline decoration-brand underline-offset-4">
              yours could be the first
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
