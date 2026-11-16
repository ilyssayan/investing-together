"use client";

import { motion } from "motion/react";

import { EASE_OUT } from "@/lib/format";

type Segment = string | { text: string; italic?: boolean };

// Headline that rises into view word by word from behind a mask.
// Screen readers get the plain sentence through aria-label.
export function RevealText({
  segments,
  as: Tag = "h1",
  className,
  delay = 0,
  inView = false,
}: {
  segments: Segment[];
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  inView?: boolean; // wait until scrolled into view instead of on page load
}) {
  const words = segments.flatMap((segment) => {
    const { text, italic = false } =
      typeof segment === "string" ? { text: segment } : segment;
    return text.split(" ").map((word) => ({ word, italic }));
  });
  const label = words.map((w) => w.word).join(" ");

  return (
    <Tag className={className} aria-label={label}>
      <motion.span
        aria-hidden
        initial="hidden"
        {...(inView
          ? { whileInView: "show", viewport: { once: true, margin: "-10%" } }
          : { animate: "show" })}
        transition={{ staggerChildren: 0.055, delayChildren: delay }}
      >
        {words.map(({ word, italic }, i) => (
          <span key={i}>
            {/* Padding keeps descenders and italics from being clipped. */}
            <span className="-mx-[0.06em] -mb-[0.14em] inline-block overflow-hidden px-[0.06em] pb-[0.14em] align-bottom">
              <motion.span
                className={italic ? "hl inline-block" : "inline-block"}
                variants={{
                  hidden: { y: "115%" },
                  show: { y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
