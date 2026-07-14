import type { Metadata } from "next";
import { PageHero, SectionHeading, CTAButton } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { riseIn } from "@/components/motion";
import { APPLY_ADVISORY_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Business Advisory",
  description:
    "Board-level advisory for founders and leadership teams — building profitable, scalable, sustainable businesses through operational excellence and strategic execution.",
};

const FOR = [
  "Founders scaling past the point their instincts can carry alone",
  "Business owners whose growth has outrun their systems",
  "Leadership teams preparing for a raise, an exit, or a new market",
  "Operators who want a sparring partner who has actually built companies",
];

const INDUSTRIES = [
  "Consumer & D2C",
  "SaaS & Technology",
  "Manufacturing & MSME",
  "Financial Services",
  "Logistics & Supply Chain",
  "Professional Services",
];

const PROCESS = [
  {
    n: "01",
    title: "Diagnose",
    desc: "A clear-eyed read of the business — economics, operations, and the single biggest constraint on growth.",
  },
  {
    n: "02",
    title: "Design",
    desc: "An operating model and roadmap: the systems, metrics, and moves that unlock profitable scale.",
  },
  {
    n: "03",
    title: "Execute",
    desc: "Hands-on partnership through implementation — cadence, accountability, and course-correction.",
  },
  {
    n: "04",
    title: "Compound",
    desc: "Durable systems that keep paying off long after the engagement ends.",
  },
];

const OUTCOMES = [
  { stat: "10X", label: "Growth delivered across engagements" },
  { stat: "40%+", label: "Typical margin improvement" },
  { stat: "90 days", label: "To a working operating model" },
];

export default function BusinessAdvisoryPage() {
  return (
    <main>
      <PageHero
        eyebrow="Business advisory"
        title="A partner in building a business that lasts."
        lead="Board-level counsel and hands-on operating partnership for founders serious about profitable, sustainable scale."
      >
        <CTAButton href={APPLY_ADVISORY_URL} external>
          Apply for business advisory
        </CTAButton>
      </PageHero>

      {/* What advisory is */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              align="left"
              eyebrow="What it is"
              title="Not consulting decks. Operating partnership."
              lead="Advisory here means someone in the arena with you — bringing fifteen years of building and running companies to your hardest decisions, then helping you execute them."
            />
            <Reveal variants={riseIn}>
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border">
                {OUTCOMES.map((o) => (
                  <div key={o.label} className="bg-background p-6 text-center">
                    <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                      {o.stat}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
                      {o.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-y border-border bg-background-elevated/30 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Who it's for"
            title="Built for operators, not spectators."
          />
          <RevealGroup
            as="ul"
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {FOR.map((f) => (
              <RevealItem
                key={f}
                as="li"
                variants={riseIn}
                className="flex items-start gap-4 rounded-2xl border border-border bg-background p-6"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                <span className="text-[15px] leading-relaxed text-foreground">
                  {f}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Industries served" title="Range earned in the field." />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-background-elevated/40 px-5 py-2.5 text-sm font-medium text-foreground-muted"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="The process"
            title="From diagnosis to durable systems."
          />
          <RevealGroup className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <RevealItem
                key={p.n}
                variants={riseIn}
                className="rounded-[1.5rem] border border-border bg-background-elevated/40 p-8"
              >
                <span className="font-display text-sm font-semibold text-brand">
                  {p.n}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {p.desc}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Success story + CTA */}
      <section className="border-t border-border bg-background-elevated/30 py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Success story
            </span>
            <blockquote className="mt-8 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-snug tracking-tight text-foreground">
              “In two quarters we went from cash-flow anxiety to a business that
              forecasts, delegates, and grows without me holding it up. That is
              what Anjan builds.”
            </blockquote>
            <p className="mt-6 text-sm text-foreground-muted">
              Founder &amp; CEO · Consumer business, ₹80Cr revenue
            </p>
            <div className="mt-10 flex justify-center">
              <CTAButton href={APPLY_ADVISORY_URL} external>
                Apply for business advisory
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
