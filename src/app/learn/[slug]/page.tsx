import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { RequireAccount } from "@/components/auth/require-account";
import { Practice } from "@/components/course/practice";
import { UnitList } from "@/components/course/unit-list";
import { LessonVideo } from "@/components/course/video";
import { RevealText } from "@/components/motion/reveal-text";
import { TermList } from "@/components/term-list";
import { DiversificationPanels } from "@/components/visuals/diversification-panels";
import { GrowthBars } from "@/components/visuals/growth-bars";
import { courseLessons, findCourseLesson } from "@/lib/course";

// Lessons that come with a chart.
const visuals: Record<string, React.ReactNode> = {
  "what-is-investing": <GrowthBars />,
  "risk-and-diversification": <DiversificationPanels />,
};

export function generateStaticParams() {
  return courseLessons.map((lesson) => ({ slug: lesson.slug }));
}

// Numbered step heading: every lesson follows the same watch, read, practice order.
function Step({ number, title }: { number: number; title: string }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-3xl font-semibold">
      <span className="flex size-9 items-center justify-center rounded-full bg-primary font-sans text-base font-medium text-primary-foreground">
        {number}
      </span>
      {title}
    </h2>
  );
}

// The page reads its address (which lesson), so that part loads inside a
// Suspense boundary, as Next.js requires.
export default function LessonPage({ params }: PageProps<"/learn/[slug]">) {
  return (
    <Suspense fallback={<div className="mx-auto h-96 w-full max-w-6xl flex-1 px-6 py-12" aria-busy="true" />}>
      <Lesson params={params} />
    </Suspense>
  );
}

async function Lesson({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = findCourseLesson(slug);
  if (!lesson) notFound();

  const next = courseLessons[courseLessons.indexOf(lesson) + 1];
  const visual = visuals[lesson.slug];

  return (
    <main
      id="main-content"
      className="mx-auto grid w-full max-w-6xl flex-1 gap-12 px-6 py-12 lg:grid-cols-[17rem_1fr] lg:py-16"
    >
      {/* Course outline: stays in view on large screens, moves below on phones. */}
      <aside className="order-last lg:order-first">
        <div className="lg:sticky lg:top-24">
          <UnitList current={lesson.slug} compact />
        </div>
      </aside>

      <article className="flex min-w-0 flex-col gap-12">
        <header className="flex flex-col gap-4">
          <p className="eyebrow">{lesson.topic}</p>
          <RevealText
            segments={[lesson.title]}
            className="text-4xl leading-tight font-bold sm:text-5xl"
          />
          <p className="max-w-xl text-lg text-muted-foreground">{lesson.summary}</p>
        </header>

        <RequireAccount>
          <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-5">
          <Step number={1} title="Watch" />
          <LessonVideo video={lesson.video} />
        </section>

        <section className="flex flex-col gap-6">
          <Step number={2} title="Read" />
          {lesson.parts.map((part) => (
            <div key={part.heading} className="flex max-w-2xl flex-col gap-1">
              <h3 className="font-display font-semibold text-2xl">{part.heading}</h3>
              <p className="text-lg leading-8">{part.body}</p>
            </div>
          ))}
          <div className="flex max-w-2xl flex-col gap-2">
            <h3 className="font-display font-semibold text-2xl">Words in this lesson</h3>
            <TermList terms={lesson.terms} />
          </div>
        </section>

        {visual && (
          <section className="flex flex-col gap-5">
            <Step number={3} title="See it" />
            <div className="max-w-3xl">{visual}</div>
          </section>
        )}

        <section className="flex flex-col gap-5">
          <Step number={visual ? 4 : 3} title="Practice" />
          <div className="max-w-2xl">
            <Practice slug={lesson.slug} questions={lesson.practice} />
          </div>
        </section>

        <Link
          href={next ? `/learn/${next.slug}` : "/learn"}
          className="group flex max-w-2xl items-center justify-between gap-6 rounded-xl bg-primary p-7 text-primary-foreground transition-transform duration-300 ease-out hover:-translate-y-1"
        >
          <span className="flex flex-col gap-1">
            <span className="text-sm opacity-70">
              {next ? "Up next" : "You've reached the end"}
            </span>
            <span className="font-display text-3xl font-semibold">
              {next ? next.title : "Back to the course"}
            </span>
          </span>
          <ArrowRight className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
          </div>
        </RequireAccount>
      </article>
    </main>
  );
}
