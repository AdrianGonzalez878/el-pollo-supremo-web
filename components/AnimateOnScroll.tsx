"use client";

import { m, useReducedMotion } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  amount?: number;
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 0.15,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  // When the user prefers reduced motion (iOS "Reduce Motion", Windows, etc.)
  // skip the animation entirely — render content immediately and fully visible.
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offsets = {
    up:    { y: 28, x: 0 },
    down:  { y: -28, x: 0 },
    left:  { y: 0, x: -28 },
    right: { y: 0, x: 28 },
    none:  { y: 0, x: 0 },
  };

  const { x, y } = offsets[direction];

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </m.div>
  );
}
