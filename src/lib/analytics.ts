/**
 * Analytics - a thin PostHog wrapper.
 *
 * Important user actions across the service pages are instrumented through
 * `track`. It is intentionally dependency-free: if the PostHog snippet has
 * been loaded (window.posthog) events are captured; otherwise it degrades to
 * a debug log in development and a no-op in production. Wiring the real
 * PostHog project key later requires no changes to any call site.
 */

type Props = Record<string, unknown>;

interface PostHogLike {
  capture: (event: string, props?: Props) => void;
}

function client(): PostHogLike | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { posthog?: PostHogLike }).posthog;
}

export function track(event: string, props?: Props): void {
  const ph = client();
  if (ph?.capture) {
    ph.capture(event, props);
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    // Keeps QA able to verify events fire before PostHog is connected.
    console.debug("[analytics]", event, props ?? {});
  }
}

/** Canonical event names - one place so names stay consistent. */
export const EVENTS = {
  pricingViewed: "pricing_viewed",
  tierSelected: "tier_selected",
  bookingStarted: "booking_started",
  bookingSubmitted: "booking_submitted",
  verificationUploaded: "verification_uploaded",
  ctaClicked: "cta_clicked",
} as const;
