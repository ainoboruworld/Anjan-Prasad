import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { BOOK_DEMO_URL, APPLY_PREMIUM_URL, COURSES } from "@/lib/data";
import { CTAButton, Eyebrow, GhostButton, PageHero, RuleTick } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Courses — The ₹199 Demo Session & the Premium Course",
  description:
    "Implementation-first business education: see the method for ₹199, then build a real business system in the ₹9,000 Premium Course — projects, AI, mentorship, and community.",
};

export default function CoursesPage() {
  const [demo, premium] = COURSES;

  return (
    <main>
      <PageHero
        eyebrow="Courses"
        title={
          <>
            Not lectures.{" "}
            <span className="editorial-accent text-brand">A build.</span>
          </>
        }
        lead="Two programs, one method: the operating playbook behind three bootstrapped companies, taught by implementation — projects, AI workflows, mentorship, and a community that keeps you building."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href="#demo">Start with ₹199</CTAButton>
          <GhostButton href="#premium">See the flagship</GhostButton>
        </div>
      </PageHero>

      {/* ── Demo Session — the opening act ── */}
      <section id="demo" className="scroll-mt-28 border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <Eyebrow>{demo.badge}</Eyebrow>
              <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
                {demo.name}
              </h2>
              <p className="mt-2 font-display text-5xl font-semibold text-brand">
                {demo.price}
                <span className="ml-3 align-middle text-sm font-normal uppercase tracking-[0.18em] text-foreground-muted">
                  {demo.priceNote}
                </span>
              </p>
              <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-foreground">
                {demo.promise}
              </p>
              <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                {demo.description}
              </p>
              <div className="mt-9">
                <CTAButton href={BOOK_DEMO_URL}>{demo.cta}</CTAButton>
              </div>
            </Reveal>

            <div className="lg:pt-6">
              <RevealGroup className="space-y-4">
                {demo.pillars.map((p, i) => (
                  <RevealItem
                    key={p.title}
                    className="flex gap-5 rounded-2xl border border-border bg-background-elevated p-6"
                  >
                    <span className="font-display text-sm font-semibold text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-medium text-foreground">{p.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-foreground-muted">
                        {p.copy}
                      </span>
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
              <Reveal className="mt-6 rounded-2xl border border-brand/30 bg-brand/5 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                  You leave with
                </p>
                <ul className="mt-3 space-y-2">
                  {demo.outcomes.map((o) => (
                    <li key={o} className="flex gap-2.5 text-[15px] text-foreground">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                      {o}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <RuleTick />

      {/* ── Premium Course — the flagship launch ── */}
      <section id="premium" className="scroll-mt-28 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{premium.badge}</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-chapter)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
              {premium.name}{" "}
              <span className="editorial-accent text-brand">{premium.price}</span>
            </h2>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
              {premium.priceNote}
            </p>
            <p className="mt-7 text-[length:var(--text-lead)] leading-relaxed text-foreground">
              {premium.promise}
            </p>
            <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              {premium.description}
            </p>
          </Reveal>

          {/* Pillars as an architectural cross-section */}
          <RevealGroup className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {premium.pillars.map((p, i) => (
              <RevealItem
                key={p.title}
                className="bg-blueprint bg-background p-8 transition-colors duration-300 hover:bg-background-elevated"
              >
                <p aria-hidden className="font-serif text-sm italic text-brand">
                  {["I", "II", "III", "IV"][i]}
                </p>
                <p className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
                  {p.title}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                  {p.copy}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Outcomes ledger */}
          <Reveal className="mx-auto mt-16 max-w-3xl">
            <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-foreground-muted">
              What you will have built by the end
            </p>
            <ul className="mt-6 divide-y divide-border rounded-3xl border border-border">
              {premium.outcomes.map((o, i) => (
                <li key={o} className="flex items-center gap-5 px-7 py-5">
                  <span className="font-display text-sm font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-foreground">{o}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <CTAButton href={APPLY_PREMIUM_URL}>{premium.cta}</CTAButton>
              <p className="mt-5 text-sm text-foreground-muted">
                Unsure? The{" "}
                <Link
                  href="#demo"
                  className="font-medium text-foreground underline decoration-brand underline-offset-4 hover:text-brand"
                >
                  ₹199 Demo Session
                </Link>{" "}
                exists precisely so you can decide with evidence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bridge to proof */}
      <section className="border-t border-border bg-background-sunken py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6">
          <p className="max-w-xl font-display text-2xl font-medium tracking-tight text-foreground">
            Hear it from people who took the seat first.
          </p>
          <Link
            href="/testimonials"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand"
          >
            Student &amp; founder stories
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </main>
  );
}
