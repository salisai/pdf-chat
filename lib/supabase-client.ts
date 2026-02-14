import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Missing Supabase environment variables. Please check your .env.local file."
    );
}

/**
 * Supabase client for browser/client-side usage
 * This client uses the anon key and respects RLS policies
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
});

/**
 * Get the current user ID (for use with x-user-id header until auth is implemented)
 * This is a placeholder - replace with actual auth when implemented
 */
export function getCurrentUserId(): string | null {
    // For now, use a fixed user ID or get from localStorage
    // In production, this would come from Supabase Auth
    if (typeof window !== "undefined") {
        let userId = localStorage.getItem("temp_user_id");
        if (!userId) {
            userId = `user-${Math.random().toString(36).substring(7)}`;
            localStorage.setItem("temp_user_id", userId);
        }
        return userId;
    }
    return null;
}
