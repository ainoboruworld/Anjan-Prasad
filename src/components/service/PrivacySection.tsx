import { Lock, ShieldCheck, FileCheck2 } from "lucide-react";
import { Eyebrow } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

const DEFAULT_POINTS = [
  {
    icon: Lock,
    title: "Encrypted in transit",
    copy: "Your details and documents are transmitted over secure, encrypted connections — never shared or sold.",
  },
  {
    icon: FileCheck2,
    title: "Used only for your booking",
    copy: "We use what you submit solely to prepare your session, verify eligibility, and send confirmation.",
  },
  {
    icon: ShieldCheck,
    title: "Payments handled by Cashfree",
    copy: "Card and UPI details are processed by our PCI-compliant payment partner — we never store them.",
  },
];

/**
 * Privacy section — a reassurance band before or after the booking form.
 * Defaults cover the common trust points; pages may override the copy.
 */
export function PrivacySection({
  eyebrow = "Privacy & security",
  title = "Your information stays yours.",
  points = DEFAULT_POINTS,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  points?: { icon: typeof Lock; title: string; copy: string }[];
}) {
  return (
    <section className="border-t border-border bg-background-sunken py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            {title}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <RevealItem key={p.title} className="card p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10">
                  <Icon className="h-5 w-5 text-brand-sky" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                  {p.copy}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
