"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CTAButton, GhostButton } from "./ui/Primitives";
import { easeSmooth, slideInLeft, staggerContainer } from "./motion";

const ROLES = [
  "Entrepreneur",
  "CEO",
  "Operator",
  "Advisor",
  "Investor",
  "Mentor",
];

/** Monochrome executive silhouette — a placeholder for a real portrait. */
function Silhouette() {
  return (
    <svg
      viewBox="0 0 400 480"
      role="img"
      aria-label="Portrait placeholder of Anjan Prasad"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="ap-figure" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="150" r="78" fill="url(#ap-figure)" />
      <path
        d="M60 480 C60 360 120 300 200 300 C280 300 340 360 340 480 Z"
        fill="url(#ap-figure)"
      />
      <path
        d="M168 318 L200 372 L232 318"
        fill="none"
        stroke="var(--brand-yellow)"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Floating stat chip that hovers over the portrait. */
function FloatChip({
  className,
  value,
  label,
  delay,
}: {
  className: string;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: easeSmooth, delay }}
      className={`absolute z-10 rounded-2xl border border-border bg-glass px-4 py-3 backdrop-blur-xl ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <p className="font-display text-lg font-semibold text-foreground">
          {value}
        </p>
        <p className="text-xs text-foreground-muted">{label}</p>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const figureY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      id="top"
      className="bg-grid relative flex min-h-screen items-center overflow-hidden pt-36 pb-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left — editorial copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={slideInLeft}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Business Builder · Operator · Advisor
          </motion.span>

          <motion.h1
            variants={slideInLeft}
            className="mt-7 font-display text-[length:var(--text-hero)] font-semibold leading-[1.04] tracking-[-0.03em] text-foreground"
          >
            Anjan Prasad builds{" "}
            <span className="text-brand">profitable businesses.</span>
          </motion.h1>

          <motion.p
            variants={slideInLeft}
            className="mt-7 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted"
          >
            Fifteen years founding companies, operating them, and advising
            global brands — turning ambition into scalable, sustainable growth
            built on systems, not heroics.
          </motion.p>

          <motion.div
            variants={slideInLeft}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <CTAButton href="/business-advisory">
              Apply for advisory
            </CTAButton>
            <GhostButton href="/about">Read the story</GhostButton>
          </motion.div>

          <motion.ul
            variants={slideInLeft}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            {ROLES.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand/70" />
                {r}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — floating silhouette with radial lighting */}
        <div className="relative flex h-[440px] items-center justify-center lg:h-[580px]">
          <motion.div
            style={{ y: glowY }}
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(238,192,75,0.18),transparent_62%)] blur-2xl" />
          </motion.div>

          <FloatChip
            className="left-0 top-10"
            value="15+ yrs"
            label="Building businesses"
            delay={0.9}
          />
          <FloatChip
            className="right-0 bottom-16"
            value="10X"
            label="Growth delivered"
            delay={1.1}
          />

          <motion.div
            style={{ y: figureY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easeSmooth, delay: 0.2 }}
            className="relative h-full w-full max-w-sm"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
              className="h-full w-full overflow-hidden rounded-[2rem] border border-border bg-background-elevated/40"
            >
              <Silhouette />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
