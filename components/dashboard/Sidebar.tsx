"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CheckSquare,
    StickyNote,
    Bookmark,
    Kanban,
    Settings,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: CheckSquare, label: "Tasks", href: "/workspace/tasks" },
    { icon: StickyNote, label: "Notes", href: "/workspace/notes" },
    { icon: Bookmark, label: "Bookmarks", href: "/workspace/bookmarks" },
    { icon: Kanban, label: "Pipelines", href: "/workspace/pipelines" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={cn(
            "relative h-screen glass border-r border-white/10 transition-all duration-300 flex flex-col z-40 overflow-hidden",
            "hidden md:flex",
            collapsed ? "w-20" : "w-64"
        )}>
            <div className="p-6 flex items-center justify-between">
                {!collapsed && (
                    <span className="font-brand italic text-xl font-bold">Workspace OS</span>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="ml-auto"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </Button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-none scroll-smooth">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/10",
                                isActive ? "bg-white/10 text-primary font-medium" : "text-slate-500",
                                collapsed && "justify-center px-0"
                            )}
                        >
                            <item.icon size={22} className={cn(isActive && "text-indigo-500")} />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-white/10">
                {!collapsed ? (
                    <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-4">
                        <p className="text-xs font-semibold text-indigo-400 uppercase mb-2">Workspace Plan</p>
                        <p className="text-sm font-bold mb-4">Pro Plan</p>
                        <Button size="sm" className="w-full rounded-lg bg-indigo-500 hover:bg-indigo-600">
                            Upgrade
                        </Button>
                    </div>
                ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-500 mx-auto" title="Pro Plan" />
                )}
            </div>
        </div>
    );
}
