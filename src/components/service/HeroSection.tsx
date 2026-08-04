"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import { easeSmooth } from "../motion";
import { track, EVENTS } from "@/lib/analytics";

export interface HeroHighlight {
  value: string;
  label: string;
}

export interface HeroCTA {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
}

/**
 * Premium service-page hero. Shared by Consultation and Business Advisory —
 * an eyebrow, an oversized editorial headline, a lead, CTAs, and an optional
 * glass highlight rail. Subtle gradient wash + staggered entrance keep it
 * closer to Stripe/Linear than a coaching site.
 */
export function HeroSection({
  eyebrow,
  headline,
  accent,
  lead,
  ctas = [],
  highlights = [],
}: {
  eyebrow: string;
  headline: ReactNode;
  /** Italic serif accent appended to the headline. */
  accent?: string;
  lead: string;
  ctas?: HeroCTA[];
  highlights?: HeroHighlight[];
}) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: easeSmooth },
    },
  };

  return (
    <section className="hero-bg relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-sky)_18%,transparent),transparent_65%)] blur-3xl"
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-6"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted backdrop-blur"
        >
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand" />
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-7 max-w-4xl font-display text-[length:var(--text-hero)] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground"
        >
          {headline}
          {accent && (
            <>
              {" "}
              <span className="editorial-accent text-brand">{accent}</span>
            </>
          )}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted"
        >
          {lead}
        </motion.p>

        {ctas.length > 0 && (
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            {ctas.map((cta) => {
              const primary = (cta.variant ?? "primary") === "primary";
              const cls = primary
                ? "group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-brand-ink shadow-[0_12px_34px_-12px_rgba(79,169,255,0.6)] transition-all duration-300 hover:bg-brand-hover hover:shadow-[0_18px_44px_-14px_rgba(79,169,255,0.7)]"
                : "inline-flex items-center gap-2 rounded-full border border-border-strong bg-glass px-7 py-3.5 text-[15px] font-medium text-foreground backdrop-blur transition-colors duration-300 hover:bg-background-elevated";
              return (
                <Magnetic key={cta.label}>
                  <a
                    href={cta.href}
                    className={cls}
                    onClick={() =>
                      track(EVENTS.ctaClicked, { label: cta.label, href: cta.href })
                    }
                  >
                    {cta.label}
                    {primary && (
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    )}
                  </a>
                </Magnetic>
              );
            })}
          </motion.div>
        )}

        {highlights.length > 0 && (
          <motion.dl
            variants={item}
            className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4"
          >
            {highlights.map((h) => (
              <div key={h.label} className="bg-background-elevated p-6">
                <dt className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {h.value}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-foreground-muted">
                  {h.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </motion.div>
    </section>
  );
}
