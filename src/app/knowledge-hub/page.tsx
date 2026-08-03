import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES, HUB_CATEGORIES } from "@/lib/data";
import { HubExplorer } from "@/components/hub/HubExplorer";
import { Eyebrow, PageHero, RuleTick } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Knowledge Hub — Business Playbooks & Frameworks",
  description:
    "A premium business publication: playbooks, frameworks, and field notes on starting, building, and scaling profitable businesses in India — from validation to AI.",
  alternates: { canonical: "/knowledge-hub" },
  openGraph: {
    title: "Knowledge Hub — AP.com",
    description:
      "Playbooks, frameworks, and field notes on building profitable businesses.",
    url: "/knowledge-hub",
    type: "website",
  },
};

export default function KnowledgeHubPage() {
  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const picks = ARTICLES.filter((a) => a.editorsPick && a.slug !== featured.slug).slice(0, 2);

  return (
    <main>
      <PageHero
        eyebrow="Knowledge Hub"
        title={
          <>
            The operator&apos;s{" "}
            <span className="editorial-accent text-brand">library.</span>
          </>
        }
        lead="A working publication — playbooks, frameworks, and field notes from inside real businesses. Written to be used, not skimmed."
      />

      {/* Featured — front-page spread + two picks */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Featured</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Lead article */}
            <Reveal
              as="div"
              className="card card-hover group relative flex flex-col justify-end overflow-hidden p-9 sm:p-11"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,color-mix(in_srgb,var(--brand-sky)_16%,transparent),transparent_55%)]"
              />
              <div className="relative">
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  {featured.category}
                </span>
                <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-[2.6rem]">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-lg text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
                  {featured.dek}
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/12 font-display text-xs font-bold text-brand">
                    AP
                  </span>
                  <p className="text-sm text-foreground-muted">
                    <span className="font-medium text-foreground">Anjan Prasad</span>{" "}
                    · {featured.readingTime} read
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Two editor's picks */}
            <div className="grid gap-6">
              {picks.map((a) => (
                <Reveal
                  key={a.slug}
                  as="div"
                  className="card card-hover group flex flex-col p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-sky">
                      Editor&apos;s pick
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-foreground-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground-muted">
                    {a.dek}
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-[0.16em] text-foreground-muted">
                    {a.category} · {a.readingTime} read
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RuleTick />

      {/* All articles — search + filter + cards */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>All articles</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Find your next read.
            </h2>
          </Reveal>
          <div className="mt-10">
            <HubExplorer articles={ARTICLES} categories={HUB_CATEGORIES} />
          </div>
        </div>
      </section>

      {/* Subscribe band */}
      <section
        id="newsletter"
        className="scroll-mt-28 border-t border-border bg-background-sunken py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              New essays arrive by letter first.
            </h2>
            <p className="mt-2 text-[15px] text-foreground-muted">
              One a week. Method, not motivation.
            </p>
          </div>
          <Newsletter />
        </div>
      </section>
    </main>
  );
}
