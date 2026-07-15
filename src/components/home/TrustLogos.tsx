"use client";

import { motion } from "framer-motion";
import { LogoMark } from "../brand/LogoMark";
import { easeSmooth } from "../motion";

const NAMES = [
  "Google",
  "Sony",
  "Motorola",
  "American Express",
  "Accenture",
  "Mindshare",
  "IPG Mediabrands",
  "Noboru World",
  "Lushful",
  "Filing Buddy",
  "IIFT",
  "IMT Ghaziabad",
];

/**
 * Trust band directly below the hero: the organisations Anjan has built,
 * operated inside, advised, and taught at — one quiet line of proof.
 */
export function TrustLogos() {
  return (
    <section
      aria-label="Organisations worked with"
      className="border-y border-border bg-background-elevated/60 py-12"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-medium uppercase tracking-[0.28em] text-foreground-muted"
        >
          Built with · Operated inside · Advised · Taught at
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
          }}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
        >
          {NAMES.map((name) => (
            <motion.li
              key={name}
              variants={{
                hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: easeSmooth },
                },
              }}
              className="group flex items-center text-foreground-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
              data-cursor="node"
            >
              <LogoMark name={name} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
