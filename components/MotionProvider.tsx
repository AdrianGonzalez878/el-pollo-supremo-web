"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Wraps the app with LazyMotion so Framer Motion animation features are
 * loaded asynchronously. Benefits:
 * - Smaller initial JS bundle (~30 → ~18 kb gzipped)
 * - Content is visible on first paint even before features load (fixes the
 *   Safari "blank page until JS runs" issue caused by initial={{ opacity: 0 }})
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
