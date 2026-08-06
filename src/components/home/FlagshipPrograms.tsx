import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DEMO_SESSION, LIVE_COURSE } from "@/lib/data";
import { Eyebrow } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/**
 * The two flagship programs presented as product launches - one editorial
 * spread each, not pricing cards.
 */
export function FlagshipPrograms() {
  return (
    <section className="border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>The programs</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            Your first step is{" "}
            <span className="editorial-accent text-brand">one live session.</span>
          </h2>
        </Reveal>

        {/* Demo Session - a wide invitation band */}
        <Reveal className="mt-14">
          <Link
            href="/courses/demo"
            className="group block overflow-hidden rounded-3xl border border-border bg-background-elevated transition-colors duration-300 hover:border-brand/50"
          >
            <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
                  {DEMO_SESSION.badge} · {DEMO_SESSION.schedule} · {DEMO_SESSION.format}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {DEMO_SESSION.name}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground-muted">
                  {DEMO_SESSION.promise}
                </p>
                <p className="mt-4 text-sm text-foreground">
                  <span className="font-display text-2xl font-semibold text-brand">
                    {DEMO_SESSION.fee}
                  </span>{" "}
                  <span className="text-foreground-muted">{DEMO_SESSION.feeLabel}</span>
                </p>
              </div>
              <span className="inline-flex items-center gap-2 justify-self-start rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-ink lg:justify-self-end">
                {DEMO_SESSION.cta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Live Course - the flagship spread */}
        <Reveal className="mt-6">
          <Link
            href="/courses/monthly-consulting"
            className="group block overflow-hidden rounded-3xl border border-border bg-foreground text-background transition-transform duration-500"
          >
            <div className="bg-blueprint grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:p-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-background/60">
                  {LIVE_COURSE.badge} · {LIVE_COURSE.priceNote}
                </p>
                <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                  {LIVE_COURSE.name}
                  <span className="editorial-accent block text-brand">
                    {LIVE_COURSE.price}
                  </span>
                </h3>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-background/75">
                  {LIVE_COURSE.promise}
                </p>
                <span className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-ink transition-colors duration-300 group-hover:bg-brand-hover">
                  {LIVE_COURSE.cta}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
              <ul className="space-y-5 self-center border-l border-background/15 pl-8">
                {LIVE_COURSE.pillars.map((p) => (
                  <li key={p.title}>
                    <p className="text-[15px] font-semibold">{p.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-background/65">
                      {p.copy}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
