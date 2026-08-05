import {
  FOUNDED_LOGOS,
  EMPLOYMENT_LOGOS,
  ADVISORY_LOGOS,
  MENTORED_LOGOS,
} from "@/lib/brandLogos";
import { LogoGroup } from "../ui/LogoPlaceholder";
import { Eyebrow } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Credibility — two clearly separated logo walls. "Companies Worked With"
 * (employment / leadership roles) and "Brands Advised" (consulting &
 * mentorship) are two different kinds of trust, so they read as two sections.
 */
export function CompaniesWorkedWith() {
  return (
    <section
      aria-label="Companies worked with and brands advised"
      className="border-y border-border bg-background-sunken py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto flex max-w-md items-center gap-4">
          <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-border-strong" />
          <Eyebrow>Trusted across two decades</Eyebrow>
          <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-border-strong" />
        </Reveal>

        <div className="mt-12 space-y-12">
          <LogoGroup
            title="Companies Built"
            note="Ventures Anjan Prasad founded, co-founded, and leads — not clients or employers, but companies he built from the ground up."
            logos={FOUNDED_LOGOS}
          />
          <LogoGroup
            title="Companies Worked With"
            note="Organizations where Anjan Prasad held leadership and professional roles throughout his career."
            logos={EMPLOYMENT_LOGOS}
          />
          <LogoGroup
            title="Brands Advised"
            note="Established businesses and enterprises supported through consulting and strategic advisory."
            logos={ADVISORY_LOGOS}
          />
          <LogoGroup
            title="Startups Mentored"
            note="Early-stage ventures and founders guided through growth, product, and go-to-market."
            logos={MENTORED_LOGOS}
          />
        </div>
      </div>
    </section>
  );
}
