"use client";

import { useEffect, useState } from "react";
import { FadeIn, GlassCard } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Plus, Activity, Clock, Layers, Bookmark, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
    tasks: number;
    pipelines: number;
    notes: number;
    bookmarks: number;
}

interface ActivityEntry {
    id: string;
    title: string;
    type: "task" | "note" | "bookmark";
    date: string;
}

import { QuickCreateModal } from "./QuickCreateModal";
import { ManageWidgetsModal } from "./ManageWidgetsModal";

export default function Dashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<Stats | null>(null);
    const [activities, setActivities] = useState<ActivityEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [preferences, setPreferences] = useState<{ widgets: string[] } | null>(null);

    const [quickCreateOpen, setQuickCreateOpen] = useState(false);
    const [manageWidgetsOpen, setManageWidgetsOpen] = useState(false);

    const fetchData = async () => {
        try {
            const [statsRes, activityRes, prefRes] = await Promise.all([
                fetch("/api/dashboard/stats"),
                fetch("/api/dashboard/activity"),
                fetch("/api/user/preferences"),
            ]);
            const statsData = await statsRes.json();
            const activityData = await activityRes.json();
            const prefData = await prefRes.json();

            if (statsData.success) setStats(statsData.data);
            if (activityData.success) setActivities(activityData.data);
            if (prefData.success) setPreferences(prefData.data);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const isWidgetVisible = (id: string) => {
        if (!preferences?.widgets) return true; // Default to visible
        return preferences.widgets.includes(id);
    };

    return (
        <div className="space-y-8">
            <QuickCreateModal
                open={quickCreateOpen}
                onOpenChange={setQuickCreateOpen}
                onSuccess={fetchData}
            />
            <ManageWidgetsModal
                open={manageWidgetsOpen}
                onOpenChange={setManageWidgetsOpen}
                onSuccess={fetchData}
            />

            <FadeIn>
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-brand italic mb-2">
                            Good morning{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}
                        </h1>
                        <p className="text-slate-500 text-sm">Here's what's happening in your workspace today.</p>
                    </div>
                    <Button
                        className="rounded-full gap-2 shadow-lg shadow-indigo-500/20"
                        onClick={() => setQuickCreateOpen(true)}
                    >
                        <Plus size={18} />
                        Quick Create
                    </Button>
                </header>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isWidgetVisible("tasks") && (
                    <FadeIn delay={0.1}>
                        <StatCard
                            icon={<Activity className="text-indigo-500" />}
                            label="Tasks Due"
                            value={loading ? undefined : stats?.tasks.toString()}
                            loading={loading}
                        />
                    </FadeIn>
                )}
                {isWidgetVisible("pipelines") && (
                    <FadeIn delay={0.2}>
                        <StatCard
                            icon={<Layers className="text-emerald-500" />}
                            label="Active Pipelines"
                            value={loading ? undefined : stats?.pipelines.toString()}
                            loading={loading}
                        />
                    </FadeIn>
                )}
                {isWidgetVisible("notes") && (
                    <FadeIn delay={0.3}>
                        <StatCard
                            icon={<Clock className="text-yellow-500" />}
                            label="Recent Notes"
                            value={loading ? undefined : stats?.notes.toString()}
                            loading={loading}
                        />
                    </FadeIn>
                )}
                {isWidgetVisible("bookmarks") && (
                    <FadeIn delay={0.4}>
                        <StatCard
                            icon={<Bookmark className="text-pink-500" />}
                            label="Saved Bookmarks"
                            value={loading ? undefined : stats?.bookmarks.toString()}
                            loading={loading}
                        />
                    </FadeIn>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {isWidgetVisible("activity") && (
                    <FadeIn delay={0.5} className="lg:col-span-2">
                        <GlassCard className="min-h-[400px]">
                            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                            {loading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <Skeleton key={i} className="h-12 w-full rounded-xl" />
                                    ))}
                                </div>
                            ) : activities.length > 0 ? (
                                <div className="space-y-6">
                                    {activities.map((activity) => (
                                        <ActivityItem
                                            key={`${activity.type}-${activity.id}`}
                                            title={activity.title}
                                            time={formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                                            type={activity.type}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                    <Activity className="w-12 h-12 mb-4 opacity-20" />
                                    <p>No recent activity found.</p>
                                </div>
                            )}
                        </GlassCard>
                    </FadeIn>
                )}

                <div className="space-y-6 lg:col-start-3">
                    {isWidgetVisible("deadlines") && (
                        <FadeIn delay={0.6}>
                            <GlassCard>
                                <h2 className="text-xl font-bold mb-6">Upcoming Deadlines</h2>
                                <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                                    <Clock className="w-10 h-10 mb-4 opacity-20" />
                                    <p className="text-sm">Stay tuned for deadlines</p>
                                </div>
                            </GlassCard>
                        </FadeIn>
                    )}

                    <FadeIn delay={0.7}>
                        <GlassCard className="bg-indigo-600 border-none text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                            <h2 className="text-xl font-bold mb-2 relative z-10">Modular Power</h2>
                            <p className="text-indigo-100 text-sm mb-6 relative z-10">
                                Customize your dashboard with modular widgets to see only what you need.
                            </p>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full relative z-10 font-bold"
                                onClick={() => setManageWidgetsOpen(true)}
                            >
                                Manage Widgets
                            </Button>
                        </GlassCard>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, loading }: { icon: React.ReactNode, label: string, value?: string, loading?: boolean }) {
    return (
        <GlassCard className="flex flex-col gap-2 cursor-pointer hover:bg-white/5 transition-all duration-300">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {icon}
                </div>
                <span className="text-sm font-medium text-slate-500">{label}</span>
            </div>
            {loading ? (
                <Skeleton className="h-9 w-16" />
            ) : (
                <div className="text-3xl font-bold">{value || "0"}</div>
            )}
        </GlassCard>
    );
}

function ActivityItem({ title, time, type }: { title: string, time: string, type: "task" | "note" | "bookmark" }) {
    return (
        <div className="flex items-center gap-4 py-2 border-l-2 border-slate-100 dark:border-slate-800 pl-4 relative cursor-pointer hover:bg-slate-50/5 dark:hover:bg-white/5 transition-colors rounded-r-lg">
            <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500" />
            <div className="flex-1">
                <p className="text-sm font-medium">{title}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase font-bold tracking-wider">
                        {type}
                    </span>
                    <p className="text-xs text-slate-500">{time}</p>
                </div>
            </div>
        </div>
    );
}
