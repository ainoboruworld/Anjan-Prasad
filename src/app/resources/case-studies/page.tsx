import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/ui/Primitives";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { riseIn } from "@/components/motion";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How real businesses were rebuilt to be profitable, systemised, and scalable — the challenge, the strategy, and the measurable results.",
};

type Study = {
  company: string;
  sector: string;
  challenge: string;
  strategy: string;
  results: string[];
};

const STUDIES: Study[] = [
  {
    company: "Meridian Foods",
    sector: "Consumer · Manufacturing",
    challenge:
      "Revenue was growing but profit was flat and the founder was the bottleneck for every decision.",
    strategy:
      "Rebuilt the operating model around unit economics, installed an operating cadence, and moved decision rights to a new leadership layer.",
    results: ["+42% gross margin", "3x forecasting accuracy", "Founder out of daily ops"],
  },
  {
    company: "Northwind Logistics",
    sector: "Logistics · B2B",
    challenge:
      "Rapid expansion had outrun the company's systems, and cash flow was unpredictable month to month.",
    strategy:
      "Introduced a cash-flow control tower, re-priced the book of business, and rationalised low-margin routes.",
    results: ["+28% EBITDA", "60-day cash visibility", "Two markets exited profitably"],
  },
  {
    company: "Aperture Health",
    sector: "Healthcare · SaaS",
    challenge:
      "Strong product, weak retention — growth spend was leaking out through churn.",
    strategy:
      "Reframed the growth model around retention and lifetime value, rebuilding onboarding and the success motion.",
    results: ["-35% churn", "1.7x net revenue retention", "Clean path to Series B"],
  },
  {
    company: "Cavalt Retail",
    sector: "Retail · Omnichannel",
    challenge:
      "A profitable single store struggling to become a profitable multi-store business.",
    strategy:
      "Documented the winning playbook, built a store-launch system, and standardised the operating scorecard.",
    results: ["4 stores in 12 months", "Consistent store-level profit", "Repeatable launch system"],
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Resources · Case studies"
        title="Businesses rebuilt to grow — with the receipts."
        lead="Real challenges, the strategy applied, and the measurable outcomes that followed."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <RevealGroup className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {STUDIES.map((s) => (
              <RevealItem key={s.company} variants={riseIn}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background-elevated/40 transition-colors hover:border-border-strong">
                  {/* Cover */}
                  <div className="relative aspect-[16/8] overflow-hidden border-b border-border">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(238,192,75,0.16),transparent_60%)]" />
                    <div className="absolute inset-0 bg-grid opacity-50" />
                    <div className="absolute left-6 top-6 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background font-display font-bold text-foreground">
                        {s.company.charAt(0)}
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold text-foreground">
                          {s.company}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          {s.sector}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                          Challenge
                        </p>
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                          {s.challenge}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                          Strategy
                        </p>
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                          {s.strategy}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
                      {s.results.map((r) => (
                        <span
                          key={r}
                          className="rounded-full bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand"
                        >
                          {r}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      Read the full case study
                      <ArrowUpRight
                        className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </a>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-t border-border py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeading
            eyebrow="Your business, next"
            title="The next case study could be yours."
            lead="If you're ready to build a profitable, scalable business, the advisory practice is where it starts."
          />
        </div>
      </section>
    </main>
  );
}
