import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CompaniesWorkedWith } from "@/components/home/CompaniesWorkedWith";
import { TrustExperience } from "@/components/home/TrustExperience";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ConsultationIntro } from "@/components/home/ConsultationIntro";
import { FeaturedMediaSection } from "@/components/home/FeaturedMediaSection";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { KnowledgeMedia } from "@/components/home/KnowledgeMedia";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Anjan Prasad - India's Business Growth Ecosystem",
  description:
    "Build a business that outlasts you. Strategic business advisory, executive consulting, leadership development and scalable growth systems from Anjan Prasad.",
};

/**
 * Homepage - a premium, executive user journey:
 * Hero → Credibility (worked with / advised) → Trust & Experience → About →
 * Career Consultation → Featured Media → Testimonials → Knowledge Hub → CTA.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <CompaniesWorkedWith />
      <TrustExperience />
      <AboutIntro />
      <ConsultationIntro />
      <FeaturedMediaSection />
      <HomeTestimonials />
      <KnowledgeMedia />
      <FinalCTA />
    </main>
  );
}
