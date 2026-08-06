"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitForm, paymentUrl } from "@/lib/forms";
import { saveBooking } from "@/lib/bookings";
import { LIVE_COURSE as MONTHLY_CONSULTING } from "@/lib/data";
import { Field, SubmitButton, inputCls } from "../ui/Form";

const STAGE = [
  "Idea / pre-launch",
  "Early revenue",
  "Growing business",
  "Established, scaling",
];

/**
 * Monthly Consulting enrolment. Captures the lead, then routes to the
 * payment placeholder to collect the ₹9,999 monthly fee.
 */
export function MonthlyConsultingForm() {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const f = new FormData(e.currentTarget);
    const v = (k: string) => (f.get(k) as string) ?? "";
    const name = v("fullName");
    const data = {
      "Business Stage": v("stage"),
      "What you want to move this month": v("goal"),
    };
    await saveBooking({
      serviceType: "business-advisory",
      programType: "Business Growth Program",
      tierId: "cohort",
      fullName: name,
      email: v("email"),
      phone: v("phone"),
      company: v("companyName"),
      status: "pending_payment",
      payload: data,
    });
    await submitForm({
      formType: "Business Growth Program",
      name,
      email: v("email"),
      phone: v("phone"),
      company: v("companyName"),
      data,
    });
    router.push(
      paymentUrl({
        plan: "Business Growth Program",
        amount: MONTHLY_CONSULTING.price,
        name,
      })
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="mc-name">
          <input id="mc-name" name="fullName" required placeholder="Your name" className={inputCls} />
        </Field>
        <Field label="Email" htmlFor="mc-email">
          <input id="mc-email" name="email" type="email" required placeholder="you@company.com" className={inputCls} />
        </Field>
        <Field label="Phone Number" htmlFor="mc-phone">
          <input id="mc-phone" name="phone" type="tel" required placeholder="+91" className={inputCls} />
        </Field>
        <Field label="Company" htmlFor="mc-company" optional>
          <input id="mc-company" name="companyName" placeholder="Company" className={inputCls} />
        </Field>
      </div>

      <Field label="Business Stage" htmlFor="mc-stage">
        <select id="mc-stage" name="stage" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            Where is the business today?
          </option>
          {STAGE.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>

      <Field label="What do you want to move this month?" htmlFor="mc-goal">
        <textarea
          id="mc-goal"
          name="goal"
          rows={4}
          required
          placeholder="The one or two outcomes that would make this month a win…"
          className={`${inputCls} resize-y`}
        />
      </Field>

      <SubmitButton
        sending={sending}
        idleLabel={`Proceed to Payment - ${MONTHLY_CONSULTING.price}/mo`}
        sendingLabel="Saving your details…"
        className="w-full justify-center"
      />
      <p className="text-center text-xs text-foreground-muted">
        {MONTHLY_CONSULTING.price} per month · weekday sessions · cancel anytime
      </p>
    </form>
  );
}
