import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading, TextLink } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/** Success stories — premium quote cards with clear attribution. */
export function TestimonialsHome() {
  const quotes = TESTIMONIALS.slice(0, 6);

  return (
    <section className="border-t border-border bg-background-sunken py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Success Stories"
          title={
            <>
              In their{" "}
              <span className="editorial-accent text-brand">own words.</span>
            </>
          }
        />

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {quotes.map((t) => (
            <RevealItem
              key={t.name}
              as="li"
              className="card card-hover flex flex-col p-8"
            >
              <p
                aria-hidden
                className="font-serif text-5xl italic leading-none text-brand"
              >
                &ldquo;
              </p>
              <blockquote className="flex flex-1 flex-col">
                <p className="flex-1 text-[15px] leading-relaxed text-foreground">
                  {t.quote}
                </p>
                <footer className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                  <span aria-hidden className="h-px w-8 bg-brand" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-foreground-muted">{t.title}</p>
                  </div>
                </footer>
              </blockquote>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <TextLink href="/testimonials">More voices</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
