import type { Metadata } from "next";
import { GraduationCap, Mic, Target, Telescope } from "lucide-react";
import { PageHero, SectionHeading, Eyebrow, CTAButton } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LogoGrid } from "@/components/ui/LogoBadge";
import { riseIn, slideInLeft } from "@/components/motion";
import { BRANDS, CAREER, COMPANIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Anjan Prasad — entrepreneur, operator, CEO, investor, and advisor who has spent 15+ years building profitable, scalable businesses.",
};

const TIMELINE = [
  {
    year: "2009",
    title: "Into the arena",
    desc: "Started inside the agencies and consultancies that build the world's biggest brands — learning how growth actually works at scale.",
  },
  {
    year: "2014",
    title: "The operator's turn",
    desc: "Moved from advising to operating — taking ownership of P&Ls and discovering that systems, not slogans, build profit.",
  },
  {
    year: "2018",
    title: "Building companies",
    desc: "Founded and co-founded ventures across brand, consumer, and finance operations — each built to be profitable and to last.",
  },
  {
    year: "2021",
    title: "Enterprise products",
    desc: "Built enterprise marketing and operations products, bringing operator discipline to software and services.",
  },
  {
    year: "Today",
    title: "Advisor & mentor",
    desc: "Advising founders and leadership teams, teaching the next generation, and speaking on the economics of sustainable growth.",
  },
];

const PHILOSOPHY = [
  {
    title: "Profit is the proof",
    desc: "Vanity metrics fade. A business that makes money sustainably is the only real evidence that the model works.",
  },
  {
    title: "Systems over heroics",
    desc: "The goal is a business that runs on process and cadence — not on any one person's stamina.",
  },
  {
    title: "Founder-led, founder-free",
    desc: "Great founders set direction and build the machine — then step out of the machine's daily turning.",
  },
];

const LEADERSHIP = [
  {
    Icon: GraduationCap,
    title: "Visiting Professor",
    desc: "Teaching business strategy and operations to the next generation of founders and leaders.",
  },
  {
    Icon: Mic,
    title: "Industry Speaker",
    desc: "A regular voice on stages and podcasts on growth, operations, and building profitable businesses.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="A builder of businesses — not a teacher of theory."
        lead="Fifteen years founding companies, running them, and advising the brands you know. This is the story behind the work."
      />

      {/* Journey timeline */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="The journey" title="From the arena to the boardroom." align="left" />
          <div className="relative mt-16">
            <span
              aria-hidden
              className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[calc(6rem+7px)]"
            />
            <RevealGroup className="space-y-12">
              {TIMELINE.map((t) => (
                <RevealItem
                  key={t.year}
                  variants={slideInLeft}
                  className="relative flex flex-col gap-3 pl-8 sm:flex-row sm:gap-8 sm:pl-0"
                >
                  <div className="flex items-center gap-3 sm:w-24 sm:flex-col sm:items-start">
                    <span className="font-display text-sm font-semibold text-brand">
                      {t.year}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-brand bg-background sm:left-24"
                  />
                  <div className="sm:flex-1 sm:pl-8">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                      {t.desc}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-y border-border bg-background-elevated/30 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Philosophy" title="The beliefs that shape the work." />
          <RevealGroup className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PHILOSOPHY.map((p) => (
              <RevealItem
                key={p.title}
                variants={riseIn}
                className="rounded-[1.5rem] border border-border bg-background p-8"
              >
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">
                  {p.desc}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Companies built */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Companies built" title="Profitable businesses, built from the inside." />
          <RevealGroup className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {COMPANIES.map((c) => (
              <RevealItem
                key={c.name}
                variants={riseIn}
                className="rounded-[1.5rem] border border-border bg-background-elevated/40 p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background font-display text-lg font-bold text-foreground">
                  {c.name.charAt(0)}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand">{c.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                  {c.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Brands + Career */}
      <section className="border-t border-border py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Brands worked with" title="Range earned across the market." />
          <div className="mt-12">
            <LogoGrid names={BRANDS} />
          </div>
          <div className="mx-auto mt-20 text-center">
            <Eyebrow>Career experience</Eyebrow>
          </div>
          <div className="mt-8">
            <LogoGrid names={CAREER} />
          </div>
        </div>
      </section>

      {/* Leadership / professor / speaker */}
      <section className="border-t border-border bg-background-elevated/30 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Beyond the businesses" title="Leadership, teaching, and the stage." />
          <RevealGroup className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {LEADERSHIP.map(({ Icon, title, desc }) => (
              <RevealItem
                key={title}
                variants={riseIn}
                className="flex gap-6 rounded-[1.5rem] border border-border bg-background p-8"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                    {desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal variants={riseIn}>
              <div className="h-full rounded-[1.75rem] border border-border bg-background-elevated/40 p-10">
                <Telescope className="h-7 w-7 text-brand" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                  Vision
                </h3>
                <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                  A world where more founders build businesses that are
                  genuinely profitable, calmly run, and built to outlast the
                  people who started them.
                </p>
              </div>
            </Reveal>
            <Reveal variants={riseIn}>
              <div className="h-full rounded-[1.75rem] border border-border bg-background-elevated/40 p-10">
                <Target className="h-7 w-7 text-brand" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                  Mission
                </h3>
                <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                  To give founders the operating knowledge, systems, and counsel
                  that turn ambition into sustainable, scalable, profitable
                  growth.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 flex justify-center">
            <CTAButton href="/contact">Start a conversation</CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
