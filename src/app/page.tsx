import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CompaniesWorkedWith } from "@/components/home/CompaniesWorkedWith";
import { TrustExperience } from "@/components/home/TrustExperience";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ConsultationIntro } from "@/components/home/ConsultationIntro";
import { BrandWallSection } from "@/components/home/BrandWallSection";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { KnowledgeMedia } from "@/components/home/KnowledgeMedia";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "AP.com — India's Business Growth Ecosystem",
  description:
    "Build a business that outlasts you. Strategic business advisory, executive consulting, leadership development and scalable growth systems from Anjan Prasad.",
};

/**
 * Homepage — a premium, executive user journey:
 * Hero → Companies → Trust & Experience → About → Career Consultation →
 * Brand Wall → Testimonials → Knowledge & Media → Final CTA.
 * Simple, story-led, and consistent with the wider AP.com design system.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <CompaniesWorkedWith />
      <TrustExperience />
      <AboutIntro />
      <ConsultationIntro />
      <BrandWallSection />
      <HomeTestimonials />
      <KnowledgeMedia />
      <FinalCTA />
    </main>
  );
}
