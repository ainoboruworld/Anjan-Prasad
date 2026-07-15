import type { Metadata } from "next";
import { TRAINING_PROGRAMS, TRAINING_URL } from "@/lib/data";
import { CTAButton, Eyebrow, GhostButton, PageHero, RuleTick } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Corporate Training — Enterprise Transformation Partner",
  description:
    "Leadership development, AI capability, digital transformation, and workforce upskilling — enterprise training programs designed and taught by an operator.",
};

export default function CorporateTrainingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Corporate Training"
        title={
          <>
            Transformation that reaches{" "}
            <span className="editorial-accent text-brand">the whole floor.</span>
          </>
        }
        lead="AP.com partners with organisations to build capability that sticks — leadership, AI, digital transformation, and modern operating skills, taught by someone who has run the functions being trained."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href={TRAINING_URL}>Design a program</CTAButton>
          <GhostButton href="/media">Institutional credibility</GhostButton>
        </div>
      </PageHero>

      {/* Why enterprises engage */}
      <section className="border-y border-border bg-background-elevated py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
          {[
            {
              t: "Operator-taught",
              c: "Programs designed from two decades operating agencies, enterprises, and founded companies — not from a facilitation manual.",
            },
            {
              t: "Built for your context",
              c: "Every program starts from your workflows, your data, your constraints. Nothing off the shelf.",
            },
            {
              t: "Measured capability",
              c: "Baseline before, evidence after. Training is an investment case, and it reports like one.",
            },
          ].map((s, i) => (
            <Reveal key={s.t}>
              <p aria-hidden className="font-serif text-lg italic text-brand">
                {["I", "II", "III"][i]}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
                {s.t}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{s.c}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programs — editorial ledger, not cards */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>The programs</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Six mandates we take on
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 divide-y divide-border border-y border-border">
            {TRAINING_PROGRAMS.map((p, i) => (
              <RevealItem
                key={p.title}
                className="group grid gap-4 py-8 transition-colors duration-300 hover:bg-background-elevated sm:grid-cols-12 sm:items-baseline sm:px-4"
              >
                <p className="font-display text-sm font-semibold text-brand sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:col-span-4">
                  {p.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-foreground-muted sm:col-span-5">
                  {p.copy}
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-muted sm:col-span-2 sm:text-right">
                  {p.audience}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <RuleTick />

      {/* Engagement shape */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Eyebrow>How it runs</Eyebrow>
              <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
                From diagnostic to embedded capability
              </h2>
              <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                Programs run as cohorts inside your organisation — workshops
                anchored to live work, between-session implementation, and
                leadership reviews that make the new behaviour the norm.
              </p>
              <div className="mt-9">
                <CTAButton href={TRAINING_URL}>Talk to us about a cohort</CTAButton>
              </div>
            </Reveal>

            <RevealGroup className="space-y-3">
              {[
                ["Week 0", "Capability diagnostic and baseline"],
                ["Weeks 1–6", "Cohort sessions anchored to live workflows"],
                ["Continuous", "Implementation sprints with review"],
                ["Close", "Measured outcomes and a sustaining playbook"],
              ].map(([k, v]) => (
                <RevealItem
                  key={k}
                  className="flex items-center gap-6 rounded-2xl border border-border bg-background-elevated px-6 py-5"
                >
                  <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                    {k}
                  </span>
                  <span className="text-[15px] text-foreground">{v}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
    </main>
  );
}
