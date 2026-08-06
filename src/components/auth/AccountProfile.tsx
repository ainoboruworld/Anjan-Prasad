"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { upsertProfile } from "@/lib/auth/service";
import { friendlyAuthError } from "@/lib/auth/errors";
import { USER_ROLES, type UserRole } from "@/lib/supabase/types";

/** My Profile - view and edit the signed-in user's name and role. */
export function AccountProfile() {
  const { user, profile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [role, setRole] = useState<UserRole | "">(profile?.role ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // Re-seed the form when the profile identity resolves/changes (e.g. after
  // the session restores). Adjusting state during render - not in an effect -
  // is the recommended pattern for syncing to a prop.
  const [syncedId, setSyncedId] = useState<string | undefined>(profile?.id);
  if (profile?.id !== syncedId) {
    setSyncedId(profile?.id);
    setFullName(profile?.full_name ?? "");
    setRole(profile?.role ?? "");
  }

  const dirty = fullName.trim() !== (profile?.full_name ?? "") || role !== (profile?.role ?? "");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    if (!user) return;
    if (fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!role) {
      setError("Please select a role.");
      return;
    }
    setBusy(true);
    const { error: err } = await upsertProfile({
      id: user.id,
      email: user.email ?? profile?.email ?? "",
      full_name: fullName,
      role,
    });
    setBusy(false);
    if (err) {
      setError(friendlyAuthError({ message: err }));
      return;
    }
    await refreshProfile();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={save} className="space-y-8">
      {/* Email - read-only (auth data) */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Email
        </label>
        <div className="input flex items-center justify-between !bg-background-sunken text-foreground-muted">
          <span className="truncate">{user?.email ?? "-"}</span>
          <span className="ml-3 shrink-0 rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
            Verified
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="acc-name"
          className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted"
        >
          Full name
        </label>
        <input
          id="acc-name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (error) setError("");
          }}
          autoComplete="name"
          className="input"
        />
      </div>

      <fieldset>
        <legend className="mb-3 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Role
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {USER_ROLES.map((r) => {
            const on = role === r;
            return (
              <label
                key={r}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-medium transition-all ${
                  on
                    ? "border-brand-sky bg-brand/5 text-foreground"
                    : "border-border-strong text-foreground-muted hover:text-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="acc-role"
                  value={r}
                  checked={on}
                  onChange={() => {
                    setRole(r);
                    if (error) setError("");
                  }}
                  className="h-4 w-4 accent-[var(--brand-sky)]"
                />
                {r}
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={busy || !dirty}
          className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.55)] transition-all hover:bg-brand-hover disabled:opacity-50"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              Saving…
            </>
          ) : (
            "Save changes"
          )}
        </button>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand"
          >
            <Check className="h-4 w-4" strokeWidth={2.5} />
            Saved
          </motion.span>
        )}
      </div>
    </form>
  );
}
