"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { levelFor, levels, units } from "@/lib/course";
import { useProgress } from "@/lib/progress";

// Chip colour for each mastery level, from "not started" to "mastered".
const levelStyle = [
  "border text-muted-foreground",
  "bg-muted",
  "bg-secondary",
  "bg-tint-sage",
  "bg-success text-white",
];

// The whole course at a glance: every unit, every lesson, and how far the
// learner has got. `current` highlights the lesson being viewed.
export function UnitList({
  current,
  compact = false,
}: {
  current?: string;
  compact?: boolean; // sidebar version: no descriptions
}) {
  const progress = useProgress();

  return (
    <div className={`flex flex-col ${compact ? "gap-8" : "gap-12"}`}>
      {units.map((unit, u) => {
        const mastered = unit.lessons.filter(
          (l) => levelFor(progress[l.slug], l.practice.length) >= 3,
        ).length;
        return (
          <section key={unit.title} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="eyebrow">Unit {u + 1}</p>
              <h2 className={`font-display font-semibold ${compact ? "text-2xl" : "text-3xl sm:text-4xl"}`}>
                {unit.title}
              </h2>
              {!compact && (
                <p className="max-w-xl text-lg text-muted-foreground">
                  {unit.description}
                </p>
              )}
              <div className="mt-1 flex items-center gap-3">
                <div className="h-1.5 max-w-xs flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full origin-left rounded-full bg-success transition-transform duration-700 ease-out"
                    style={{ transform: `scaleX(${mastered / unit.lessons.length})` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {mastered} of {unit.lessons.length} proficient
                </span>
              </div>
            </div>

            <ol className="border-t">
              {unit.lessons.map((lesson, i) => {
                const level = levelFor(progress[lesson.slug], lesson.practice.length);
                const active = lesson.slug === current;
                return (
                  <li key={lesson.slug} className="border-b">
                    <Link
                      href={`/learn/${lesson.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-4 px-2 transition-colors duration-300 hover:bg-muted/70 sm:px-4 ${
                        compact ? "py-3.5" : "py-5"
                      } ${active ? "bg-muted" : ""}`}
                    >
                      <span className="w-7 font-display text-sm text-muted-foreground tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5 transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <span className={`font-display leading-snug ${compact ? "text-lg" : "text-2xl"}`}>
                          {lesson.title}
                        </span>
                        {!compact && (
                          <span className="text-muted-foreground">
                            {lesson.video ? "Video · " : ""}{lesson.minutes} min read ·{" "}
                            {lesson.practice.length} practice questions
                          </span>
                        )}
                      </span>
                      {compact ? (
                        // Sidebar: a small dot keeps the titles readable.
                        <span
                          title={levels[level]}
                          className={`size-3 shrink-0 rounded-full ${levelStyle[level]}`}
                        >
                          <span className="sr-only">{levels[level]}</span>
                        </span>
                      ) : (
                        <span
                          className={`hidden sm:inline-flex rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${levelStyle[level]}`}
                        >
                          {levels[level]}
                        </span>
                      )}
                      {!compact && (
                        <ArrowRight className="hidden size-5 transition-transform duration-300 group-hover:translate-x-1 sm:block" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
