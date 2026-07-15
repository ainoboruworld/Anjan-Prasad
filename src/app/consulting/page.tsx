import type { Metadata } from "next";
import { APPLY_CONSULTING_URL } from "@/lib/data";
import { OutcomeExplorer } from "@/components/consulting/OutcomeExplorer";
import { CTAButton, Eyebrow, GhostButton, PageHero } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Consulting — Business Transformation",
  description:
    "Hands-on business transformation: growth, digital transformation, RevOps, fractional CXO, finance, operations, and AI — delivered inside your business, not in a slide deck.",
};

export default function ConsultingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Consulting"
        title={
          <>
            We don&apos;t present services.{" "}
            <span className="editorial-accent text-brand">
              We transform businesses.
            </span>
          </>
        }
        lead="Every engagement is organised around an outcome — margin, growth, freedom from firefighting — and delivered inside your operating rhythm. Advice is included; the work is the point."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href={APPLY_CONSULTING_URL}>Apply for an engagement</CTAButton>
          <GhostButton href="/case-studies">See transformations</GhostButton>
        </div>
      </PageHero>

      {/* How an engagement works — the operating stance */}
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

      {/* The practice explorer */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>The practices</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Nine ways a business gets rebuilt
            </h2>
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              Choose an outcome. Each one follows the same arc: challenge,
              approach, execution, outcome — and the proof it rests on.
            </p>
          </Reveal>
          <div className="mt-14">
            <OutcomeExplorer />
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-blueprint border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Bring an operator{" "}
              <span className="editorial-accent text-brand">inside.</span>
            </h2>
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              Engagements begin with a working conversation about your
              business — not a pitch about ours.
            </p>
            <div className="mt-9">
              <CTAButton href={APPLY_CONSULTING_URL}>Start the conversation</CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
