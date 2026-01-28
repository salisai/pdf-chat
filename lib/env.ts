// Centralized environment variable access with basic validation.

export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  SUPABASE_STORAGE_BUCKET: process.env.SUPABASE_STORAGE_BUCKET || "documents",

  PINECONE_API_KEY: process.env.PINECONE_API_KEY || "",
  PINECONE_INDEX: process.env.PINECONE_INDEX || "",

  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
};

export function ensureServerEnv() {
  const missing: string[] = [];

  if (!env.SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!env.SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!env.PINECONE_API_KEY) missing.push("PINECONE_API_KEY");
  if (!env.PINECONE_INDEX) missing.push("PINECONE_INDEX");
  if (!env.GEMINI_API_KEY) missing.push("GEMINI_API_KEY");

  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(
        ", ",
      )}. Please set them in your .env.local.`,
    );
  }
}

