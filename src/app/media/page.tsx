import type { Metadata } from "next";
import { MEDIA_FEATURES, featuredMediaFromCms } from "@/lib/media";
import { getFeaturedMedia } from "@/lib/cms";
import { MediaCard } from "@/components/hub/MediaCard";
import { CTAButton, Eyebrow, PageHero } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Featured Media - Knowledge Hub",
  description:
    "Anjan Prasad's public content and media appearances - videos, talks and more. Each card links to the original platform.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Featured Media - Anjan Prasad",
    description:
      "Videos, talks and appearances by Anjan Prasad across platforms.",
    url: "/media",
    type: "website",
  },
};

export default async function FeaturedMediaPage() {
  const cms = await getFeaturedMedia();
  const features =
    cms && cms.length > 0 ? featuredMediaFromCms(cms) : MEDIA_FEATURES;
  return (
    <main>
      <PageHero
        eyebrow="Featured Media"
        title={
          <>
            Watch and hear the{" "}
            <span className="editorial-accent text-brand">method.</span>
          </>
        }
        lead="Anjan Prasad's public content and appearances - videos today, with podcasts, interviews, talks and press joining the shelf. Every card opens the original platform."
      />

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Latest</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              From the channel.
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => (
              <RevealItem key={item.id} className="h-full">
                <MediaCard item={item} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-t border-border bg-background-sunken py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Invite Anjan to{" "}
              <span className="editorial-accent text-brand">your stage.</span>
            </h2>
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              Keynotes, panels, podcasts, and guest lectures on business
              building, transformation, and AI-native operations.
            </p>
            <div className="mt-9">
              <CTAButton href="/contact?interest=speaking">
                Request an appearance
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
