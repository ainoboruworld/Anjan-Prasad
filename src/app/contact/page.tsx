import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

/** Inline LinkedIn glyph — avoids depending on a named lucide export. */
function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
import { PageHero } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AP.com — email, phone, and office hours. For courses, consulting, corporate training, or speaking, reach out and get a human reply.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact details. Email is live; the placeholder rows are clearly marked
 * ("Coming soon") until the real phone, hours, and address are confirmed.
 */
const LINKEDIN_URL = "https://www.linkedin.com/in/anjanprasad/";

type Card = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  pending?: boolean;
};

const CARDS: Card[] = [
  {
    icon: <Mail className="h-5 w-5" strokeWidth={1.75} />,
    label: "Email",
    value: "Coming soon",
    pending: true,
  },
  {
    icon: <Phone className="h-5 w-5" strokeWidth={1.75} />,
    label: "Phone",
    value: "Coming soon",
    pending: true,
  },
  {
    icon: <Clock className="h-5 w-5" strokeWidth={1.75} />,
    label: "Office Hours",
    value: "Mon–Fri · Coming soon",
    pending: true,
  },
  {
    icon: <LinkedInGlyph />,
    label: "LinkedIn",
    value: "in/anjanprasad",
    href: LINKEDIN_URL,
    external: true,
  },
  {
    icon: <MapPin className="h-5 w-5" strokeWidth={1.75} />,
    label: "Location",
    value: "India · Coming soon",
    pending: true,
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s{" "}
            <span className="editorial-accent text-brand">talk business.</span>
          </>
        }
        lead="For courses, consulting, corporate training, or speaking — reach out and you'll get a human reply, usually within one working day."
      />

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((c) => {
              const body = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-brand-sky transition-colors group-hover:border-brand-sky/50">
                    {c.icon}
                  </span>
                  <span className="mt-5 block text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                    {c.label}
                  </span>
                  <span
                    className={`mt-1.5 flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight ${
                      c.pending ? "text-foreground-muted" : "text-foreground"
                    }`}
                  >
                    {c.value}
                    {c.href && (
                      <ArrowUpRight
                        className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        strokeWidth={2}
                      />
                    )}
                  </span>
                </>
              );

              return (
                <RevealItem key={c.label}>
                  {c.href ? (
                    <Link
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="card card-hover group flex h-full flex-col p-7"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="card group flex h-full flex-col p-7">{body}</div>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[1.5rem] border border-border bg-background-sunken">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--hairline)_1px,transparent_1px),linear-gradient(90deg,var(--hairline)_1px,transparent_1px)] [background-size:44px_44px]"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-brand-sky">
                  <MapPin className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Map — location coming soon
                </span>
                <span className="max-w-sm text-sm text-foreground-muted">
                  The office address and an embedded map will appear here once
                  confirmed.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
