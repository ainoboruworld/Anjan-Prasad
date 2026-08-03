import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading, TextLink } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Success stories — a premium single-line carousel. Cards scroll in one
 * continuous row (duplicated for a seamless loop), pause on hover, and fall
 * back to a static wrap under reduced motion (see `.marquee` in globals.css).
 */
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
      </div>

      <Reveal className="marquee mt-14 py-6">
        <div
          className="marquee__track"
          style={{ animationDuration: "68s" }}
          aria-hidden
        >
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-6 px-3">
              {quotes.map((t) => (
                <li
                  key={`${copy}-${t.name}`}
                  className="card flex w-[340px] shrink-0 flex-col p-8 sm:w-[380px]"
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
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-12 max-w-7xl px-6">
        <TextLink href="/testimonials">More voices</TextLink>
      </div>

      {/* Accessible, non-animated copies for assistive tech. */}
      <ul className="sr-only">
        {quotes.map((t) => (
          <li key={t.name}>
            {t.quote} — {t.name}, {t.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
