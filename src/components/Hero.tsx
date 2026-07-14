"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { easeSmooth, slideInLeft, staggerContainer } from "./motion";

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
      {/* Head */}
      <circle cx="200" cy="150" r="78" fill="url(#ap-figure)" />
      {/* Shoulders / torso */}
      <path
        d="M60 480 C60 360 120 300 200 300 C280 300 340 360 340 480 Z"
        fill="url(#ap-figure)"
      />
      {/* Collar accent */}
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
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
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
            Business Operations & Growth
          </motion.span>

          <motion.h1
            variants={slideInLeft}
            className="mt-7 text-[length:var(--text-hero)] font-semibold leading-[1.04] tracking-[-0.03em] text-foreground"
          >
            Building businesses that scale beyond their founder.
          </motion.h1>

          <motion.p
            variants={slideInLeft}
            className="mt-7 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted"
          >
            Anjan Prasad works with founders, business owners, and leadership
            teams to turn ambition into systemised, durable performance —
            operations that hold up as the company grows.
          </motion.p>

          <motion.div variants={slideInLeft} className="mt-10">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-[#0a0a0a] shadow-[0_10px_30px_-10px_rgba(238,192,75,0.6)] transition-all duration-300 hover:scale-[1.03] hover:bg-brand-hover hover:shadow-[0_16px_40px_-12px_rgba(238,192,75,0.7)]"
            >
              Book a working session
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Right — floating silhouette with radial lighting */}
        <div className="relative flex h-[440px] items-center justify-center lg:h-[560px]">
          <motion.div
            style={{ y: glowY }}
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(238,192,75,0.18),transparent_62%)] blur-2xl" />
          </motion.div>

          <motion.div
            style={{ y: figureY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easeSmooth, delay: 0.2 }}
            className="relative h-full w-full max-w-sm"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
              }}
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
