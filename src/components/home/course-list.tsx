"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { LessonIcon } from "@/components/lesson-icon";
import { levelFor, levels, units } from "@/lib/course";
import { useProgress } from "@/lib/progress";


// Homepage preview: the first two units, one row per lesson
// with its icon, what's inside, and the learner's level once they've started.
export function CourseList() {
  const progress = useProgress();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {units.slice(0, 2).map((unit, u) => (
        <section
          key={unit.title}
          className="rounded-2xl border bg-card p-6 sm:p-8"
        >
          <p
            className="inline-block rounded-full bg-secondary text-muted-foreground px-3 py-1 text-xs font-bold tracking-wide uppercase"
          >
            Unit {u + 1}
          </p>
          <h3 className="mt-3 text-2xl font-bold">{unit.title}</h3>
          <p className="mt-1 text-foreground/70">{unit.description}</p>

          <ol className="mt-5 flex flex-col">
            {unit.lessons.map((lesson) => {
              const level = levelFor(progress[lesson.slug], lesson.practice.length);
              return (
                <li key={lesson.slug} className="border-t border-foreground/10">
                  <Link
                    href={`/learn/${lesson.slug}`}
                    className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-secondary/60"
                  >
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary">
                      <LessonIcon slug={lesson.slug} className="size-10" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-lg leading-snug font-semibold">{lesson.title}</span>
                      <span className="text-sm text-foreground/65">
                        {level > 0
                          ? <span className="text-success">{levels[level]}</span>
                          : `${lesson.video ? "Video · " : ""}${lesson.minutes} min read · ${lesson.practice.length} questions`}
                      </span>
                    </span>
                    <ChevronRight className="size-5 shrink-0 text-foreground/50 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
