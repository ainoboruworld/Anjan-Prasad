/**
 * Shared premium service-page component library.
 *
 * These components are content-driven and reused across both the
 * Consultation and Business Advisory pages, so the two stay visually
 * consistent while carrying different copy, pricing, and forms.
 */
export { HeroSection, type HeroCTA, type HeroHighlight } from "./HeroSection";
export { TrustMetrics, type TrustMetric } from "./TrustMetrics";
export { WhoWhatHow, type WWHColumn } from "./WhoWhatHow";
export { PricingCards } from "./PricingCards";
export {
  DynamicBookingForm,
  type BookingVariant,
  type FieldConfig,
  type FieldType,
  type TierResolver,
} from "./DynamicBookingForm";
export { OrderSummary } from "./OrderSummary";
export { LogoWall } from "./LogoWall";
export { Testimonials, type TestimonialItem } from "./Testimonials";
export { Timeline, type TimelineStep } from "./Timeline";
export { FAQ } from "./FAQ";
export { PrivacySection } from "./PrivacySection";
export { FinalCTA } from "./FinalCTA";
