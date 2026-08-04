import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

/**
 * Reusable, RHF-aware form fields. Presentational only — they take a
 * `registration` from `register(name)` and an optional `error` string. No
 * validation or business logic lives here (that's Zod + the services).
 */

function FieldShell({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted"
      >
        {label}
        {optional && <span className="ml-1 normal-case tracking-normal">(optional)</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

type BaseProps = {
  label: string;
  id: string;
  error?: string;
  optional?: boolean;
  registration: UseFormRegisterReturn;
};

export function TextField({
  label,
  id,
  error,
  optional,
  registration,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell label={label} htmlFor={id} optional={optional} error={error}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        className="input"
        {...registration}
        {...props}
      />
    </FieldShell>
  );
}

export function TextareaField({
  label,
  id,
  error,
  optional,
  registration,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell label={label} htmlFor={id} optional={optional} error={error}>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        className="input resize-y"
        {...registration}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  id,
  error,
  optional,
  registration,
  children,
  ...props
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell label={label} htmlFor={id} optional={optional} error={error}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        className="input"
        {...registration}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
