import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero, Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Anjan Prasad — business advisory, counselling, courses, speaking, and media.",
};

const DETAILS = [
  { Icon: Mail, label: "Email", value: "hello@ap.com" },
  { Icon: Phone, label: "Phone", value: "+91 00000 00000" },
  { Icon: MapPin, label: "Office", value: "Bengaluru, India" },
];

const SOCIALS = ["LinkedIn", "Instagram", "YouTube", "X"];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your business."
        lead="Whether it's advisory, counselling, or a conversation about what you're building — this is where it starts."
      />

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            {/* Details */}
            <Reveal className="lg:col-span-2">
              <div className="space-y-4">
                {DETAILS.map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-background-elevated/40 p-5"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-brand">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">
                        {label}
                      </p>
                      <p className="mt-1 text-[15px] font-medium text-foreground">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                <div className="absolute inset-0 bg-grid opacity-70" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(238,192,75,0.12),transparent_60%)]" />
                <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand bg-background">
                  <MapPin className="h-5 w-5 text-brand" strokeWidth={1.75} />
                </span>
                <span className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  Map placeholder
                </span>
              </div>

              <div className="mt-6">
                <Eyebrow>Connect</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="rounded-full border border-border px-4 py-2 text-sm text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal className="lg:col-span-3">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
