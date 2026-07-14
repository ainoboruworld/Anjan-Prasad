import type { Metadata } from "next";
import { PageHero, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { riseIn } from "@/components/motion";

export const metadata: Metadata = {
  title: "Featured Media",
  description:
    "Podcasts, interviews, guest talks, and conference sessions featuring Anjan Prasad on building profitable, sustainable businesses.",
};

const SECTIONS: {
  eyebrow: string;
  title: string;
  items: { label: string; meta: string }[];
}[] = [
  {
    eyebrow: "Podcasts",
    title: "In conversation.",
    items: [
      { label: "The Operator's Edge — building beyond the founder", meta: "48 min" },
      { label: "Profit First — margins, cash, and discipline", meta: "52 min" },
      { label: "Founder-Led Growth without the burnout", meta: "41 min" },
    ],
  },
  {
    eyebrow: "YouTube interviews",
    title: "On camera.",
    items: [
      { label: "How to make any business profitable", meta: "22 min" },
      { label: "Systems that let founders step back", meta: "18 min" },
    ],
  },
  {
    eyebrow: "Guest talks & conferences",
    title: "On stage.",
    items: [
      { label: "Scaling MSMEs into enterprises — keynote", meta: "Conference" },
      { label: "The economics of sustainable growth", meta: "Guest talk" },
      { label: "Operating excellence for modern brands", meta: "Panel" },
    ],
  },
];

export default function FeaturedMediaPage() {
  return (
    <main>
      <PageHero
        eyebrow="Resources · Featured media"
        title="Ideas on building businesses, shared widely."
        lead="Podcasts, interviews, talks, and conference sessions — the operator's perspective, out in the world."
      />

      {/* Hero feature */}
      <section className="pb-12">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <VideoCard label="Featured film — Building profitable businesses" meta="Featured" />
          </Reveal>
        </div>
      </section>

      {SECTIONS.map((section, si) => (
        <section
          key={section.eyebrow}
          className={
            si % 2 === 1
              ? "border-y border-border bg-background-elevated/30 py-20"
              : "py-20"
          }
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between">
              <div>
                <Eyebrow>{section.eyebrow}</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
              </div>
            </div>
            <RevealGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <RevealItem key={item.label} variants={riseIn}>
                  <VideoCard label={item.label} meta={item.meta} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ))}

      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeading
            eyebrow="Featured videos"
            title="More coming soon."
            lead="New conversations and talks are added regularly. Subscribe to be the first to see them."
          />
        </div>
      </section>
    </main>
  );
}
