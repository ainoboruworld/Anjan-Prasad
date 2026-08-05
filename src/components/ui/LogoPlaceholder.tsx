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

/** A single full-colour logo with a restrained hover micro-interaction. */
export function LogoChip({ name, file }: LogoItem) {
  const src = file ?? logoFileFor(name);
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static, pre-optimised brand artwork
      <img
        src={`/brand-logos/${src}`}
        alt={`${name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-7 w-auto object-contain opacity-90 transition-all duration-300 ease-out will-change-transform group-hover:scale-[1.06] group-hover:opacity-100 sm:h-8"
      />
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
 * dividers. The dark-mode light wash lifts the logos off the dark canvas
 * without any hard container edge.
 */
export function LogoRow({
  logos,
  className = "",
}: {
  logos: LogoItem[];
  className?: string;
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <RevealGroup className="relative inline-flex max-w-full flex-wrap items-center justify-center gap-y-7">
        {/* Premium lighting: an edge-faded wash sized to the logos themselves
            (Dark-Mode only) — a lighting effect that lifts even dark marks off
            the canvas without any hard container edge. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-12 -inset-y-8 hidden dark:block"
          style={{
            background:
              "radial-gradient(115% 78% at 50% 50%, rgba(255,255,255,0.92), rgba(255,255,255,0.46) 48%, rgba(255,255,255,0) 76%)",
          }}
        />
        {logos.map((logo, idx) => (
          <RevealItem key={logo.name} className="relative flex items-center">
            <span className="group flex items-center justify-center px-6 sm:px-9">
              <LogoChip name={logo.name} file={logo.file} />
            </span>
            {idx < logos.length - 1 && (
              <span
                aria-hidden
                className="hidden h-7 w-px bg-black/[0.08] sm:block"
              />
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
