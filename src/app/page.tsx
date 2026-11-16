import { BookA, ChevronRight, MessagesSquare, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { CourseList } from "@/components/home/course-list";
import { GrowthStory } from "@/components/home/growth-story";
import { Hero } from "@/components/home/hero";
import { HomeNews } from "@/components/news/events";

const heading = "text-3xl font-bold sm:text-4xl";
const section = "mx-auto w-full max-w-6xl px-6 py-12 sm:py-16";

const more = [
  { href: "/community", icon: MessagesSquare, title: "Community", text: "Ask a question and get answers from mentors and other learners." },
  { href: "/glossary", icon: BookA, title: "Glossary", text: "Search financial terms and follow the connections between them." },
  { href: "/quiz", icon: SlidersHorizontal, title: "Style quiz", text: "Four questions on how you handle risk." },
];

export default function Home() {
  return (
    // Plain block, not flex: the pinned scroll section needs it for spacing.
    <main id="main-content" className="flex-1">
      <Hero />

      <section className={section}>
        <div className="mb-10 max-w-2xl">
          <h2 className={heading}>The course</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Five lessons in two units. Every lesson has a video, a short read
            and practice questions with hints.
          </p>
        </div>
        <CourseList />
      </section>

      {/* Scroll-driven story: the chart draws itself as you scroll. */}
      <GrowthStory />

      <section className={section}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className={heading}>This week in the market</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Open a story to see what happened, why the market cares, and what
              it means for you.
            </p>
          </div>
          <Link href="/news" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            All news
            <ChevronRight className="size-4" />
          </Link>
        </div>
        <Suspense fallback={<div className="h-72 animate-pulse rounded-2xl bg-muted" />}>
          <HomeNews />
        </Suspense>
      </section>

      <section className="border-t bg-background">
        <ul className="mx-auto grid w-full max-w-6xl gap-5 px-6 py-12 sm:py-16 md:grid-cols-3">
          {more.map(({ href, icon: Icon, title, text }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full items-start gap-4 rounded-2xl border bg-card p-6 transition-transform duration-200 hover:-translate-y-1"
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground"
                >
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-lg font-bold">{title}</span>
                  <span className="text-foreground/70">{text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
