import { PageShell } from "@/components/page-shell";
import { StyleQuiz } from "@/components/style-quiz";

export default function QuizPage() {
  return (
    <PageShell
      title="Find your investing style"
      intro="Four questions about how you handle risk. There are no wrong answers."
    >
      <StyleQuiz />
    </PageShell>
  );
}
