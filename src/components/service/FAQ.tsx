import { Accordion, type AccordionItem } from "../ui/Accordion";
import { Eyebrow } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/**
 * FAQ - a titled wrapper around the shared Accordion, plus FAQPage JSON-LD
 * for rich results. Both service pages use the same block.
 */
export function FAQ({
  eyebrow = "FAQs",
  title,
  items,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  items: readonly AccordionItem[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            {title}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
