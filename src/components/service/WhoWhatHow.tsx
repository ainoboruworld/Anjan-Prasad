import type { ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Eyebrow } from "../ui/Primitives";

export interface WWHColumn {
  key: string;
  kicker: string;
  title: string;
  copy: string;
  items: string[];
}

/**
 * Who • What • How - a three-column framing block. Same layout on both
 * pages; content differs. Reads as an editorial triptych, not a feature list.
 */
export function WhoWhatHow({
  eyebrow = "Who • What • How",
  title,
  columns,
}: {
  eyebrow?: string;
  title: ReactNode;
  columns: WWHColumn[];
}) {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            {title}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {columns.map((col, i) => (
            <RevealItem
              key={col.key}
              className="card card-hover flex h-full flex-col p-8"
            >
              <span className="font-display text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                {col.kicker}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
                {col.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
                {col.copy}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                {col.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-3 text-sm leading-relaxed text-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-sky"
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
