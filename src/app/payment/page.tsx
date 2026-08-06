import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Secure checkout for Anjan Prasad programs. UPI and card payments are being integrated.",
  robots: { index: false },
};

/**
 * Payment placeholder. Real UPI / gateway checkout lands later; this page
 * confirms the order the visitor arrived with and reassures them the lead
 * is already captured. `searchParams` carries plan, amount, and name.
 */
export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; amount?: string; name?: string }>;
}) {
  const { plan = "Program", amount = "", name = "" } = await searchParams;

  return (
    <main>
      <PageHero
        eyebrow="Checkout"
        title={
          <>
            Almost there{name ? `, ${name.split(" ")[0]}` : ""}
            <span className="editorial-accent text-brand">.</span>
          </>
        }
        lead="Your details are saved. Complete payment to confirm your place - online payments are being integrated and will appear here."
      />

      <section className="pb-28">
        <div className="mx-auto max-w-lg px-6">
          <div className="card p-8 sm:p-10">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
              Order summary
            </h2>
            <div className="mt-6 flex items-baseline justify-between border-b border-border pb-6">
              <span className="font-display text-lg font-semibold text-foreground">
                {plan}
              </span>
              {amount && (
                <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {amount}
                </span>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-background-sunken p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-brand-sky" strokeWidth={1.75} />
                Payment integration in progress
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                UPI and card checkout are being connected. Your registration is
                already recorded - the team will reach out with a secure payment
                link and joining details by email shortly.
              </p>
            </div>

            <button
              type="button"
              disabled
              aria-disabled="true"
              className="mt-6 w-full cursor-not-allowed rounded-full bg-brand py-4 text-[15px] font-semibold text-brand-ink opacity-60"
            >
              Pay {amount || "now"} · UPI (coming soon)
            </button>

            <Link
              href="/"
              className="mt-5 flex items-center justify-center gap-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
