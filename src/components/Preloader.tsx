"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ApMark } from "./brand/ApMark";
import { easeSmooth } from "./motion";

/**
 * Premium first-load animation built around the AP monogram.
 * Shows once per browser session so navigation stays instant afterwards.
 */
export function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ap-loaded")) return;

    // Defer to the next frame so the reveal is an external-driven update,
    // not a synchronous cascade during the effect body.
    const raf = requestAnimationFrame(() => {
      setVisible(true);
      document.body.style.overflow = "hidden";
    });
    const t = setTimeout(() => {
      sessionStorage.setItem("ap-loaded", "1");
      setVisible(false);
      document.body.style.overflow = "";
    }, 1900);

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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeSmooth }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: easeSmooth }}
              className="h-20 w-20 text-foreground"
            >
              <ApMark className="h-full w-full" />
            </motion.div>

            <div className="mt-8 h-px w-40 overflow-hidden bg-border">
              <motion.div
                className="h-full bg-brand"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.4, ease: easeSmooth, delay: 0.2 }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-muted"
            >
              Building profitable businesses
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
