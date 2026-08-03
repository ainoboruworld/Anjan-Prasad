import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Portrait } from "@/components/brand/Portrait";
import { Counter } from "@/components/ui/Counter";
import {
  ACADEMIC_BRANDS,
  COMPANIES_FOUNDED,
  ENTERPRISE_BRANDS,
  STARTUP_BRANDS,
} from "@/lib/brandLogos";
import {
  CTAButton,
  Eyebrow,
  GhostButton,
  PageHero,
  RuleTick,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

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

/** Career timeline — the through-line from first job to CEO. */
const TIMELINE: { year: string; role: string; org?: string; marks?: string[] }[] = [
  { year: "2010", role: "Started career in Digital Marketing" },
  { year: "2011", role: "Team Lead", org: "Fareportal" },
  { year: "2011", role: "Co-founded WebExcel Solutions" },
  { year: "2012", role: "Manager", org: "Interactive Avenues" },
  { year: "2014", role: "Digital Project Manager", org: "Accenture" },
  { year: "2015", role: "Director", org: "Mindshare" },
  {
    year: "2015–2021",
    role: "Visiting Faculty",
    marks: ["IIFT", "IMT Ghaziabad", "BML Munjal University"],
  },
  { year: "2017", role: "Head of Digital Marketing", org: "The Art of Living" },
  { year: "2018", role: "Founded Noboru World" },
  { year: "2022", role: "Board Advisor", org: "Filing Buddy" },
  { year: "2023", role: "Co-founded Lushful" },
  { year: "2025", role: "CEO", org: "Filing Buddy" },
];

/** Featured companies, grouped — official logos from the Brand Portfolio. */
const COMPANY_GROUPS = [
  {
    title: "Companies founded",
    note: "Ventures built and led from the ground up.",
    logos: COMPANIES_FOUNDED,
  },
  {
    title: "Enterprise & brands worked with",
    note: "Growth, transformation and acquisition mandates at scale.",
    logos: ENTERPRISE_BRANDS,
  },
  {
    title: "Startups advised",
    note: "Scale-ups guided as advisor and mentor.",
    logos: STARTUP_BRANDS,
  },
  {
    title: "Academic institutions",
    note: "Visiting faculty in strategy, entrepreneurship and growth.",
    logos: ACADEMIC_BRANDS,
  },
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
            { n: 5, suffix: "", label: "Ventures built & co-founded" },
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

      {/* The story — bio alongside a portrait plate */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border border-border bg-background-elevated shadow-[var(--shadow-soft)]">
                <Portrait
                  fallback={
                    <div
                      aria-label="Portrait of Anjan Prasad — awaiting official photography"
                      role="img"
                      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_90%_at_50%_-10%,color-mix(in_srgb,var(--brand-sky)_10%,transparent),transparent_60%)] text-center"
                    >
                      <span className="font-display text-6xl font-bold tracking-tight text-brand/25">
                        AP
                      </span>
                      <span className="text-xs uppercase tracking-[0.24em] text-foreground-muted">
                        Portrait — official photo pending
                      </span>
                    </div>
                  }
                />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
                Founder &amp; CEO, Noboru World · CEO, Filing Buddy · Co-founder,
                Lushful · Board Advisor &amp; Mentor.
              </p>
            </div>
          </Reveal>

          <div>
            <Eyebrow>The record</Eyebrow>
            <RevealGroup className="mt-8 space-y-6">
              {STORY.map((para, i) => (
                <RevealItem key={i}>
                  <p
                    className={
                      i === 0
                        ? "text-[length:var(--text-lead)] leading-relaxed text-foreground"
                        : "text-[length:var(--text-body)] leading-relaxed text-foreground-muted"
                    }
                  >
                    {para}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-border bg-background-sunken py-24 sm:py-28">
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

      {/* Timeline — animated career journey */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Journey"
            title={
              <>
                From first job to{" "}
                <span className="editorial-accent text-brand">CEO.</span>
              </>
            }
            lead="Fifteen years of operating — inside global brands, then across ventures of his own."
          />

          <ol className="relative mt-16 border-l border-border-strong pl-8 sm:pl-12">
            {TIMELINE.map((t) => (
              <Reveal
                key={`${t.year}-${t.role}`}
                as="li"
                className="relative block pb-11 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute -left-[calc(2rem+1px)] top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-sky ring-4 ring-[color-mix(in_srgb,var(--brand-sky)_20%,transparent)] sm:-left-[calc(3rem+1px)]"
                />
                  <span className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-sky">
                    {t.year}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {t.role}
                    {t.org && (
                      <span className="text-foreground-muted"> · {t.org}</span>
                    )}
                  </h3>
                  {t.marks && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {t.marks.map((m) => (
                        <li
                          key={m}
                          className="rounded-full border border-border bg-background-elevated px-3 py-1 text-xs text-foreground-muted"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <RuleTick />

      {/* Featured companies — grouped logo walls */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Featured companies"
            title={
              <>
                The rooms where the{" "}
                <span className="editorial-accent text-brand">
                  playbook was earned.
                </span>
              </>
            }
            lead="Enterprises, scale-ups and institutions Anjan has built with, advised or taught."
          />

          <div className="mt-16 space-y-16">
            {COMPANY_GROUPS.map((group) => (
              <div key={group.title}>
                <div className="flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {group.title}
                  </h3>
                  <p className="text-sm text-foreground-muted">{group.note}</p>
                </div>
                <RevealGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {group.logos.map((logo) => (
                    <RevealItem key={logo.file}>
                      <BrandLogo logo={logo} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core expertise */}
      <section className="border-t border-border bg-background-sunken py-24 sm:py-28">
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

      {/* Why it matters + CTA */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Eyebrow className="justify-center">Why it matters</Eyebrow>
            <p className="mt-8 font-display text-3xl font-medium leading-[1.3] tracking-tight text-foreground sm:text-4xl">
              Every framework here was paid for in payroll, margins and hard
              quarters —{" "}
              <span className="editorial-accent text-brand">
                before it was ever taught.
              </span>
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <CTAButton href="/courses">Learn the method</CTAButton>
              <GhostButton href="/business-advisory">
                Bring it into your business
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
