import type { ReactNode } from "react";
import { Eyebrow } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

export interface TimelineStep {
  step: string;
  title: string;
  copy: string;
}

/**
 * Timeline — an ordered process rail with a connecting spine. Used for both
 * the consultation journey and the advisory transformation framework.
 */
export function Timeline({
  eyebrow = "How it works",
  title,
  lead,
  steps,
  tone = "elevated",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  steps: TimelineStep[];
  tone?: "elevated" | "plain";
}) {
  return (
    <section
      className={`border-t border-border py-24 ${
        tone === "elevated" ? "bg-background-elevated" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            {title}
          </h2>
          {lead && (
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              {lead}
            </p>
          )}
        </Reveal>

        <RevealGroup className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <RevealItem
              key={s.step}
              className="relative rounded-3xl border border-border bg-background p-7"
            >
              <span className="numeral-outline font-display text-4xl font-bold leading-none">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {s.copy}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
