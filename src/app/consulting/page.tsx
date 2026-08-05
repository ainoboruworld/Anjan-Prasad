import type { Metadata } from "next";
import { Check } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { ADVISORY_LOGOS } from "@/lib/brandLogos";
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
  PrivacySection,
  FinalCTA,
  type BookingVariant,
} from "@/components/service";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Consultation",
  description:
    "Private, one-to-one consultation with Anjan Prasad for students, working professionals and BPL candidates. Clarity today, better decisions tomorrow — book a focused session on the call that matters most.",
  alternates: { canonical: "/consulting" },
  openGraph: {
    title: "Consultation — AP.com",
    description:
      "Clarity today. Better decisions tomorrow. A private consultation for students, professionals and BPL candidates.",
    url: "/consulting",
    type: "website",
  },
};

/* ── Booking configuration — shared form, three audience variants ────────── */

const MODES = ["Online — video call", "Offline — in person"];

const CONSULTATION_VARIANTS: BookingVariant[] = [
  {
    id: "student",
    label: "Student",
    blurb: "For school and university students seeking direction on stream, career and skills.",
    formType: "Consultation",
    mode: "payment",
    tier: {
      fromField: "level",
      map: {
        "KPG–12": "kpg-12",
        "Undergraduate (UG)": "ug",
        "Postgraduate (PG)": "pg",
      },
    },
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91" },
      { name: "city", label: "City", type: "text", required: true, placeholder: "City" },
      {
        name: "level",
        label: "Level of study",
        type: "select",
        required: true,
        placeholder: "Select your level",
        options: ["KPG–12", "Undergraduate (UG)", "Postgraduate (PG)"],
        help: "This sets your consultation fee.",
      },
      { name: "institution", label: "School / College", type: "text", required: true, placeholder: "Institution name" },
      {
        name: "goals",
        label: "What would you like clarity on?",
        type: "textarea",
        required: true,
        placeholder: "Stream choice, career direction, skills, higher studies…",
        full: true,
      },
      { name: "date", label: "Preferred date", type: "date", required: true },
      { name: "time", label: "Preferred time", type: "time", required: true },
      { name: "mode", label: "Mode", type: "select", required: true, placeholder: "Select mode", options: MODES, full: true },
    ],
  },
  {
    id: "professional",
    label: "Working Professional",
    blurb: "For professionals weighing growth, a pivot, or the move from salary to ownership.",
    formType: "Consultation",
    mode: "payment",
    tier: {
      fromField: "experience",
      map: {
        "1–3 years": "exp-1-3",
        "3–6 years": "exp-3-6",
        "6–12 years": "exp-6-12",
      },
    },
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91" },
      { name: "company", label: "Company", type: "text", required: true, placeholder: "Where you work" },
      { name: "designation", label: "Designation", type: "text", required: true, placeholder: "Your role" },
      {
        name: "experience",
        label: "Years of experience",
        type: "select",
        required: true,
        placeholder: "Select experience",
        options: ["1–3 years", "3–6 years", "6–12 years"],
        help: "This sets your consultation fee.",
      },
      { name: "industry", label: "Industry", type: "text", required: true, placeholder: "Your sector" },
      {
        name: "challenge",
        label: "The decision on the table",
        type: "textarea",
        required: true,
        placeholder: "The single call you'd most like to move in this session…",
        full: true,
      },
      { name: "date", label: "Preferred date", type: "date", required: true },
      { name: "time", label: "Preferred time", type: "time", required: true },
      { name: "mode", label: "Mode", type: "select", required: true, placeholder: "Select mode", options: MODES, full: true },
    ],
  },
  {
    id: "bpl",
    label: "BPL Candidate",
    blurb:
      "Below Poverty Line candidates are served free of cost. Upload a valid BPL / income certificate and our team verifies eligibility before confirming your session.",
    formType: "Consultation",
    mode: "verification",
    submitLabel: "Submit for verification",
    tier: { fixed: "bpl" },
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91" },
      { name: "city", label: "City", type: "text", required: true, placeholder: "City" },
      {
        name: "document",
        label: "BPL / income certificate",
        type: "file",
        required: true,
        full: true,
        help: "PDF, JPG or PNG. Used only to verify eligibility.",
      },
      {
        name: "goals",
        label: "What would you like clarity on?",
        type: "textarea",
        required: true,
        placeholder: "The question you'd most like help with…",
        full: true,
      },
      { name: "date", label: "Preferred date", type: "date", required: true },
      { name: "time", label: "Preferred time", type: "time", required: true },
    ],
  },
];

/* ── Static page content ─────────────────────────────────────────────────── */

const WWH_COLUMNS = [
  {
    key: "who",
    kicker: "Who it's for",
    title: "Students, professionals & BPL candidates",
    copy: "Anyone facing a real decision about their path — and who wants an operator's read, not generic advice.",
    items: ["School & university students", "Working professionals at any stage", "BPL candidates, served free of cost"],
  },
  {
    key: "what",
    kicker: "What you get",
    title: "One focused, private session",
    copy: "A prepared one-to-one on the single question that matters most right now — no deck, no pitch.",
    items: ["A framed decision, not vague pointers", "An operator who has actually built", "A written next step you can act on"],
  },
  {
    key: "how",
    kicker: "How it runs",
    title: "Prepared, then decisive",
    copy: "You share context when you book; Anjan arrives having read it, so the session goes straight to the point.",
    items: ["Online or in person", "45–75 minutes, by level", "Follow-up written summary"],
  },
];

const TRUST_METRICS = [
  { value: 16, suffix: "+", label: "Years operating & advising" },
  { value: 5000, suffix: "+", label: "People guided & taught" },
  { value: 20, suffix: "+", label: "Industries worked across" },
  { text: "4.9/5", label: "Average session rating" },
];

const SUCCESS_METRICS = [
  { value: 92, suffix: "%", label: "Left with a clear next step" },
  { value: 3, suffix: "×", label: "More confident in the decision" },
  { value: 48, suffix: "h", label: "Written summary turnaround" },
  { value: 100, suffix: "%", label: "BPL candidates served free" },
];

const WHY = [
  { t: "An operator, not a coach", c: "Advice from someone who has made payroll, defended margins, and built companies — not read about it." },
  { t: "Prepared for you", c: "Anjan reads your context before the call, so no time is lost on setup — the hour is all decision." },
  { t: "A written next step", c: "You leave with the decision framed and the first actions named, delivered in writing afterward." },
  { t: "Access, not exclusivity", c: "Fair, level-based pricing — and free consultations for BPL candidates, verified with dignity." },
];

const TIMELINE = [
  { step: "01", title: "Choose & book", copy: "Pick your audience and level, share context, and confirm your slot." },
  { step: "02", title: "Anjan prepares", copy: "He arrives having read your situation — the session starts on the real question." },
  { step: "03", title: "The working session", copy: "A focused, private hour on your decision, online or in person." },
  { step: "04", title: "Your written next step", copy: "You receive the decision framed and the first actions to take." },
];

const FAQS = [
  {
    q: "How is the price decided?",
    a: "By audience and level — school students (KPG–12) ₹499, UG and PG ₹999, and professionals by experience: 1–3 years ₹1,499, 3–6 years ₹1,999, 6–12 years ₹2,999. BPL candidates are served free after verification.",
  },
  {
    q: "How does the free BPL consultation work?",
    a: "Choose the BPL Candidate tab and upload a valid BPL or income certificate. Our team verifies eligibility, then confirms your session and sends meeting details — at no cost.",
  },
  {
    q: "Online or in person?",
    a: "Both. You choose your preferred mode when you book — a video call or, where feasible, an in-person session.",
  },
  {
    q: "What should I prepare?",
    a: "Just the decision and the context around it. The booking form captures what Anjan needs to arrive ready.",
  },
  {
    q: "How does payment work?",
    a: "You submit your booking details and proceed to secure checkout. UPI and card payments are processed by Cashfree; your meeting link and confirmation email follow a successful payment.",
  },
];

export default function ConsultationPage() {
  return (
    <main>
      <HeroSection
        eyebrow="Consultation"
        headline="Clarity Today."
        accent="Better Decisions Tomorrow."
        lead="A private, one-to-one session with Anjan Prasad on the single decision that matters most — for students, working professionals, and BPL candidates. You bring the question; you leave with a plan."
        ctas={[
          { label: "See pricing", href: "#pricing" },
          { label: "How it works", href: "#how", variant: "ghost" },
        ]}
        highlights={[
          { value: "1:1", label: "Private session" },
          { value: "45–75m", label: "By level" },
          { value: "Written", label: "Next-step summary" },
          { value: "Free", label: "For BPL candidates" },
        ]}
      />

      <TrustMetrics metrics={TRUST_METRICS} eyebrow="Sixteen years of operating, in every session" />

      <WhoWhatHow
        title={
          <>
            A consultation built around{" "}
            <span className="editorial-accent text-brand">your decision.</span>
          </>
        }
        columns={WWH_COLUMNS}
      />

      <PricingCards
        serviceType="consultation"
        title={
          <>
            Fair, level-based{" "}
            <span className="editorial-accent text-brand">pricing.</span>
          </>
        }
        lead="Every tier is the same focused, prepared session — priced by who you are, not by how much we can charge. BPL candidates are served free."
        columns={4}
      />

      {/* Booking form */}
      <section id="book" className="scroll-mt-28 border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Book the session</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Request a{" "}
              <span className="editorial-accent text-brand">Consultation.</span>
            </h2>
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              Choose your audience, share the decision on the table, and pick your slot.
              Your price is set automatically from your level.
            </p>
          </Reveal>
          <Reveal className="card mt-12 p-6 sm:p-10">
            <DynamicBookingForm
              serviceType="consultation"
              serviceName="Consultation"
              variants={CONSULTATION_VARIANTS}
            />
          </Reveal>
        </div>
      </section>

      {/* Why choose Anjan Prasad */}
      <section id="how" className="scroll-mt-28 border-t border-border bg-background-elevated py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Why choose Anjan Prasad</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Advice from someone who has{" "}
              <span className="editorial-accent text-brand">actually built.</span>
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {WHY.map((w) => (
              <RevealItem key={w.t} className="card p-8">
                <div className="flex items-start gap-4">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-brand-sky" strokeWidth={2.5} />
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {w.t}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                      {w.c}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <LogoWall
        eyebrow="Companies worked with"
        title={
          <>
            Perspective shaped across{" "}
            <span className="editorial-accent text-brand">two decades of building.</span>
          </>
        }
        logos={ADVISORY_LOGOS.slice(0, 12)}
      />

      <TrustMetrics metrics={SUCCESS_METRICS} eyebrow="Success metrics" />

      <Testimonials
        title={
          <>
            What people say{" "}
            <span className="editorial-accent text-brand">after the session.</span>
          </>
        }
        items={TESTIMONIALS.slice(0, 3).map((t) => ({
          quote: t.quote,
          name: t.name,
          title: t.title,
        }))}
      />

      <Timeline
        eyebrow="How it works"
        title={
          <>
            From booking to{" "}
            <span className="editorial-accent text-brand">a written next step.</span>
          </>
        }
        steps={TIMELINE}
      />

      <FAQ
        title={
          <>
            Questions,{" "}
            <span className="editorial-accent text-brand">answered.</span>
          </>
        }
        items={FAQS}
      />

      <PrivacySection />

      <FinalCTA
        eyebrow="Ready when you are"
        title="One hour can change the"
        accent="whole decision."
        lead="Book your consultation and arrive at your next move with clarity — not guesswork."
        primary={{ label: "Book a consultation", href: "#book" }}
        secondary={{ label: "Explore Business Advisory", href: "/business-advisory" }}
      />
    </main>
  );
}
