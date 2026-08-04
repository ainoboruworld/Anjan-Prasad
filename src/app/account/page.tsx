import type { Metadata } from "next";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AccountProfile } from "@/components/auth/AccountProfile";
import { PageHero } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your AP.com profile.",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <main>
      <ProtectedRoute>
        <PageHero
          eyebrow="My Profile"
          title={
            <>
              Your{" "}
              <span className="editorial-accent text-brand">account.</span>
            </>
          }
          lead="Keep your details up to date. Your email is verified through sign-in and can't be changed here."
        />
        <section className="pb-28">
          <div className="mx-auto max-w-xl px-6">
            <Reveal className="rounded-3xl border border-border bg-background-elevated p-8 shadow-[var(--shadow-soft)] sm:p-10">
              <AccountProfile />
            </Reveal>
          </div>
        </section>
      </ProtectedRoute>
    </main>
  );
}
