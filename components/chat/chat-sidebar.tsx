import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CopyIcon, PlusIcon, FileTextIcon } from "lucide-react";
import Link from "next/link";

export function ChatSidebar() {
    return (
        <aside className="w-64 border-r bg-muted/10 hidden lg:flex flex-col h-full">
            <div className="h-16 flex items-center px-4 border-b">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-sm">
                    <div className="rounded-md bg-transparent p-1">
                        <CopyIcon className="h-4 w-4" />
                    </div>
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            <div className="p-4">
                <Button className="w-full justify-start gap-2" variant="outline">
                    <PlusIcon className="h-4 w-4" />
                    New Chat
                </Button>
            </div>

            <div className="flex-1 overflow-auto py-2">
                <div className="px-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Your Documents
                </div>
                <nav className="space-y-1 px-2">
                    {[
                        { name: "Q4_Financial_Report.pdf", active: true },
                        { name: "Project_Proposal.pdf", active: false },
                        { name: "Meeting_Notes_Nov.pdf", active: false },
                    ].map((doc, i) => (
                        <Button
                            key={i}
                            variant={doc.active ? "secondary" : "ghost"}
                            className={cn("w-full justify-start text-xs h-9 truncate", doc.active && "bg-muted font-medium")}
                        >
                            <FileTextIcon className="mr-2 h-3 w-3 shrink-0 opacity-70" />
                            <span className="truncate">{doc.name}</span>
                        </Button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
