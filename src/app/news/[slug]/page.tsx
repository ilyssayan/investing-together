import { Suspense } from "react";

import { EventDetail } from "@/components/news/events";

export default function NewsEventPage({ params }: PageProps<"/news/[slug]">) {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 lg:py-16"
    >
      {/* The event loads at visit time, so the page shell shows first. */}
      <Suspense
        fallback={<div className="h-96 animate-pulse rounded-xl bg-muted" aria-busy="true" />}
      >
        <EventDetail params={params} />
      </Suspense>
    </main>
  );
}
