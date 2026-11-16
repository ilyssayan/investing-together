import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** True once the Supabase keys are in .env.local. Accounts need them. */
export const accountsEnabled = Boolean(url && key);

let client: SupabaseClient | null = null;

/** The browser Supabase client, or null when accounts aren't set up yet. */
export function getSupabase() {
  if (!accountsEnabled) return null;
  client ??= createBrowserClient(url!, key!);
  return client;
}
