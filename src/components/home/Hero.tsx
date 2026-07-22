"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CTAButton, GhostButton } from "../ui/Primitives";
import { easeSmooth, slideInLeft, staggerContainer } from "../motion";

/**
 * Architectural portrait plate. A drafting-frame treatment that holds a
 * real photograph the moment one exists (drop it in as an <Image> child);
 * until then the figure is drawn in blueprint strokes so the plate still
 * feels intentional, not empty.
 */
function PortraitPlate() {
  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label="Blueprint portrait of Anjan Prasad — awaiting photography"
      className="h-full w-full"
      fill="none"
    >
      {/* Drafting frame */}
      <rect x="14" y="14" width="372" height="472" stroke="var(--blueprint)" strokeWidth="1" />
      <path d="M14 54 H386 M54 14 V486" stroke="var(--hairline)" strokeWidth="1" />
      <text x="26" y="40" fill="var(--foreground-muted)" fontSize="10" letterSpacing="3" fontFamily="var(--font-sans)">
        FIG. 01 — THE OPERATOR
      </text>

      {/* Figure in construction lines */}
      <g stroke="var(--foreground)" strokeOpacity="0.5" strokeWidth="1.5">
        <circle cx="200" cy="180" r="62" />
        <path d="M96 486 C96 372 142 316 200 316 C258 316 304 372 304 486" />
      </g>
      {/* Construction guides */}
      <g stroke="var(--blueprint)" strokeWidth="0.75" strokeDasharray="4 6">
        <line x1="200" y1="60" x2="200" y2="486" />
        <line x1="80" y1="180" x2="320" y2="180" />
        <circle cx="200" cy="180" r="92" />
      </g>
      {/* Gold datum points */}
      <g fill="var(--brand-gold)">
        <circle cx="200" cy="118" r="3" />
        <circle cx="138" cy="180" r="3" />
        <circle cx="262" cy="180" r="3" />
        <circle cx="200" cy="316" r="3" />
      </g>
      <text x="26" y="472" fill="var(--foreground-muted)" fontSize="10" letterSpacing="3" fontFamily="var(--font-sans)">
        SCALE 0 → 1 → ∞
      </text>
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const figureY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Mouse-responsive lighting
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const lighting = useMotionTemplate`radial-gradient(560px circle at ${smx}% ${smy}%, rgba(217,167,46,0.13), transparent 65%)`;

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="bg-grid relative flex min-h-screen items-center overflow-hidden pt-36 pb-20"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: lighting }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Editorial copy */}
        <motion.div
          style={{ y: copyY }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={slideInLeft}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted"
          >
            <span className="h-1.5 w-1.5 rotate-45 bg-brand" />
            India&apos;s Business Growth Ecosystem
          </motion.span>

          <motion.h1
            variants={slideInLeft}
            className="mt-7 font-display text-[length:var(--text-hero)] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground"
          >
            Build a business
            <br />
            that <span className="editorial-accent text-brand">outlasts you.</span>
          </motion.h1>

          <motion.p
            variants={slideInLeft}
            className="mt-7 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted"
          >
            Anjan Prasad — business transformation &amp; growth advisor.
            Structured, scalable businesses from{" "}
            <span className="font-medium text-foreground">0 → 1 → Scale</span>,
            taught and installed by an operator who has done it three times.
          </motion.p>

          <motion.div
            variants={slideInLeft}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <CTAButton href="/courses#demo">Book a ₹199 Demo Session</CTAButton>
            <GhostButton href="/business-advisory">Explore Business Advisory</GhostButton>
          </motion.div>

          <motion.ul
            variants={slideInLeft}
            aria-label="Trust indicators"
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-foreground-muted"
          >
            {[
              "3 companies founded",
              "20+ years operating",
              "25+ global brands advised",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Portrait plate with parallax */}
        <motion.div
          style={{ y: figureY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easeSmooth, delay: 0.3 }}
          className="relative mx-auto h-[420px] w-full max-w-sm lg:h-[540px]"
          data-cursor="view"
        >
          <div className="h-full w-full overflow-hidden rounded-[1.25rem] border border-border bg-background-elevated/50 shadow-[var(--shadow-soft)] transition-transform duration-500 hover:scale-[1.015]">
            <PortraitPlate />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.28em] text-foreground-muted"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          The story below
        </motion.span>
      </motion.div>
    </section>
  );
}
