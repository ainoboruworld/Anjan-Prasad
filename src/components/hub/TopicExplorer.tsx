"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES, HUB_CATEGORIES } from "@/lib/data";
import { easeSmooth } from "../motion";

/**
 * Interactive topic explorer: the category index doubles as the filter
 * for the article ledger beneath it.
 */
export function TopicExplorer() {
  const [topic, setTopic] = useState<string>("All");
  const list =
    topic === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === topic);

  return (
    <div>
      {/* Topic index */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {["All", ...HUB_CATEGORIES].map((c) => {
          const selected = c === topic;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setTopic(c)}
              aria-pressed={selected}
              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                selected
                  ? "border-brand bg-brand text-brand-ink font-semibold"
                  : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Article ledger */}
      <div className="mt-10 border-t border-border">
        <AnimatePresence mode="popLayout">
          {list.map((a, i) => (
            <motion.article
              key={a.slug}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeSmooth, delay: i * 0.02 }}
              className="group grid cursor-pointer gap-2 border-b border-border py-7 transition-colors duration-300 hover:bg-background-elevated sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-4"
              data-cursor="view"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand sm:col-span-3">
                {a.category}
              </p>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:col-span-5">
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground-muted sm:col-span-3">
                {a.dek}
              </p>
              <p className="flex items-center gap-2 text-xs text-foreground-muted sm:col-span-1 sm:justify-end">
                {a.readingTime}
                <ArrowUpRight
                  aria-hidden
                  className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                  strokeWidth={2}
                />
              </p>
            </motion.article>
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <p className="py-10 text-sm text-foreground-muted">
            Essays for this topic are being written — the letter announces each
            one first.
          </p>
        )}
      </div>
    </div>
  );
}
