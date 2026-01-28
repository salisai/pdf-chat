import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseServerClient, getUserIdFromHeaders } from "@/lib/supabase-server";
import { ensureServerEnv } from "@/lib/env";
import { extractTextFromPdf, ingestDocumentIntoPinecone } from "@/lib/rag";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    ensureServerEnv();

    const supabase = getSupabaseServerClient();
    const userId = getUserIdFromHeaders(req.headers);

    const formData = await req.formData();
    const file = formData.get("file");
    const title = String(formData.get("title") || "");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const documentId = randomUUID();
    const storagePath = `${userId ?? "anonymous"}/${documentId}.pdf`;

    // 1. Store file in Supabase storage
    const { error: storageError } = await supabase.storage
      .from("documents")
      .upload(storagePath, fileBuffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (storageError) {
      console.error("Supabase storage error:", storageError);
      return NextResponse.json({ error: "Failed to store file" }, { status: 500 });
    }

    // 2. Create document record (status: processing)
    const { error: insertError } = await supabase.from("documents").insert({
      id: documentId,
      user_id: userId,
      title: title || file.name,
      file_path: storagePath,
      status: "processing",
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ error: "Failed to create document record" }, { status: 500 });
    }

    // 3. Ingestion pipeline (synchronous for now)
    const text = await extractTextFromPdf(fileBuffer);

    await ingestDocumentIntoPinecone({
      documentId,
      userId,
      text,
    });

    await supabase
      .from("documents")
      .update({ status: "ready" })
      .eq("id", documentId);

    return NextResponse.json({
      id: documentId,
      status: "ready",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

