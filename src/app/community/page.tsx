import { Board } from "@/components/community/board";
import { Rules } from "@/components/community/rules";
import { PageShell } from "@/components/page-shell";
import { threads } from "@/lib/community";

export default function CommunityPage() {
  return (
    <PageShell
      title="Community"
      intro="Ask a question, answer one, or share something that helped you. Mentors reply to open questions."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_19rem] lg:gap-14">
        <Board threads={threads} />
        <Rules />
      </div>
    </PageShell>
  );
}
