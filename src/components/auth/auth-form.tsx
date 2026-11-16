"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/components/auth/use-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabase } from "@/lib/supabase/client";

// One form for both jobs. `mode` picks sign up or log in.
export function AuthForm({ mode }: { mode: "signup" | "login" }) {
  const { enabled } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  const signup = mode === "signup";

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    setBusy(true);
    setError(null);

    const { data, error } = signup
      ? await supabase.auth.signUp({ email, password, options: { data: { name } } })
      : await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);
    if (error) {
      setError(error.message);
    } else if (signup && !data.session) {
      // Supabase asks new accounts to confirm their email first.
      setCheckEmail(true);
    } else {
      router.push("/learn");
    }
  }

  if (checkEmail) {
    return (
      <p className="max-w-md rounded-lg bg-tint-sage px-5 py-4 text-lg" role="status">
        Almost there. We sent a confirmation link to <strong>{email}</strong>.
        Open it, then log in.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-5 rounded-2xl border bg-card p-6 sm:p-8">
      {signup && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">First name</Label>
          <Input
            id="name"
            autoComplete="given-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 text-base"
          />
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 text-base"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete={signup ? "new-password" : "current-password"}
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 text-base"
        />
        {signup && (
          <p className="text-sm text-muted-foreground">At least 8 characters.</p>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-tint-blush px-4 py-3 text-sm" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!enabled || busy}
        className="rounded-full bg-primary px-6 py-3.5 text-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {busy ? "One moment…" : signup ? "Create account" : "Log in"}
      </button>

      <p className="text-muted-foreground">
        {signup ? "Already have an account? " : "New here? "}
        <Link
          href={signup ? "/login" : "/signup"}
          className="font-medium text-foreground underline underline-offset-4"
        >
          {signup ? "Log in" : "Create a free account"}
        </Link>
      </p>

    </form>
  );
}
