"use client";

import { motion } from "framer-motion";
import { inViewOnce, riseIn, scaleIn, staggerContainer } from "./motion";

const BRANDS = ["Meridian", "Northwind", "Aperture", "Cavalt", "Lumen"];

/** Abstract circular monogram — placeholder for a real client logo. */
function LogoMark({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 88 88" role="img" aria-label={`${label} logo`}>
      <circle
        cx="44"
        cy="44"
        r="42"
        fill="none"
        stroke="var(--foreground)"
        strokeOpacity="0.14"
        strokeWidth="1.5"
      />
      <circle cx="44" cy="44" r="26" fill="var(--foreground)" fillOpacity="0.04" />
      <text
        x="44"
        y="44"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="26"
        fontWeight="600"
        letterSpacing="-1"
        fill="var(--foreground)"
        fillOpacity="0.55"
      >
        {label.charAt(0)}
      </text>
    </svg>
  );
}

export function Brands() {
  return (
    <section id="clients" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          variants={riseIn}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground-muted"
        >
          Brands he has worked with
        </motion.p>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-10 sm:gap-x-16"
        >
          {BRANDS.map((brand) => (
            <motion.li
              key={brand}
              variants={scaleIn}
              className="group flex flex-col items-center gap-3"
            >
              <div className="h-16 w-16 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                <LogoMark label={brand} />
              </div>
              <span className="text-xs font-medium tracking-wide text-muted">
                {brand}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
