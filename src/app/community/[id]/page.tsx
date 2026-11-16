import { ArrowLeft, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Rules } from "@/components/community/rules";
import { Textarea } from "@/components/ui/textarea";
import { findThread, threads } from "@/lib/community";

export function generateStaticParams() {
  return threads.map((thread) => ({ id: thread.id }));
}

// The page reads its address (which thread), so that part loads inside a
// Suspense boundary, as Next.js requires.
export default function ThreadPage({ params }: PageProps<"/community/[id]">) {
  return (
    <Suspense fallback={<div className="mx-auto h-96 w-full max-w-6xl flex-1 px-6 py-12" aria-busy="true" />}>
      <Thread params={params} />
    </Suspense>
  );
}

async function Thread({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thread = findThread(id);
  if (!thread) notFound();

  return (
    <main
      id="main-content"
      className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-6 py-12 lg:grid-cols-[1fr_19rem] lg:gap-14 lg:py-16"
    >
      <div className="flex min-w-0 flex-col gap-8">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 self-start font-medium underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
        >
          <ArrowLeft className="size-4" />
          All posts
        </Link>

        {/* The original post */}
        <article className="flex flex-col gap-4">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-foreground">
              {thread.kind}
            </span>
            <span>{thread.topic}</span>
            <span>
              {thread.author} · {thread.posted}
            </span>
          </p>
          <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            {thread.title}
          </h1>
          <p className="text-lg leading-8">{thread.body}</p>
          {thread.source && (
            <p className="text-sm text-muted-foreground">Source: {thread.source}</p>
          )}
        </article>

        {/* Replies, oldest first */}
        <section className="flex flex-col gap-4">
          <h2 className="eyebrow">
            {thread.replies.length} {thread.replies.length === 1 ? "reply" : "replies"}
          </h2>
          {thread.replies.length === 0 && (
            <p className="text-muted-foreground">No replies yet.</p>
          )}
          {thread.replies.map((reply) => (
            <article
              key={reply.author + reply.posted}
              className={`flex flex-col gap-2 rounded-xl border p-5 ${reply.mentor ? "border-l-4 border-l-foreground/20 bg-card" : "bg-card"}`}
            >
              <p className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold">{reply.author}</span>
                {reply.mentor && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-foreground">
                    <BadgeCheck className="size-4" />
                    Mentor
                  </span>
                )}
                <span className="text-muted-foreground">· {reply.posted}</span>
              </p>
              <p className="leading-7">{reply.body}</p>
              {reply.source && (
                <p className="text-sm text-muted-foreground">Source: {reply.source}</p>
              )}
            </article>
          ))}
        </section>

        <form className="flex flex-col gap-3">
          <label htmlFor="reply" className="font-medium">
            Add a reply
          </label>
          <Textarea id="reply" placeholder="Share what you know, and where you learned it." />
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled
              className="rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground opacity-40"
            >
              Reply
            </button>
          </div>
        </form>
      </div>

      <Rules />
    </main>
  );
}
