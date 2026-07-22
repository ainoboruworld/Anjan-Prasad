import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { AboutPreview } from "@/components/home/AboutPreview";
import { AdvisoryServices } from "@/components/home/AdvisoryServices";
import { ConsultingPreview } from "@/components/home/ConsultingPreview";
import { BrandsWall } from "@/components/home/BrandsWall";
import { TestimonialsHome } from "@/components/home/TestimonialsHome";
import { FeaturedMedia } from "@/components/home/FeaturedMedia";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "AP.com — India's Business Growth Ecosystem",
  description:
    "Start, build, and scale a profitable business. Education, consulting, and corporate training from Anjan Prasad — business transformation and growth advisor.",
};

/**
 * Homepage — a conversion-focused flow that answers, in order:
 * who Anjan is, why to trust him, who he's worked with, how he helps,
 * which service fits, and what to do next.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustIndicators />
      <AboutPreview />
      <AdvisoryServices />
      <ConsultingPreview />
      <BrandsWall />
      <TestimonialsHome />
      <FeaturedMedia />
      <NewsletterSection />
      <FinalCTA />
    </main>
  );
}
