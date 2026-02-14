"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontalIcon, FileTextIcon, TrashIcon, MessageSquareIcon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { getDocuments, deleteDocument } from "@/lib/api-client";
import type { Document } from "@/lib/database.types";

export function FileList() {
    const router = useRouter();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            setIsLoading(true);
            const docs = await getDocuments();
            setDocuments(docs);
        } catch (error) {
            console.error("Failed to load documents:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (documentId: string) => {
        if (!confirm("Are you sure you want to delete this document? This will also delete all associated chats.")) {
            return;
        }

        try {
            setDeletingId(documentId);
            await deleteDocument(documentId);
            // Remove from local state
            setDocuments(docs => docs.filter(doc => doc.id !== documentId));
        } catch (error) {
            console.error("Failed to delete document:", error);
            alert("Failed to delete document. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleChat = (documentId: string) => {
        router.push(`/chat/${documentId}`);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { label: string; className: string }> = {
            ready: {
                label: "Ready",
                className: "bg-neutral-100 text-black ring-neutral-200"
            },
            processing: {
                label: "Processing",
                className: "bg-white text-neutral-500 ring-neutral-200"
            },
            failed: {
                label: "Failed",
                className: "bg-red-50 text-red-600 ring-red-200"
            }
        };

        const config = statusMap[status] || statusMap.ready;
        return (
            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}>
                {config.label}
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                <div className="p-6 pb-0">
                    <h3 className="font-semibold leading-none tracking-tight">Recent Documents</h3>
                    <p className="text-sm text-muted-foreground pt-1">Manage your uploaded PDFs and start chatting.</p>
                </div>
                <div className="p-6 flex items-center justify-center min-h-[200px]">
                    <LoaderIcon className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </div>
        );
    }

    if (documents.length === 0) {
        return (
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                <div className="p-6 pb-0">
                    <h3 className="font-semibold leading-none tracking-tight">Recent Documents</h3>
                    <p className="text-sm text-muted-foreground pt-1">Manage your uploaded PDFs and start chatting.</p>
                </div>
                <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                    <FileTextIcon className="h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">No documents yet. Upload your first PDF to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6 pb-0">
                <h3 className="font-semibold leading-none tracking-tight">Recent Documents</h3>
                <p className="text-sm text-muted-foreground pt-1">Manage your uploaded PDFs and start chatting.</p>
            </div>
            <div className="p-0 mt-4">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b border-neutral-100 transition-colors hover:bg-neutral-50/50">
                                <th className="h-10 px-4 align-middle font-medium text-xs uppercase text-neutral-500 w-[50%]">Name</th>
                                <th className="h-10 px-4 align-middle font-medium text-xs uppercase text-neutral-500">Date</th>
                                <th className="h-10 px-4 align-middle font-medium text-xs uppercase text-neutral-500">Status</th>
                                <th className="h-10 px-4 align-middle font-medium text-xs uppercase text-neutral-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {documents.map((doc) => (
                                <tr key={doc.id} className="border-b border-neutral-100 transition-colors hover:bg-neutral-50/50">
                                    <td className="p-4 align-middle font-medium text-neutral-900">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-md border border-neutral-200 p-1.5 bg-white shadow-sm">
                                                <FileTextIcon className="h-4 w-4 text-black" />
                                            </div>
                                            <span className="truncate max-w-md">{doc.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-neutral-500">{formatDate(doc.created_at)}</td>
                                    <td className="p-4 align-middle">
                                        {getStatusBadge(doc.status)}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 p-0"
                                                    disabled={deletingId === doc.id}
                                                >
                                                    {deletingId === doc.id ? (
                                                        <LoaderIcon className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <MoreHorizontalIcon className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    onClick={() => handleChat(doc.id)}
                                                    disabled={doc.status !== "ready"}
                                                >
                                                    <MessageSquareIcon className="mr-2 h-4 w-4" />
                                                    Chat
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600 cursor-pointer"
                                                    onClick={() => handleDelete(doc.id)}
                                                >
                                                    <TrashIcon className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
