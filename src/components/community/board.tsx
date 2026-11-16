"use client";

import { MessageSquare, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { topics, type Thread, type Topic } from "@/lib/community";

const kinds = ["All", "Question", "Tip"] as const;

const chip = (active: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "bg-card hover:bg-muted"
  }`;

// The forum's main view: filters on top, one row per thread. Each row shows
// the reply count first, like most forums, so unanswered questions stand out.
export function Board({ threads }: { threads: Thread[] }) {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const [topic, setTopic] = useState<Topic | "All topics">("All topics");
  const [asking, setAsking] = useState(false);

  const shown = threads.filter(
    (t) =>
      (kind === "All" || t.kind === kind) &&
      (topic === "All topics" || t.topic === topic),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={chip(kind === k)}
            >
              {k === "All" ? "All posts" : `${k}s`}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setAsking(!asking)}
          aria-expanded={asking}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {asking ? <X className="size-4" /> : <Plus className="size-4" />}
          {asking ? "Cancel" : "New post"}
        </button>
      </div>

      {asking && (
        <form className="flex flex-col gap-4 rounded-xl border bg-card p-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="post-title">Title</Label>
            <Input id="post-title" placeholder="Ask your question in one sentence" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="post-body">Details</Label>
            <Textarea
              id="post-body"
              placeholder="Add context. Use a made-up example instead of your own numbers."
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="post-source">Source (for tips)</Label>
            <Input id="post-source" placeholder="Where did you learn this?" />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled
              className="rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground opacity-40"
            >
              Post
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {(["All topics", ...topics] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={topic === t}
            onClick={() => setTopic(t)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              topic === t ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="border-t">
        {shown.map((thread) => (
          <li key={thread.id} className="border-b">
            <Link
              href={`/community/${thread.id}`}
              className="group flex gap-5 px-2 py-5 transition-colors hover:bg-muted/60 sm:px-4"
            >
              <span
                className={`flex h-14 w-16 shrink-0 flex-col items-center justify-center rounded-lg text-sm ${
                  thread.replies.length > 0 ? "bg-secondary" : "border text-muted-foreground"
                }`}
              >
                <span className="text-lg leading-none font-semibold tabular-nums">
                  {thread.replies.length}
                </span>
                {thread.replies.length === 1 ? "reply" : "replies"}
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-lg leading-snug font-semibold group-hover:underline">
                  {thread.title}
                </span>
                <span className="line-clamp-1 text-muted-foreground">{thread.body}</span>
                <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-foreground">
                    {thread.kind}
                  </span>
                  <span>{thread.topic}</span>
                  <span>
                    {thread.author} · {thread.posted}
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="flex items-center gap-3 px-2 py-8 text-muted-foreground sm:px-4">
            <MessageSquare className="size-5" />
            No posts match these filters yet.
          </li>
        )}
      </ul>
    </div>
  );
}
