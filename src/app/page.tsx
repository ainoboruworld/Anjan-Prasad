import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Brands } from "@/components/Brands";
import { Explainer } from "@/components/Explainer";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Brands />
        <Explainer />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
