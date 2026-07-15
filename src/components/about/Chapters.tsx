"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { JOURNEY, type JourneyChapter } from "@/lib/data";
import { LogoMark } from "../brand/LogoMark";
import { easeSmooth } from "../motion";

/** Chapter-specific blueprint vignette, drawn as the chapter enters view. */
function ChapterFigure({ index }: { index: number }) {
  const drawn = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 1.2, ease: easeSmooth, delay: 0.2 },
  } as const;

  const figures = [
    // 01 — foundation grid
    <g key="0">
      <motion.path d="M20 100 H140" stroke="var(--foreground-muted)" {...drawn} />
      <motion.path d="M30 100 V70 H70 V100 M90 100 V55 H130 V100" stroke="var(--foreground-muted)" {...drawn} />
      <motion.circle cx="80" cy="30" r="3" fill="var(--brand-gold)" stroke="none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }} />
    </g>,
    // 02 — ascending line
    <g key="1">
      <motion.path d="M20 100 L60 70 L95 82 L140 30" stroke="var(--foreground-muted)" {...drawn} />
      <motion.circle cx="140" cy="30" r="3" fill="var(--brand-gold)" stroke="none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }} />
    </g>,
    // 03 — three seeds
    <g key="2">
      <motion.circle cx="40" cy="65" r="16" stroke="var(--foreground-muted)" fill="none" {...drawn} />
      <motion.circle cx="80" cy="65" r="16" stroke="var(--foreground-muted)" fill="none" {...drawn} />
      <motion.circle cx="120" cy="65" r="16" stroke="var(--foreground-muted)" fill="none" {...drawn} />
      <motion.path d="M40 100 V81 M80 100 V81 M120 100 V81" stroke="var(--brand-gold)" {...drawn} />
    </g>,
    // 04 — compounding curve
    <g key="3">
      <motion.path d="M20 100 C60 100 90 90 105 60 C115 40 120 30 140 22" stroke="var(--foreground-muted)" {...drawn} />
      <motion.path d="M20 100 H140" stroke="var(--blueprint)" {...drawn} />
      <motion.circle cx="140" cy="22" r="3" fill="var(--brand-gold)" stroke="none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }} />
    </g>,
    // 05 — rebuilt structure
    <g key="4">
      <motion.rect x="35" y="45" width="90" height="55" rx="4" stroke="var(--foreground-muted)" fill="none" {...drawn} />
      <motion.path d="M35 65 H125 M65 45 V100 M95 45 V100" stroke="var(--blueprint)" {...drawn} />
      <motion.path d="M50 55 L110 55" stroke="var(--brand-gold)" {...drawn} />
    </g>,
    // 06 — radiating mentorship
    <g key="5">
      <motion.circle cx="80" cy="65" r="10" stroke="var(--brand-gold)" fill="none" {...drawn} />
      <motion.path d="M80 55 V25 M90 70 L125 88 M70 70 L35 88 M88 57 L115 35 M72 57 L45 35" stroke="var(--foreground-muted)" {...drawn} />
    </g>,
  ];

  return (
    <svg viewBox="0 0 160 110" className="w-40 sm:w-48" fill="none" strokeWidth="1.5" aria-hidden>
      {figures[index]}
    </svg>
  );
}

function Chapter({ ch, i }: { ch: JourneyChapter; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax: the numeral drifts slower than the copy.
  const numeralY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const figureY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const flip = i % 2 === 1;

  return (
    <div ref={ref} className="relative grid gap-8 py-20 sm:py-24 lg:grid-cols-12">
      {/* Numeral + era column with parallax */}
      <div className={`relative lg:col-span-4 ${flip ? "lg:order-2 lg:text-right" : ""}`}>
        <motion.p
          aria-hidden
          style={{ y: numeralY }}
          className="numeral-outline font-display text-8xl font-bold leading-none sm:text-9xl"
        >
          {ch.index}
        </motion.p>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.26em] text-brand">
          {ch.era}
        </p>
        <motion.div
          style={{ y: figureY }}
          className={`mt-8 hidden text-foreground lg:block ${flip ? "lg:flex lg:justify-end" : ""}`}
        >
          <ChapterFigure index={i} />
        </motion.div>
      </div>

      {/* Narrative column */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: easeSmooth }}
        className={`lg:col-span-7 ${flip ? "lg:order-1" : "lg:col-start-6"}`}
      >
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {ch.title}
        </h2>
        <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
          {ch.copy}
        </p>
        <p className="mt-4 max-w-xl text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
          {ch.detail}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-foreground-muted">
          {ch.marks.map((m) => (
            <span key={m} className="transition-colors duration-300 hover:text-foreground">
              <LogoMark name={m} className="text-lg" />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * The journey as an immersive editorial longread: a drawn spine runs the
 * length of the story, chapters alternate sides, numerals parallax, and
 * each era carries its own blueprint vignette and organisation marks.
 */
export function Chapters() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.9"],
  });

  return (
    <div ref={ref} className="relative mx-auto max-w-7xl px-6" data-cursor="text">
      {/* The spine — draws itself as the story is read */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px lg:block">
        <div className="h-full w-full bg-hairline" />
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-brand/70 to-brand/20"
        />
      </div>

      {JOURNEY.map((ch, i) => (
        <div key={ch.index} className={i > 0 ? "border-t border-border lg:border-t-0" : ""}>
          <Chapter ch={ch} i={i} />
        </div>
      ))}
    </div>
  );
}
