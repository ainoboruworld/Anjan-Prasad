import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero, SectionHeading, CTAButton } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion, type QA } from "@/components/ui/Accordion";
import { riseIn } from "@/components/motion";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Executive education from an operator who builds profitable businesses. Start with a working demo session, then go deep with the premium course.",
};

const DEMO_LEARN = [
  "The operating model behind businesses that scale beyond their founder",
  "How to read your numbers and find the profit already hiding in your business",
  "A diagnostic framework to locate your single biggest constraint",
  "The first three systems every founder should install this quarter",
];

const MODULES = [
  {
    n: "01",
    title: "The Operator's Lens",
    desc: "Reframe your business as a system of flows, constraints, and cash.",
  },
  {
    n: "02",
    title: "Profit Architecture",
    desc: "Unit economics, margin design, and pricing that compounds.",
  },
  {
    n: "03",
    title: "Operating Cadence",
    desc: "Meetings, metrics, and rhythms that run the business for you.",
  },
  {
    n: "04",
    title: "Founder-Led Growth",
    desc: "Repeatable acquisition and retention engines built to last.",
  },
  {
    n: "05",
    title: "Team & Delegation",
    desc: "Org design and hiring that removes you from the critical path.",
  },
  {
    n: "06",
    title: "Scale & Systems",
    desc: "Documentation, controls, and the path to sustainable scale.",
  },
];

const OUTCOMES = [
  "A written operating model for your business",
  "A profit-and-cash dashboard you actually use",
  "A 90-day execution plan with clear owners",
  "The confidence to step out of daily operations",
];

const FAQS: QA[] = [
  {
    q: "Who is this course for?",
    a: "Founders, business owners, and operators running a real business who want to make it profitable, systemised, and scalable — not aspiring entrepreneurs looking for theory.",
  },
  {
    q: "How is this different from an online course?",
    a: "It is executive education built by an operator. Every module is drawn from building and scaling real, profitable companies — with frameworks you apply to your own business as you go.",
  },
  {
    q: "How much time should I commit?",
    a: "Plan for three to four focused hours a week. The work is applied — you build your operating model alongside the curriculum.",
  },
  {
    q: "Is there support?",
    a: "Yes. The premium cohort includes live sessions, feedback on your work, and a peer group of serious operators.",
  },
];

export default function CoursesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Executive education"
        title="Learn to build a profitable business — from someone who has."
        lead="No theory-only playbooks. This is the operating knowledge behind real companies, taught to be applied to yours."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton href="#demo">Join the demo session</CTAButton>
          <CTAButton href="#premium" className="bg-foreground text-background shadow-none hover:bg-foreground">
            Explore the premium course
          </CTAButton>
        </div>
      </PageHero>

      {/* Demo Session */}
      <section id="demo" className="scroll-mt-28 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Start here · Demo session
              </span>
              <h2 className="mt-6 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
                A working session, not a webinar.
              </h2>
              <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                Ninety minutes inside the operator&apos;s playbook. You leave
                with a
                clearer diagnosis of your business and a concrete next move —
                whether or not you continue.
              </p>

              <ul className="mt-8 space-y-4">
                {DEMO_LEARN.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      strokeWidth={2}
                    />
                    <span className="text-[15px] leading-relaxed text-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variants={riseIn}>
              <div className="rounded-[1.5rem] border border-border bg-background-elevated/50 p-8 sm:p-10">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">
                      Live demo session
                    </p>
                    <p className="mt-2 font-display text-4xl font-semibold text-foreground">
                      ₹499
                    </p>
                    <p className="mt-1 text-sm text-muted line-through">
                      ₹2,499
                    </p>
                  </div>
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    Limited seats
                  </span>
                </div>

                <dl className="mt-8 space-y-4 border-t border-border pt-6 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-foreground-muted">Duration</dt>
                    <dd className="font-medium text-foreground">90 minutes</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground-muted">Format</dt>
                    <dd className="font-medium text-foreground">Live · Online</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground-muted">Includes</dt>
                    <dd className="font-medium text-foreground">
                      Workbook + recording
                    </dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <CTAButton href="/sign-in" className="w-full justify-center">
                    Reserve your seat
                  </CTAButton>
                </div>
                <p className="mt-4 text-center text-xs text-muted">
                  Why attend? You&apos;ll walk away with one decision that pays
                  for the seat many times over.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Premium Course */}
      <section
        id="premium"
        className="scroll-mt-28 border-t border-border bg-background-elevated/30 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Premium course"
            title="The Operator's Program."
            lead="A six-module program that turns your business into a profitable, systemised, scalable company — taught as executive education, not an online course."
          />

          <RevealGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <RevealItem
                key={m.n}
                variants={riseIn}
                className="bg-background p-8"
              >
                <span className="font-display text-sm font-semibold text-brand">
                  {m.n}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {m.desc}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                What you walk away with
              </h3>
              <ul className="mt-6 space-y-4">
                {OUTCOMES.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      strokeWidth={2}
                    />
                    <span className="text-[15px] leading-relaxed text-foreground">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <CTAButton href="/sign-in">Enrol in the program</CTAButton>
              </div>
            </Reveal>

            <Reveal variants={riseIn}>
              <figure className="rounded-[1.5rem] border border-border bg-background p-8 sm:p-10">
                <blockquote className="text-lg leading-relaxed text-foreground">
                  “I have paid for programs ten times the price. This is the one
                  that actually changed how the business runs.”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <p className="text-sm font-semibold text-foreground">
                    Karan Shah
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    Founder, D2C brand · Program alumnus
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mx-auto mt-24 max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Questions, answered." />
            <div className="mt-12">
              <Accordion items={FAQS} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
