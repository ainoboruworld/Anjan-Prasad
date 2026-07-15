import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { DEMO_SESSION, LIVE_COURSE } from "@/lib/data";
import { DemoForm } from "@/components/courses/DemoForm";
import { CTAButton, Eyebrow, GhostButton, PageHero, RuleTick } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Courses — Demo Session & Live Course",
  description:
    "Implementation-first business education: the Saturday Demo Session (₹199 registration fee, 3 hours live) and the flagship Live Course — projects, AI, mentorship, and community.",
};

export default function CoursesPage() {
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
        lead="Two live programs, one method: the operating playbook behind three bootstrapped companies — taught by implementation, not by slides."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href="#demo">Book the Demo Session</CTAButton>
          <GhostButton href="#live">See the Live Course</GhostButton>
        </div>
      </PageHero>

      {/* ── Demo Session — the first step into AP.com ── */}
      <section id="demo" className="scroll-mt-28 border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <Eyebrow>{DEMO_SESSION.badge}</Eyebrow>
                <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
                  {DEMO_SESSION.name}
                </h2>
                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium uppercase tracking-[0.18em] text-foreground-muted">
                  <span className="text-brand">{DEMO_SESSION.fee} {DEMO_SESSION.feeLabel}</span>
                  <span aria-hidden>·</span>
                  <span>{DEMO_SESSION.schedule}</span>
                  <span aria-hidden>·</span>
                  <span>{DEMO_SESSION.format}</span>
                </p>
                <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-foreground">
                  {DEMO_SESSION.promise}
                </p>
                <p className="mt-4 max-w-xl text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                  {DEMO_SESSION.description}
                </p>
              </Reveal>

              {/* The three hours */}
              <RevealGroup className="mt-10 space-y-4">
                {DEMO_SESSION.hours.map((h) => (
                  <RevealItem
                    key={h.hour}
                    className="flex gap-6 rounded-2xl border border-border bg-background-elevated p-6"
                  >
                    <span className="w-16 shrink-0 font-display text-sm font-semibold uppercase tracking-wide text-brand">
                      {h.hour}
                    </span>
                    <span>
                      <span className="block font-medium text-foreground">{h.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-foreground-muted">
                        {h.copy}
                      </span>
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>

              {/* Who should attend + outcomes */}
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Reveal>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                    Who should attend
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {DEMO_SESSION.audience.map((a) => (
                      <li key={a} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground-muted">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                    You leave with
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {DEMO_SESSION.outcomes.map((o) => (
                      <li key={o} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                        {o}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>

            {/* Registration */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal className="rounded-3xl border border-border bg-background-elevated p-8 shadow-[var(--shadow-soft)]">
                <DemoForm />
              </Reveal>
              <Reveal className="mt-4">
                <p className="text-center text-xs leading-relaxed text-foreground-muted">
                  The first step into AP.com — decide about everything else
                  with evidence.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <RuleTick />

      {/* ── Live Course — the flagship program ── */}
      <section id="live" className="scroll-mt-28 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{LIVE_COURSE.badge}</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-chapter)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
              {LIVE_COURSE.name}{" "}
              <span className="editorial-accent text-brand">{LIVE_COURSE.price}</span>
            </h2>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
              {LIVE_COURSE.altName} · {LIVE_COURSE.priceNote}
            </p>
            <p className="mt-7 text-[length:var(--text-lead)] leading-relaxed text-foreground">
              {LIVE_COURSE.promise}
            </p>
            <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              {LIVE_COURSE.description}
            </p>
          </Reveal>

          {/* Pillars as an architectural cross-section */}
          <RevealGroup className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {LIVE_COURSE.pillars.map((p, i) => (
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
              {LIVE_COURSE.outcomes.map((o, i) => (
                <li key={o} className="flex items-center gap-5 px-7 py-5">
                  <span className="font-display text-sm font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-foreground">{o}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <CTAButton href="/contact?interest=live-course">{LIVE_COURSE.cta}</CTAButton>
              <p className="mt-5 text-sm text-foreground-muted">
                Unsure? The{" "}
                <Link
                  href="#demo"
                  className="font-medium text-foreground underline decoration-brand underline-offset-4 hover:text-brand"
                >
                  Demo Session
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
