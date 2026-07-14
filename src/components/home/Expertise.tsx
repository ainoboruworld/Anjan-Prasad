"use client";

import { motion } from "framer-motion";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { SectionHeading } from "../ui/Primitives";
import { riseIn } from "../motion";
import { EXPERTISE } from "@/lib/data";

export function Expertise() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Business expertise"
          title="Where founders bring him in."
          lead="Eight disciplines, one objective — a business that is profitable, scalable, and built to run without you."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTISE.map((e, i) => (
            <RevealItem key={e.title} variants={riseIn}>
              <motion.div
                whileHover={{ backgroundColor: "var(--background-elevated)" }}
                className="group relative flex h-full flex-col bg-background p-8"
              >
                <span className="font-display text-sm font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-foreground">
                  {e.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {e.description}
                </p>
                <span
                  aria-hidden
                  className="mt-6 h-px w-8 bg-brand transition-all duration-300 group-hover:w-16"
                />
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
