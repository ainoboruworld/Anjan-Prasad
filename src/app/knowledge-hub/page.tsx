import type { Metadata } from "next";
import { ARTICLES } from "@/lib/data";
import { TopicExplorer } from "@/components/hub/TopicExplorer";
import { Eyebrow, PageHero, RuleTick } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Knowledge Hub — Business Playbooks & Frameworks",
  description:
    "A premium business publication: playbooks, frameworks, and field notes on starting, building, and scaling profitable businesses in India — from validation to AI.",
};

export default function KnowledgeHubPage() {
  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const picks = ARTICLES.filter((a) => a.editorsPick).slice(0, 3);

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
        lead="Not a blog. A working publication: playbooks, frameworks, and field notes from inside real businesses — written to be used, not skimmed."
      />

      {/* Featured — front page spread */}
      <section className="border-t border-border py-20" data-cursor="view">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="bg-blueprint grid gap-10 overflow-hidden rounded-3xl border border-border bg-background-elevated p-8 sm:p-12 lg:grid-cols-[1fr_0.9fr] lg:p-16">
            <div>
              <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-foreground-muted">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand" />
                Featured · {featured.category}
              </p>
              <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-foreground sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-6 max-w-lg text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
                {featured.dek}
              </p>
              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-foreground-muted">
                {featured.readingTime} read · By Anjan Prasad
              </p>
            </div>
            {/* Diagram plate for the lead essay */}
            <div aria-hidden className="hidden items-center justify-center lg:flex">
              <svg viewBox="0 0 300 240" className="w-full max-w-sm" fill="none">
                <rect x="10" y="10" width="280" height="220" stroke="var(--blueprint)" />
                {[
                  [40, 190, "0"],
                  [150, 120, "1"],
                  [260, 50, "∞"],
                ].map(([x, y, l]) => (
                  <g key={String(l)}>
                    <circle cx={Number(x)} cy={Number(y)} r="16" stroke="var(--foreground-muted)" />
                    <text
                      x={Number(x)}
                      y={Number(y) + 4}
                      textAnchor="middle"
                      fontSize="12"
                      fill="var(--foreground)"
                      fontFamily="var(--font-display)"
                    >
                      {l}
                    </text>
                  </g>
                ))}
                <path d="M56 182 L134 130 M166 112 L244 58" stroke="var(--brand-gold)" strokeWidth="1.5" strokeDasharray="5 5" />
              </svg>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Editor's picks */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Editor&apos;s picks</Eyebrow>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {picks.map((a, i) => (
              <RevealItem
                key={a.slug}
                className="group bg-background p-8 transition-colors duration-300 hover:bg-background-elevated"
                data-cursor="view"
              >
                <p aria-hidden className="font-serif text-lg italic text-brand">
                  {["I", "II", "III"][i]}
                </p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                  {a.category}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {a.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
                  {a.dek}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-foreground-muted">
                  {a.readingTime} read
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <RuleTick />

      {/* Topic explorer + full ledger */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Explore by topic</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Thirteen shelves, one method
            </h2>
          </Reveal>
          <div className="mt-10">
            <TopicExplorer />
          </div>
        </div>
      </section>

      {/* Subscribe band */}
      <section className="border-t border-border bg-background-sunken py-16">
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
