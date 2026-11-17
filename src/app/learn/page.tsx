import { LearnBrowser } from "@/components/learn-browser";
import { PageShell } from "@/components/page-shell";
import { glossary, lessons } from "@/lib/mock-data";

export default function LearnPage() {
  return (
    <PageShell
      title="Learn"
      intro="Build your understanding with short lessons, worked examples, practice questions, and selected videos."
    >
      <LearnBrowser lessons={lessons} glossary={glossary} />
    </PageShell>
  );
}
