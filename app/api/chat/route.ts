import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getUserIdFromHeaders } from "@/lib/supabase-server";
import { generateAnswer } from "@/lib/gemini";
import { searchRelevantChunks } from "@/lib/rag";

export const dynamic = "force-dynamic";

type MessageRole = "user" | "assistant";

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const userId = getUserIdFromHeaders(req.headers);
    const body = await req.json();

    const { documentId, question, chatId } = body as {
      documentId?: string;
      question?: string;
      chatId?: string | null;
    };

    if (!documentId || !question) {
      return NextResponse.json({ error: "Missing documentId or question" }, { status: 400 });
    }

    // 1. Ensure document exists and is ready
    const { data: doc, error: docError } = await supabase
      .from("documents")
      .select("id, status")
      .eq("id", documentId)
      .single();

    if (docError || !doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    if (doc.status !== "ready") {
      return NextResponse.json({ error: "Document not ready yet" }, { status: 409 });
    }

    // 2. Ensure chat session
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
        console.error("Supabase chat insert error:", chatError);
        return NextResponse.json({ error: "Failed to create chat session" }, { status: 500 });
      }

      effectiveChatId = chat.id;
    }

    // 3. Get recent messages for context
    const { data: messages, error: messagesError } = await supabase
      .from("messages")
      .select("role, content")
      .eq("chat_id", effectiveChatId)
      .order("created_at", { ascending: true })
      .limit(20);

    if (messagesError) {
      console.error("Supabase messages error:", messagesError);
      return NextResponse.json({ error: "Failed to load chat history" }, { status: 500 });
    }

    const history =
      messages?.map((m) => ({
        role: m.role as MessageRole,
        content: m.content as string,
      })) ?? [];

    // 4. RAG: semantic search over Pinecone
    const context = await searchRelevantChunks({
      documentId,
      userId,
      question,
    });

    // 5. Generate answer with Gemini
    const answer = await generateAnswer({
      question,
      context,
      chatHistory: history,
    });

    // 6. Persist user + assistant messages
    const { error: insertMessagesError } = await supabase.from("messages").insert([
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

    if (insertMessagesError) {
      console.error("Supabase messages insert error:", insertMessagesError);
    }

    return NextResponse.json({
      chatId: effectiveChatId,
      answer,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

