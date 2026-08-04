import { SectionHeading } from "../ui/Primitives";
import { LogoGroup } from "../ui/LogoPlaceholder";

/**
 * Brand Wall — the full breadth of Anjan's work, grouped into premium
 * responsive logo grids. Coloured placeholders now; drop-in ready for
 * official coloured artwork with no layout change.
 */
const GROUPS: { title: string; note: string; names: string[] }[] = [
  {
    title: "Businesses Built",
    note: "Ventures founded and led from the ground up.",
    names: ["Noboru World", "Lushful", "Filing Buddy", "WebExcel Solutions"],
  },
  {
    title: "Companies Worked With",
    note: "Growth and transformation mandates at scale.",
    names: [
      "Accenture",
      "Mindshare",
      "IPG Mediabrands",
      "Zeta",
      "Fareportal",
      "Interactive Avenues",
      "The Art of Living",
      "Snapdeal",
    ],
  },
  {
    title: "Advisory Engagements",
    note: "Brands guided across growth and go-to-market.",
    names: [
      "American Express",
      "Sony",
      "Dabur",
      "KFC",
      "Pizza Hut",
      "DLF",
      "Cairn",
      "Aditya Birla Capital",
    ],
  },
  {
    title: "Ventures & Institutions",
    note: "Startups advised and universities taught at.",
    names: ["Urban Kisaan", "Akounto", "IIFT", "IMT Ghaziabad", "BML Munjal University"],
  },
];

export function BrandWallSection() {
  return (
    <section className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Brand Wall"
          title={
            <>
              Sixteen years,{" "}
              <span className="editorial-accent text-brand">across the map.</span>
            </>
          }
        />

        <div className="mt-16 space-y-16">
          {GROUPS.map((g) => (
            <LogoGroup key={g.title} title={g.title} note={g.note} names={g.names} />
          ))}
        </div>
      </div>
    </section>
  );
}
