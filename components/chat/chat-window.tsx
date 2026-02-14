"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/chat/message-bubble";
import { SendIcon, PaperclipIcon, PlusIcon, LoaderIcon } from "lucide-react";
import { sendChatMessage, getChatHistory } from "@/lib/api-client";
import type { Message } from "@/lib/database.types";

interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export function ChatWindow() {
    const params = useParams();
    const documentId = params?.id as string;

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);
    const [documentTitle, setDocumentTitle] = useState("Document");

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Load chat history if chatId exists
    useEffect(() => {
        if (chatId) {
            loadChatHistory();
        }
    }, [chatId]);

    const loadChatHistory = async () => {
        if (!chatId) return;

        try {
            setIsLoading(true);
            const data = await getChatHistory(chatId);

            if (data.messages) {
                const formattedMessages: ChatMessage[] = data.messages.map((msg: Message) => ({
                    role: msg.role as "user" | "assistant",
                    content: msg.content,
                }));
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error("Failed to load chat history:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isSending || !documentId) return;

        const userMessage = input.trim();
        setInput("");

        // Add user message immediately
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsSending(true);

        try {
            const response = await sendChatMessage(documentId, userMessage, chatId);

            // Update chatId if this is the first message
            if (!chatId && response.chatId) {
                setChatId(response.chatId);
            }

            // Add assistant response
            setMessages(prev => [...prev, { role: "assistant", content: response.answer }]);

            // Focus back on input
            inputRef.current?.focus();
        } catch (error) {
            console.error("Failed to send message:", error);

            // Add error message
            setMessages(prev => [...prev, {
                role: "system",
                content: "Sorry, there was an error processing your message. Please try again."
            }]);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-white relative">
            {/* Header */}
            <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4 bg-white z-10">
                <div className="flex flex-col overflow-hidden">
                    <h2 className="font-semibold text-sm truncate text-neutral-900">
                        {documentTitle}
                    </h2>
                    <p className="text-[11px] text-neutral-500">
                        {messages.length > 0 ? `${Math.floor(messages.length / 2)} messages` : "Start a conversation"}
                    </p>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-neutral-500 hover:text-neutral-900"
                        onClick={() => {
                            setChatId(null);
                            setMessages([]);
                        }}
                        title="New chat"
                    >
                        <PlusIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 pb-24">
                <div className="space-y-6 max-w-2xl mx-auto pt-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-sm text-muted-foreground mb-2">No messages yet</p>
                            <p className="text-xs text-muted-foreground">
                                Ask a question about your document to get started
                            </p>
                        </div>
                    ) : (
                        <>
                            {messages.map((message, index) => (
                                <MessageBubble
                                    key={index}
                                    role={message.role === "assistant" ? "ai" : message.role}
                                    content={message.content}
                                />
                            ))}
                            {isSending && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <LoaderIcon className="h-4 w-4 animate-spin" />
                                    <span>Thinking...</span>
                                </div>
                            )}
                        </>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-neutral-200">
                <div className="max-w-2xl mx-auto relative flex gap-2 items-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-10 w-10 text-neutral-500 hover:bg-neutral-100 rounded-lg"
                        disabled
                    >
                        <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <div className="relative flex-1">
                        <Input
                            ref={inputRef}
                            placeholder="Ask any question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isSending}
                            className="w-full rounded-lg pl-4 pr-12 h-10 border-neutral-200 bg-neutral-50 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-all"
                        />
                        <Button
                            size="icon"
                            className="absolute right-1 top-1 h-8 w-8 rounded-md shrink-0 bg-black hover:bg-neutral-800 shadow-sm"
                            onClick={handleSend}
                            disabled={!input.trim() || isSending}
                        >
                            {isSending ? (
                                <LoaderIcon className="h-4 w-4 text-white animate-spin" />
                            ) : (
                                <SendIcon className="h-4 w-4 text-white" />
                            )}
                        </Button>
                    </div>
                </div>
                <p className="text-center text-[10px] text-neutral-400 mt-3 font-medium">
                    AI can make mistakes. Please verify important information.
                </p>
            </div>
        </div>
    );
}
