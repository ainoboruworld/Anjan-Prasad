import { Hero } from "@/components/Hero";
import { Impact } from "@/components/home/Impact";
import { CompaniesBuilt } from "@/components/home/CompaniesBuilt";
import { BrandsWall } from "@/components/home/BrandsWall";
import { Expertise } from "@/components/home/Expertise";
import { Explainer } from "@/components/Explainer";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Impact />
      <CompaniesBuilt />
      <BrandsWall />
      <Expertise />
      <Explainer />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
