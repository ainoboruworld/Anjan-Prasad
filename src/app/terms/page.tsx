import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/data";
import { PageHero } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern use of AP.com and its programs.",
};

const SECTIONS = [
  {
    title: "Use of the site",
    copy: "AP.com provides business education, advisory, and consulting services. The content on this site is for general information and education; it is not a guarantee of any specific business outcome.",
  },
  {
    title: "Programs & payments",
    copy: "Registrations for the Demo Session, Live Course, and consultations are confirmed once payment (where applicable) is received. Schedules, formats, and pricing may be updated; confirmed registrations are honoured at the terms in place when you registered.",
  },
  {
    title: "Advisory engagements",
    copy: "Business Advisory and Consultation engagements are governed by the scope agreed in writing for each engagement. Advice is given in good faith based on the information you share; decisions and their outcomes remain yours.",
  },
  {
    title: "Intellectual property",
    copy: "Frameworks, playbooks, course materials, and content on this site belong to AP.com and may not be reproduced or resold without permission.",
  },
  {
    title: "Contact",
    copy: `Questions about these terms can be sent to ${CONTACT_EMAIL}.`,
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms &amp;{" "}
            <span className="editorial-accent text-brand">Conditions.</span>
          </>
        }
        lead="The working agreement between AP.com and everyone who uses it."
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
