"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitForm, paymentUrl } from "@/lib/forms";
import { DEMO_SESSION } from "@/lib/data";
import { Field, SubmitButton, inputCls } from "../ui/Form";

const BUSINESS_STAGE = [
  "Just an idea",
  "Building / pre-launch",
  "Early revenue",
  "Growing business",
  "Not a founder yet",
];

/**
 * Demo Session registration. Captures the lead through the shared forms
 * layer, then routes to the payment placeholder to collect the ₹99 fee.
 */
export function DemoForm() {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const f = new FormData(e.currentTarget);
    const v = (k: string) => (f.get(k) as string) ?? "";
    const name = v("fullName");
    await submitForm({
      formType: "Demo Session",
      name,
      email: v("email"),
      phone: v("phone"),
      data: {
        City: v("city"),
        Occupation: v("occupation"),
        "Business Stage": v("stage"),
        Expectations: v("expectations"),
      },
    });
    router.push(
      paymentUrl({ plan: "Demo Session", amount: DEMO_SESSION.fee, name })
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="demo-name">
          <input id="demo-name" name="fullName" required placeholder="Your name" className={inputCls} />
        </Field>
        <Field label="Email" htmlFor="demo-email">
          <input id="demo-email" name="email" type="email" required placeholder="you@email.com" className={inputCls} />
        </Field>
        <Field label="Phone Number" htmlFor="demo-phone">
          <input id="demo-phone" name="phone" type="tel" required placeholder="+91" className={inputCls} />
        </Field>
        <Field label="City" htmlFor="demo-city">
          <input id="demo-city" name="city" required placeholder="City" className={inputCls} />
        </Field>
        <Field label="Occupation" htmlFor="demo-occupation">
          <input id="demo-occupation" name="occupation" required placeholder="Student, professional, founder…" className={inputCls} />
        </Field>
        <Field label="Business Stage" htmlFor="demo-stage">
          <select id="demo-stage" name="stage" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Where are you today?
            </option>
            {BUSINESS_STAGE.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="What do you expect from the session?" htmlFor="demo-expectations">
        <textarea
          id="demo-expectations"
          name="expectations"
          rows={4}
          placeholder="A line or two on what you'd like to walk away with…"
          className={`${inputCls} resize-y`}
        />
      </Field>

      <SubmitButton
        sending={sending}
        idleLabel={`Proceed to Payment - ${DEMO_SESSION.fee}`}
        sendingLabel="Saving your details…"
        className="w-full justify-center"
      />
      <p className="text-center text-xs text-foreground-muted">
        {DEMO_SESSION.fee} registration fee · Weekdays · 3 hours live
      </p>
    </form>
  );
}
