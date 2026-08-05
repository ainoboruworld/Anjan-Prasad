"use client";

import { useState } from "react";
import { logoFileFor } from "@/lib/brandLogos";
import { RevealGroup, RevealItem } from "./Reveal";

/**
 * Brand logos as an editorial showcase — no cards, no boxes.
 *
 * Every mark is delivered on the same 212×72 canvas, so rendering at one fixed
 * height gives each brand an identical footprint: rows stay perfectly even and
 * every logo carries equal visual weight regardless of the artwork inside. The
 * logos sit directly in the layout, separated by hairline dividers, and in Dark
 * Mode a soft edge-faded light wash (a lighting effect, not a container) keeps
 * even dark marks legible while fading seamlessly into the page.
 */

export interface LogoItem {
  name: string;
  file?: string;
}

/** A single full-colour logo with a restrained scale-on-hover. */
export function LogoChip({ name, file }: LogoItem) {
  const src = file ?? logoFileFor(name);
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <span className="flex items-center justify-center rounded-full px-3 py-1.5 dark:[background:radial-gradient(62%_128%_at_50%_50%,rgba(255,255,255,0.13),rgba(255,255,255,0.05)_52%,rgba(255,255,255,0)_76%)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- static, pre-optimised brand artwork */}
        <img
          src={`/brand-logos/${src}`}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-6 w-auto max-w-[42vw] object-contain opacity-90 transition-all duration-300 ease-out will-change-transform group-hover:scale-[1.06] group-hover:opacity-100 dark:opacity-95 dark:group-hover:opacity-100 sm:h-7 lg:h-8"
        />
      </span>
    );
  }

  return (
    <span className="font-display text-sm font-semibold tracking-tight text-neutral-500 transition-colors duration-300 group-hover:text-neutral-800">
      {name}
    </span>
  );
}

/**
 * A row of logos embedded directly in the page, separated by thin vertical
 * dividers. A full-width wrapping flex keeps it from ever overflowing, so it
 * stays balanced from mobile to desktop. The logos sit directly on the canvas
 * at a slightly reduced opacity — no highlight — and lift to full presence on
 * hover.
 */
export function LogoRow({
  logos,
  className = "",
}: {
  logos: LogoItem[];
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <RevealGroup className="flex w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-4 sm:gap-x-3 sm:gap-y-6">
        {logos.map((logo, idx) => (
          <RevealItem key={logo.name} className="group flex items-center">
            <span className="flex items-center justify-center px-3 sm:px-5 lg:px-6">
              <LogoChip name={logo.name} file={logo.file} />
            </span>
            {idx < logos.length - 1 && (
              <span
                aria-hidden
                className="hidden h-6 w-px bg-black/[0.10] dark:bg-white/[0.12] sm:block"
              />
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
