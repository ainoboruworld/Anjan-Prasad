import { CONSULTING_OUTCOMES } from "@/lib/data";
import { CTAButton, GhostButton, SectionHeading } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * Business Advisory & Services — the six flagship mandates as premium
 * cards, leading to the full advisory page.
 */
export function AdvisoryServices() {
  const services = CONSULTING_OUTCOMES.slice(0, 6);

  return (
    <section className="border-t border-border bg-background-sunken py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Business Advisory"
          title={
            <>
              Systems installed{" "}
              <span className="editorial-accent text-brand">
                inside your business.
              </span>
            </>
          }
          lead="Not recommendations — installed operating systems. Anjan works inside your weekly rhythm until the outcome runs without him."
        />

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <RevealItem
              key={s.id}
              as="li"
              className="card card-hover group flex flex-col p-8"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rotate-45 bg-brand transition-transform duration-300 group-hover:scale-125"
              />
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {s.challenge}
              </p>
              <p className="mt-4 border-t border-hairline pt-4 text-sm leading-relaxed text-foreground">
                {s.outcome}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <CTAButton href="/business-advisory">Explore Business Advisory</CTAButton>
          <GhostButton href="/case-studies">See the transformations</GhostButton>
        </Reveal>
      </div>
    </section>
  );
}
