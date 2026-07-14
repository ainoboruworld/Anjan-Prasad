"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/Primitives";
import { riseIn } from "./motion";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Client testimonials"
          title="The operators who lived the results."
          lead="Leaders who watched their businesses become systemised, profitable, and calm."
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.name} as="li" variants={riseIn}>
              <motion.figure
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col rounded-[1.5rem] border border-border bg-background-elevated/50 p-8 transition-colors hover:border-border-strong hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)] sm:p-10"
              >
                <Quote
                  className="h-9 w-9 text-brand/70"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <blockquote className="mt-6 flex-1 text-[19px] leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {t.title}
                  </p>
                </figcaption>
              </motion.figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
