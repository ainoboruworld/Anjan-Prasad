import type { Variants } from "framer-motion";

/** Apple/Linear-style smooth easing. */
export const easeSmooth = [0.22, 1, 0.36, 1] as const;

/** Staggered container for revealing groups of children in sequence. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Rise + fade - the workhorse reveal. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeSmooth },
  },
};

/** Horizontal reveal from the left, for editorial hero copy. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: easeSmooth },
  },
};

/** Scale + fade, for logos and badges. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

/** Shared viewport config for scroll-triggered reveals. */
export const inViewOnce = { once: true, amount: 0.3 } as const;
