import Link from "next/link";
import { CopyIcon, HomeIcon, FileTextIcon, SettingsIcon, LogOutIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
    return (
        <aside className="w-64 border-r border-neutral-200 bg-[#FAFAFA] hidden md:flex flex-col h-full fixed left-0 top-0 bottom-0 z-30">
            <div className="h-14 flex items-center px-4 border-b border-neutral-200">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-sm">
                    <div className="rounded-md bg-white border border-neutral-200 p-1 shadow-sm">
                        <CopyIcon className="h-4 w-4 text-black" />
                    </div>
                    <span className="text-neutral-900">ChatPDF</span>
                </Link>
            </div>
            <div className="flex-1 py-4 px-3 space-y-1">
                <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start h-9 px-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50">
                        <HomeIcon className="mr-2 h-4 w-4 text-neutral-500" />
                        Dashboard
                    </Button>
                </Link>
                <Link href="/dashboard/documents">
                    <Button variant="ghost" className="w-full justify-start h-9 px-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50">
                        <FileTextIcon className="mr-2 h-4 w-4 text-neutral-500" />
                        Documents
                    </Button>
                </Link>
                <Link href="/dashboard/chats">
                    <Button variant="ghost" className="w-full justify-start h-9 px-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50">
                        <MessageSquareIcon className="mr-2 h-4 w-4 text-neutral-500" />
                        My Chats
                    </Button>
                </Link>
                <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start h-9 px-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50">
                        <SettingsIcon className="mr-2 h-4 w-4 text-neutral-500" />
                        Settings
                    </Button>
                </Link>
            </div>
            <div className="p-3 border-t border-neutral-200">
                <Button variant="ghost" className="w-full justify-start h-9 px-3 text-neutral-500 hover:text-red-600 hover:bg-red-50">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Log out
                </Button>
            </div>
        </aside>
    );
}
