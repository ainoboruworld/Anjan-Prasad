import type { Metadata } from "next";
import { CONSULTING_SESSION } from "@/lib/data";
import { ConsultationForm } from "@/components/consulting/ConsultationForm";
import { PageHero, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "1-to-1 Consulting",
  description:
    "A private working session with Anjan Prasad on the single question that matters most in your business — pricing, positioning, growth, hiring, or the next big call.",
};

export default function ConsultingPage() {
  return (
    <main>
      <PageHero
        eyebrow={CONSULTING_SESSION.badge}
        title={
          <>
            1-to-1{" "}
            <span className="editorial-accent text-brand">Consulting.</span>
          </>
        }
        lead={CONSULTING_SESSION.description}
      />

      {/* Format */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-3">
            {CONSULTING_SESSION.format.map((f, i) => (
              <RevealItem key={f.title} as="li" className="card card-hover p-8">
                <span className="numeral-outline font-display text-4xl font-bold leading-none">
                  0{i + 1}
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-foreground">
                  {f.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {f.copy}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-foreground-muted">
              What founders bring to the hour
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {CONSULTING_SESSION.topics.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-background-elevated px-4 py-1.5 text-sm text-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Booking form */}
      <section
        id="book"
        className="border-t border-border bg-background-sunken py-24 sm:py-28"
      >
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="Book the hour"
            title={
              <>
                Schedule a{" "}
                <span className="editorial-accent text-brand">
                  1-to-1 Consultation.
                </span>
              </>
            }
            lead="Share the decision on the table. You'll get a reply within one working day with available slots."
          />
          <Reveal className="card mt-12 p-8 sm:p-10">
            <ConsultationForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
