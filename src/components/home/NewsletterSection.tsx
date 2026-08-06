import { Newsletter } from "../Newsletter";
import { SectionHeading } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/** Simple, elegant newsletter capture - name, email, subscribe. */
export function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="border-t border-border bg-background-elevated/60 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeading
          align="center"
          eyebrow="Newsletter"
          title={
            <>
              One operator&apos;s letter.{" "}
              <span className="editorial-accent text-brand">Every week.</span>
            </>
          }
        />
        <Reveal className="mt-10 flex justify-center">
          <Newsletter />
        </Reveal>
      </div>
    </section>
  );
}
