import type { Metadata } from "next";
import { Search, ArrowUpRight } from "lucide-react";
import { PageHero, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Newsletter } from "@/components/Newsletter";
import { riseIn } from "@/components/motion";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Field notes on building profitable businesses — operations, systems, founder-led growth, and strategic execution.",
};

const CATEGORIES = [
  "All",
  "Operations",
  "Growth",
  "Finance",
  "Leadership",
  "Founder Stories",
];

const FEATURED = {
  category: "Operations",
  title: "The founder bottleneck: why your business can't scale past you",
  excerpt:
    "Most businesses don't stall because of the market. They stall because every important decision still routes through one person. Here is how to engineer yourself out of the critical path — without losing control.",
  read: "9 min read",
};

const TRENDING = [
  {
    category: "Finance",
    title: "Margin is a design decision, not an accident",
    read: "6 min",
  },
  {
    category: "Growth",
    title: "Retention is the cheapest growth channel you're ignoring",
    read: "7 min",
  },
  {
    category: "Leadership",
    title: "The operating cadence that runs the business for you",
    read: "5 min",
  },
];

const RECENT = [
  {
    category: "Founder Stories",
    title: "What building three profitable companies taught me about focus",
    read: "8 min",
  },
  {
    category: "Operations",
    title: "Systems over heroics: documenting the way you win",
    read: "6 min",
  },
  {
    category: "Growth",
    title: "Pricing for premium: how to charge what the work is worth",
    read: "7 min",
  },
  {
    category: "Finance",
    title: "Cash-flow forecasting for founders who hate spreadsheets",
    read: "5 min",
  },
  {
    category: "Leadership",
    title: "Hiring your first operator: the role that changes everything",
    read: "9 min",
  },
  {
    category: "Growth",
    title: "The unglamorous math behind sustainable scale",
    read: "6 min",
  },
];

export default function BlogsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Resources · Blogs"
        title="Field notes on building profitable businesses."
        lead="Operating knowledge from the arena — written to be used, not admired."
      />

      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-6">
          {/* Search + categories */}
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-sm">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                strokeWidth={1.75}
              />
              <input
                type="search"
                aria-label="Search articles"
                placeholder="Search articles"
                className="h-11 w-full rounded-full border border-border bg-background-elevated pl-11 pr-4 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    i === 0
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <a
              href="#"
              className="group grid grid-cols-1 overflow-hidden rounded-[1.75rem] border border-border bg-background-elevated/40 transition-colors hover:border-border-strong lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(238,192,75,0.16),transparent_60%)]" />
                <div className="absolute inset-0 bg-grid opacity-60" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  Featured · {FEATURED.category}
                </span>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-foreground">
                  {FEATURED.title}
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-foreground-muted">
                  {FEATURED.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  Read article
                  <ArrowUpRight
                    className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                  <span className="ml-3 text-muted">{FEATURED.read}</span>
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow>Trending now</Eyebrow>
          <RevealGroup className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TRENDING.map((p, i) => (
              <RevealItem key={p.title} variants={riseIn}>
                <a
                  href="#"
                  className="group flex h-full flex-col rounded-[1.5rem] border border-border bg-background p-8 transition-colors hover:border-border-strong"
                >
                  <span className="font-display text-3xl font-semibold text-brand/40">
                    0{i + 1}
                  </span>
                  <span className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                    {p.category}
                  </span>
                  <h3 className="mt-3 flex-1 font-display text-lg font-semibold leading-snug text-foreground">
                    {p.title}
                  </h3>
                  <span className="mt-6 text-sm text-muted">{p.read} read</span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Recent */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading align="left" eyebrow="Recent articles" title="Latest from the desk." />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {RECENT.map((p) => (
              <RevealItem key={p.title} variants={riseIn}>
                <a
                  href="#"
                  className="group flex h-full flex-col rounded-[1.5rem] border border-border bg-background-elevated/40 p-7 transition-colors hover:border-border-strong"
                >
                  <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(238,192,75,0.12),transparent_65%)]" />
                    <div className="absolute inset-0 bg-grid opacity-50" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                    {p.category}
                  </span>
                  <h3 className="mt-3 flex-1 font-display text-base font-semibold leading-snug text-foreground group-hover:text-foreground">
                    {p.title}
                  </h3>
                  <span className="mt-5 text-sm text-muted">{p.read} read</span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
