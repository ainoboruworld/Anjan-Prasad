import { RevealGroup, RevealItem } from "../ui/Reveal";

const STATS = [
  { value: "20+", label: "Years operating businesses" },
  { value: "3", label: "Companies founded, bootstrapped, profitable" },
  { value: "25+", label: "Global brands advised" },
  { value: "1000s", label: "Founders, students & SMEs guided" },
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
        className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-12 sm:py-14 lg:grid-cols-4"
      >
        {STATS.map((s) => (
          <RevealItem
            key={s.label}
            as="li"
            className="flex flex-col items-center gap-2 px-4 py-4 text-center"
          >
            <span className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {s.value}
            </span>
            <span className="max-w-[16rem] text-sm leading-relaxed text-foreground-muted">
              {s.label}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
