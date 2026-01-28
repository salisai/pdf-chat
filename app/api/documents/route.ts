import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getUserIdFromHeaders } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const userId = getUserIdFromHeaders(req.headers);

    const query = supabase
      .from("documents")
      .select("id, title, file_path, status, created_at")
      .order("created_at", { ascending: false });

    if (userId) {
      query.eq("user_id", userId);
    }

    const { data, error } = await query;

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

