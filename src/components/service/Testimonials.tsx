import { Eyebrow } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

export interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
}

/**
 * Testimonials — a three-up wall of quotes with an editorial mark. Shared
 * shape; each page passes the voices that fit its audience.
 */
export function Testimonials({
  eyebrow = "Testimonials",
  title,
  items,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  items: TestimonialItem[];
}) {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            {title}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <RevealItem key={t.name} className="card flex h-full flex-col p-8">
              <span
                aria-hidden
                className="font-serif text-5xl leading-none text-brand/30"
              >
                &ldquo;
              </span>
              <p className="mt-2 flex-1 text-[length:var(--text-body)] leading-relaxed text-foreground">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-border pt-5">
                <p className="font-display font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="mt-0.5 text-sm text-foreground-muted">{t.title}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
