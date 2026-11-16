"use client";

import { useSyncExternalStore } from "react";

import { getSupabase } from "@/lib/supabase/client";

// Learning progress: the best practice score for each lesson.
// Signed in  -> stored in the account (Supabase table "lesson_progress").
// Signed out -> stored in this browser, so the site still works without
//               accounts (and before Supabase is connected).
type Progress = Record<string, number>;

const KEY = "investing-together-progress";
const EMPTY: Progress = {};

let userId: string | null = null;
let current: Progress = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

function readDevice(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : EMPTY;
  } catch {
    // Storage can be blocked (private windows); progress just won't persist.
    return EMPTY;
  }
}

function writeDevice(progress: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // Ignore: see readDevice().
  }
}

function snapshot() {
  if (!loaded) {
    current = readDevice();
    loaded = true;
  }
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Best practice score for every lesson the learner has tried. */
export function useProgress() {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

/** Save a practice score, keeping the learner's best. */
export async function recordScore(slug: string, score: number) {
  const best = Math.max(score, snapshot()[slug] ?? 0);
  current = { ...current, [slug]: best };
  notify();

  const supabase = getSupabase();
  if (userId && supabase) {
    const { error } = await supabase
      .from("lesson_progress")
      .upsert(
        { user_id: userId, lesson_slug: slug, best_score: best },
        { onConflict: "user_id,lesson_slug" },
      );
    if (error) console.error("Could not save progress:", error.message);
  } else {
    writeDevice(current);
  }
}

/**
 * Called when someone signs in: load their saved progress. Anything they
 * did on this device before signing in is added to the account, so nothing
 * is lost.
 */
export async function loadAccountProgress(id: string) {
  const supabase = getSupabase();
  if (!supabase) return;
  userId = id;

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, best_score");
  if (error) {
    console.error("Could not load progress:", error.message);
    return;
  }

  const account: Progress = {};
  for (const row of data ?? []) account[row.lesson_slug] = row.best_score;

  const device = readDevice();
  const ahead = Object.entries(device).filter(
    ([slug, score]) => score > (account[slug] ?? -1),
  );
  if (ahead.length > 0) {
    await supabase.from("lesson_progress").upsert(
      ahead.map(([slug, score]) => ({
        user_id: id,
        lesson_slug: slug,
        best_score: score,
      })),
      { onConflict: "user_id,lesson_slug" },
    );
    for (const [slug, score] of ahead) account[slug] = score;
  }

  current = account;
  loaded = true;
  notify();
}

/** Called when someone signs out: go back to this device's own progress. */
export function loadDeviceProgress() {
  userId = null;
  current = readDevice();
  loaded = true;
  notify();
}
