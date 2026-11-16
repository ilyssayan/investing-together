import { ArticleImage } from "@/components/news/article-image";
import { withArticleImages } from "@/lib/news-images";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import { RevealText } from "@/components/motion/reveal-text";
import { lessons } from "@/lib/mock-data";
import { getEvents } from "@/lib/news";
import type { NewsEvent } from "@/lib/news-edition";


const day = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const publishers = (event: NewsEvent) => [
  ...new Set(event.sources.map((s) => s.publisher)),
];

/** The list page: each event is a card that opens its own page. */
export async function EventList() {
  await connection(); // load when someone visits, not when the site is built
  const result = await getEvents();
  const events = await withArticleImages(result.events);

  return (
    <>
      <ol className="grid gap-5 lg:grid-cols-3">
        {events.map((event, i) => (
          <li key={event.slug} className={i === 0 ? "lg:col-span-3" : ""}>
            <Link
              href={`/news/${event.slug}`}
              className={`group flex h-full flex-col gap-4 rounded-xl p-7 transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-9 ${
                i === 0 ? "bg-primary text-primary-foreground" : "border bg-card"
              }`}
            >
              <ArticleImage image={event.image} featured={i === 0}/>
              <p className={`eyebrow ${i === 0 ? "!text-primary-foreground/70" : ""}`}>
                {i === 0 ? "Top story · " : ""}
                {day(event.updated)}
              </p>
              <h2
                className={`font-display leading-tight font-semibold ${
                  i === 0 ? "max-w-3xl text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
                }`}
              >
                {event.title}
              </h2>
              <p className={`max-w-2xl text-lg leading-8 ${i === 0 ? "opacity-85" : "text-muted-foreground"}`}>
                {event.dek}
              </p>
              <p className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4 font-medium">
                <span className="inline-flex items-center gap-2">
                  Read the explanation
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className={`text-sm font-normal whitespace-nowrap ${i === 0 ? "opacity-70" : "text-muted-foreground"}`}>
                  {event.sources.length} sources
                  {i === 0 && ` · ${publishers(event).join(", ")}`}
                </span>
              </p>
            </Link>
          </li>
        ))}
      </ol>


    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-3xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

/** One event: the explanation, the takeaways, the words, and the sources. */
export async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connection();
  const { events } = await getEvents();
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();
  const lesson = lessons.find((l) => l.slug === event.lesson);
  const body = "text-lg leading-8";

  return (
    <article className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
      <div className="flex min-w-0 flex-col gap-10">
        <header className="flex flex-col gap-5">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 self-start font-medium underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            <ArrowLeft className="size-4" />
            All news
          </Link>
          <p className="eyebrow">Updated {day(event.updated)}</p>
          <RevealText
            segments={[event.title]}
            className="text-3xl leading-tight font-bold sm:text-5xl"
          />
          <p className="max-w-2xl text-xl leading-8 text-muted-foreground">{event.dek}</p>
        </header>

        <Section title="What happened">
          {event.whatHappened.map((paragraph) => (
            <p key={paragraph} className={body}>
              {paragraph}
            </p>
          ))}
        </Section>

        <Section title="Why the market cares">
          <p className={body}>{event.whyTheMarketCares}</p>
        </Section>

        <section className="flex flex-col gap-3 rounded-2xl border border-l-4 border-l-foreground/20 bg-card p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold">What it means for you</h2>
          <p className={body}>{event.whatItMeansForYou}</p>
        </section>

        <Section title="Good to know">
          <ul className="flex flex-col gap-3">
            {event.goodToKnow.map((point) => (
              <li key={point} className={`flex gap-3 ${body}`}>
                <span className="mt-3 size-2 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
        </Section>

        {lesson && (
          <Link
            href={`/learn/${lesson.slug}`}
            className="group flex items-center justify-between gap-6 rounded-xl bg-primary p-7 text-primary-foreground transition-transform duration-300 ease-out hover:-translate-y-1"
          >
            <span className="flex flex-col gap-1">
              <span className="text-sm opacity-70">Learn the idea behind this story</span>
              <span className="font-display text-3xl font-semibold">{lesson.title}</span>
            </span>
            <ArrowRight className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}

      </div>

      <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
        <section className="flex flex-col gap-3">
          <h2 className="eyebrow">Read the sources</h2>
          <ul className="border-t">
            {event.sources.map((source) => (
              <li key={source.url} className="border-b">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-3 py-4"
                >
                  <span className="flex flex-col gap-1">
                    <span className="leading-snug underline decoration-foreground/20 underline-offset-4 group-hover:decoration-foreground">
                      {source.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {source.publisher} · {day(source.published)}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-1 size-4 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="eyebrow">Words in this story</h2>
          <dl className="flex flex-col gap-3 rounded-lg bg-muted p-5">
            {event.terms.map(({ term, meaning }) => (
              <div key={term}>
                <dt className="font-medium">{term}</dt>
                <dd className="text-muted-foreground">{meaning}</dd>
              </div>
            ))}
          </dl>
        </section>
      </aside>
    </article>
  );
}

/** Home page: the newest events as cards. */
export async function HomeNews() {
  await connection();
  const result = await getEvents();
  const events = await withArticleImages(result.events.slice(0, 4));
  return (
    <ol className="grid gap-5 md:grid-cols-2">
      {events.slice(0, 4).map((event) => (
        <li key={event.slug}>
          <Link
            href={`/news/${event.slug}`}
            className="group flex h-full flex-col gap-2 rounded-2xl border bg-card p-6 sm:p-8 transition-transform duration-200 hover:-translate-y-1"
          >
            <ArticleImage image={event.image}/>
            <span className="eyebrow">
              {day(event.updated)} · {event.sources.length} sources
            </span>
            <span className="text-xl leading-snug font-bold">
              {event.title}
            </span>
            <span className="text-foreground/70">{event.dek}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
