import { Suspense } from "react";

import { EventList } from "@/components/news/events";
import { PageShell } from "@/components/page-shell";

function Loading() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading news">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-64 animate-pulse rounded-xl bg-muted ${i === 0 ? "sm:col-span-2 lg:col-span-3" : ""}`}
        />
      ))}
    </div>
  );
}

export default function NewsPage() {
  return (
    <PageShell
      title="News, explained"
      intro="The events moving the market this week. Open one to see what happened, why the market cares, what it means for you, and where to read more."
    >
      <Suspense fallback={<Loading />}>
        <EventList />
      </Suspense>
    </PageShell>
  );
}
