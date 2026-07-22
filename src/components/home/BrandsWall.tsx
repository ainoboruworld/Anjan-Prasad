import { BRANDS_ADVISED, CAREER_MARKS, COMPANIES_BUILT } from "@/lib/data";
import { LogoMark } from "../brand/LogoMark";
import { SectionHeading } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

const GROUPS: { title: string; names: string[] }[] = [
  { title: "Companies founded", names: COMPANIES_BUILT.map((c) => c.name.split(" (")[0]) },
  {
    title: "Operated inside",
    names: CAREER_MARKS.map((c) => c.name.replace(" (GroupM)", "")),
  },
  { title: "Brands advised", names: BRANDS_ADVISED.slice(0, 15) },
];

/**
 * Companies & Brands — every organisation associated with Anjan, as a
 * disciplined logo wall. Marks render grayscale by default and regain
 * presence on hover (see .logo-mark in globals.css).
 */
export function BrandsWall() {
  return (
    <section
      aria-label="Companies and brands worked with"
      className="border-t border-border bg-background-elevated/60 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Companies & Brands"
          title={
            <>
              Trusted across{" "}
              <span className="editorial-accent text-brand">
                two decades of building.
              </span>
            </>
          }
        />

        {GROUPS.map((group) => (
          <Reveal key={group.title} className="mt-14">
            <p className="text-center text-xs font-medium uppercase tracking-[0.28em] text-foreground-muted">
              {group.title}
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-7">
              {group.names.map((name) => (
                <li
                  key={name}
                  tabIndex={0}
                  className="logo-mark flex items-center text-foreground"
                  data-cursor="node"
                >
                  <LogoMark name={name} />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
