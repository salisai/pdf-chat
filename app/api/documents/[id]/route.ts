import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getUserIdFromHeaders } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/**
 * DELETE /api/documents/[id]
 * Delete a specific document and its associated data
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: documentId } = await params;
        const supabase = getSupabaseServerClient();
        const userId = getUserIdFromHeaders(req.headers);

        if (!documentId) {
            return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
        }

        // 1. Verify document exists and user has permission
        const { data: doc, error: docError } = await supabase
            .from("documents")
            .select("id, user_id, file_path")
            .eq("id", documentId)
            .single();

        if (docError || !doc) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        // Check ownership (allow if user_id matches or document is anonymous)
        if (doc.user_id && doc.user_id !== userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // 2. Delete file from storage
        const { error: storageError } = await supabase.storage
            .from("documents")
            .remove([doc.file_path]);

        if (storageError) {
            console.error("Storage deletion error:", storageError);
            // Continue anyway - the file might already be deleted
        }

        // 3. Delete document record (cascades to chats and messages)
        const { error: deleteError } = await supabase
            .from("documents")
            .delete()
            .eq("id", documentId);

        if (deleteError) {
            console.error("Document deletion error:", deleteError);
            return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

/**
 * GET /api/documents/[id]
 * Get a specific document's details
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: documentId } = await params;
        const supabase = getSupabaseServerClient();
        const userId = getUserIdFromHeaders(req.headers);

        if (!documentId) {
            return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
        }

        const { data: doc, error } = await supabase
            .from("documents")
            .select("*")
            .eq("id", documentId)
            .single();

        if (error || !doc) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        // Check ownership
        if (doc.user_id && doc.user_id !== userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        return NextResponse.json({ document: doc });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
