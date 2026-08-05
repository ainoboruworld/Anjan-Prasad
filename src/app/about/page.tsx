import type { Metadata } from "next";
import { Counter } from "@/components/ui/Counter";
import { JOURNEY } from "@/lib/data";
import {
  Eyebrow,
  PageHero,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  Staircase,
  type StaircaseChapter,
} from "@/components/about/Staircase";

export const metadata: Metadata = {
  title: "About Anjan Prasad — Entrepreneur & Business Strategist",
  description:
    "Anjan Prasad is an entrepreneur, business strategist, startup mentor and growth advisor with 16+ years building, scaling and transforming companies — from Fortune 500 rooms to bootstrapped ventures.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Anjan Prasad — Entrepreneur & Business Strategist",
    description:
      "16+ years building, scaling and transforming companies. Founder & CEO of Noboru World, CEO of Filing Buddy, and mentor to founders across industries.",
    type: "profile",
    url: "/about",
  },
};

/** How Anjan is positioned — the becomings, not job titles. */
const ARC = [
  "Entrepreneur",
  "Business Strategist",
  "Growth Advisor",
  "Startup Mentor",
  "Founder",
  "Business Builder",
];

/** The story, told plainly — an operator's record, not a résumé. */
const STORY: string[] = [
  "Anjan Prasad is an entrepreneur, business strategist, startup mentor and growth advisor with over 16 years of experience helping companies build, scale and transform. His career spans startups, Fortune 500 companies, agencies, consulting firms and academic institutions — a rare vantage on how successful businesses are actually built from the ground up.",
  "He is the Founder & CEO of Noboru World, a strategy-led marketing and business consulting company that has partnered with brands across finance, D2C, mobility, agriculture, SaaS, healthcare and technology. Beyond consulting, he has built and co-founded multiple ventures — including Lushful, an organic farm-to-home company, and WebExcel Solutions — and today serves as CEO of Filing Buddy while advising emerging startups as a board advisor and mentor.",
  "Earlier in his career he held leadership roles at Mindshare, Accenture, Interactive Avenues, Fareportal, The Art of Living and Zeta Interactive, leading digital transformation, performance marketing, business strategy and customer acquisition for some of the world's most recognised brands.",
  "Alongside entrepreneurship, Anjan has contributed to management education as Visiting Faculty at IIFT, IMT Ghaziabad and BML Munjal University, mentoring the next generation of business leaders in digital strategy, entrepreneurship and growth.",
];

/** Core expertise — the disciplines behind the record. */
const EXPERTISE = [
  "Business Strategy",
  "Startup Consulting",
  "Brand Building",
  "Business Growth",
  "Digital Transformation",
  "Go-to-Market Strategy",
  "Performance Marketing",
  "AI-led Marketing",
  "Customer Acquisition",
  "Business Systems",
  "Team Building",
  "Marketing Automation",
  "Leadership & Mentorship",
];

/**
 * The staircase chapters — the existing JOURNEY, enriched with the existing
 * career milestones (TIMELINE), company names and STORY paragraphs,
 * redistributed so every step is a short, visual composition rather than a
 * wall of text. No new biography is written here.
 */
const CHAPTERS: StaircaseChapter[] = [
  {
    step: "01",
    title: JOURNEY[0].title,
    blurb: JOURNEY[0].copy,
    imageLabel: "Boardrooms & planning cycles",
    logos: ["Mindshare", "Accenture", "IPG Mediabrands", "Interactive Avenues"],
    milestones: [
      { year: "2010", label: "Started career in Digital Marketing" },
      { year: "2012", label: "Manager · Interactive Avenues" },
      { year: "2014", label: "Digital Project Manager · Accenture" },
      { year: "2015", label: "Director · Mindshare" },
    ],
    quote: STORY[2],
    highlight: { label: "The step", value: "Corporate Foundation" },
  },
  {
    step: "02",
    title: JOURNEY[1].title,
    blurb: JOURNEY[1].copy,
    imageLabel: "Speaking engagements",
    logos: ["Zeta Global", "Fareportal", "The Art of Living"],
    milestones: [
      { year: "2011", label: "Team Lead · Fareportal" },
      { year: "2017", label: "Head of Digital Marketing · The Art of Living" },
    ],
    quote: JOURNEY[1].detail,
    highlight: { label: "The step", value: "Enterprise altitude" },
  },
  {
    step: "03",
    title: JOURNEY[2].title,
    blurb: JOURNEY[2].copy,
    imageLabel: "Founder interactions",
    logos: ["Noboru World", "Lushful", "Filing Buddy", "WebExcel Solutions"],
    milestones: [
      { year: "2011", label: "Co-founded WebExcel Solutions" },
      { year: "2018", label: "Founded Noboru World" },
      { year: "2023", label: "Co-founded Lushful" },
    ],
    quote: STORY[1],
    highlight: { label: "The step", value: "Bootstrapped & profitable" },
  },
  {
    step: "04",
    title: JOURNEY[3].title,
    blurb: JOURNEY[3].copy,
    imageLabel: "Team discussions",
    logos: ["Urban Kisaan", "Akounto", "Filing Buddy"],
    milestones: [{ year: "2022", label: "Board Advisor · Filing Buddy" }],
    quote: JOURNEY[3].detail,
    highlight: { label: "The step", value: "Growth made repeatable" },
  },
  {
    step: "05",
    title: JOURNEY[4].title,
    blurb: JOURNEY[4].copy,
    imageLabel: "Workshops & working sessions",
    milestones: [{ year: "2025", label: "CEO · Filing Buddy" }],
    quote: JOURNEY[4].detail,
    highlight: { label: "The step", value: "Margin, not meetings" },
  },
  {
    step: "06",
    title: JOURNEY[5].title,
    blurb: JOURNEY[5].copy,
    imageLabel: "Guest lectures & mentoring",
    logos: ["IIFT", "IMT Ghaziabad", "BML Munjal University"],
    milestones: [
      { year: "2015–2021", label: "Visiting Faculty · IIFT · IMT · BML Munjal" },
    ],
    quote: STORY[3],
    highlight: { label: "The step", value: "Teaching what building takes" },
  },
];

/** The closing tread — the staircase fades into light; the climb continues. */
function ClosingStep() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-36 text-center sm:py-44">
      <Reveal>
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-foreground-muted">
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand" />
          The climb continues
        </span>
        <p className="mt-8 font-display text-3xl font-medium leading-[1.3] tracking-tight text-foreground sm:text-[2.5rem]">
          Every experience becomes another lesson. Every conversation becomes
          another step.{" "}
          <span className="editorial-accent text-brand">
            The journey continues.
          </span>
        </p>
      </Reveal>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title={
          <>
            He builds businesses —{" "}
            <span className="editorial-accent text-brand">
              then teaches how it&apos;s done.
            </span>
          </>
        }
        lead="Anjan Prasad is an entrepreneur, business strategist and growth advisor with 16+ years across startups, Fortune 500 companies and the classroom. This is the record of how an operator was formed."
      />

      {/* The identity arc — six becomings on one line */}
      <section className="border-y border-border bg-background-elevated py-14">
        <RevealGroup className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-4 px-6">
          {ARC.map((role, i) => (
            <RevealItem key={role} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="font-serif text-xl italic text-brand-sky">
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

      {/* Animated stats — the record in numbers */}
      <section className="border-b border-border bg-background-sunken py-16 sm:py-20">
        <RevealGroup
          as="ul"
          className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-6 lg:grid-cols-4"
        >
          {[
            { n: 16, suffix: "+", label: "Years of experience" },
            { n: 4, suffix: "", label: "Ventures built & co-founded" },
            { n: 100, suffix: "+", label: "Brands advised" },
            { n: 3, suffix: "", label: "Premier B-schools taught at" },
          ].map((s) => (
            <RevealItem
              as="li"
              key={s.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <Counter
                value={s.n}
                suffix={s.suffix}
                className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
              />
              <span className="max-w-[12rem] text-sm leading-relaxed text-foreground-muted">
                {s.label}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Mission & Vision — the reason he keeps climbing */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            <RevealItem className="card p-9 sm:p-11">
              <Eyebrow>Mission</Eyebrow>
              <p className="mt-6 font-display text-2xl font-medium leading-[1.35] tracking-tight text-foreground sm:text-[1.75rem]">
                To help founders and professionals build businesses that are{" "}
                <span className="editorial-accent text-brand">
                  profitable, scalable and built to last.
                </span>
              </p>
            </RevealItem>
            <RevealItem className="card p-9 sm:p-11">
              <Eyebrow>Vision</Eyebrow>
              <p className="mt-6 font-display text-2xl font-medium leading-[1.35] tracking-tight text-foreground sm:text-[1.75rem]">
                A generation of Indian businesses run on{" "}
                <span className="editorial-accent text-brand">
                  systems and clarity
                </span>{" "}
                — not guesswork — with the discipline to compound for decades.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Core expertise — the facets of a curious operator */}
      <section className="border-y border-border bg-background-sunken py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Core expertise"
            title={
              <>
                What he&apos;s{" "}
                <span className="editorial-accent text-brand">
                  actually good at.
                </span>
              </>
            }
          />
          <RevealGroup className="mt-12 flex flex-wrap gap-3">
            {EXPERTISE.map((e) => (
              <RevealItem key={e}>
                <span className="inline-flex rounded-full border border-border bg-background-elevated px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand-sky/50 hover:text-brand">
                  {e}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* The staircase of continuous learning */}
      <section className="pt-24 sm:pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="The staircase of continuous learning"
            title={
              <>
                Not a ladder to the top —{" "}
                <span className="editorial-accent text-brand">
                  a staircase that never ends.
                </span>
              </>
            }
            lead="Every step is a new lesson, a new industry, a new company, a new perspective. Scroll to climb it."
          />
        </div>

        <div className="mt-8">
          <Staircase chapters={CHAPTERS} ending={<ClosingStep />} />
        </div>
      </section>
    </main>
  );
}
