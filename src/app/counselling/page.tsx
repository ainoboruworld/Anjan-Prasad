import type { Metadata } from "next";
import {
  Brain,
  Compass,
  HeartHandshake,
  Lightbulb,
  Users,
} from "lucide-react";
import { PageHero, SectionHeading, CTAButton } from "@/components/ui/Primitives";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { riseIn } from "@/components/motion";
import { BOOK_COUNSELLING_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Counselling",
  description:
    "One-on-one counselling with Anjan Prasad — founder mentorship, leadership coaching, career guidance, and business problem solving.",
};

const OFFERINGS = [
  {
    Icon: HeartHandshake,
    title: "Founder Mentorship",
    desc: "A steady hand for the decisions that keep founders up at night — from co-founder tension to the next big bet.",
  },
  {
    Icon: Users,
    title: "Leadership Coaching",
    desc: "Grow into the leader your business now needs. Sharpen judgment, presence, and how you build teams.",
  },
  {
    Icon: Compass,
    title: "Career Guidance",
    desc: "Navigate inflection points with clarity — whether to build, join, pivot, or double down.",
  },
  {
    Icon: Lightbulb,
    title: "Business Problem Solving",
    desc: "Bring your hardest, most tangled problem. Leave with a framework and a first move.",
  },
  {
    Icon: Brain,
    title: "One-on-One Sessions",
    desc: "Private, focused, confidential conversations shaped entirely around where you are.",
  },
];

export default function CounsellingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Counselling"
        title="A private room for your hardest questions."
        lead="One-on-one counselling with an entrepreneur who has built, operated, and advised — for founders and leaders carrying real weight."
      >
        <CTAButton href={BOOK_COUNSELLING_URL} external>
          Book a counselling session
        </CTAButton>
      </PageHero>

      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="How he can help"
            title="Guidance shaped around you."
          />
          <RevealGroup className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map(({ Icon, title, desc }) => (
              <RevealItem
                key={title}
                variants={riseIn}
                className="group rounded-[1.5rem] border border-border bg-background-elevated/40 p-8 transition-colors hover:border-border-strong"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {desc}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="border-t border-border bg-background-elevated/30 py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            eyebrow="Ready when you are"
            title="One conversation can change the trajectory."
            lead="Sessions are private, unhurried, and entirely confidential. Bring what matters most."
          />
          <div className="mt-10 flex justify-center">
            <CTAButton href={BOOK_COUNSELLING_URL} external>
              Book a counselling session
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
