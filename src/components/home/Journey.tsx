"use client";

import { motion } from "framer-motion";
import { JOURNEY } from "@/lib/data";
import { Eyebrow } from "../ui/Primitives";
import { easeSmooth } from "../motion";

/**
 * The journey as cinematic chapters - stacked sticky plates, each with its
 * own tonal background and an alternating editorial layout, so scrolling
 * reads like turning pages rather than passing sections.
 */
export function Journey() {
  return (
    <section aria-label="The journey" className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-10">
        <Eyebrow>The journey</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
          Twenty years, six chapters -{" "}
          <span className="editorial-accent text-brand">one discipline.</span>
        </h2>
      </div>

      {JOURNEY.map((ch, i) => {
        const flip = i % 2 === 1;
        const last = i === JOURNEY.length - 1;
        return (
          <div
            key={ch.index}
            className={`sticky top-0 flex min-h-screen items-center overflow-hidden border-t border-border ${
              i % 3 === 0
                ? "bg-background"
                : i % 3 === 1
                  ? "bg-background-elevated"
                  : "bg-background-sunken"
            } ${last ? "bg-blueprint" : ""}`}
          >
            {/* Giant chapter numeral, anchored opposite the copy */}
            <span
              aria-hidden
              className={`numeral-outline pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-display text-[38vmin] font-bold leading-none ${
                flip ? "-left-6 sm:left-4" : "-right-6 sm:right-4"
              }`}
            >
              {ch.index}
            </span>

            <div className="mx-auto w-full max-w-7xl px-6 py-24">
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: easeSmooth }}
                className={`max-w-xl ${flip ? "ml-auto text-left" : ""}`}
              >
                <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-foreground-muted">
                  <span className="h-px w-10 bg-brand" aria-hidden />
                  Chapter {ch.index} · {ch.era}
                </p>
                <h3 className="mt-6 font-display text-[length:var(--text-chapter)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
                  {ch.title}
                </h3>
                <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
                  {ch.copy}
                </p>

                {/* Chapter marks - organisations, drawn as connected nodes */}
                <ul className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3">
                  {ch.marks.map((m, j) => (
                    <li key={m} className="flex items-center gap-2">
                      {j > 0 && (
                        <span aria-hidden className="h-px w-6 bg-border-strong" />
                      )}
                      <span className="rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
                        {m}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
