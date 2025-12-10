import { UploadCloudIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function UploadZone() {
    return (
        <Card className="border-2 border-dashed shadow-none hover:bg-muted/50 transition-colors cursor-pointer group">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="p-4 rounded-full bg-muted group-hover:bg-background transition-colors">
                    <UploadCloudIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Click to upload or drag and drop</h3>
                    <p className="text-sm text-muted-foreground">
                        PDF files up to 10MB (Max 5 files)
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
