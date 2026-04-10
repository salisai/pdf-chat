import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/chat/[id]
 * Get chat history for a specific chat session
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: chatId } = await params;

        // 1. Initialize the authenticated server client
        const supabase = await createClient();
        
        // 2. Get the verified user from the session cookie
        const { data: { user } } = await supabase.auth.getUser();

        if (!chatId) {
            return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
        }

        // 3. Verify chat exists and user has permission
        const { data: chat, error: chatError } = await supabase
            .from("chats")
            .select("id, user_id, document_id")
            .eq("id", chatId)
            .single();

        if (chatError || !chat) {
            return NextResponse.json({ error: "Chat not found" }, { status: 404 });
        }

        // Security: Ensure the chat session belongs to the logged-in user
        if (chat.user_id !== user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // 4. Get messages for this chat
        const { data: messages, error: messagesError } = await supabase
            .from("messages")
            .select("*")
            .eq("chat_id", chatId)
            .order("created_at", { ascending: true });

        if (messagesError) {
            console.error("Messages fetch error:", messagesError);
            return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
        }

        return NextResponse.json({
            chat,
            messages: messages || [],
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}