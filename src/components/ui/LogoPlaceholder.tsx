import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Company-logo placeholders — premium, COLOURED chips (never grayscale).
 *
 * These stand in for official coloured brand logos until the artwork is
 * supplied. Each chip fixes the size, ratio, and spacing the real logo will
 * occupy, so swapping in an `<Image>` later is a drop-in with no layout
 * change. The chip carries the brand name as a tasteful wordmark on a soft
 * tinted card, so the wall reads as trustworthy even before art lands.
 */

/** A single coloured logo chip. */
export function LogoChip({ name }: { name: string }) {
  return (
    <div className="group relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-sky/40 hover:shadow-[var(--shadow-card-hover)]">
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_0%,color-mix(in_srgb,var(--brand-sky)_10%,transparent),transparent_60%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative px-4 text-center font-display text-[15px] font-semibold leading-tight tracking-tight text-foreground">
        {name}
      </span>
    </div>
  );
}

/** A responsive grid of coloured logo chips. */
export function LogoGrid({
  names,
  className = "",
}: {
  names: string[];
  className?: string;
}) {
  return (
    <RevealGroup
      className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      {names.map((name) => (
        <RevealItem key={name}>
          <LogoChip name={name} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** A titled group of logo chips — used by the Brand Wall. */
export function LogoGroup({
  title,
  note,
  names,
}: {
  title: string;
  note?: string;
  names: string[];
}) {
  return (
    <div>
      <Reveal className="flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        {note && <p className="text-sm text-foreground-muted">{note}</p>}
      </Reveal>
      <LogoGrid names={names} className="mt-8" />
    </div>
  );
}
