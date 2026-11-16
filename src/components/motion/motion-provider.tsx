"use client";

import { MotionConfig } from "motion/react";

// reducedMotion="user" turns off transform and layout animations for people
// who ask their device for reduced motion. Opacity changes still run.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
