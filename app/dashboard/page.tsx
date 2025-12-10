import { UploadZone } from "@/components/dashboard/upload-zone";
import { FileList } from "@/components/dashboard/file-list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your documents and start chatting with AI.
                    </p>
                </div>
                <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New Upload
                </Button>
            </div>

            <UploadZone />
            <FileList />
        </div>
    );
}
