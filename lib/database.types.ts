/**
 * Database Types for Supabase Tables
 * Auto-generated based on the database schema
 */

// =====================================================
// TABLE TYPES
// =====================================================

/**
 * Document status enum
 */
export type DocumentStatus = 'processing' | 'ready' | 'failed';

/**
 * Message role enum
 */
export type MessageRole = 'user' | 'assistant';

/**
 * Documents table row type
 */
export interface Document {
    id: string; // UUID
    user_id: string | null;
    title: string;
    file_path: string;
    status: DocumentStatus;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

/**
 * Documents table insert type
 */
export interface DocumentInsert {
    id?: string; // Optional, auto-generated if not provided
    user_id?: string | null;
    title: string;
    file_path: string;
    status: DocumentStatus;
    created_at?: string; // Optional, auto-generated if not provided
    updated_at?: string; // Optional, auto-generated if not provided
}

/**
 * Documents table update type
 */
export interface DocumentUpdate {
    user_id?: string | null;
    title?: string;
    file_path?: string;
    status?: DocumentStatus;
    updated_at?: string; // Auto-updated by trigger
}

/**
 * Chats table row type
 */
export interface Chat {
    id: string; // UUID
    document_id: string; // UUID
    user_id: string | null;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

/**
 * Chats table insert type
 */
export interface ChatInsert {
    id?: string; // Optional, auto-generated if not provided
    document_id: string;
    user_id?: string | null;
    created_at?: string; // Optional, auto-generated if not provided
    updated_at?: string; // Optional, auto-generated if not provided
}

/**
 * Chats table update type
 */
export interface ChatUpdate {
    document_id?: string;
    user_id?: string | null;
    updated_at?: string; // Auto-updated by trigger
}

/**
 * Messages table row type
 */
export interface Message {
    id: string; // UUID
    chat_id: string; // UUID
    role: MessageRole;
    content: string;
    created_at: string; // ISO timestamp
}

/**
 * Messages table insert type
 */
export interface MessageInsert {
    id?: string; // Optional, auto-generated if not provided
    chat_id: string;
    role: MessageRole;
    content: string;
    created_at?: string; // Optional, auto-generated if not provided
}

/**
 * Messages table update type
 */
export interface MessageUpdate {
    chat_id?: string;
    role?: MessageRole;
    content?: string;
}

// =====================================================
// JOINED/EXTENDED TYPES
// =====================================================

/**
 * Document with chat count
 */
export interface DocumentWithChatCount extends Document {
    chat_count: number;
}

/**
 * Chat with messages
 */
export interface ChatWithMessages extends Chat {
    messages: Message[];
}

/**
 * Chat with document info
 */
export interface ChatWithDocument extends Chat {
    document: Document;
}

/**
 * Full chat session with document and messages
 */
export interface FullChatSession extends Chat {
    document: Document;
    messages: Message[];
}

// =====================================================
// API RESPONSE TYPES
// =====================================================

/**
 * Upload API response
 */
export interface UploadResponse {
    id: string;
    status: DocumentStatus;
}

/**
 * Documents list API response
 */
export interface DocumentsResponse {
    documents: Array<{
        id: string;
        title: string;
        file_path: string;
        status: DocumentStatus;
        created_at: string;
    }>;
}

/**
 * Chat API response
 */
export interface ChatResponse {
    chatId: string;
    answer: string;
}

/**
 * Chat API request
 */
export interface ChatRequest {
    documentId: string;
    question: string;
    chatId?: string | null;
}

// =====================================================
// STORAGE TYPES
// =====================================================

/**
 * Storage file metadata
 */
export interface StorageFile {
    name: string;
    id: string;
    updated_at: string;
    created_at: string;
    last_accessed_at: string;
    metadata: {
        eTag: string;
        size: number;
        mimetype: string;
        cacheControl: string;
    };
}

/**
 * Storage path structure
 */
export interface StoragePath {
    userId: string | 'anonymous';
    documentId: string;
    filename: string; // Should be `${documentId}.pdf`
}

// =====================================================
// UTILITY TYPES
// =====================================================

/**
 * Database error response
 */
export interface DatabaseError {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
    page: number;
    limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// =====================================================
// SUPABASE CLIENT TYPES
// =====================================================

/**
 * Supabase database schema
 */
export interface Database {
    public: {
        Tables: {
            documents: {
                Row: Document;
                Insert: DocumentInsert;
                Update: DocumentUpdate;
            };
            chats: {
                Row: Chat;
                Insert: ChatInsert;
                Update: ChatUpdate;
            };
            messages: {
                Row: Message;
                Insert: MessageInsert;
                Update: MessageUpdate;
            };
        };
    };
}

// =====================================================
// TYPE GUARDS
// =====================================================

/**
 * Check if status is valid DocumentStatus
 */
export function isDocumentStatus(status: string): status is DocumentStatus {
    return ['processing', 'ready', 'failed'].includes(status);
}

/**
 * Check if role is valid MessageRole
 */
export function isMessageRole(role: string): role is MessageRole {
    return ['user', 'assistant'].includes(role);
}

/**
 * Check if object is a valid Document
 */
export function isDocument(obj: unknown): obj is Document {
    if (typeof obj !== 'object' || obj === null) return false;
    const doc = obj as Record<string, unknown>;
    return (
        typeof doc.id === 'string' &&
        (doc.user_id === null || typeof doc.user_id === 'string') &&
        typeof doc.title === 'string' &&
        typeof doc.file_path === 'string' &&
        isDocumentStatus(doc.status as string) &&
        typeof doc.created_at === 'string' &&
        typeof doc.updated_at === 'string'
    );
}

/**
 * Check if object is a valid Message
 */
export function isMessage(obj: unknown): obj is Message {
    if (typeof obj !== 'object' || obj === null) return false;
    const msg = obj as Record<string, unknown>;
    return (
        typeof msg.id === 'string' &&
        typeof msg.chat_id === 'string' &&
        isMessageRole(msg.role as string) &&
        typeof msg.content === 'string' &&
        typeof msg.created_at === 'string'
    );
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Format storage path for a document
 */
export function formatStoragePath(userId: string | null, documentId: string): string {
    const userFolder = userId ?? 'anonymous';
    return `${userFolder}/${documentId}.pdf`;
}

/**
 * Parse storage path to extract userId and documentId
 */
export function parseStoragePath(path: string): StoragePath | null {
    const parts = path.split('/');
    if (parts.length !== 2) return null;

    const [userId, filename] = parts;
    const documentId = filename.replace('.pdf', '');

    return {
        userId,
        documentId,
        filename,
    };
}

/**
 * Get public URL for a document (requires signed URL for private buckets)
 */
export function getDocumentStoragePath(document: Document): string {
    return document.file_path;
}

/**
 * Format chat history for AI context
 */
export function formatChatHistory(messages: Message[]): Array<{ role: MessageRole; content: string }> {
    return messages.map(msg => ({
        role: msg.role,
        content: msg.content,
    }));
}

/**
 * Check if document is ready for chat
 */
export function isDocumentReady(document: Document): boolean {
    return document.status === 'ready';
}

/**
 * Get document status display text
 */
export function getDocumentStatusText(status: DocumentStatus): string {
    const statusMap: Record<DocumentStatus, string> = {
        processing: 'Processing...',
        ready: 'Ready',
        failed: 'Failed',
    };
    return statusMap[status];
}

/**
 * Get document status color (for UI)
 */
export function getDocumentStatusColor(status: DocumentStatus): string {
    const colorMap: Record<DocumentStatus, string> = {
        processing: 'yellow',
        ready: 'green',
        failed: 'red',
    };
    return colorMap[status];
}
