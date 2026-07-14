"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { inViewOnce, riseIn, staggerContainer } from "./motion";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Anjan rebuilt our operating model in a quarter. For the first time the business runs on systems, not on me being available at 11pm.",
    name: "Rhea Malhotra",
    title: "Founder & CEO, Meridian Foods",
  },
  {
    quote:
      "He is the rare advisor who is equally comfortable in the boardroom and in the weeds of a process map. Our margins moved because of it.",
    name: "Daniel Okafor",
    title: "Managing Director, Northwind Logistics",
  },
  {
    quote:
      "We went from firefighting to forecasting. The clarity Anjan brought to our operations made the next funding round almost straightforward.",
    name: "Ananya Verma",
    title: "Co-founder, Aperture Health",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={riseIn}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            Trusted by operators who scale
          </h2>
          <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
            The work speaks through the leaders who lived it.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.li
              key={t.name}
              variants={riseIn}
              className="group flex flex-col rounded-[1.5rem] border border-border bg-background-elevated/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)]"
            >
              <Quote
                className="h-9 w-9 text-brand/70"
                strokeWidth={1.5}
                aria-hidden
              />
              <blockquote className="mt-6 flex-1 text-[17px] leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <footer className="mt-8 border-t border-border pt-5">
                <p className="text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">{t.title}</p>
              </footer>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
