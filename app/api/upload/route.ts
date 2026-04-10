import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { ensureServerEnv } from "@/lib/env";
import { extractTextFromPdf, ingestDocumentIntoPinecone } from "@/lib/rag";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    ensureServerEnv();

    // 1. Initialize authenticated server client
    const supabase = await createClient();
    
    // 2. Get verified user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const formData = await req.formData();
    const file = formData.get("file");
    const title = String(formData.get("title") || "");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const documentId = randomUUID();
    
    // Use the verified userId for the storage path
    const storagePath = `${userId}/${documentId}.pdf`;

    // 3. Store file in Supabase storage
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

    // 4. Create document record (status: processing)
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

    // 5. Ingestion pipeline
    // Note: Since this is synchronous, the request will hang until finished.
    const text = await extractTextFromPdf(fileBuffer);

    await ingestDocumentIntoPinecone({
      documentId,
      userId,
      text,
    });

    // 6. Update status to ready
    await supabase
      .from("documents")
      .update({ status: "ready" })
      .eq("id", documentId);

    return NextResponse.json({
      id: documentId,
      status: "ready",
    });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}