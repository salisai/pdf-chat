import { createClient } from "@/lib/supabase/client";
import type { Document, ChatResponse, DocumentsResponse } from "./types/database.types";

const API_BASE = "/api";
const supabase = createClient();

/**
 * Helper to get the current session and common headers.
 */
async function getAuthHeaders(extraHeaders: Record<string, string> = {}): Promise<HeadersInit> {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    const headers: Record<string, string> = { ...extraHeaders };
    
    if (userId) {
        headers["x-user-id"] = userId;
    }

    return headers;
}

/**
 * Upload a PDF file to the server
 */
export async function uploadDocument(
    file: File,
    title?: string
): Promise<{ id: string; status: string }> {
    const formData = new FormData();
    formData.append("file", file);
    if (title) formData.append("title", title);

    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers,
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Upload failed" }));
        throw new Error(error.error || "Failed to upload document");
    }

    return response.json();
}

/**
 * Get all documents for the current user
 */
export async function getDocuments(): Promise<Document[]> {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE}/documents`, {
        headers,
    });

    if (!response.ok) {
        throw new Error("Failed to fetch documents");
    }

    const data: DocumentsResponse = await response.json();
    return data.documents;
}

/**
 * Delete a document by ID
 */
export async function deleteDocument(documentId: string): Promise<void> {
    const headers = await getAuthHeaders({
        "Content-Type": "application/json",
    });

    const response = await fetch(`${API_BASE}/documents/${documentId}`, {
        method: "DELETE",
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Delete failed" }));
        throw new Error(error.error || "Failed to delete document");
    }
}

/**
 * Send a chat message
 */
export async function sendChatMessage(
    documentId: string,
    question: string,
    chatId?: string | null
): Promise<ChatResponse> {
    const headers = await getAuthHeaders({
        "Content-Type": "application/json",
    });

    const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            documentId,
            question,
            chatId,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Chat failed" }));
        throw new Error(error.error || "Failed to send message");
    }

    return response.json();
}

/**
 * Get chat history for a specific chat session
 */
export async function getChatHistory(chatId: string) {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE}/chat/${chatId}`, {
        headers,
    });

    if (!response.ok) {
        throw new Error("Failed to fetch chat history");
    }

    return response.json();
}

/**
 * Get all chats for a specific document
 */
export async function getDocumentChats(documentId: string) {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE}/documents/${documentId}/chats`, {
        headers,
    });

    if (!response.ok) {
        throw new Error("Failed to fetch document chats");
    }

    return response.json();
}