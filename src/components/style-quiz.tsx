"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { EASE_OUT } from "@/lib/format";

// Each option scores 0 (careful), 1 (balanced) or 2 (bold), in that order.
const questions = [
  {
    question: "Your investment drops in value for a month. What do you do?",
    options: [
      "Take my money out so I don't lose more",
      "Wait and see what happens",
      "Leave it, or even add a little more",
    ],
  },
  {
    question: "When do you think you would need this money?",
    options: ["Within 2 years", "In 3 to 10 years", "More than 10 years from now"],
  },
  {
    question: "Which sounds most like you?",
    options: [
      "I'd rather grow slowly and steadily",
      "I'm okay with some ups and downs",
      "I'm fine with big swings for a chance at more growth",
    ],
  },
  {
    question: "How do you feel about trying new things with money?",
    options: [
      "Nervous. I want to understand everything first",
      "Curious, as long as I start small",
      "Excited. I learn by doing",
    ],
  },
];

const styles = [
  {
    name: "Careful",
    description:
      "You like stability. Investors with this style often lean toward steadier choices, like bonds and broad funds.",
  },
  {
    name: "Balanced",
    description:
      "You're comfortable with some ups and downs. Investors with this style often mix stocks and bonds.",
  },
  {
    name: "Bold",
    description:
      "You're comfortable with bigger swings for long-term growth. Investors with this style often hold more stocks.",
  },
];

// Each screen slides in from the right and leaves to the left.
const screen = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
  transition: { duration: 0.45, ease: EASE_OUT },
};

export function StyleQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const done = step === questions.length;
  const current = questions[step];

  const average = answers.reduce((a, b) => a + b, 0) / (answers.length || 1);
  const style = styles[Math.round(average)];

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      {/* Progress bar */}
      <div
        className="h-0.5 bg-border"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={step}
      >
        <motion.div
          className="h-full origin-left bg-primary"
          initial={false}
          animate={{ scaleX: step / questions.length }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!done ? (
          <motion.div key={step} className="flex flex-col gap-5" {...screen}>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Question {step + 1} of {questions.length}
            </p>
            <p className="font-display text-3xl leading-snug font-semibold sm:text-4xl">
              {current.question}
            </p>
            <div className="flex flex-col gap-2">
              {current.options.map((option, score) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => setAnswers([...answers, score])}
                  whileTap={{ scale: 0.985 }}
                  className="rounded-xl border px-5 py-4 text-left transition-colors duration-200 hover:border-primary hover:bg-muted"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" className="flex flex-col gap-4" {...screen}>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Your investing style
            </p>
            <p className="font-display text-6xl font-semibold italic sm:text-7xl">
              {style.name}
            </p>
            <p className="max-w-xl text-lg text-muted-foreground">
              {style.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/learn" className={buttonVariants()}>
                Start learning
              </Link>
              <Button variant="outline" onClick={() => setAnswers([])}>
                Retake the quiz
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
