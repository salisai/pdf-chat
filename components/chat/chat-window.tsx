import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/chat/message-bubble";
import { SendIcon, PaperclipIcon, PlusIcon } from "lucide-react";

export function ChatWindow() {
    return (
        <div className="flex flex-col h-full w-full bg-white relative">
            {/* Header */}
            <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4 bg-white z-10">
                <div className="flex flex-col overflow-hidden">
                    <h2 className="font-semibold text-sm truncate text-neutral-900">Q4 Financial Report.pdf</h2>
                    <p className="text-[11px] text-neutral-500">2.4 MB • 12 pages</p>
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-neutral-900">
                        <PlusIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 pb-24">
                <div className="space-y-6 max-w-2xl mx-auto pt-4">
                    <MessageBubble role="system" content="Chat session started" />
                    <MessageBubble role="user" content="Summarize the key findings of this report." />
                    <MessageBubble role="ai" content="Based on the Q4 Financial Report, here are the key findings:\n\n1. Revenue increased by 15% YoY.\n2. Operating expenses were reduced by 8% due to efficiency measures.\n3. Net profit margin improved to 22%.\n\nWould you like me to elaborate on any specific section?" />
                    <MessageBubble role="user" content="Tell me more about the operating expenses." />
                    <MessageBubble role="ai" content="Operating expenses saw a significant reduction primarily in the marketing and administrative sectors. Marketing spend was optimized through targeted digital campaigns, saving 12%, while administrative overhead was reduced by implemented automated workflows." />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-neutral-200">
                <div className="max-w-2xl mx-auto relative flex gap-2 items-end">
                    <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10 text-neutral-500 hover:bg-neutral-100 rounded-lg">
                        <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <div className="relative flex-1">
                        <Input
                            placeholder="Ask any question..."
                            className="w-full rounded-lg pl-4 pr-12 h-10 border-neutral-200 bg-neutral-50 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-all"
                        />
                        <Button size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-md shrink-0 bg-black hover:bg-neutral-800 shadow-sm">
                            <SendIcon className="h-4 w-4 text-white" />
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
