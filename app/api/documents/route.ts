import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // 1. Initialize the authenticated server client
    const supabase = await createClient();
    
    // 2. Get the verified user from the session cookie
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // 3. Unauthorized check
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 4. Fetch only the documents belonging to this user
    const { data, error } = await supabase
      .from("documents")
      .select("id, title, file_path, status, created_at")
      .eq("user_id", user.id) // Security: Filter by verified user ID
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase documents error:", error);
      return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
    }

    return NextResponse.json({ documents: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}