"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/components/auth/use-auth";

// Lessons are for signed-in learners, so progress always has an account to
// live in. Until accounts are connected (no Supabase keys) everything stays
// open, so the site keeps working.
export function RequireAccount({ children }: { children: React.ReactNode }) {
  const { user, ready, enabled } = useAuth();

  if (!enabled || user) return <>{children}</>;
  if (!ready) return <div className="h-96 animate-pulse rounded-lg bg-muted" aria-busy="true" />;

  return (
    <div className="flex flex-col items-start gap-6 rounded-xl bg-primary p-8 text-primary-foreground sm:p-12">
      <p className="eyebrow !text-primary-foreground/60">Free account needed</p>
      <h2 className="text-3xl leading-tight font-bold sm:text-4xl">
        Sign up to start this lesson.
      </h2>
      <p className="max-w-xl text-lg text-primary-foreground/75">
        An account keeps your progress and mastery levels with you on any
        device. It takes a minute and costs nothing.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/signup"
          className="group inline-flex items-center gap-3 rounded-full bg-white py-3 pr-5 pl-6 font-semibold text-primary"
        >
          Create a free account
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          href="/login"
          className="rounded-full border border-primary-foreground/40 px-6 py-3 font-medium hover:border-primary-foreground"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
