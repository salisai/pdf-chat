"use client";

import { useState, useCallback } from "react";
import { UploadCloudIcon, CheckCircle2Icon, XCircleIcon, LoaderIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { uploadDocument } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export function UploadZone() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFile = useCallback(async (file: File) => {
        // Validate file type
        if (file.type !== "application/pdf") {
            setUploadStatus("error");
            setErrorMessage("Only PDF files are allowed");
            setTimeout(() => setUploadStatus("idle"), 3000);
            return;
        }

        // Validate file size (50MB limit)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            setUploadStatus("error");
            setErrorMessage("File size must be less than 50MB");
            setTimeout(() => setUploadStatus("idle"), 3000);
            return;
        }

        setIsUploading(true);
        setUploadStatus("idle");

        try {
            const result = await uploadDocument(file);
            setUploadStatus("success");

            // Refresh the page to show new document
            setTimeout(() => {
                router.refresh();
                setUploadStatus("idle");
            }, 1500);
        } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Upload failed");
            setTimeout(() => setUploadStatus("idle"), 3000);
        } finally {
            setIsUploading(false);
        }
    }, [router]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFile(files[0]); // Only handle first file
        }
    }, [handleFile]);

    const handleClick = useCallback(() => {
        if (isUploading) return;

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/pdf";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                handleFile(file);
            }
        };
        input.click();
    }, [isUploading, handleFile]);

    return (
        <Card
            className={`border-2 border-dashed shadow-none transition-all cursor-pointer group ${isDragging
                    ? "border-primary bg-primary/5"
                    : uploadStatus === "success"
                        ? "border-green-500 bg-green-50"
                        : uploadStatus === "error"
                            ? "border-red-500 bg-red-50"
                            : "hover:bg-muted/50"
                } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className={`p-4 rounded-full transition-colors ${uploadStatus === "success"
                        ? "bg-green-100"
                        : uploadStatus === "error"
                            ? "bg-red-100"
                            : "bg-muted group-hover:bg-background"
                    }`}>
                    {isUploading ? (
                        <LoaderIcon className="h-8 w-8 text-primary animate-spin" />
                    ) : uploadStatus === "success" ? (
                        <CheckCircle2Icon className="h-8 w-8 text-green-600" />
                    ) : uploadStatus === "error" ? (
                        <XCircleIcon className="h-8 w-8 text-red-600" />
                    ) : (
                        <UploadCloudIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                </div>
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg">
                        {isUploading
                            ? "Uploading..."
                            : uploadStatus === "success"
                                ? "Upload successful!"
                                : uploadStatus === "error"
                                    ? "Upload failed"
                                    : "Click to upload or drag and drop"
                        }
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {uploadStatus === "error"
                            ? errorMessage
                            : "PDF files up to 50MB"
                        }
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
