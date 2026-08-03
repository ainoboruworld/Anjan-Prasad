"use client";

import { motion } from "framer-motion";
import { LogoMark } from "../brand/LogoMark";

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
 * Trust band directly below the hero — a premium auto-scrolling marquee of
 * the organisations Anjan has built, operated inside, advised, and taught
 * at. The track is duplicated so the loop is seamless; hover pauses it and
 * reduced motion falls back to a centred, static wrap (see globals.css).
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
          Trusted by leading organisations
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="marquee mt-9"
      >
        <div className="marquee__track" aria-hidden>
          {/* Two identical copies for a seamless loop. */}
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-x-16 px-8">
              {NAMES.map((name) => (
                <li
                  key={`${copy}-${name}`}
                  className="flex items-center text-foreground-muted"
                >
                  <LogoMark name={name} className="logo-mark" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>

      {/* Same names, non-animated, for assistive tech. */}
      <ul className="sr-only">
        {NAMES.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
