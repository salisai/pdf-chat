import { Button } from "@/components/ui/button";
import { ZoomInIcon, ZoomOutIcon, RotateCwIcon, DownloadIcon, PrinterIcon } from "lucide-react";

export function PDFViewer() {
    return (
        <div className="flex flex-col h-full bg-gray-100 border-r">
            {/* Viewer Toolbar */}
            <div className="h-14 border-b bg-white flex items-center justify-between px-4 shadow-sm z-10">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ZoomOutIcon className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-medium w-12 text-center">100%</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ZoomInIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="text-sm font-medium truncate max-w-[200px]">
                    Q4_Financial_Report.pdf
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RotateCwIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <DownloadIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PrinterIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* PDF Content Placeholder */}
            <div className="flex-1 overflow-auto p-8 flex justify-center">
                <div className="bg-white shadow-lg w-full max-w-3xl min-h-[800px] rounded-sm p-12 text-gray-800">
                    <h1 className="text-4xl font-bold mb-8 text-black">Q4 Financial Report</h1>
                    <div className="space-y-6 text-justify">
                        <div className="h-4 bg-gray-100 rounded w-full" />
                        <div className="h-4 bg-gray-100 rounded w-[90%]" />
                        <div className="h-4 bg-gray-100 rounded w-[95%]" />
                        <div className="h-4 bg-gray-100 rounded w-[80%]" />
                        <p className="leading-relaxed">
                            Overview of Financial Performance:
                            The fourth quarter demonstrated robust growth across all key sectors. Revenue increased by 15% year-over-year, driven primarily by the expansion of our enterprise software division. Operational efficiencies implemented in Q3 began to yield significant cost savings, improving our net operating margins.
                        </p>
                        <div className="grid grid-cols-2 gap-8 my-12">
                            <div className="h-40 bg-gray-50 border rounded flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">Chart: Revenue Growth</span>
                            </div>
                            <div className="h-40 bg-gray-50 border rounded flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">Chart: Expense Breakdown</span>
                            </div>
                        </div>
                        <p className="leading-relaxed">
                            Future Outlook:
                            Entering the new fiscal year, we project continued momentum. Our strategic focus will shift towards market penetration in emerging regions and further investment in R&D to sustain our competitive advantage.
                        </p>
                        <div className="h-4 bg-gray-100 rounded w-full" />
                        <div className="h-4 bg-gray-100 rounded w-[92%]" />
                    </div>

                    <div className="mt-20 pt-8 border-t text-xs text-center text-gray-400">
                        Page 1 of 12
                    </div>
                </div>
            </div>
        </div>
    );
}
