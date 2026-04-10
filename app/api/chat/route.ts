import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateAnswer } from "@/lib/gemini";
import { searchRelevantChunks } from "@/lib/rag";

export const dynamic = "force-dynamic";

type MessageRole = "user" | "assistant";

export async function POST(req: NextRequest) {
  try {
    // 1. Initialize authenticated server client
    const supabase = await createClient();
    
    // 2. Get verified user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const body = await req.json();

    const { documentId, question, chatId } = body as {
      documentId?: string;
      question?: string;
      chatId?: string | null;
    };

    if (!documentId || !question) {
      return NextResponse.json({ error: "Missing documentId or question" }, { status: 400 });
    }

    // 3. Ensure document exists, is ready, and belongs to user
    const { data: doc, error: docError } = await supabase
      .from("documents")
      .select("id, status, user_id")
      .eq("id", documentId)
      .single();

    if (docError || !doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    if (doc.user_id !== userId) {
      return NextResponse.json({ error: "Unauthorized access to document" }, { status: 403 });
    }

    if (doc.status !== "ready") {
      return NextResponse.json({ error: "Document not ready yet" }, { status: 409 });
    }

    // 4. Ensure chat session belongs to user
    let effectiveChatId = chatId ?? null;

    if (!effectiveChatId) {
      const { data: chat, error: chatError } = await supabase
        .from("chats")
        .insert({
          document_id: documentId,
          user_id: userId,
        })
        .select("id")
        .single();

      if (chatError || !chat) {
        return NextResponse.json({ error: "Failed to create chat session" }, { status: 500 });
      }

      effectiveChatId = chat.id;
    } else {
      // Security: Verify existing chat belongs to this user
      const { data: existingChat } = await supabase
        .from("chats")
        .select("user_id")
        .eq("id", effectiveChatId)
        .single();
        
      if (!existingChat || existingChat.user_id !== userId) {
        return NextResponse.json({ error: "Unauthorized chat session" }, { status: 403 });
      }
    }

    // 5. Get recent messages for context
    const { data: messages, error: messagesError } = await supabase
      .from("messages")
      .select("role, content")
      .eq("chat_id", effectiveChatId)
      .order("created_at", { ascending: true })
      .limit(20);

    if (messagesError) {
      return NextResponse.json({ error: "Failed to load chat history" }, { status: 500 });
    }

    const history =
      messages?.map((m) => ({
        role: m.role as MessageRole,
        content: m.content as string,
      })) ?? [];

    // 6. RAG: semantic search over Pinecone (passing verified userId)
    const context = await searchRelevantChunks({
      documentId,
      userId,
      question,
    });

    // 7. Generate answer with Gemini
    const answer = await generateAnswer({
      question,
      context,
      chatHistory: history,
    });

    // 8. Persist user + assistant messages
    await supabase.from("messages").insert([
      {
        chat_id: effectiveChatId,
        role: "user",
        content: question,
      },
      {
        chat_id: effectiveChatId,
        role: "assistant",
        content: answer,
      },
    ]);

    return NextResponse.json({
      chatId: effectiveChatId,
      answer,
    });
  } catch (error) {
    console.error("Chat POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}