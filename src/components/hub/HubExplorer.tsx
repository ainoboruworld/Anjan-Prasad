"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import type { Article } from "@/lib/data";
import { easeSmooth } from "../motion";

/**
 * Premium, filterable article explorer for the Knowledge Hub — search,
 * category chips, and author cards with reading time. Filtering animates
 * smoothly (layout + fade) and everything runs client-side over the slate.
 */
export function HubExplorer({
  articles,
  categories,
}: {
  articles: Article[];
  categories: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("All");

  // Only show categories that actually have articles.
  const usedCategories = useMemo(() => {
    const set = new Set<string>(articles.map((a) => a.category));
    return ["All", ...categories.filter((c) => set.has(c))];
  }, [articles, categories]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const inCat = active === "All" || a.category === active;
      const inText =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.dek.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return inCat && inText;
    });
  }, [articles, query, active]);

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col gap-6">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="input !pl-11"
          />
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {usedCategories.map((cat) => {
            const on = active === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  on
                    ? "border-transparent bg-brand text-brand-ink"
                    : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <motion.ul
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {results.map((a) => (
            <motion.li
              key={a.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: easeSmooth }}
              className="card card-hover group flex flex-col p-7"
              data-cursor="view"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  {a.category}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-foreground-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                  strokeWidth={2}
                />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
                {a.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground-muted">
                {a.dek}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/12 font-display text-xs font-bold text-brand">
                  AP
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    Anjan Prasad
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {a.readingTime} read
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {results.length === 0 && (
        <p className="mt-16 text-center text-[15px] text-foreground-muted">
          No articles match{" "}
          <span className="font-medium text-foreground">
            &ldquo;{query}&rdquo;
          </span>
          . Try another search or category.
        </p>
      )}
    </div>
  );
}
