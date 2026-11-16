"use client";

import type { User } from "@supabase/supabase-js";
import { useSyncExternalStore } from "react";

import { loadAccountProgress, loadDeviceProgress } from "@/lib/progress";
import { accountsEnabled, getSupabase } from "@/lib/supabase/client";

type Auth = {
  user: User | null;
  ready: boolean; // false until we know whether someone is signed in
  enabled: boolean; // false until Supabase keys are configured
};

// What the server renders, and what the browser shows until Supabase
// reports the session. Keeping these identical avoids hydration mismatches.
const INITIAL: Auth = { user: null, ready: !accountsEnabled, enabled: accountsEnabled };

let state = INITIAL;
let started = false;
const listeners = new Set<() => void>();

// Start listening to Supabase the first time any component asks who is
// signed in, and switch progress between the account and the device to match.
function start() {
  if (started) return;
  started = true;
  getSupabase()?.auth.onAuthStateChange((_event, session) => {
    const user = session?.user ?? null;
    state = { user, ready: true, enabled: true };
    if (user) void loadAccountProgress(user.id);
    else loadDeviceProgress();
    listeners.forEach((listener) => listener());
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start();
  return () => listeners.delete(listener);
}

/** Who is signed in, if anyone. */
export function useAuth() {
  return useSyncExternalStore(subscribe, () => state, () => INITIAL);
}

/** First name for greetings, falling back to the part of the email before @. */
export const displayName = (user: User) =>
  (user.user_metadata?.name as string | undefined)?.split(" ")[0] ||
  user.email?.split("@")[0] ||
  "Account";
