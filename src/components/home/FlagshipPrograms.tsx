import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COURSES } from "@/lib/data";
import { Eyebrow } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/**
 * The two flagship programs presented as product launches — one editorial
 * spread each, not pricing cards.
 */
export function FlagshipPrograms() {
  const [demo, premium] = COURSES;

  return (
    <section className="border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>The programs</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            Start for the price of{" "}
            <span className="editorial-accent text-brand">a coffee.</span>
          </h2>
        </Reveal>

        {/* Demo — a wide invitation band */}
        <Reveal className="mt-14">
          <Link
            href="/courses#demo"
            className="group block overflow-hidden rounded-3xl border border-border bg-background-elevated transition-colors duration-300 hover:border-brand/50"
          >
            <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[auto_1fr_auto]">
              <p className="font-display text-6xl font-semibold tracking-tight text-brand sm:text-7xl">
                {demo.price}
              </p>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
                  {demo.badge} · {demo.priceNote}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {demo.name}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground-muted">
                  {demo.promise}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 justify-self-start rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-ink lg:justify-self-end">
                {demo.cta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Premium — the flagship spread */}
        <Reveal className="mt-6">
          <Link
            href="/courses#premium"
            className="group block overflow-hidden rounded-3xl border border-border bg-foreground text-background transition-transform duration-500"
          >
            <div className="bg-blueprint grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:p-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-background/60">
                  {premium.badge} · {premium.priceNote}
                </p>
                <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                  {premium.name}
                  <span className="editorial-accent block text-brand">
                    {premium.price}
                  </span>
                </h3>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-background/75">
                  {premium.promise}
                </p>
                <span className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-ink transition-colors duration-300 group-hover:bg-brand-hover">
                  {premium.cta}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
              <ul className="space-y-5 self-center border-l border-background/15 pl-8">
                {premium.pillars.map((p) => (
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
