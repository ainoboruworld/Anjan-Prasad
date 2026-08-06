import type { Metadata } from "next";
import { Check } from "lucide-react";
import { LIVE_COURSE as MONTHLY_CONSULTING } from "@/lib/data";
import { MonthlyConsultingForm } from "@/components/courses/MonthlyConsultingForm";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero, RuleTick, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Business Growth Program - ₹9,999 / month",
  description:
    "A structured monthly program with Anjan Prasad: business education, weekday sessions, planning, roadmaps, founder support, and accountability. ₹9,999 per month.",
  alternates: { canonical: "/courses/monthly-consulting" },
  openGraph: {
    title: "Business Growth Program - ₹9,999/mo · Anjan Prasad",
    description:
      "Structured business education, planning, and accountability - your business moved forward every week.",
    url: "/courses/monthly-consulting",
    type: "website",
  },
};

const INCLUDES = [
  { title: "Weekly consulting", copy: "A standing weekday session on the decisions that matter this week." },
  { title: "Business planning", copy: "A clear plan translated into priorities you can actually execute." },
  { title: "Founder support", copy: "Direct access between sessions when the hard calls come up." },
  { title: "Execution", copy: "The work broken down so momentum happens between the calls." },
  { title: "Roadmaps", copy: "A living quarterly roadmap with milestones and sequencing." },
  { title: "Accountability", copy: "Someone tracking that what was agreed actually gets done." },
  { title: "Scaling", copy: "Systems and hiring designed to grow the business past its founder." },
];

const FAQS = [
  {
    q: "How is this different from a Consultation?",
    a: "A Consultation is a single focused session on one decision. The Business Growth Program is an ongoing, structured engagement - weekly sessions, a curriculum, a plan, and accountability that compounds over the month.",
  },
  {
    q: "When do sessions happen?",
    a: "On weekdays, at a recurring slot agreed with you at the start of the engagement.",
  },
  {
    q: "Is there a lock-in?",
    a: "No. It's billed monthly and you can stop whenever it has done its job - though most momentum shows up when you stay for a few cycles.",
  },
  {
    q: "How does payment work?",
    a: "You enrol with your details, then proceed to checkout. Online payment (UPI and cards) is being integrated - until then the team confirms and sends a secure monthly payment link.",
  },
];

export default function MonthlyConsultingPage() {
  return (
    <main>
      <PageHero
        eyebrow={`${MONTHLY_CONSULTING.badge} · ${MONTHLY_CONSULTING.price}/mo`}
        title={
          <>
            Business Growth Program -{" "}
            <span className="editorial-accent text-brand">
              momentum every week.
            </span>
          </>
        }
        lead={MONTHLY_CONSULTING.description}
      />

      <section className="border-t border-border py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="text-[length:var(--text-lead)] leading-relaxed text-foreground">
                  {MONTHLY_CONSULTING.promise}
                </p>
              </Reveal>

              <p className="mt-12 text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                What&apos;s included
              </p>
              <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2">
                {INCLUDES.map((it) => (
                  <RevealItem
                    key={it.title}
                    className="rounded-2xl border border-border bg-background-elevated p-6"
                  >
                    <p className="font-display text-base font-semibold text-foreground">
                      {it.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                      {it.copy}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>

              <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                By the end of the month
              </p>
              <ul className="mt-4 space-y-2.5">
                {MONTHLY_CONSULTING.outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-sky" strokeWidth={2.5} />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enrolment */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal className="card p-8">
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  Start this month
                </h2>
                <p className="mt-1.5 text-sm text-foreground-muted">
                  Share a little context and confirm at checkout.
                </p>
                <div className="mt-6">
                  <MonthlyConsultingForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <RuleTick />

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="FAQs"
            title={
              <>
                Before you{" "}
                <span className="editorial-accent text-brand">start.</span>
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
