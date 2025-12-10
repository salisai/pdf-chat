import { ChatWindow } from "@/components/chat/chat-window";
import { PDFViewer } from "@/components/document/pdf-viewer";

export default function DocumentPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <div className="flex-1 min-w-0">
                <PDFViewer />
            </div>
            <div className="w-[400px] border-l bg-background hidden lg:flex flex-col z-20 shadow-xl">
                <ChatWindow />
            </div>
        </div>
    );
}
