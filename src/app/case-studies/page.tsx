import type { Metadata } from "next";
import { CaseStories } from "@/components/case-studies/CaseStories";
import { CTAButton, PageHero } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Case Studies — Business Transformations",
  description:
    "Business transformation stories told end to end: challenge, strategy, execution, results, and the lesson — filterable by industry, stage, and service.",
};

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case Studies"
        title={
          <>
            Businesses, before{" "}
            <span className="editorial-accent text-brand">and after.</span>
          </>
        }
        lead="Each dossier is a complete transformation — what was broken, what was decided, what was built, and what the numbers said afterwards. Names and details are representative until clients approve publication."
      />

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <CaseStories />
        </div>
      </section>

      <section className="bg-blueprint border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Your business could be{" "}
              <span className="editorial-accent text-brand">the next dossier.</span>
            </h2>
            <div className="mt-9">
              <CTAButton href="/contact?interest=consulting">Start a transformation</CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
