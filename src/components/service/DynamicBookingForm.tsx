"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { submitForm, paymentUrl, type FormType } from "@/lib/forms";
import {
  getTier,
  formatTierPrice,
  type ServiceType,
  type PriceTier,
} from "@/lib/pricingConfig";
import { Field, SubmitButton, SuccessCard, inputCls } from "../ui/Form";
import { OrderSummary } from "./OrderSummary";
import { track, EVENTS } from "@/lib/analytics";

/* ─────────────────────────── Config contracts ─────────────────────────── */

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "date"
  | "time"
  | "file";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  options?: string[];
  /** Full-width field inside the two-column grid. */
  full?: boolean;
  accept?: string;
  help?: string;
}

/** How a variant resolves to a pricing tier (never a hardcoded amount). */
export type TierResolver =
  | { fixed: string }
  | { fromField: string; map: Record<string, string> };

export interface BookingVariant {
  id: string;
  /** Tab label. */
  label: string;
  blurb?: string;
  formType: FormType;
  fields: FieldConfig[];
  tier: TierResolver;
  /** "payment" routes to checkout; "verification" is the BPL/free flow. */
  mode: "payment" | "verification";
  submitLabel?: string;
}

/* Identity fields are mapped to dedicated payload columns. */
const IDENTITY = new Set(["fullName", "email", "phone", "company"]);

/* ──────────────────────────────── Form ────────────────────────────────── */

/**
 * DynamicBookingForm — one reusable, config-driven booking surface used by
 * both service pages. It renders variant tabs (audience / program), the
 * active variant's fields, a live OrderSummary, and handles two submit
 * modes:
 *
 *   • payment      → submitForm, then route to checkout with the tier.
 *   • verification → submitForm with the uploaded document (BPL / free).
 *
 * The frontend sends only { serviceType, tierId, formType, ...formData }.
 * The backend re-validates the price and creates the Cashfree order — this
 * component never trusts or transmits an authoritative amount.
 */
export function DynamicBookingForm({
  serviceType,
  serviceName,
  variants,
  defaultVariantId,
}: {
  serviceType: ServiceType;
  serviceName: string;
  variants: BookingVariant[];
  defaultVariantId?: string;
}) {
  const router = useRouter();
  const [activeId, setActiveId] = useState(
    defaultVariantId ?? variants[0].id
  );
  const [values, setValues] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const variant = variants.find((v) => v.id === activeId) ?? variants[0];

  const tier: PriceTier | undefined = useMemo(() => {
    const id =
      "fixed" in variant.tier
        ? variant.tier.fixed
        : variant.tier.map[values[variant.tier.fromField] ?? ""];
    return id ? getTier(serviceType, id) : undefined;
  }, [variant, values, serviceType]);

  const switchVariant = (id: string) => {
    setActiveId(id);
    setValues({});
    setFileName("");
    setError("");
    const v = variants.find((x) => x.id === id);
    track(EVENTS.bookingStarted, { serviceType, variant: id, formType: v?.formType });
  };

  const setValue = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (variant.mode === "verification" && !fileName) {
      setError("Please attach your BPL verification document to continue.");
      return;
    }
    if (!tier) {
      setError("Please complete the selection above so we can price your booking.");
      return;
    }

    setSending(true);
    const f = new FormData(e.currentTarget);
    const v = (k: string) => (f.get(k) as string) ?? "";

    // Everything that isn't an identity or file field becomes labelled data.
    const data: Record<string, string> = {};
    for (const field of variant.fields) {
      if (IDENTITY.has(field.name) || field.type === "file") continue;
      const val = v(field.name);
      if (val) data[field.label] = val;
    }
    if (fileName) data["Verification Document"] = fileName;
    data["Tier"] = tier.label;

    await submitForm({
      formType: variant.formType,
      name: v("fullName"),
      email: v("email"),
      phone: v("phone"),
      company: v("company"),
      // Stable machine keys the backend validates against.
      data: {
        service_type: serviceType,
        program_type: variant.id,
        tier_id: tier.id,
        ...data,
      },
    });

    track(EVENTS.bookingSubmitted, {
      serviceType,
      variant: variant.id,
      tierId: tier.id,
      mode: variant.mode,
    });

    if (variant.mode === "verification") {
      track(EVENTS.verificationUploaded, { serviceType, tierId: tier.id });
      setSending(false);
      setVerified(true);
      return;
    }

    router.push(
      paymentUrl({
        plan: `${serviceName} — ${tier.label}`,
        amount: formatTierPrice(tier),
        name: v("fullName"),
      })
    );
  };

  if (verified) {
    return (
      <SuccessCard
        title="Application received."
        copy="Your BPL verification documents are with our team. Once verified, we'll email your confirmation and meeting details — at no cost."
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
      <div>
        {/* Variant tabs */}
        {variants.length > 1 && (
          <div
            role="tablist"
            aria-label="Booking type"
            className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-border bg-background-sunken p-1.5"
          >
            {variants.map((vrt) => {
              const active = vrt.id === activeId;
              return (
                <button
                  key={vrt.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => switchVariant(vrt.id)}
                  className={`relative flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "text-brand-ink"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="booking-tab"
                      className="absolute inset-0 -z-10 rounded-xl bg-brand"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {vrt.label}
                </button>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.form
            key={variant.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
            className="space-y-6"
          >
            {variant.blurb && (
              <p className="text-sm leading-relaxed text-foreground-muted">
                {variant.blurb}
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              {variant.fields.map((field) => (
                <FieldRenderer
                  key={field.name}
                  variantId={variant.id}
                  field={field}
                  value={values[field.name] ?? ""}
                  onChange={(val) => setValue(field.name, val)}
                  onFile={(name) => setFileName(name)}
                />
              ))}
            </div>

            {error && (
              <p role="alert" className="text-sm font-medium text-red-500">
                {error}
              </p>
            )}

            <div className="lg:hidden">
              <OrderSummary serviceName={serviceName} tier={tier} compact />
            </div>

            <SubmitButton
              sending={sending}
              idleLabel={
                variant.submitLabel ??
                (variant.mode === "verification"
                  ? "Submit for verification"
                  : tier
                    ? `Proceed to payment — ${formatTierPrice(tier)}`
                    : "Proceed to payment")
              }
              sendingLabel="Saving your details…"
              className="w-full justify-center"
            />
            <p className="text-center text-xs text-foreground-muted">
              {variant.mode === "verification"
                ? "BPL candidates are served free of cost after document verification."
                : "Secure checkout · UPI & cards (Cashfree). Meeting link emailed after payment."}
            </p>
          </motion.form>
        </AnimatePresence>
      </div>

      {/* Sticky live summary on large screens */}
      <div className="hidden lg:block lg:sticky lg:top-28">
        <OrderSummary serviceName={serviceName} tier={tier} />
      </div>
    </div>
  );
}

/* ───────────────────────────── Field renderer ─────────────────────────── */

function FieldRenderer({
  variantId,
  field,
  value,
  onChange,
  onFile,
}: {
  variantId: string;
  field: FieldConfig;
  value: string;
  onChange: (v: string) => void;
  onFile: (name: string) => void;
}) {
  const id = `${variantId}-${field.name}`;
  const wrapCls = field.full || field.type === "textarea" ? "sm:col-span-2" : "";

  return (
    <div className={wrapCls}>
      <Field label={field.label} htmlFor={id} optional={field.optional}>
        {field.type === "textarea" ? (
          <textarea
            id={id}
            name={field.name}
            rows={4}
            required={field.required}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} resize-y`}
          />
        ) : field.type === "select" ? (
          <select
            id={id}
            name={field.name}
            required={field.required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
          >
            <option value="" disabled>
              {field.placeholder ?? "Select…"}
            </option>
            {field.options?.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : field.type === "file" ? (
          <label
            htmlFor={id}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border-strong bg-background px-5 py-4 text-sm text-foreground-muted transition-colors hover:border-brand-sky"
          >
            <UploadCloud className="h-5 w-5 shrink-0 text-brand-sky" strokeWidth={1.75} />
            <span className="truncate">
              {value || "Upload BPL / income certificate (PDF, JPG, PNG)"}
            </span>
            <input
              id={id}
              name={field.name}
              type="file"
              accept={field.accept ?? ".pdf,.jpg,.jpeg,.png"}
              required={field.required}
              className="sr-only"
              onChange={(e) => {
                const name = e.target.files?.[0]?.name ?? "";
                onChange(name);
                onFile(name);
              }}
            />
          </label>
        ) : (
          <input
            id={id}
            name={field.name}
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
          />
        )}
        {field.help && (
          <p className="mt-1.5 text-xs text-foreground-muted">{field.help}</p>
        )}
      </Field>
    </div>
  );
}
