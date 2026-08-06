/**
 * Database types for the Supabase schema (see supabase/migrations/0001_init.sql).
 *
 * Hand-authored to match the migration so the app is fully typed before the
 * Supabase CLI is wired up. Once the CLI is available you can regenerate with:
 *   supabase gen types typescript --project-id <ref> > src/lib/supabase/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          role:
            | "Student"
            | "Working Professional"
            | "Founder"
            | "Business Owner"
            | null;
          marketing_consent: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string;
          email: string;
          phone?: string | null;
          role?:
            | "Student"
            | "Working Professional"
            | "Founder"
            | "Business Owner"
            | null;
          marketing_consent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      newsletter_subscriptions: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          source?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["newsletter_subscriptions"]["Insert"]
        >;
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          company_name: string | null;
          reason: string;
          message: string;
          source_page: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          full_name: string;
          email: string;
          phone?: string | null;
          company_name?: string | null;
          reason: string;
          message: string;
          source_page?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["contact_submissions"]["Insert"]
        >;
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          user_id: string | null;
          service_type: string;
          program_type: string | null;
          tier_id: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          company: string | null;
          amount: number | null;
          currency: string;
          status:
            | "new"
            | "pending_payment"
            | "paid"
            | "verifying"
            | "confirmed"
            | "cancelled";
          order_id: string | null;
          payment_ref: string | null;
          payload: Json;
          source_page: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          service_type: string;
          program_type?: string | null;
          tier_id?: string | null;
          full_name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          amount?: number | null;
          currency?: string;
          status?: Database["public"]["Tables"]["bookings"]["Row"]["status"];
          order_id?: string | null;
          payment_ref?: string | null;
          payload?: Json;
          source_page?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
