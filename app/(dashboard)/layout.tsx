import { Sidebar } from "@/components/dashboard/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
