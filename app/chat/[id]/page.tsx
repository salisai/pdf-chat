import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatWindow } from "@/components/chat/chat-window";

export default function ChatPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <ChatSidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <ChatWindow />
            </main>
        </div>
    );
}
