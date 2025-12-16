import { ChatWindow } from "@/components/chat/chat-window";
import { PDFViewer } from "@/components/document/pdf-viewer";

export default function DocumentPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <div className="flex-1 min-w-0 bg-neutral-100/50">
                <PDFViewer />
            </div>
            <div className="w-[450px] border-l border-neutral-200 bg-background hidden lg:flex flex-col z-20">
                <ChatWindow />
            </div>
        </div>
    );
}
