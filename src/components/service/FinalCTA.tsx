"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import { easeSmooth } from "../motion";
import { track, EVENTS } from "@/lib/analytics";

/**
 * Final CTA — a full-width closing band with a glass gradient and a single
 * decisive action. Shared by both service pages.
 */
export function FinalCTA({
  eyebrow,
  title,
  accent,
  lead,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-blueprint border-t border-border py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: easeSmooth }}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand" />
          {eyebrow}
        </span>
        <h2 className="mx-auto mt-6 max-w-2xl font-display text-[length:var(--text-chapter)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
          {title}
          {accent && (
            <>
              {" "}
              <span className="editorial-accent text-brand">{accent}</span>
            </>
          )}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
          {lead}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Magnetic>
            <a
              href={primary.href}
              onClick={() => track(EVENTS.ctaClicked, { label: primary.label, placement: "final" })}
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-semibold text-brand-ink shadow-[0_12px_34px_-12px_rgba(79,169,255,0.6)] transition-all duration-300 hover:bg-brand-hover hover:shadow-[0_18px_44px_-14px_rgba(79,169,255,0.7)]"
            >
              {primary.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          </Magnetic>
          {secondary && (
            <Magnetic>
              <a
                href={secondary.href}
                onClick={() => track(EVENTS.ctaClicked, { label: secondary.label, placement: "final" })}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-8 py-4 text-[15px] font-medium text-foreground transition-colors duration-300 hover:bg-background-elevated"
              >
                {secondary.label}
              </a>
            </Magnetic>
          )}
        </div>
      </motion.div>
    </section>
  );
}
