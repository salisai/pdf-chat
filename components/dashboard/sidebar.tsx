import Link from "next/link";
import { CopyIcon, HomeIcon, FileTextIcon, SettingsIcon, LogOutIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
    return (
        <aside className="w-64 border-r bg-background hidden md:flex flex-col h-full fixed left-0 top-0 bottom-0 z-30">
            <div className="h-16 flex items-center px-6 border-b">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
                    <div className="rounded-md bg-primary p-1 text-primary-foreground">
                        <CopyIcon className="h-4 w-4" />
                    </div>
                    <span>ChatPDF</span>
                </Link>
            </div>
            <div className="flex-1 py-6 px-4 space-y-2">
                <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                        <HomeIcon className="mr-2 h-4 w-4" />
                        Dashboard
                    </Button>
                </Link>
                <Link href="/dashboard/documents">
                    <Button variant="ghost" className="w-full justify-start">
                        <FileTextIcon className="mr-2 h-4 w-4" />
                        Documents
                    </Button>
                </Link>
                <Link href="/dashboard/chats">
                    <Button variant="ghost" className="w-full justify-start">
                        <MessageSquareIcon className="mr-2 h-4 w-4" />
                        My Chats
                    </Button>
                </Link>
                <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                </Link>
            </div>
            <div className="p-4 border-t">
                <Button variant="outline" className="w-full justify-start text-muted-foreground hover:text-foreground">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Log out
                </Button>
            </div>
        </aside>
    );
}
