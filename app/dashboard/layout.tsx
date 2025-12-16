import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <DashboardSidebar />
            <div className="md:pl-64 min-h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
}
