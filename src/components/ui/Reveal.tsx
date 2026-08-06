"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { inViewOnce, riseIn, staggerContainer } from "../motion";

/** Single scroll-reveal wrapper. */
export function Reveal({
  children,
  className = "",
  variants = riseIn,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "section" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered group - children should use `RevealItem`. */
export function RevealGroup({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className = "",
  variants = riseIn,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag variants={variants} className={className}>
      {children}
    </MotionTag>
  );
}
