"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeSmooth } from "./motion";

const draw = (delay: number, duration = 0.9) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { delay, duration, ease: easeSmooth },
});

/**
 * Blueprint intro: a drafting grid fades in, thin architectural lines
 * draw the AP monogram, business nodes connect into it, and the tagline
 * reveals before the whole plate dissolves into the page.
 * Runs once per browser session; total ≈ 2.4s.
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
    }, 2400);

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
          transition={{ duration: 0.7, ease: easeSmooth }}
          aria-hidden
        >
          {/* Blueprint grid plate */}
          <motion.div
            className="bg-blueprint absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="relative flex flex-col items-center">
            <svg
              viewBox="0 0 240 160"
              className="w-56 text-foreground sm:w-64"
              fill="none"
            >
              {/* Construction guides */}
              <motion.line x1="20" y1="130" x2="220" y2="130" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" {...draw(0.15, 0.7)} />
              <motion.line x1="20" y1="40" x2="220" y2="40" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" {...draw(0.25, 0.7)} />

              {/* A */}
              <motion.path d="M55 130 L90 40 L125 130" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...draw(0.45)} />
              <motion.line x1="70" y1="95" x2="110" y2="95" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...draw(0.85, 0.5)} />

              {/* P */}
              <motion.path d="M145 130 L145 40 L175 40 C195 40 195 84 175 84 L145 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...draw(0.7)} />

              {/* Business nodes connecting into the mark */}
              {(
                [
                  [30, 60],
                  [212, 68],
                  [38, 118],
                  [206, 118],
                ] as const
              ).map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="2.5"
                  fill="var(--brand-gold)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.15 + i * 0.08, duration: 0.3 }}
                />
              ))}
              <motion.path d="M30 60 L72 86" stroke="var(--brand-gold)" strokeOpacity="0.5" strokeWidth="1" {...draw(1.3, 0.4)} />
              <motion.path d="M212 68 L182 62" stroke="var(--brand-gold)" strokeOpacity="0.5" strokeWidth="1" {...draw(1.4, 0.4)} />
              <motion.path d="M38 118 L60 118" stroke="var(--brand-gold)" strokeOpacity="0.5" strokeWidth="1" {...draw(1.45, 0.4)} />
              <motion.path d="M206 118 L166 112" stroke="var(--brand-gold)" strokeOpacity="0.5" strokeWidth="1" {...draw(1.5, 0.4)} />
            </svg>

            {/* Tagline reveal */}
            <div className="mt-6 overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 1.5, duration: 0.6, ease: easeSmooth }}
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
