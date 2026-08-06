/**
 * Service layer barrel - the frontend's API surface.
 *
 * Components and query hooks import services from here. Each service owns the
 * business logic and the (eventual) network calls for one backend concern, so
 * connecting Supabase / Sanity / Cashfree / Resend / PostHog means editing
 * these modules only - never the UI.
 */
export * as authService from "./auth/authService";
export * as consultationService from "./consultation/consultationService";
export * as advisoryService from "./business-advisory/advisoryService";
export * as newsletterService from "./newsletter/newsletterService";
export * as blogService from "./blogs/blogService";
export * as mediaService from "./media/mediaService";
export * as profileService from "./profile/profileService";
export * as paymentsService from "./payments/paymentsService";

export type { ServiceResponse } from "./types";
