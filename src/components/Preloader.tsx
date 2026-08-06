"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeSmooth } from "./motion";

const draw = (delay: number, duration = 0.8) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { delay, duration, ease: easeSmooth },
});

/**
 * Minimal intro: thin architectural strokes draw the AP monogram over a
 * clean surface, a gold underline sweeps in, and the tagline reveals before
 * the plate dissolves into the page. No grid - just the mark and a glow.
 * Runs once per browser session; total ≈ 2.1s.
 */
export function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ap-loaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("ap-loaded", "1");
      return;
    }

    const raf = requestAnimationFrame(() => {
      setVisible(true);
      document.body.style.overflow = "hidden";
    });
    const t = setTimeout(() => {
      sessionStorage.setItem("ap-loaded", "1");
      setVisible(false);
      document.body.style.overflow = "";
    }, 2100);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: easeSmooth }}
          aria-hidden
        >
          {/* Soft centred glow - depth without a grid */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(50% 45% at 50% 45%, color-mix(in srgb, var(--brand-gold) 10%, transparent), transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <div className="relative flex flex-col items-center">
            <svg
              viewBox="0 0 240 160"
              className="w-52 text-foreground sm:w-60"
              fill="none"
            >
              {/* A */}
              <motion.path
                d="M55 130 L90 40 L125 130"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...draw(0.2)}
              />
              <motion.line
                x1="70"
                y1="95"
                x2="110"
                y2="95"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                {...draw(0.6, 0.45)}
              />
              {/* P */}
              <motion.path
                d="M145 130 L145 40 L175 40 C195 40 195 84 175 84 L145 84"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...draw(0.45)}
              />
              {/* Gold underline sweep */}
              <motion.line
                x1="55"
                y1="146"
                x2="185"
                y2="146"
                stroke="var(--brand-gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                {...draw(1.0, 0.6)}
              />
            </svg>

            {/* Tagline reveal */}
            <div className="mt-6 overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 1.25, duration: 0.55, ease: easeSmooth }}
                className="text-xs font-medium uppercase tracking-[0.32em] text-foreground-muted"
              >
                India&apos;s Business Growth Ecosystem
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
