"use client";

import { Check, Lightbulb, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { levelFor, levels, type Question } from "@/lib/course";
import { EASE_OUT } from "@/lib/format";
import { recordScore } from "@/lib/progress";

const screen = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.35, ease: EASE_OUT },
};

// Practice the way Khan Academy does it: one question at a time, a hint if
// you want one, and an explanation straight after you answer.
export function Practice({
  slug,
  questions,
}: {
  slug?: string; // when given, the best score is saved as lesson progress
  questions: Question[];
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState(false);
  const [score, setScore] = useState(0);

  const done = index === questions.length;
  const single = questions.length === 1;
  const q = questions[index];

  const check = () => {
    if (picked === null) return;
    setChecked(true);
    if (picked === q.answer) setScore(score + 1);
  };

  const next = () => {
    const finished = index + 1 === questions.length;
    if (finished && slug) recordScore(slug, score);
    setIndex(index + 1);
    setPicked(null);
    setChecked(false);
    setHint(false);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl border bg-card p-6 sm:p-8">
      {/* One bar per question (hidden when there is only one). */}
      <div className={single ? "hidden" : "flex items-center gap-2"} aria-hidden>
        {questions.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
              i < index || (i === index && checked) ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="done" className="flex flex-col gap-3" {...screen}>
            <p className="eyebrow">Practice complete</p>
            <p className="font-display text-4xl font-semibold">
              {score} of {questions.length} correct
            </p>
            {questions.length > 1 && (
              <p className="text-lg text-muted-foreground">
                Level:{" "}
                <span className="font-medium text-foreground">
                  {levels[levelFor(score, questions.length)]}
                </span>
                {score < questions.length &&
                  ". Getting some wrong is part of learning. Try again to level up."}
              </p>
            )}
            <button
              type="button"
              onClick={restart}
              className="mt-2 self-start rounded-full border px-5 py-2.5 font-medium transition-colors hover:bg-muted"
            >
              Practice again
            </button>
          </motion.div>
        ) : (
          <motion.div key={index} className="flex flex-col gap-5" {...screen}>
            {!single && (
              <p className="eyebrow">
                Question {index + 1} of {questions.length}
              </p>
            )}
            <p className="font-display font-semibold text-2xl leading-snug sm:text-3xl">
              {q.question}
            </p>

            <div className="flex flex-col gap-2" role="radiogroup">
              {q.options.map((option, i) => {
                const isAnswer = checked && i === q.answer;
                const isWrongPick = checked && i === picked && i !== q.answer;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={picked === i}
                    disabled={checked}
                    onClick={() => setPicked(i)}
                    className={`flex items-center justify-between gap-4 rounded-lg border px-5 py-4 text-left transition-colors duration-200 ${
                      isAnswer
                        ? "border-success bg-tint-sage"
                        : isWrongPick
                          ? "border-destructive/50 bg-tint-blush"
                          : picked === i
                            ? "border-primary bg-muted"
                            : "hover:border-primary/50 hover:bg-muted/60"
                    }`}
                  >
                    {option}
                    {isAnswer && <Check className="size-5 shrink-0" />}
                    {isWrongPick && <X className="size-5 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {hint && !checked && (
              <p className="rounded-lg bg-tint-butter px-5 py-4" role="status">
                <span className="font-medium">Hint: </span>
                {q.hint}
              </p>
            )}

            {checked && (
              <motion.p
                className="rounded-lg bg-muted px-5 py-4"
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="font-medium">
                  {picked === q.answer ? "That's right. " : "Not quite. "}
                </span>
                {q.why}
              </motion.p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {checked ? (
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {single ? "Done" : index + 1 === questions.length ? "See my score" : "Next question"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={check}
                    disabled={picked === null}
                    className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
                  >
                    Check
                  </button>
                  {!hint && (
                    <button
                      type="button"
                      onClick={() => setHint(true)}
                      className="inline-flex items-center gap-2 font-medium underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                    >
                      <Lightbulb className="size-4" />
                      Get a hint
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
