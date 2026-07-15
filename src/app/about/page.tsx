import type { Metadata } from "next";
import { JOURNEY } from "@/lib/data";
import { CTAButton, Eyebrow, GhostButton, PageHero, RuleTick } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Anjan Prasad",
  description:
    "Corporate leader, strategist, entrepreneur, business builder, advisor, mentor — the operator behind AP.com, India's business growth ecosystem.",
};

const ARC = [
  "Corporate Leader",
  "Strategist",
  "Entrepreneur",
  "Business Builder",
  "Advisor",
  "Mentor",
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title={
          <>
            He has built businesses —{" "}
            <span className="editorial-accent text-brand">
              not just talked about them.
            </span>
          </>
        }
        lead="Anjan Prasad is a business transformation and growth advisor. This is not a biography; it is the record of how an operator was formed."
      />

      {/* The identity arc — one line, six becomings */}
      <section className="border-y border-border bg-background-elevated py-14">
        <RevealGroup className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-4 px-6">
          {ARC.map((role, i) => (
            <RevealItem key={role} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="font-serif text-xl italic text-brand">
                  →
                </span>
              )}
              <span
                className={`font-display text-2xl font-semibold tracking-tight sm:text-3xl ${
                  i === ARC.length - 1 ? "text-brand" : "text-foreground"
                }`}
              >
                {role}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* The chapters, told as an editorial longread */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6" data-cursor="text">
          {JOURNEY.map((ch, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal
                key={ch.index}
                className={`grid gap-8 border-b border-border py-16 last:border-b-0 lg:grid-cols-12 ${
                  i === 0 ? "pt-0" : ""
                }`}
              >
                {/* Numeral + era column */}
                <div
                  className={`lg:col-span-4 ${flip ? "lg:order-2 lg:text-right" : ""}`}
                >
                  <p aria-hidden className="numeral-outline font-display text-8xl font-bold leading-none">
                    {ch.index}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.26em] text-brand">
                    {ch.era}
                  </p>
                </div>

                {/* Narrative column */}
                <div className={`lg:col-span-7 ${flip ? "lg:order-1" : "lg:col-start-6"}`}>
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {ch.title}
                  </h2>
                  <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
                    {ch.copy}
                  </p>
                  <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                    {ch.detail}
                  </p>
                  <p className="mt-6 flex flex-wrap gap-2">
                    {ch.marks.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground"
                      >
                        {m}
                      </span>
                    ))}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <RuleTick />

      {/* What that history means for you */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Eyebrow className="justify-center">Why it matters</Eyebrow>
            <p className="mt-8 font-display text-3xl font-medium leading-[1.3] tracking-tight text-foreground sm:text-4xl">
              Every framework on this platform was paid for in payroll,
              margins, and hard quarters —{" "}
              <span className="editorial-accent text-brand">
                before it was ever taught.
              </span>
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <CTAButton href="/courses">Learn the method</CTAButton>
              <GhostButton href="/consulting">Bring it into your business</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
