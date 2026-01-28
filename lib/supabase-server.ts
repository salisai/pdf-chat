import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env, ensureServerEnv } from "./env";

let client: SupabaseClient | null = null;

export function getSupabaseServerClient() {
  if (client) return client;

  ensureServerEnv();

  client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
    },
  });

  return client;
}

// NOTE: This is a placeholder until full auth wiring is done.
// For now we support an optional `x-user-id` header so that the
// backend can remain multi-tenant-ready.
export function getUserIdFromHeaders(headers: Headers): string | null {
  const explicit = headers.get("x-user-id");
  if (explicit) return explicit;

  // In a real app, you would:
  // - read the Supabase auth cookie / Authorization header
  // - call supabase.auth.getUser()
  // - return user.id
  return null;
}

