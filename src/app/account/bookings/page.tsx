import type { Metadata } from "next";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AccountBookings } from "@/components/auth/AccountBookings";
import { PageHero } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "My Bookings",
  description: "Your Anjan Prasad consultations and program bookings.",
  robots: { index: false },
};

export default function BookingsPage() {
  return (
    <main>
      <ProtectedRoute>
        <PageHero
          eyebrow="My Bookings"
          title={
            <>
              Your{" "}
              <span className="editorial-accent text-brand">bookings.</span>
            </>
          }
          lead="Consultations and programs you've booked, newest first."
        />
        <section className="pb-28">
          <div className="mx-auto max-w-2xl px-6">
            <Reveal>
              <AccountBookings />
            </Reveal>
          </div>
        </section>
      </ProtectedRoute>
    </main>
  );
}
