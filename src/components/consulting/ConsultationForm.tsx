"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitForm, paymentUrl } from "@/lib/forms";
import { Field, SubmitButton, inputCls } from "../ui/Form";

const INDUSTRIES = [
  "D2C / Consumer",
  "SaaS / Technology",
  "Finance / Fintech",
  "Healthcare",
  "Agriculture",
  "Mobility",
  "Services / Agency",
  "Manufacturing",
  "Other",
];

const STAGES = [
  "Idea / pre-launch",
  "Early revenue",
  "Growing business",
  "Established, scaling",
  "Enterprise",
];

const TEAM_SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"];

/**
 * Consultation booking form — 13 fields plus session mode. Captures the
 * lead, then routes to the payment placeholder to confirm the booking.
 */
export function ConsultationForm() {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const f = new FormData(e.currentTarget);
    const v = (k: string) => (f.get(k) as string) ?? "";
    const name = v("fullName");
    await submitForm({
      formType: "Consultation",
      name,
      email: v("email"),
      phone: v("phone"),
      company: v("companyName"),
      data: {
        Designation: v("designation"),
        Industry: v("industry"),
        "Business Stage": v("stage"),
        "Team Size": v("teamSize"),
        "Business Goals": v("goals"),
        "Biggest Challenge": v("challenge"),
        "Preferred Date": v("date"),
        "Preferred Time": v("time"),
        Mode: v("mode"),
      },
    });
    router.push(paymentUrl({ plan: "Consultation", amount: "", name }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="con-name">
          <input id="con-name" name="fullName" required placeholder="Your name" className={inputCls} />
        </Field>
        <Field label="Email" htmlFor="con-email">
          <input id="con-email" name="email" type="email" required placeholder="you@company.com" className={inputCls} />
        </Field>
        <Field label="Phone" htmlFor="con-phone">
          <input id="con-phone" name="phone" type="tel" required placeholder="+91" className={inputCls} />
        </Field>
        <Field label="Company" htmlFor="con-company">
          <input id="con-company" name="companyName" required placeholder="Company" className={inputCls} />
        </Field>
        <Field label="Designation" htmlFor="con-designation">
          <input id="con-designation" name="designation" required placeholder="Founder, CEO, Manager…" className={inputCls} />
        </Field>
        <Field label="Industry" htmlFor="con-industry">
          <select id="con-industry" name="industry" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select industry
            </option>
            {INDUSTRIES.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Field>
        <Field label="Business Stage" htmlFor="con-stage">
          <select id="con-stage" name="stage" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select stage
            </option>
            {STAGES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Team Size" htmlFor="con-team">
          <select id="con-team" name="teamSize" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select team size
            </option>
            {TEAM_SIZES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Business Goals" htmlFor="con-goals">
        <textarea
          id="con-goals"
          name="goals"
          rows={3}
          required
          placeholder="What are you trying to achieve over the next few months?"
          className={`${inputCls} resize-y`}
        />
      </Field>

      <Field label="Biggest Challenge" htmlFor="con-challenge">
        <textarea
          id="con-challenge"
          name="challenge"
          rows={3}
          required
          placeholder="The single problem you'd most like to solve in this session…"
          className={`${inputCls} resize-y`}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Preferred Date" htmlFor="con-date">
          <input id="con-date" name="date" type="date" required className={inputCls} />
        </Field>
        <Field label="Preferred Time" htmlFor="con-time">
          <input id="con-time" name="time" type="time" required className={inputCls} />
        </Field>
      </div>

      <Field label="Mode" htmlFor="con-mode-online">
        <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Session mode">
          {[
            { value: "Online", note: "Video call" },
            { value: "Offline", note: "In person" },
          ].map((m, i) => (
            <label
              key={m.value}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border-strong bg-background px-5 py-3.5 text-sm text-foreground transition-colors has-[:checked]:border-brand-sky has-[:checked]:bg-brand/5"
            >
              <input
                id={`con-mode-${m.value.toLowerCase()}`}
                type="radio"
                name="mode"
                value={m.value}
                defaultChecked={i === 0}
                required
                className="h-4 w-4 accent-[var(--brand-sky)]"
              />
              <span className="font-medium">{m.value}</span>
              <span className="text-foreground-muted">· {m.note}</span>
            </label>
          ))}
        </div>
      </Field>

      <SubmitButton
        sending={sending}
        idleLabel="Proceed to Payment"
        sendingLabel="Saving your details…"
        className="w-full justify-center"
      />
      <p className="text-center text-xs text-foreground-muted">
        You&apos;ll confirm the slot at checkout. UPI &amp; card payments are
        being integrated.
      </p>
    </form>
  );
}
