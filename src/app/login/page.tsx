import { AuthForm } from "@/components/auth/auth-form";
import { PageShell } from "@/components/page-shell";

export default function Page() {
  return (
    <PageShell title="Log in" intro="Welcome back. Pick up where you left off.">
      <AuthForm mode="login" />
    </PageShell>
  );
}
