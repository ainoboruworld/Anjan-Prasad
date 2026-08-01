import type { Metadata } from "next";
import { Check } from "lucide-react";
import { DEMO_SESSION } from "@/lib/data";
import { DemoForm } from "@/components/courses/DemoForm";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero, RuleTick, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Demo Session — ₹99, Weekdays",
  description:
    "A live, 3-hour working session on how profitable businesses are actually built. ₹99 registration · weekdays. Agenda, outcomes, and registration.",
  alternates: { canonical: "/courses/demo" },
  openGraph: {
    title: "Demo Session — ₹99 · AP.com",
    description:
      "See how profitable businesses are actually built — one live, 3-hour session. ₹99, weekdays.",
    url: "/courses/demo",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this a recorded webinar?",
    a: "No. It's a live, 3-hour working session with Anjan — you can ask questions about your own business and get answers in the room.",
  },
  {
    q: "When does it run?",
    a: "Sessions run on weekdays. After you register and complete payment, you'll receive the exact date, time, and joining link by email.",
  },
  {
    q: "Who is it for?",
    a: "Students, working professionals planning a move to ownership, and founders or business owners who want systems instead of firefighting.",
  },
  {
    q: "What does ₹99 cover?",
    a: "It's a registration fee that confirms your seat for the live session. It keeps the room committed and focused.",
  },
  {
    q: "How is payment handled?",
    a: "You register with your details, then proceed to checkout. Online payment (UPI and cards) is being integrated — until then the team confirms your seat and sends a secure payment link by email.",
  },
];

export default function DemoSessionPage() {
  return (
    <main>
      <PageHero
        eyebrow={`${DEMO_SESSION.badge} · ${DEMO_SESSION.fee}`}
        title={
          <>
            The Demo Session —{" "}
            <span className="editorial-accent text-brand">
              see it built live.
            </span>
          </>
        }
        lead={DEMO_SESSION.description}
      />

      <section className="border-t border-border py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium uppercase tracking-[0.18em] text-foreground-muted">
                  <span className="text-brand">
                    {DEMO_SESSION.fee} {DEMO_SESSION.feeLabel}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{DEMO_SESSION.schedule}</span>
                  <span aria-hidden>·</span>
                  <span>{DEMO_SESSION.format}</span>
                </p>
                <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-foreground">
                  {DEMO_SESSION.promise}
                </p>
              </Reveal>

              {/* Agenda — the three hours */}
              <p className="mt-12 text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                The agenda
              </p>
              <RevealGroup className="mt-4 space-y-4">
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

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Reveal>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                    Who should attend
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {DEMO_SESSION.audience.map((a) => (
                      <li key={a} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground-muted">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-sky" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                    Learning outcomes
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {DEMO_SESSION.outcomes.map((o) => (
                      <li key={o} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-brand-sky" strokeWidth={2.5} />
                        {o}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>

            {/* Registration */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal className="card p-8">
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  Register for the session
                </h2>
                <p className="mt-1.5 text-sm text-foreground-muted">
                  Takes a minute. You&apos;ll confirm your seat at checkout.
                </p>
                <div className="mt-6">
                  <DemoForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <RuleTick />

      {/* FAQs */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="FAQs"
            title={
              <>
                Good questions,{" "}
                <span className="editorial-accent text-brand">answered.</span>
              </>
            }
          />
          <div className="mt-10">
            <Accordion items={FAQS} />
          </div>
        </div>
      </section>
    </main>
  );
}
