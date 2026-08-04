/**
 * Shared contracts for the service layer.
 *
 * Every service function returns a `ServiceResponse<T>` so UI and query hooks
 * handle success/error uniformly. Business logic and API calls live here —
 * never inside components.
 */

export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
}

export function ok<T>(data: T): ServiceResponse<T> {
  return { data, error: null };
}

export function fail<T = never>(error: string): ServiceResponse<T> {
  return { data: null, error };
}
