import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * DELETE /api/documents/[id]
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: documentId } = await params;
        const supabase = await createClient();
        
        // Get the authenticated user from Supabase
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id;

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

        // Secure Ownership Check
        if (doc.user_id !== userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // 2. Delete file from storage
        const { error: storageError } = await supabase.storage
            .from("documents")
            .remove([doc.file_path]);

        if (storageError) {
            console.error("Storage deletion error:", storageError);
        }

        // 3. Delete document record
        const { error: deleteError } = await supabase
            .from("documents")
            .delete()
            .eq("id", documentId);

        if (deleteError) {
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
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: documentId } = await params;
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

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

        // Secure Ownership Check
        if (doc.user_id !== user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        return NextResponse.json({ document: doc });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}