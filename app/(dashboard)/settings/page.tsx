"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FadeIn, GlassCard } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
    User,
    Palette,
    Layout,
    Loader2,
    Activity,
    Clock,
    Bookmark,
    Layers,
    Save
} from "lucide-react";
import { toast } from "sonner";



const ALL_WIDGETS = [
    { id: "tasks", label: "Tasks Due", icon: Activity },
    { id: "pipelines", label: "Active Pipelines", icon: Layers },
    { id: "notes", label: "Recent Notes", icon: Clock },
    { id: "bookmarks", label: "Saved Bookmarks", icon: Bookmark },
    { id: "activity", label: "Recent Activity", icon: Layout },
    { id: "deadlines", label: "Upcoming Deadlines", icon: Clock },
];

export default function SettingsPage() {
    const { data: session, update: updateSession } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [widgets, setWidgets] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setEmail(session.user.email || "");
        }
        fetchPreferences();
    }, [session]);

    const fetchPreferences = async () => {
        try {
            const res = await fetch("/api/user/preferences");
            const data = await res.json();
            if (data.success && data.data?.widgets) {
                setWidgets(data.data.widgets);
            } else {
                setWidgets(["tasks", "pipelines", "notes", "bookmarks", "activity", "deadlines"]);
            }
        } catch (_error) {
            console.error("Failed to fetch preferences:", _error);
        } finally {
            setFetching(false);
        }
    };

    const handleProfileUpdate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Profile updated!");
                updateSession();
            } else {
                toast.error(data.error || "Failed to update profile");
            }
        } catch (_error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleWidget = (id: string) => {
        setWidgets((prev) =>
            prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
        );
    };

    const handlePreferencesUpdate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/preferences", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ widgets }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Dashboard preferences saved!");
            } else {
                toast.error(data.error || "Failed to save preferences");
            }
        } catch (_error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <FadeIn>
                <header className="mb-8 px-6 md:px-0">
                    <h1 className="text-3xl font-brand italic mb-2">Settings</h1>
                    <p className="text-slate-500 text-sm">Manage your account and workspace preferences.</p>
                </header>
            </FadeIn>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/10 p-1 rounded-2xl h-14">
                    <TabsTrigger value="profile" className="rounded-xl px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-lg gap-2">
                        <User size={16} /> Profile
                    </TabsTrigger>
                    <TabsTrigger value="dashboard" className="rounded-xl px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-lg gap-2">
                        <Layout size={16} /> Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="rounded-xl px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-lg gap-2">
                        <Palette size={16} /> Appearance
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <FadeIn delay={0.1}>
                        <GlassCard className="p-8">
                            <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                            <div className="space-y-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="rounded-xl h-12"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        value={email}
                                        disabled
                                        className="rounded-xl h-12 bg-slate-50 dark:bg-slate-900 border-none text-slate-400"
                                    />
                                    <p className="text-[10px] text-slate-400 font-medium">Email cannot be changed directly.</p>
                                </div>
                                <Button
                                    onClick={handleProfileUpdate}
                                    disabled={loading}
                                    className="rounded-xl bg-indigo-600 hover:bg-indigo-700 h-12 px-8 shadow-lg shadow-indigo-500/20"
                                >
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Save Profile
                                </Button>
                            </div>
                        </GlassCard>
                    </FadeIn>
                </TabsContent>

                <TabsContent value="dashboard">
                    <FadeIn delay={0.1}>
                        <GlassCard className="p-8">
                            <h2 className="text-xl font-bold mb-2">Dashboard Widgets</h2>
                            <p className="text-slate-500 text-sm mb-8">Toggle the visibility of widgets on your main dashboard.</p>

                            {fetching ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {ALL_WIDGETS.map((widget) => (
                                        <div key={widget.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/10">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800">
                                                    <widget.icon size={18} className="text-indigo-500" />
                                                </div>
                                                <Label htmlFor={`settings-${widget.id}`} className="font-medium cursor-pointer">
                                                    {widget.label}
                                                </Label>
                                            </div>
                                            <Switch
                                                id={`settings-${widget.id}`}
                                                checked={widgets.includes(widget.id)}
                                                onCheckedChange={() => handleToggleWidget(widget.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Button
                                onClick={handlePreferencesUpdate}
                                disabled={loading || fetching}
                                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 h-12 px-8 shadow-lg shadow-indigo-500/20"
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Preferences
                            </Button>
                        </GlassCard>
                    </FadeIn>
                </TabsContent>

                <TabsContent value="appearance">
                    <FadeIn delay={0.1}>
                        <GlassCard className="p-8">
                            <h2 className="text-xl font-bold mb-6">Appearance</h2>
                            <div className="p-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                                <Palette className="w-12 h-12 mx-auto mb-4 text-slate-200" />
                                <p className="text-slate-500">Theme customization coming soon in Phase 5.</p>
                            </div>
                        </GlassCard>
                    </FadeIn>
                </TabsContent>
            </Tabs>
        </div>
    );
}
