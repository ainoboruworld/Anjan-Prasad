"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TRUST_MARQUEE } from "@/lib/brandLogos";

/**
 * Trust band directly below the hero — a premium auto-scrolling marquee of
 * official brand logos (from the Brand Portfolio). The track is duplicated
 * for a seamless loop; hover pauses it and reduced motion falls back to a
 * centred, static wrap (see globals.css).
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
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-6 px-3">
              {TRUST_MARQUEE.map((logo) => (
                <li
                  key={`${copy}-${logo.file}`}
                  className="flex h-14 w-32 shrink-0 items-center justify-center rounded-xl border border-border bg-white/95 px-4 shadow-[var(--shadow-card)]"
                >
                  <span className="relative h-8 w-full">
                    <Image
                      src={`/brand-logos/${logo.file}`}
                      alt={`${logo.name} logo`}
                      fill
                      sizes="128px"
                      className="object-contain grayscale transition duration-300 hover:grayscale-0"
                    />
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>

      <ul className="sr-only">
        {TRUST_MARQUEE.map((logo) => (
          <li key={logo.file}>{logo.name}</li>
        ))}
      </ul>
    </section>
  );
}
