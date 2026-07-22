import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/data";
import { PageHero } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AP.com collects, uses, and protects your information.",
};

const SECTIONS = [
  {
    title: "What we collect",
    copy: "When you register for a session, enquire about advisory, book a consultation, or subscribe to the newsletter, we collect the details you provide — typically your name, email, phone number, company, and the context you share about your business.",
  },
  {
    title: "How we use it",
    copy: "Your information is used to respond to your enquiry, deliver the program or engagement you signed up for, and — if you subscribed — send the weekly newsletter. We do not sell or rent your personal information to anyone.",
  },
  {
    title: "How it is stored",
    copy: "Form submissions are stored in access-controlled systems used to run AP.com's programs and engagements. We keep information only as long as it is needed for those purposes.",
  },
  {
    title: "Your choices",
    copy: "You can unsubscribe from the newsletter at any time, and you can ask us to correct or delete the information we hold about you.",
  },
  {
    title: "Contact",
    copy: `Questions about this policy or your data can be sent to ${CONTACT_EMAIL}.`,
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy{" "}
            <span className="editorial-accent text-brand">Policy.</span>
          </>
        }
        lead="Plainly written, like everything else here."
      />
      <section className="pb-28">
        <div className="mx-auto max-w-3xl space-y-10 px-6">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {s.title}
              </h2>
              <p className="mt-3 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                {s.copy}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
