import { Counter } from "../ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

export interface TrustMetric {
  /** Numeric value animated by the counter. Omit for a text-only stat. */
  value?: number;
  prefix?: string;
  suffix?: string;
  /** Used when the metric is non-numeric (e.g. "Bootstrapped"). */
  text?: string;
  label: string;
}

/**
 * Trust strip - a quiet band of proof metrics. Numeric metrics count up on
 * scroll; text metrics render as-is. Shared across both service pages.
 */
export function TrustMetrics({
  metrics,
  eyebrow = "Trusted by operators",
}: {
  metrics: TrustMetric[];
  eyebrow?: string;
}) {
  return (
    <section className="border-y border-border bg-background-sunken py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-foreground-muted">
            {eyebrow}
          </p>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {metrics.map((m) => (
            <RevealItem key={m.label} className="text-center">
              <p className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {typeof m.value === "number" ? (
                  <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                ) : (
                  m.text
                )}
              </p>
              <p className="mx-auto mt-2 max-w-[12rem] text-xs leading-relaxed text-foreground-muted">
                {m.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
