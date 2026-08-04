import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { DEMO_SESSION, LIVE_COURSE as MONTHLY_CONSULTING } from "@/lib/data";
import { PageHero } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Programs — Demo Session & Business Growth Program",
  description:
    "Structured business education: the ₹99 Demo Session (3 hours live, weekdays) and the Business Growth Program at ₹9,999/month — curriculum, planning, and accountability.",
  alternates: { canonical: "/courses" },
};

const PRODUCTS = [
  {
    href: "/courses/demo",
    badge: DEMO_SESSION.badge,
    name: DEMO_SESSION.name,
    price: DEMO_SESSION.fee,
    priceNote: "Registration fee · weekdays · 3 hours live",
    promise: DEMO_SESSION.promise,
    points: [
      "Live working session — not a webinar",
      "The 0 → 1 → Scale framework on real models",
      "Your questions answered in the room",
    ],
    cta: "Explore the Demo Session",
    featured: false,
  },
  {
    href: "/courses/monthly-consulting",
    badge: MONTHLY_CONSULTING.badge,
    name: MONTHLY_CONSULTING.name,
    price: MONTHLY_CONSULTING.price,
    priceNote: MONTHLY_CONSULTING.priceNote,
    promise: MONTHLY_CONSULTING.promise,
    points: [
      "Structured weekday curriculum & sessions",
      "Business planning, roadmaps & accountability",
      "Founder support between the sessions",
    ],
    cta: "Explore the Business Growth Program",
    featured: true,
  },
];

export default function CoursesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Programs"
        title={
          <>
            Not lectures.{" "}
            <span className="editorial-accent text-brand">A build.</span>
          </>
        }
        lead="Two ways to learn the operating playbook behind three bootstrapped companies — start with a single session, or work with Anjan every week."
      />

      <section className="pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {PRODUCTS.map((p) => (
              <RevealItem key={p.href}>
                <Link
                  href={p.href}
                  className={`card card-hover group flex h-full flex-col p-9 sm:p-11 ${
                    p.featured ? "ring-1 ring-brand-sky/30" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-sky">
                      {p.badge}
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-foreground-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                      strokeWidth={2}
                    />
                  </div>

                  <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {p.name}
                  </h2>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                      {p.price}
                    </span>
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                    {p.priceNote}
                  </p>

                  <p className="mt-6 text-[length:var(--text-body)] leading-relaxed text-foreground">
                    {p.promise}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-border pt-6">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-foreground-muted">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-brand-sky" strokeWidth={2.5} />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    {p.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-14 text-center">
            <p className="text-sm text-foreground-muted">
              Prefer to talk it through first?{" "}
              <Link
                href="/consulting"
                className="font-medium text-foreground underline decoration-brand underline-offset-4 hover:text-brand"
              >
                Book a Consultation
              </Link>{" "}
              or see{" "}
              <Link
                href="/testimonials"
                className="font-medium text-foreground underline decoration-brand underline-offset-4 hover:text-brand"
              >
                student &amp; founder stories
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
