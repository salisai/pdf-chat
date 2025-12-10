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
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground w-[50%]">Name</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Size</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {mockFiles.map((file) => (
                                <tr key={file.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-md border p-1 bg-background">
                                                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <span>{file.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-muted-foreground">{file.date}</td>
                                    <td className="p-4 align-middle text-muted-foreground">{file.size}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${file.status === "Ready"
                                                ? "border-transparent bg-green-500/10 text-green-700"
                                                : "border-transparent bg-blue-500/10 text-blue-700"
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
