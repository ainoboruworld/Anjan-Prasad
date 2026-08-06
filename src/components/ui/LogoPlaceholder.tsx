"use client";

import { useState } from "react";
import { logoFileFor } from "@/lib/brandLogos";
import { RevealGroup, RevealItem } from "./Reveal";

/**
 * Brand logos as an editorial showcase - no cards, no boxes.
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
  /** Absolute image URL (e.g. a Sanity CDN asset). Takes precedence over file. */
  url?: string;
}

/** A single full-colour logo, sized to a uniform height inside its tile. */
export function LogoChip({ name, file, url }: LogoItem) {
  const bundled = file ?? logoFileFor(name);
  const src = url ?? (bundled ? `/brand-logos/${bundled}` : undefined);
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static, pre-optimised brand artwork
      <img
        src={src}
        alt={`${name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="max-h-7 w-auto max-w-[78%] object-contain transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.05] sm:max-h-8"
      />
    );
  }

  return (
    <span className="px-2 text-center font-display text-sm font-semibold tracking-tight text-neutral-700">
      {name}
    </span>
  );
}

/**
 * A wall of logos on uniform, refined tiles. Because every mark shares one
 * canvas, the tiles are identically sized and the logos carry equal visual
 * weight. The tile is a light, softly lifted surface in both themes, so every
 * brand - colourful or near-black - stays crisply legible in Dark and Light
 * mode, with a gentle hover lift. Centered wrapping keeps it responsive.
 */
export function LogoRow({
  logos,
  className = "",
}: {
  logos: LogoItem[];
  className?: string;
}) {
  return (
    <RevealGroup
      className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 ${className}`}
    >
      {logos.map((logo) => (
        <RevealItem
          key={logo.name}
          className="group flex h-[58px] w-[132px] items-center justify-center rounded-2xl border border-[rgba(0,0,0,0.05)] bg-white shadow-[0_1px_2px_rgba(16,33,45,0.05),0_12px_30px_-20px_rgba(16,33,45,0.4)] ring-1 ring-[rgba(0,0,0,0.02)] transition-all duration-300 ease-out [color-scheme:light] hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(16,33,45,0.06),0_18px_36px_-18px_rgba(16,33,45,0.5)] dark:border-[rgba(255,255,255,0.10)] dark:bg-white dark:ring-[rgba(255,255,255,0.06)] sm:h-16 sm:w-[150px]"
        >
          <LogoChip name={logo.name} file={logo.file} url={logo.url} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
