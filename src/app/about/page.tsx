import type { Metadata } from "next";
import { Chapters } from "@/components/about/Chapters";
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

      {/* The chapters, told as an immersive editorial longread */}
      <section className="py-16 sm:py-20">
        <Chapters />
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
              <GhostButton href="/business-advisory">Bring it into your business</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
