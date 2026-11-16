"use client";

import { motion } from "motion/react";

// Runs on every navigation: the new page fades in while its title animates.
// Opacity only, so the pinned scroll section's fixed positioning is unaffected.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
