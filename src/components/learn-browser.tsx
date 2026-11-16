"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { UnitList } from "@/components/course/unit-list";
import { IndexList } from "@/components/index-list";
import type { Lesson, Term } from "@/lib/mock-data";

const toItem = (lesson: Lesson) => ({
  href: `/learn/${lesson.slug}`,
  title: lesson.title,
  description: lesson.summary,
  meta: `${lesson.minutes} min`,
});

// Two ways in: a guided path for people starting from zero, and a search box
// for people who just heard a word and want to know what it means.
export function LearnBrowser({
  lessons,
  glossary,
}: {
  lessons: Lesson[];
  glossary: Term[];
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const matchedLessons = lessons.filter((lesson) =>
    [lesson.title, lesson.summary, ...lesson.terms, ...lesson.parts.map((p) => p.body)]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
  const matchedTerms = glossary.filter((entry) =>
    `${entry.term} ${entry.meaning}`.toLowerCase().includes(q),
  );
  const first = lessons[0];

  return (
    <div className="flex flex-col gap-12">
      <label className="relative block max-w-xl">
        <span className="sr-only">Search lessons and words</span>
        <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a word or topic, like “stock” or “credit”"
          className="w-full rounded-full border border-input bg-card py-4 pr-6 pl-14 text-lg placeholder:text-muted-foreground"
        />
      </label>

      {q ? (
        <div className="flex flex-col gap-10" aria-live="polite">
          {matchedTerms.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="eyebrow">Words</h2>
              <dl className="grid gap-3 sm:grid-cols-2">
                {matchedTerms.map((entry) => (
                  <div key={entry.term} className="rounded-xl border bg-card p-5">
                    <dt className="font-display font-semibold text-2xl">{entry.term}</dt>
                    <dd className="mt-1 text-foreground/80">{entry.meaning}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {matchedLessons.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="eyebrow">Lessons</h2>
              <IndexList items={matchedLessons.map(toItem)} />
            </section>
          )}
          {matchedTerms.length === 0 && matchedLessons.length === 0 && (
            <p className="text-lg text-muted-foreground">
              Nothing yet for “{query.trim()}”. Try a shorter word, or{" "}
              <Link href="/community" className="underline underline-offset-4">
                ask the community
              </Link>
              .
            </p>
          )}
        </div>
      ) : (
        <>
          <Link
            href={`/learn/${first.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-l-4 border-l-foreground/20 bg-card p-6 transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-8"
          >
            <p className="eyebrow !text-foreground/70">
              Start here · {first.minutes} min
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              {first.title}
            </h2>
            <p className="max-w-xl text-lg text-foreground/80">{first.summary}</p>
            <span className="mt-2 inline-flex items-center gap-2 font-medium">
              Open the first lesson
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>

          <UnitList />

          <p className="text-lg text-muted-foreground">
            Not sure which fits you?{" "}
            <Link
              href="/quiz"
              className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              Take the one-minute style quiz
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
