"use client";

import { Check, Play } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { courseLessons } from "@/lib/course";
import { dollars, EASE_OUT } from "@/lib/format";
import { EXAMPLE_RATE, futureValue, glossary } from "@/lib/mock-data";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
});

// Small coloured pill naming what each preview card shows.
function Label({ children }: { children: string }) {
  return (
    <p
      className="self-start rounded-full bg-secondary text-muted-foreground px-2.5 py-1 text-[0.7rem] font-bold tracking-wide uppercase"
    >
      {children}
    </p>
  );
}

// --- Five small previews of what is actually inside the course ------------

const growth = [10, 20, 30].map((years) => {
  const putIn = 25 * 12 * years;
  const total = futureValue(25, years, EXAMPLE_RATE);
  return { years, putIn, total };
});

function ChartCard() {
  return (
    <>
      <Label>See it</Label>
      <p className="font-semibold">$25 a month, left to grow</p>
      <div className="mt-auto flex flex-col gap-2.5">
        {growth.map((row) => (
          <div key={row.years}>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{row.years} years</span>
              <span className="font-semibold text-foreground">{dollars(row.total)}</span>
            </div>
            <div className="mt-1 flex h-2.5 gap-0.5" style={{ width: `${(row.total / growth[2].total) * 100}%` }}>
              <span className="rounded-l-sm bg-chart-1" style={{ width: `${(row.putIn / row.total) * 100}%` }} />
              <span className="flex-1 rounded-r-sm bg-chart-2" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const question = courseLessons[1].practice[0];

function PracticeCard() {
  return (
    <>
      <Label>Practice</Label>
      <p className="leading-snug font-semibold">{question.question}</p>
      <ul className="mt-auto flex flex-col gap-1.5 text-xs">
        {question.options.map((option, i) => (
          <li
            key={option}
            className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 ${
              i === question.answer ? "border-success bg-tint-sage font-medium" : ""
            }`}
          >
            {option}
            {i === question.answer && <Check className="size-3.5 shrink-0 text-success" />}
          </li>
        ))}
      </ul>
    </>
  );
}

const video = courseLessons[0].video!;

function VideoCard() {
  return (
    <>
      <Label>Watch</Label>
      <p className="font-semibold">{video.title}</p>
      <div className="relative mt-auto aspect-video overflow-hidden rounded-lg bg-muted">
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt=""
          fill
          sizes="200px"
          className="object-cover"
        />
        <span className="absolute top-1/2 left-1/2 flex size-10 -translate-1/2 items-center justify-center rounded-full bg-white text-primary shadow">
          <Play className="size-4 translate-x-px fill-current" />
        </span>
      </div>
    </>
  );
}

const term = glossary.find((g) => g.term === "Diversification")!;

function WordCard() {
  return (
    <>
      <Label>Glossary</Label>
      <p className="text-lg font-bold">{term.term}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{term.meaning}</p>
      <p className="mt-auto text-xs font-semibold text-muted-foreground" >
        {glossary.length} terms explained
      </p>
    </>
  );
}

function ReadCard() {
  const part = courseLessons[1].parts[0];
  return (
    <>
      <Label>Read</Label>
      <p className="font-semibold">{part.heading}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{part.body}</p>
    </>
  );
}

const cards = [
  { href: "/learn/stocks-bonds-funds", content: <ReadCard />, rotate: -7, y: 26 },
  { href: "/learn/what-is-investing", content: <VideoCard />, rotate: -3.5, y: 8 },
  { href: "/learn/what-is-investing", content: <ChartCard />, rotate: 0, y: 0 },
  { href: "/learn/stocks-bonds-funds", content: <PracticeCard />, rotate: 3.5, y: 8 },
  { href: "/glossary", content: <WordCard />, rotate: 7, y: 26 },
];

export function Hero() {
  return (
    <section className="creative-hero overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-16 text-center sm:pt-24">
        <motion.h1
          className="max-w-3xl text-4xl leading-[1.12] font-bold sm:text-[3.25rem]"
          {...rise(0)}
        >
          Learn how investing works,{" "}
          <span className="hero-highlight">one short lesson at a time.</span>
        </motion.h1>

        <motion.p className="mt-5 max-w-xl hero-description text-lg" {...rise(0.1)}>
          Watch a video, read a plain-language lesson, then practice with hints.
          Start from zero and go at your own pace.
        </motion.p>

        <motion.div className="mt-8 flex flex-wrap justify-center gap-3" {...rise(0.2)}>
          <Link
            href="/learn"
            className="hero-primary rounded-full px-7 py-3.5 font-semibold shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start learning
          </Link>
          <Link
            href="/news"
            className="hero-secondary rounded-full border px-7 py-3.5 font-semibold transition-colors duration-200 hover:bg-secondary"
          >
            This week&apos;s news
          </Link>
        </motion.div>
      </div>

      {/* A fan of real lesson pieces. Each one opens the thing it shows. */}
      <div className="mt-14 flex snap-x gap-4 overflow-x-auto px-6 pb-16 sm:mt-16 lg:justify-center lg:gap-0 lg:overflow-visible lg:pb-24">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="shrink-0 snap-center lg:-mx-1.5"
            style={{ zIndex: 5 - Math.abs(i - 2) }}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            animate={{ opacity: 1, y: card.y, rotate: card.rotate }}
            whileHover={{ y: card.y - 14, rotate: 0, zIndex: 10 }}
            transition={{
              duration: 0.9,
              ease: EASE_OUT,
              delay: 0.3 + i * 0.08,
              rotate: { type: "spring", stiffness: 220, damping: 20 },
            }}
          >
            <Link
              href={card.href}
              className="preview-card flex h-72 w-56 flex-col gap-2 rounded-2xl bg-card p-4 text-left text-foreground shadow-xl shadow-black/20"
            >
              {card.content}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
