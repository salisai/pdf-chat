import { MoreHorizontalIcon, FileTextIcon, TrashIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const mockFiles = [
    { id: 1, name: "Q4_Financial_Report.pdf", date: "2 mins ago", size: "2.4 MB", status: "Ready" },
    { id: 2, name: "Project_Proposal_Draft_v3.pdf", date: "1 hour ago", size: "1.1 MB", status: "Processing" },
    { id: 3, name: "Employee_Handbook_2024.pdf", date: "2 days ago", size: "4.8 MB", status: "Ready" },
    { id: 4, name: "Market_Analysis_Deep_Dive.pdf", date: "1 week ago", size: "8.2 MB", status: "Ready" },
];

export function FileList() {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6 pb-0">
                <h3 className="font-semibold leading-none tracking-tight">Recent Documents</h3>
                <p className="text-sm text-muted-foreground pt-1">Manage your uploaded PDFs and start chatting.</p>
            </div>
            <div className="p-0 mt-4">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b border-neutral-100 transition-colors hover:bg-neutral-50/50">
                                <th className="h-10 px-4 align-middle font-medium text-xs uppercase text-neutral-500 w-[50%]">Name</th>
                                <th className="h-10 px-4 align-middle font-medium text-xs uppercase text-neutral-500">Date</th>
                                <th className="h-10 px-4 align-middle font-medium text-xs uppercase text-neutral-500">Size</th>
                                <th className="h-10 px-4 align-middle font-medium text-xs uppercase text-neutral-500">Status</th>
                                <th className="h-10 px-4 align-middle font-medium text-xs uppercase text-neutral-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {mockFiles.map((file) => (
                                <tr key={file.id} className="border-b border-neutral-100 transition-colors hover:bg-neutral-50/50">
                                    <td className="p-4 align-middle font-medium text-neutral-900">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-md border border-neutral-200 p-1.5 bg-white shadow-sm">
                                                <FileTextIcon className="h-4 w-4 text-black" />
                                            </div>
                                            <span>{file.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-neutral-500">{file.date}</td>
                                    <td className="p-4 align-middle text-neutral-500">{file.size}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${file.status === "Ready"
                                            ? "bg-neutral-100 text-black ring-neutral-200"
                                            : "bg-white text-neutral-500 ring-neutral-200"
                                            }`}>
                                            {file.status}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                                    <MoreHorizontalIcon className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <MessageSquareIcon className="mr-2 h-4 w-4" />
                                                    Chat
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600 cursor-pointer">
                                                    <TrashIcon className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
