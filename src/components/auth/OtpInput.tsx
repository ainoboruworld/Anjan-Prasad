"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";

/**
 * Segmented one-time-code input. Reusable: auto-advances, supports paste,
 * backspace, and arrow keys, and reports the joined value up. `length`
 * defaults to 6 (Supabase email OTP).
 */
export function OtpInput({
  value,
  onChange,
  onComplete,
  length = 6,
  disabled = false,
  autoFocus = true,
}: {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? "");

  const set = (next: string) => {
    onChange(next);
    if (next.length === length && !next.includes(" ")) onComplete?.(next);
  };

  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const arr = chars.slice();
    arr[i] = digit;
    const next = arr.join("").slice(0, length);
    set(next);
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const arr = chars.slice();
      if (arr[i]) {
        arr[i] = "";
        set(arr.join(""));
      } else if (i > 0) {
        refs.current[i - 1]?.focus();
        arr[i - 1] = "";
        set(arr.join(""));
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    set(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    refs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-between gap-2 sm:gap-3" role="group" aria-label="One-time passcode">
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={c}
          disabled={disabled}
          autoFocus={autoFocus && i === 0}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="h-14 w-full min-w-0 rounded-2xl border border-border-strong bg-background text-center font-display text-2xl font-semibold text-foreground transition-all focus:border-brand focus:shadow-[0_0_0_3px_rgba(79,169,255,0.22)] focus:outline-none disabled:opacity-60"
        />
      ))}
    </div>
  );
}
