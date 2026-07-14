"use client";

import { Counter } from "../ui/Counter";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { SectionHeading } from "../ui/Primitives";

import { STATS } from "@/lib/data";

export function Impact() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Business impact"
          title="Outcomes measured in profit, not promises."
          lead="A career spent building, operating, and advising — the numbers behind the work."
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border md:grid-cols-3">
          {STATS.map((s) => (
            <RevealItem
              key={s.label}
              className="bg-background p-8 sm:p-10 transition-colors hover:bg-background-elevated/60"
            >
              <p className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none tracking-tight text-foreground">
                <Counter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                {s.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
