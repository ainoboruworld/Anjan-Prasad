import { CONSULTING_SESSION } from "@/lib/data";
import { CTAButton, SectionHeading } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/** 1-to-1 Consulting — direct access to the operator, one decision at a time. */
export function ConsultingPreview() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={CONSULTING_SESSION.badge}
              title={
                <>
                  1-to-1{" "}
                  <span className="editorial-accent text-brand">Consulting.</span>
                </>
              }
              lead={CONSULTING_SESSION.description}
            />
            <Reveal className="mt-9">
              <CTAButton href="/consulting">
                {CONSULTING_SESSION.cta}
              </CTAButton>
            </Reveal>
          </div>

          <RevealGroup as="ul" className="space-y-4">
            {CONSULTING_SESSION.format.map((f, i) => (
              <RevealItem
                key={f.title}
                as="li"
                className="card card-hover flex items-start gap-5 p-6"
              >
                <span className="numeral-outline font-display text-3xl font-bold leading-none">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                    {f.copy}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
