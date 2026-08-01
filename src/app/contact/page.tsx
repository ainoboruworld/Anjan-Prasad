import type { Metadata } from "next";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/data";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with AP.com — courses, consulting, corporate training, or speaking. Human replies, usually within a working day.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;

  return (
    <main>
      <section className="bg-grid relative min-h-screen overflow-hidden pt-40 pb-24 sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/4 top-24 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,169,255,0.1),transparent_65%)] blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 font-display text-[length:var(--text-hero)] font-semibold leading-[1.04] tracking-[-0.03em] text-foreground">
              Say the{" "}
              <span className="editorial-accent text-brand">real thing.</span>
            </h1>
            <p className="mt-7 max-w-md text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
              Where the business actually is, what&apos;s actually stuck, what
              you actually want. That&apos;s enough — the method takes it from
              there.
            </p>
            <dl className="mt-12 space-y-5 border-t border-border pt-8 text-sm">
              <div className="flex gap-6">
                <dt className="w-24 shrink-0 uppercase tracking-[0.16em] text-foreground-muted">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-foreground underline decoration-brand underline-offset-4 hover:text-brand"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              {CONTACT_PHONE && (
                <div className="flex gap-6">
                  <dt className="w-24 shrink-0 uppercase tracking-[0.16em] text-foreground-muted">
                    Phone
                  </dt>
                  <dd>
                    <a
                      href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                      className="font-medium text-foreground hover:text-brand"
                    >
                      {CONTACT_PHONE}
                    </a>
                  </dd>
                </div>
              )}
              <div className="flex gap-6">
                <dt className="w-24 shrink-0 uppercase tracking-[0.16em] text-foreground-muted">
                  Replies
                </dt>
                <dd className="text-foreground">Human, within one working day</dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-24 shrink-0 uppercase tracking-[0.16em] text-foreground-muted">
                  Fastest start
                </dt>
                <dd className="text-foreground">The Saturday Demo Session — book it directly</dd>
              </div>
              <div className="flex items-center gap-6">
                <dt className="w-24 shrink-0 uppercase tracking-[0.16em] text-foreground-muted">
                  Social
                </dt>
                <dd>
                  <SocialLinks />
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="rounded-3xl border border-border bg-background-elevated p-8 shadow-[var(--shadow-soft)] sm:p-10">
            <ContactForm initialInterest={interest} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
