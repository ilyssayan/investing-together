import { LearnBrowser } from "@/components/learn-browser";
import { PageShell } from "@/components/page-shell";
import { glossary, lessons } from "@/lib/mock-data";

export default function LearnPage() {
  return (
    <PageShell
      title="Learn"
      intro="One course, two units. Each lesson is a short video, a quick read, and practice questions."
    >
      <LearnBrowser lessons={lessons} glossary={glossary} />
    </PageShell>
  );
}
