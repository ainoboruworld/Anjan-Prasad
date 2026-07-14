import { RevealGroup, RevealItem } from "./Reveal";
import { scaleIn } from "../motion";

function initials(name: string) {
  const clean = name.replace(/\(.*?\)/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Elegant monochrome logo placeholder: a monogram tile beside the name.
 * Designed to be swapped for a real SVG logo asset later.
 */
export function LogoBadge({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={`group flex items-center gap-3 rounded-full border border-border bg-background-elevated/40 px-4 py-2.5 transition-colors duration-300 hover:border-border-strong ${className}`}
    >
      <span
        aria-hidden
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border text-[11px] font-semibold tracking-tight text-foreground-muted transition-colors group-hover:text-foreground"
      >
        {initials(name)}
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-foreground-muted transition-colors group-hover:text-foreground">
        {name}
      </span>
    </div>
  );
}

/** Static, revealing grid of logo badges. */
export function LogoGrid({ names }: { names: string[] }) {
  return (
    <RevealGroup
      as="ul"
      className="flex flex-wrap justify-center gap-3 sm:gap-4"
    >
      {names.map((name) => (
        <RevealItem key={name} as="li" variants={scaleIn}>
          <LogoBadge name={name} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Infinite marquee row of logo badges (duplicated for seamless loop). */
export function LogoMarquee({ names }: { names: string[] }) {
  const row = [...names, ...names];
  return (
    <div className="marquee-mask relative w-full overflow-hidden">
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {row.map((name, i) => (
          <LogoBadge key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}
