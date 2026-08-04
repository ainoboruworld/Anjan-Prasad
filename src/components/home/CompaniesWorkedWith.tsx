import { LogoGrid } from "../ui/LogoPlaceholder";
import { Reveal } from "../ui/Reveal";

/**
 * Companies Worked With — the trust band directly below the hero. Coloured
 * logo placeholders (never grayscale) on a calm surface; equal sizing and
 * spacing, fully responsive, ready to swap to official coloured artwork.
 */
const COMPANIES = [
  "Accenture",
  "Mindshare",
  "IPG Mediabrands",
  "Zeta",
  "Fareportal",
  "American Express",
  "Sony",
  "Dabur",
  "KFC",
  "Pizza Hut",
  "Snapdeal",
  "DLF",
];

export function CompaniesWorkedWith() {
  return (
    <section
      aria-label="Companies worked with"
      className="border-y border-border bg-background-sunken py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.28em] text-foreground-muted">
            Trusted across two decades of building
          </p>
        </Reveal>
        <LogoGrid names={COMPANIES} className="mt-12" />
      </div>
    </section>
  );
}
