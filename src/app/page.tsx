import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustLogos } from "@/components/home/TrustLogos";
import { Philosophy } from "@/components/home/Philosophy";
import { Journey } from "@/components/home/Journey";
import { Constellation } from "@/components/home/Constellation";
import { Ecosystem } from "@/components/home/Ecosystem";
import { WhoWeHelp } from "@/components/home/WhoWeHelp";
import { FlagshipPrograms } from "@/components/home/FlagshipPrograms";
import { ProofAndNextStep } from "@/components/home/ProofAndNextStep";

export const metadata: Metadata = {
  title: "AP.com — India's Business Growth Ecosystem",
  description:
    "Start, build, and scale a profitable business. Education, consulting, and corporate training from Anjan Prasad — business transformation and growth advisor.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustLogos />
      <Philosophy />
      <Journey />
      <Ecosystem />
      <Constellation />
      <WhoWeHelp />
      <FlagshipPrograms />
      <ProofAndNextStep />
    </main>
  );
}
