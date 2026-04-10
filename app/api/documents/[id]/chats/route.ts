import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/documents/[id]/chats
 * Get all chat sessions for a specific document
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: documentId } = await params;
        
        // 1. Initialize the authenticated server client
        const supabase = await createClient();
        
        // 2. Get the verified user from the session cookie
        const { data: { user } } = await supabase.auth.getUser();

        if (!documentId) {
            return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
        }

        // 3. Verify document exists and user has permission
        const { data: doc, error: docError } = await supabase
            .from("documents")
            .select("id, user_id")
            .eq("id", documentId)
            .single();

        if (docError || !doc) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        // Security: Ensure the document belongs to the logged-in user
        if (doc.user_id !== user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // 4. Get all chats for this document
        const { data: chats, error: chatsError } = await supabase
            .from("chats")
            .select("*")
            .eq("document_id", documentId)
            .order("created_at", { ascending: false });

        if (chatsError) {
            console.error("Chats fetch error:", chatsError);
            return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
        }

        return NextResponse.json({
            chats: chats || [],
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}