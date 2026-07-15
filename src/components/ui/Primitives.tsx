import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";

/** Small uppercase eyebrow label with a brand tick. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand" />
      {children}
    </span>
  );
}

/** Section heading with optional eyebrow and lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"
      }
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      {lead && (
        <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

type CTAProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

/** Primary gold call-to-action — magnetic on fine pointers. */
export function CTAButton({ href, children, external, className = "" }: CTAProps) {
  const cls = `group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(217,167,46,0.55)] transition-all duration-300 hover:bg-brand-hover hover:shadow-[0_16px_40px_-12px_rgba(217,167,46,0.65)] ${className}`;
  const inner = (
    <>
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2}
      />
    </>
  );
  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

/** Secondary / ghost button. */
export function GhostButton({ href, children, external, className = "" }: CTAProps) {
  const cls = `inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-[15px] font-medium text-foreground transition-colors duration-300 hover:bg-background-elevated ${className}`;
  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </Magnetic>
  );
}

/** Understated inline text link with arrow. */
export function TextLink({ href, children, className = "" }: CTAProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand ${className}`}
    >
      {children}
      <ArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2}
      />
    </Link>
  );
}

/** Consistent inner-page opening block on the drafting grid. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="bg-grid relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,167,46,0.1),transparent_65%)] blur-3xl"
      />
      <div
        className={`mx-auto max-w-6xl px-6 ${align === "center" ? "text-center" : ""}`}
      >
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            className={`mt-6 max-w-4xl font-display text-[length:var(--text-hero)] font-semibold leading-[1.04] tracking-[-0.03em] text-foreground ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {title}
          </h1>
          {lead && (
            <p
              className={`mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted ${
                align === "center" ? "mx-auto" : ""
              }`}
            >
              {lead}
            </p>
          )}
          {children && <div className="mt-10">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/** Section separator: hairline with a centred gold tick. */
export function RuleTick({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-7xl px-6 ${className}`} aria-hidden>
      <div className="rule-tick" />
    </div>
  );
}
