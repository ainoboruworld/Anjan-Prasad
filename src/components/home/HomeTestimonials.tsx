import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading } from "../ui/Primitives";
import { RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * Testimonials — four premium, compact cards. Clean 2×2 / 4-up grid built
 * from the shared testimonial content layer.
 */
export function HomeTestimonials() {
  const quotes = TESTIMONIALS.slice(0, 4);

  return (
    <section className="border-t border-border py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title={
            <>
              In their{" "}
              <span className="editorial-accent text-brand">own words.</span>
            </>
          }
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((t) => (
            <RevealItem key={t.name} className="card flex h-full flex-col p-7">
              <span
                aria-hidden
                className="font-serif text-4xl leading-none text-brand/30"
              >
                &ldquo;
              </span>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-display text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-foreground-muted">
                  {t.title}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
