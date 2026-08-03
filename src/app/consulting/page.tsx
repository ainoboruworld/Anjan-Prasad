import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CONSULTING_SESSION } from "@/lib/data";
import { ConsultationForm } from "@/components/consulting/ConsultationForm";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero, RuleTick, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Consultation",
  description:
    "Book a private consultation with Anjan Prasad on the single decision that matters most in your business — pricing, positioning, growth, hiring, or the next big call.",
  alternates: { canonical: "/consulting" },
  openGraph: {
    title: "Consultation — AP.com",
    description:
      "A private working session on the decision that matters most in your business.",
    url: "/consulting",
    type: "website",
  },
};

const BENEFITS = [
  {
    title: "One decision, moved",
    copy: "Not a broad review — a focused hour on the single call that matters most right now.",
  },
  {
    title: "An operator, not a coach",
    copy: "Advice from someone who has made payroll and defended margins, not read about it.",
  },
  {
    title: "A written next step",
    copy: "You leave with the decision framed and the first actions named — clarity you can act on.",
  },
];

const WHO_FOR = [
  "Founders facing a pricing, positioning, or growth call",
  "Professionals planning the move from salary to ownership",
  "Business owners deciding what to fix, keep, or kill",
  "Leaders weighing a hire, a market, or a pivot",
];

const PROCESS = [
  { step: "01", title: "Share context", copy: "You tell us the decision and the business around it when you book." },
  { step: "02", title: "Anjan prepares", copy: "He arrives having read your context — no time wasted on setup." },
  { step: "03", title: "The working hour", copy: "A focused, private session on your question — online or in person." },
  { step: "04", title: "Your next step", copy: "You leave with the decision framed and the first actions written down." },
];

const FAQS = [
  {
    q: "How is this different from the Business Growth Program?",
    a: "A Consultation is a single, focused session on one decision. The Business Growth Program is an ongoing, structured engagement with weekly sessions and accountability across the month.",
  },
  {
    q: "Online or in person?",
    a: "Both. You choose your preferred mode when you book — a video call or, where feasible, an in-person session.",
  },
  {
    q: "What should I prepare?",
    a: "Just the decision and the context around it. The booking form captures what Anjan needs to arrive ready.",
  },
  {
    q: "How does payment work?",
    a: "You submit your booking details and proceed to checkout. Online payment (UPI and cards) is being integrated — until then the team confirms your slot and sends a secure payment link.",
  },
];

export default function ConsultationPage() {
  return (
    <main>
      <PageHero
        eyebrow={CONSULTING_SESSION.badge}
        title={
          <>
            <span className="editorial-accent text-brand">Consultation.</span>
          </>
        }
        lead={CONSULTING_SESSION.description}
      />

      {/* What is Consultation? */}
      <section className="border-t border-border py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="What is Consultation?"
              title={
                <>
                  Personal, one-to-one{" "}
                  <span className="editorial-accent text-brand">expert guidance.</span>
                </>
              }
            />
          </Reveal>
          <Reveal>
            <p className="text-[length:var(--text-lead)] leading-relaxed text-foreground">
              A Consultation is a private, focused session with Anjan Prasad —
              for individuals seeking strategic advice, mentorship, and clarity
              on a specific business challenge.
            </p>
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              It&apos;s not a course and it&apos;s not a long-term engagement.
              You bring one real question — pricing, positioning, growth, a
              hire, or the next big call — and leave with a decision, a plan,
              and the first steps to act on. If your business needs an ongoing
              partnership,{" "}
              <a
                href="/business-advisory"
                className="font-medium text-foreground underline decoration-brand underline-offset-4 hover:text-brand"
              >
                Business Advisory
              </a>{" "}
              is the better fit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-border py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealGroup className="grid gap-6 sm:grid-cols-3">
            {BENEFITS.map((b) => (
              <RevealItem key={b.title} className="card p-8">
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {b.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                  {b.copy}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Who it's for + how it runs */}
      <section className="border-t border-border bg-background-sunken py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Who it's for"
              title={
                <>
                  When a single call{" "}
                  <span className="editorial-accent text-brand">
                    changes the quarter.
                  </span>
                </>
              }
            />
            <ul className="mt-8 space-y-3">
              {WHO_FOR.map((w) => (
                <li key={w} className="flex gap-3 text-[length:var(--text-body)] leading-relaxed text-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-sky" strokeWidth={2.5} />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
              How it runs
            </p>
            <RevealGroup className="mt-6 space-y-3">
              {PROCESS.map((p) => (
                <RevealItem
                  key={p.step}
                  className="flex gap-5 rounded-2xl border border-border bg-background-elevated p-6"
                >
                  <span className="numeral-outline font-display text-2xl font-bold leading-none">
                    {p.step}
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
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="book" className="scroll-mt-28 py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="Book the session"
            title={
              <>
                Request a{" "}
                <span className="editorial-accent text-brand">Consultation.</span>
              </>
            }
            lead="Share the decision on the table and your preferred slot. You'll confirm the booking at checkout."
          />
          <Reveal className="card mt-12 p-8 sm:p-10">
            <ConsultationForm />
          </Reveal>
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
                Questions,{" "}
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
