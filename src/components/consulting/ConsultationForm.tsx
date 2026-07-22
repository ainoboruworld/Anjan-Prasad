"use client";

import { useState } from "react";
import { submitForm } from "@/lib/forms";
import { Field, SubmitButton, SuccessCard, inputCls } from "../ui/Form";
import { CONSULTING_SESSION } from "@/lib/data";

/** 1-to-1 Consultation booking form — posts through the shared forms layer. */
export function ConsultationForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <SuccessCard
        title="Request received."
        copy="You'll get a human reply within one working day with available slots and a short context questionnaire."
      />
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const f = new FormData(e.currentTarget);
    const v = (k: string) => (f.get(k) as string) ?? "";
    await submitForm({
      formType: "1-to-1 Consultation",
      name: v("fullName"),
      email: v("email"),
      phone: v("phone"),
      company: v("companyName"),
      data: {
        Topic: v("topic"),
        "The decision on the table": v("decision"),
      },
    });
    setSending(false);
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="con-name">
          <input id="con-name" name="fullName" required placeholder="Your name" className={inputCls} />
        </Field>
        <Field label="Email" htmlFor="con-email">
          <input id="con-email" name="email" type="email" required placeholder="you@company.com" className={inputCls} />
        </Field>
        <Field label="Phone Number" htmlFor="con-phone">
          <input id="con-phone" name="phone" type="tel" required placeholder="+91" className={inputCls} />
        </Field>
        <Field label="Company" htmlFor="con-company" optional>
          <input id="con-company" name="companyName" placeholder="Company" className={inputCls} />
        </Field>
      </div>

      <Field label="Topic" htmlFor="con-topic">
        <select id="con-topic" name="topic" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            What is the session about?
          </option>
          {CONSULTING_SESSION.topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
          <option>Something else</option>
        </select>
      </Field>

      <Field label="The decision on the table" htmlFor="con-decision">
        <textarea
          id="con-decision"
          name="decision"
          rows={5}
          required
          placeholder="A few lines on the question you want to work through — the more specific, the more the hour delivers…"
          className={`${inputCls} resize-y`}
        />
      </Field>

      <SubmitButton sending={sending} idleLabel="Request a session" />
    </form>
  );
}
