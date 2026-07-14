"use client";

import { LogoGrid, LogoMarquee } from "../ui/LogoBadge";
import { SectionHeading, Eyebrow } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";
import { BRANDS, CAREER } from "@/lib/data";

export function BrandsWall() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Brands he has worked with"
          title="Trusted by global brands and category leaders."
          lead="From Fortune 500 boardrooms to fast-scaling challengers — the range of businesses shaped along the way."
        />
      </div>

      {/* Marquee row for scale, static grid for completeness */}
      <div className="mt-16 space-y-4">
        <LogoMarquee names={BRANDS.slice(0, 12)} />
        <LogoMarquee names={BRANDS.slice(12)} />
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-6">
        <div className="hidden">
          {/* Full accessible list retained via grid below for non-motion users */}
        </div>
      </div>

      {/* Career experience */}
      <div className="mx-auto mt-28 max-w-7xl px-6">
        <Reveal className="text-center">
          <Eyebrow>Career experience</Eyebrow>
          <h3 className="mx-auto mt-5 max-w-xl font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-foreground">
            Built inside the companies that build brands.
          </h3>
        </Reveal>
        <div className="mt-12">
          <LogoGrid names={CAREER} />
        </div>
      </div>
    </section>
  );
}
