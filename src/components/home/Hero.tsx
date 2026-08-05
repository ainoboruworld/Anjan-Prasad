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
import { PortraitFrame } from "../brand/PortraitFrame";
import { easeSmooth, slideInLeft, staggerContainer } from "../motion";

/**
 * Homepage hero — the executive opening statement. Editorial headline and a
 * premium professional portrait of Anjan Prasad on the right (image
 * placeholder for now; swaps to a photo with no layout change). Subtle
 * mouse-lit gradient and scroll parallax keep it closer to Stripe/Linear
 * than a coaching site.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const figureY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const lighting = useMotionTemplate`radial-gradient(560px circle at ${smx}% ${smy}%, rgba(79,169,255,0.13), transparent 65%)`;

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="hero-bg relative flex min-h-screen items-center overflow-hidden pt-36 pb-20"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: lighting }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
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
            Build a Business
            <br />
            That <span className="editorial-accent text-brand">Outlasts You.</span>
          </motion.h1>

          <motion.p
            variants={slideInLeft}
            className="mt-7 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted"
          >
            Strategic business advisory, executive consulting, leadership
            development, and scalable growth systems — helping founders and
            business owners build resilient, profitable businesses that create
            lasting impact.
          </motion.p>

          <motion.div
            variants={slideInLeft}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <CTAButton href="/business-advisory#book-demo">
              Book ₹99 Demo Session
            </CTAButton>
            <GhostButton href="/business-advisory">
              Explore Business Advisory
            </GhostButton>
          </motion.div>

          <motion.ul
            variants={slideInLeft}
            aria-label="Trust indicators"
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-foreground-muted"
          >
            {[
              "16+ years experience",
              "4 ventures built",
              "100+ brands advised",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Portrait placeholder with parallax */}
        <motion.div
          style={{ y: figureY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easeSmooth, delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm"
          data-cursor="view"
        >
          <div className="transition-transform duration-500 hover:scale-[1.015]">
            <PortraitFrame aspect="4/5" />
          </div>
          {/* Floating credential chip — glass */}
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-glass px-5 py-3.5 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:block">
            <p className="font-display text-sm font-semibold text-foreground">
               Strategy • Growth • Scale
            </p>
          </div>
        </motion.div>
      </div>

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
