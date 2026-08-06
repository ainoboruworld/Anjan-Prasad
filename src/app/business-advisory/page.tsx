import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES, testimonialsFor } from "@/lib/data";
import { getFaqs, getCaseStudies } from "@/lib/cms";
import { ENTERPRISE_BRANDS } from "@/lib/brandLogos";
import {
  HeroSection,
  TrustMetrics,
  WhoWhatHow,
  PricingCards,
  DynamicBookingForm,
  LogoWall,
  Testimonials,
  Timeline,
  FAQ,
  FinalCTA,
  type BookingVariant,
} from "@/components/service";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Business Advisory",
  description:
    "Build a business that outlasts you. Start with a ₹99 Business Growth Demo, join the Business Growth Cohort, or engage monthly Business Advisory - transformation delivered inside your business by an operator.",
  alternates: { canonical: "/business-advisory" },
  openGraph: {
    title: "Business Advisory - Anjan Prasad",
    description:
      "Build a business that outlasts you. Demo, Cohort, and monthly Advisory - one operator, one shared payment architecture.",
    url: "/business-advisory",
    type: "website",
  },
};

/* ── Booking configuration - Demo, Cohort, Monthly Advisory ──────────────── */

const INDUSTRIES = [
  "Consumer / D2C",
  "B2B Services",
  "Manufacturing",
  "Technology / SaaS",
  "Healthcare",
  "Education",
  "Retail",
  "Finance",
  "Other",
];

const STAGES = ["Idea / pre-revenue", "Early revenue", "Growing", "Established / plateaued", "Enterprise"];
const SIZES = ["Just me", "2-10", "11-50", "51-200", "201-1000", "1000+"];

const ADVISORY_VARIANTS: BookingVariant[] = [
  {
    id: "demo",
    label: "Growth Demo",
    blurb: "A 3-hour live working session - the fastest way to experience the playbook first-hand.",
    formType: "Demo Session",
    mode: "payment",
    tier: { fixed: "demo" },
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91" },
      { name: "city", label: "City", type: "text", required: true, placeholder: "City" },
      {
        name: "occupation",
        label: "You are",
        type: "select",
        required: true,
        placeholder: "Select one",
        options: ["Student", "Working professional", "Founder", "Business owner"],
      },
      { name: "stage", label: "Business stage", type: "select", required: true, placeholder: "Select stage", options: STAGES },
      {
        name: "expectations",
        label: "What do you want from the session?",
        type: "textarea",
        placeholder: "A line or two on what you'd like to walk away with…",
        full: true,
      },
    ],
  },
  {
    id: "cohort",
    label: "Growth Cohort",
    blurb: "A structured, multi-week program with live sessions, accountability, and a founder community.",
    formType: "Business Growth Program",
    mode: "payment",
    tier: { fixed: "cohort" },
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91" },
      { name: "company", label: "Company / venture", type: "text", required: true, placeholder: "Business name" },
      { name: "role", label: "Your role", type: "text", required: true, placeholder: "Founder, owner, professional…" },
      { name: "industry", label: "Industry", type: "select", required: true, placeholder: "Select industry", options: INDUSTRIES },
      { name: "stage", label: "Business stage", type: "select", required: true, placeholder: "Select stage", options: STAGES },
      {
        name: "goals",
        label: "What do you want to build in the cohort?",
        type: "textarea",
        required: true,
        placeholder: "The outcome you want by the end of the program…",
        full: true,
      },
    ],
  },
  {
    id: "advisory",
    label: "Monthly Advisory",
    blurb: "An ongoing partnership: systems installed inside your business, outcomes measured in the P&L.",
    formType: "Business Advisory",
    mode: "payment",
    submitLabel: "Proceed to secure the engagement",
    tier: { fixed: "advisory" },
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91" },
      { name: "company", label: "Company name", type: "text", required: true, placeholder: "Company" },
      { name: "website", label: "Website", type: "url", optional: true, placeholder: "https://" },
      { name: "industry", label: "Industry", type: "select", required: true, placeholder: "Select industry", options: INDUSTRIES },
      { name: "companySize", label: "Company size", type: "select", required: true, placeholder: "Select size", options: SIZES },
      { name: "stage", label: "Business stage", type: "select", required: true, placeholder: "Select stage", options: STAGES },
      {
        name: "challenge",
        label: "Current challenge",
        type: "textarea",
        required: true,
        placeholder: "Where the business actually is, and where you want it to go…",
        full: true,
      },
    ],
  },
];

/* ── Static content ──────────────────────────────────────────────────────── */

const WWH_COLUMNS = [
  {
    key: "who",
    kicker: "Who it's for",
    title: "Founders, owners & operators",
    copy: "People running real businesses who want systems and scale - not another slide deck.",
    items: ["Founders past product-market fit", "Owners modernising a running company", "Leaders scaling past themselves"],
  },
  {
    key: "what",
    kicker: "What it is",
    title: "Transformation, three ways in",
    copy: "One operator, three commitment levels - a ₹99 demo, a structured cohort, or a monthly advisory partnership.",
    items: ["Diagnosis before prescription", "Systems built with your team", "Outcomes measured in the P&L"],
  },
  {
    key: "how",
    kicker: "How it works",
    title: "Inside your operating rhythm",
    copy: "The work happens in your weekly reviews and your numbers - capability transfers, dependency doesn't.",
    items: ["Live sessions & working cadence", "Playbooks and installed systems", "One shared, secure checkout"],
  },
];

const TRUST_METRICS = [
  { value: 16, suffix: "+", label: "Years building & scaling" },
  { value: 3, label: "Companies founded, bootstrapped" },
  { text: "P&L", label: "Where outcomes are measured" },
  { value: 20, suffix: "+", label: "Industries transformed" },
];

const FRAMEWORK = [
  { step: "01", title: "Diagnose", copy: "Two weeks inside your numbers and your rooms before any recommendation exists." },
  { step: "02", title: "Design", copy: "One named outcome, one metric, and the operating rhythm to hit it - agreed up front." },
  { step: "03", title: "Install", copy: "Systems built with your team, inside your week, so capability stays in the building." },
  { step: "04", title: "Compound", copy: "The engagement ends with your team running the system and the metric on the board." },
];

const FAQS = [
  {
    q: "Which program should I start with?",
    a: "If you want a fast, low-cost taste of the method, start with the ₹99 Business Growth Demo. If you want structured education with accountability, join the ₹5,999 Business Growth Cohort. If you want transformation delivered inside your business, engage monthly Business Advisory at ₹9,999/month.",
  },
  {
    q: "What does the monthly advisory include?",
    a: "A dedicated monthly engagement where Anjan works inside your operating rhythm - reviews, numbers, and systems installed with your team - against one named outcome measured in the P&L.",
  },
  {
    q: "How is this different from a consulting firm?",
    a: "Firms deliver recommendations; this delivers installed systems. Anjan operates alongside your team until the outcome runs without him.",
  },
  {
    q: "Can I move between programs?",
    a: "Yes. Many start with the Demo, join the Cohort, and graduate into monthly Advisory as the business grows. Each uses the same secure checkout.",
  },
  {
    q: "How does payment work?",
    a: "Every program uses one shared payment architecture. You submit your details and pay securely via Cashfree (UPI and cards); confirmation and joining details are emailed after a successful payment.",
  },
];

export default async function BusinessAdvisoryPage() {
  // CMS FAQs where authored; otherwise the built-in set.
  const cmsFaqs = await getFaqs("Business Advisory");
  const faqs =
    cmsFaqs && cmsFaqs.length > 0
      ? cmsFaqs.map((f) => ({ q: f.question, a: f.answer }))
      : FAQS;

  // CMS case studies where authored; otherwise the built-in set. Only the
  // fields the card renders are normalised, so both sources are compatible.
  const cmsCase = await getCaseStudies();
  const caseStudies =
    cmsCase && cmsCase.length > 0
      ? cmsCase.map((c, i) => ({
          slug: `cms-${i}`,
          industry: c.sector ?? "",
          service: c.client ?? "Case study",
          headline: c.title,
          challenge: c.summary ?? c.problem ?? "",
          results: (c.metrics ?? []).map((m) => ({
            metric: m.value,
            label: m.label,
          })),
        }))
      : CASE_STUDIES.map((cs) => ({
          slug: cs.slug,
          industry: cs.industry,
          service: cs.service,
          headline: cs.headline,
          challenge: cs.challenge,
          results: cs.results,
        }));
  return (
    <main>
      <HeroSection
        eyebrow="Business Advisory"
        headline="Build a Business That"
        accent="Outlasts You."
        lead="Transformation delivered inside your business by an operator - not a slide deck. Start with a ₹99 demo, join the growth cohort, or engage monthly advisory. One playbook, three ways in."
        ctas={[
          { label: "See the programs", href: "#pricing" },
          { label: "Start an enquiry", href: "#book", variant: "ghost" },
        ]}
        highlights={[
          { value: "₹99", label: "Growth Demo" },
          { value: "3", label: "Companies built" },
          { value: "16+", label: "Years operating" },
          { value: "P&L", label: "Measured outcomes" },
        ]}
      />

      <TrustMetrics metrics={TRUST_METRICS} eyebrow="An operator's track record" />

      <WhoWhatHow
        title={
          <>
            We don&apos;t present services.{" "}
            <span className="editorial-accent text-brand">We transform businesses.</span>
          </>
        }
        columns={WWH_COLUMNS}
      />

      <PricingCards
        serviceType="business-advisory"
        eyebrow="Programs"
        title={
          <>
            Three ways to{" "}
            <span className="editorial-accent text-brand">start building.</span>
          </>
        }
        lead="From a ₹99 first taste to a monthly transformation partnership - pick the commitment that matches where the business is."
        columns={3}
      />

      {/* Booking forms */}
      <section id="book" className="scroll-mt-28 border-t border-border py-24">
        {/* Deep-link anchors - the Programs nav scrolls here and the form
            pre-selects the matching program tab (see DynamicBookingForm). */}
        <span id="book-demo" aria-hidden className="block scroll-mt-28" />
        <span id="book-cohort" aria-hidden className="block scroll-mt-28" />
        <span id="book-advisory" aria-hidden className="block scroll-mt-28" />
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Booking</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Reserve your{" "}
              <span className="editorial-accent text-brand">place.</span>
            </h2>
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              Choose a program, tell us where the business is, and proceed to secure checkout.
              All three share the same payment architecture.
            </p>
          </Reveal>
          <Reveal className="card mt-12 p-6 sm:p-10">
            <DynamicBookingForm
              serviceType="business-advisory"
              serviceName="Business Advisory"
              variants={ADVISORY_VARIANTS}
            />
          </Reveal>
        </div>
      </section>

      <Timeline
        eyebrow="Transformation framework"
        title={
          <>
            How a business gets{" "}
            <span className="editorial-accent text-brand">rebuilt.</span>
          </>
        }
        lead="Every engagement follows the same arc - diagnose, design, install, compound - measured against one metric from day one."
        steps={FRAMEWORK}
      />

      <LogoWall
        eyebrow="Companies worked with"
        title={
          <>
            Sixteen years{" "}
            <span className="editorial-accent text-brand">across sectors.</span>
          </>
        }
        logos={ENTERPRISE_BRANDS.slice(0, 12)}
        tone="elevated"
      />

      <Testimonials
        title={
          <>
            What operators{" "}
            <span className="editorial-accent text-brand">say.</span>
          </>
        }
        items={testimonialsFor("Business Advisory")
          .slice(0, 3)
          .map((t) => ({ quote: t.quote, name: t.name, title: t.title }))}
      />

      {/* Success stories */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <Eyebrow>Success stories</Eyebrow>
              <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
                Transformations, in the{" "}
                <span className="editorial-accent text-brand">numbers.</span>
              </h2>
            </Reveal>
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand"
            >
              All case studies
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <RevealItem key={cs.slug}>
                <Link href="/case-studies" className="card card-hover group flex h-full flex-col p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-sky">
                    {cs.industry} · {cs.service}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
                    {cs.headline}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground-muted">
                    {cs.challenge}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
                    {cs.results.slice(0, 2).map((r) => (
                      <div key={r.label}>
                        <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                          {r.metric}
                        </p>
                        <p className="mt-0.5 max-w-[12rem] text-xs leading-relaxed text-foreground-muted">
                          {r.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FAQ
        title={
          <>
            Before you{" "}
            <span className="editorial-accent text-brand">begin.</span>
          </>
        }
        items={faqs}
      />

      <FinalCTA
        eyebrow="The work is the point"
        title="Start where the business"
        accent="actually is."
        lead="Take the ₹99 demo, join the cohort, or open a monthly advisory engagement - and build a business that outlasts you."
        primary={{ label: "Choose a program", href: "#pricing" }}
        secondary={{ label: "Book a 1:1 Consultation", href: "/consulting" }}
      />
    </main>
  );
}
