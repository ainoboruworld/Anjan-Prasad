import { RevealGroup, RevealItem } from "../ui/Reveal";

const STATS = [
  { value: "16+", label: "Years Experience" },
  { value: "5", label: "Ventures Built" },
  { value: "100+", label: "Brands Advised" },
  { value: "Fortune 500", label: "Experience" },
  { value: "3", label: "Premier B-Schools" },
  { value: "Founder", label: "CEO & Startup Mentor" },
];

/**
 * Trust indicators directly below the hero — the numbers that answer
 * "why should I trust him?" before a single paragraph is read.
 */
export function TrustIndicators() {
  return (
    <section
      aria-label="Trust indicators"
      className="border-y border-border bg-background-elevated/60"
    >
      <RevealGroup
        as="ul"
        className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-12 sm:py-14 sm:grid-cols-3 lg:grid-cols-6"
      >
        {STATS.map((s) => (
          <RevealItem
            key={s.label}
            as="li"
            className="flex flex-col items-center gap-2 px-4 py-4 text-center"
          >
            <span className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {s.value}
            </span>
            <span className="max-w-[12rem] text-sm leading-relaxed text-foreground-muted">
              {s.label}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
