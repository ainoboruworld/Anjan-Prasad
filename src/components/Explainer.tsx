"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { inViewOnce, riseIn } from "./motion";

export function Explainer() {
  return (
    <section id="what" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={riseIn}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            What Anjan does
          </h2>
          <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
            A short film on how operations become the engine of growth — from
            first diagnosis to a business that runs without the founder in every
            room.
          </p>
        </motion.div>

        <motion.div
          variants={riseIn}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="group relative mx-auto mt-14 aspect-video max-w-5xl"
        >
          {/* Soft glow */}
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(238,192,75,0.12),transparent_70%)] blur-2xl"
          />

          <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-border-strong bg-background-elevated">
            {/* Pulsing accent border */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-brand/40"
              animate={{ opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Subtle frame texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_55%)]" />

            {/* Play button */}
            <button
              type="button"
              aria-label="Play the introduction film"
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-glass backdrop-blur-md transition-transform duration-300 group-hover:scale-105"
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-brand/15 animate-ping [animation-duration:2.5s]"
              />
              <Play
                className="relative ml-1 h-7 w-7 text-brand"
                strokeWidth={1.5}
                fill="currentColor"
              />
            </button>

            <span className="absolute bottom-5 left-6 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Motion graphics · coming soon
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
