import type { Metadata } from "next";
import {
  ADVISORY_FAQS,
  ADVISORY_OUTCOMES,
  ADVISORY_PROBLEMS,
  ADVISORY_PROCESS,
  PERSONAS,
} from "@/lib/data";
import { AdvisoryForm } from "@/components/advisory/AdvisoryForm";
import { OutcomeExplorer } from "@/components/consulting/OutcomeExplorer";
import { Accordion } from "@/components/ui/Accordion";
import { CTAButton, Eyebrow, GhostButton, PageHero, RuleTick } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Business Advisory",
  description:
    "Hands-on business advisory: growth, transformation, RevOps, fractional CXO, finance, operations, AI, and corporate training — delivered inside your business, measured in the P&L.",
};

export default function BusinessAdvisoryPage() {
  return (
    <main>
      <PageHero
        eyebrow="Business Advisory"
        title={
          <>
            We don&apos;t present services.{" "}
            <span className="editorial-accent text-brand">
              We transform businesses.
            </span>
          </>
        }
        lead="Advisory done by an operator: diagnosis before prescription, systems installed with your team, outcomes measured in the P&L. Advice is included; the work is the point."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href="#enquiry">Send an enquiry</CTAButton>
          <GhostButton href="/case-studies">See transformations</GhostButton>
        </div>
      </PageHero>

      {/* What it is — the operating stance */}
      <section className="border-y border-border bg-background-elevated py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Diagnose before prescribing",
              c: "Two weeks inside your numbers and your rooms before any recommendation exists.",
            },
            {
              n: "02",
              t: "Build with your team",
              c: "Systems are installed with the people who will run them — capability transfers, dependency doesn't.",
            },
            {
              n: "03",
              t: "Measured in the P&L",
              c: "Every engagement names its metric on day one and reports against it until the end.",
            },
          ].map((s) => (
            <Reveal key={s.n}>
              <p className="font-display text-sm font-semibold text-brand">{s.n}</p>
              <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
                {s.t}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{s.c}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who it's for + what it solves */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Operators of real businesses
            </h2>
            <ul className="mt-8 space-y-4">
              {PERSONAS.filter((p) =>
                ["founder", "owner", "enterprise"].includes(p.id)
              ).map((p) => (
                <li key={p.id} className="flex gap-4 rounded-2xl border border-border bg-background-elevated px-6 py-5">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand" />
                  <div>
                    <p className="font-medium text-foreground">{p.label.replace(/^An? /, "")}s</p>
                    <p className="mt-0.5 text-sm text-foreground-muted">{p.headline}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <Eyebrow>The problems it solves</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              The walls growth hits
            </h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {ADVISORY_PROBLEMS.map((p, i) => (
                <li key={p} className="flex items-baseline gap-5 py-4">
                  <span className="font-display text-sm font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <RuleTick />

      {/* Types of advisory — the explorer */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Types of advisory</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Ten ways a business gets rebuilt
            </h2>
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              Choose an outcome. Each follows the same arc: challenge, approach,
              execution, outcome — and the proof it rests on.
            </p>
          </Reveal>
          <div className="mt-14">
            <OutcomeExplorer />
          </div>
        </div>
      </section>

      {/* How the process works */}
      <section className="border-t border-border bg-background-elevated py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>The process</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              From enquiry to handover
            </h2>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-5">
            {ADVISORY_PROCESS.map((s) => (
              <RevealItem key={s.step} className="bg-background p-7">
                <p className="font-display text-sm font-semibold text-brand">{s.step}</p>
                <p className="mt-3 font-display text-lg font-semibold tracking-tight text-foreground">
                  {s.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{s.copy}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Expected outcomes */}
          <Reveal className="mx-auto mt-16 max-w-3xl">
            <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-foreground-muted">
              What an engagement leaves behind
            </p>
            <ul className="mt-6 divide-y divide-border rounded-3xl border border-border bg-background">
              {ADVISORY_OUTCOMES.map((o, i) => (
                <li key={o} className="flex items-center gap-5 px-7 py-5">
                  <span className="font-display text-sm font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-foreground">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <Eyebrow>Questions, answered</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Before you write in
            </h2>
          </Reveal>
          <div className="mt-10">
            <Accordion items={ADVISORY_FAQS} />
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="scroll-mt-28 border-t border-border bg-blueprint py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>Enquiry</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Start the{" "}
              <span className="editorial-accent text-brand">conversation.</span>
            </h2>
            <p className="mt-5 max-w-md text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              Tell us where the business actually is. You&apos;ll get a human
              reply within one working day — and an honest read on fit.
            </p>
          </Reveal>
          <Reveal className="rounded-3xl border border-border bg-background p-8 shadow-[var(--shadow-soft)] sm:p-10">
            <AdvisoryForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
