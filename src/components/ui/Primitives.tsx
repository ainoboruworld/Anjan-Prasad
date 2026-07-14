import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

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
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

/** Centered section heading with optional eyebrow and lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
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

/** Primary yellow call-to-action button. */
export function CTAButton({ href, children, external, className = "" }: CTAProps) {
  const cls = `group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-[#0a0a0a] shadow-[0_10px_30px_-10px_rgba(238,192,75,0.6)] transition-all duration-300 hover:scale-[1.03] hover:bg-brand-hover hover:shadow-[0_16px_40px_-12px_rgba(238,192,75,0.7)] ${className}`;
  const inner = (
    <>
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2}
      />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Secondary / ghost button. */
export function GhostButton({ href, children, external, className = "" }: CTAProps) {
  const cls = `inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-[15px] font-medium text-foreground transition-colors duration-300 hover:bg-background-elevated ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Consistent inner page header block. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-grid relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(238,192,75,0.12),transparent_65%)] blur-3xl"
      />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-[length:var(--text-hero)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            {title}
          </h1>
          {lead && (
            <p className="mx-auto mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
              {lead}
            </p>
          )}
          {children && <div className="mt-10">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
