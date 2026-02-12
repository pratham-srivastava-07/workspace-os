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
import { PricingModal } from "@/components/workspace/PricingModal";

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
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

    return (
        <>
            <div className={cn(
                "relative h-full glass border-r border-white/10 transition-all duration-300 flex flex-col z-40 overflow-hidden",
                "hidden md:flex",
                collapsed ? "w-16" : "w-60"
            )}>
                <div className="p-3.5 flex items-center justify-between">
                    {!collapsed && (
                        <span className="font-brand italic text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            Workspace
                        </span>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn("h-8 w-8 hover:bg-white/10", !collapsed && "ml-auto")}
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </Button>
                </div>

                <nav className="flex-1 px-2 py-1 space-y-0.5 overflow-hidden">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "bg-indigo-500/10 text-indigo-500 font-semibold"
                                        : "text-slate-500 hover:bg-white/5 hover:text-slate-900 dark:hover:text-white",
                                    collapsed && "justify-center px-0"
                                )}
                            >
                                <item.icon size={16} className={cn(isActive ? "text-indigo-500" : "group-hover:text-indigo-400 transition-colors")} />
                                {!collapsed && <span className="text-[13px]">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-2.5 mt-auto border-t border-white/10">
                    {!collapsed ? (
                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-2.5 border border-indigo-500/20 cursor-pointer hover:bg-white/5 transition-colors group/card">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider">PRO PLAN</p>
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/card:scale-125 transition-transform" />
                            </div>
                            <p className="text-[10px] font-medium mb-2 text-slate-500 dark:text-slate-400 leading-tight">Unlock all premium assets.</p>
                            <Button
                                size="sm"
                                onClick={() => setIsPricingModalOpen(true)}
                                className="w-full h-7 text-[10px] rounded-lg bg-indigo-500 hover:bg-indigo-600 shadow-md shadow-indigo-500/10 cursor-pointer"
                            >
                                Upgrade
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center mx-auto border border-indigo-500/20 cursor-pointer"
                            title="Pro Plan"
                            onClick={() => setIsPricingModalOpen(true)}
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        </div>
                    )}
                </div>
            </div>
            <PricingModal open={isPricingModalOpen} onOpenChange={setIsPricingModalOpen} />
        </>
    );
}
