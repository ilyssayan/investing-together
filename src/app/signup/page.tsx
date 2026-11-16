import { AuthForm } from "@/components/auth/auth-form";
import { PageShell } from "@/components/page-shell";

export default function Page() {
  return (
    <PageShell title="Create your account" intro="Free, and it takes a minute. Your progress and mastery levels are saved to your account.">
      <AuthForm mode="signup" />
    </PageShell>
  );
}
