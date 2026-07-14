"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { SectionHeading } from "../ui/Primitives";
import { riseIn } from "../motion";
import { COMPANIES } from "@/lib/data";

function CompanyMonogram({ name }: { name: string }) {
  const letter = name.charAt(0).toUpperCase();
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background-elevated">
      <span className="font-display text-xl font-bold text-foreground">
        {letter}
      </span>
    </div>
  );
}

export function CompaniesBuilt() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(238,192,75,0.08),transparent_65%)] blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Companies built"
          title="Businesses he founded — and scaled to profit."
          lead="Not case studies from the outside. Companies built, operated, and grown from the inside."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {COMPANIES.map((c) => (
            <RevealItem key={c.name} variants={riseIn}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group flex h-full flex-col rounded-[1.5rem] border border-border bg-background-elevated/40 p-8 transition-colors hover:border-border-strong"
              >
                <div className="flex items-center justify-between">
                  <CompanyMonogram name={c.name} />
                  <ArrowUpRight
                    className="h-5 w-5 text-muted transition-colors group-hover:text-brand"
                    strokeWidth={1.75}
                  />
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand">{c.role}</p>

                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground-muted">
                  {c.description}
                </p>

                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    Business impact
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {c.impact}
                  </p>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
