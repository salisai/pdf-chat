import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/chat/message-bubble";
import { SendIcon, PaperclipIcon, PlusIcon } from "lucide-react";

export function ChatWindow() {
    return (
        <div className="flex flex-col h-full w-full bg-background relative">
            {/* Header */}
            <div className="h-16 border-b flex items-center justify-between px-6 bg-background/95 backdrop-blur z-10">
                <div>
                    <h2 className="font-semibold text-lg">Q4 Financial Report.pdf</h2>
                    <p className="text-xs text-muted-foreground">Uploaded 2 mins ago • 2.4 MB</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Upload New
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">Clear Chat</Button>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 pb-24">
                <div className="space-y-4 max-w-3xl mx-auto">
                    <MessageBubble role="system" content="This chat session has started." />
                    <MessageBubble role="user" content="Summarize the key findings of this report." />
                    <MessageBubble role="ai" content="Based on the Q4 Financial Report, here are the key findings:\n\n1. Revenue increased by 15% YoY.\n2. Operating expenses were reduced by 8% due to efficiency measures.\n3. Net profit margin improved to 22%.\n\nWould you like me to elaborate on any specific section?" />
                    <MessageBubble role="user" content="Tell me more about the operating expenses." />
                    <MessageBubble role="ai" content="Operating expenses saw a significant reduction primarily in the marketing and administrative sectors. Marketing spend was optimized through targeted digital campaigns, saving 12%, while administrative overhead was reduced by implemented automated workflows." />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
                <div className="max-w-3xl mx-auto relative flex gap-2">
                    <Button variant="outline" size="icon" className="shrink-0 rounded-full h-10 w-10">
                        <PaperclipIcon className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Input
                        placeholder="Ask something about your PDF..."
                        className="rounded-full pl-5 pr-12 h-10 border-muted-foreground/20 focus-visible:ring-primary/20"
                    />
                    <Button size="icon" className="absolute right-1 top-1 bottom-1 h-8 w-8 rounded-full shrink-0">
                        <SendIcon className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-center text-[10px] text-muted-foreground mt-2">
                    AI can make mistakes. Please verify important information.
                </p>
            </div>
        </div>
    );
}
