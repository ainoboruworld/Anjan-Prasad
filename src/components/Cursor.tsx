"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "link" | "view" | "play" | "node" | "text";

const LABELS: Partial<Record<CursorMode, string>> = {
  view: "View",
  play: "Play",
  node: "Explore",
};

/**
 * Contextual cursor for fine-pointer devices.
 *
 * Modes are declared in markup via `data-cursor`:
 *   data-cursor="view"  → circular "View" indicator over imagery
 *   data-cursor="play"  → "Play" indicator over video
 *   data-cursor="node"  → "Explore" over interactive frameworks/logos
 *   data-cursor="text"  → thin beam over long-form reading
 * Links and buttons get the magnetic ring automatically.
 * Disabled for touch and reduced-motion users.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const raf = requestAnimationFrame(() => setEnabled(true));

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      const tagged = el.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setMode((tagged.dataset.cursor as CursorMode) ?? "default");
      } else if (el.closest("a, button, input, select, textarea, [role='button']")) {
        setMode("link");
      } else {
        setMode("default");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  if (!enabled) return null;

  const label = LABELS[mode];
  const labelled = Boolean(label);
  const size = labelled ? 72 : mode === "link" ? 44 : mode === "text" ? 4 : 12;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand"
        animate={{
          width: size,
          height: mode === "text" ? 28 : size,
          borderRadius: mode === "text" ? 2 : 999,
          backgroundColor: labelled
            ? "rgba(217,167,46,0.92)"
            : mode === "link"
              ? "rgba(217,167,46,0.10)"
              : "rgba(217,167,46,1)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-ink"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
