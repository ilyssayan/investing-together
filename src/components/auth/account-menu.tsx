"use client";

import Link from "next/link";

import { displayName, useAuth } from "@/components/auth/use-auth";
import { getSupabase } from "@/lib/supabase/client";

const pill =
  "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90";

// Right side of the header: sign up / log in, or the learner's name.
export function AccountMenu({ onNavigate }: { onNavigate?: () => void }) {
  const { user, ready } = useAuth();

  if (!ready) return <span className="h-9 w-24" />;

  if (user) {
    return (
      <span className="flex items-center gap-4 text-sm">
        <span className="text-muted-foreground">Hi, {displayName(user)}</span>
        <button
          type="button"
          onClick={() => getSupabase()?.auth.signOut()}
          className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
        >
          Log out
        </button>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-4 text-sm">
      <Link
        href="/login"
        onClick={onNavigate}
        className="font-medium text-foreground hover:text-primary"
      >
        Log in
      </Link>
      <Link href="/signup" onClick={onNavigate} className={pill}>
        Sign up free
      </Link>
    </span>
  );
}
