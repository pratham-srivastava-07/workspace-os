"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Layout, Activity, Clock, Bookmark, Layers } from "lucide-react";

interface ManageWidgetsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

const ALL_WIDGETS = [
    { id: "tasks", label: "Tasks Due", icon: Activity },
    { id: "pipelines", label: "Active Pipelines", icon: Layers },
    { id: "notes", label: "Recent Notes", icon: Clock },
    { id: "bookmarks", label: "Saved Bookmarks", icon: Bookmark },
    { id: "activity", label: "Recent Activity", icon: Layout },
    { id: "deadlines", label: "Upcoming Deadlines", icon: Clock },
];

export function ManageWidgetsModal({ open, onOpenChange, onSuccess }: ManageWidgetsModalProps) {
    const [widgets, setWidgets] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (open) {
            fetchPreferences();
        }
    }, [open]);

    const fetchPreferences = async () => {
        setFetching(true);
        try {
            const res = await fetch("/api/user/preferences");
            const data = await res.json();
            if (data.success && data.data?.widgets) {
                setWidgets(data.data.widgets);
            } else {
                // Default widgets if none set
                setWidgets(["tasks", "pipelines", "notes", "bookmarks", "activity", "deadlines"]);
            }
        } catch (error) {
            console.error("Failed to fetch preferences:", error);
        } finally {
            setFetching(false);
        }
    };

    const handleToggle = (id: string) => {
        setWidgets((prev) =>
            prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
        );
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/preferences", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ widgets }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Preferences updated!");
                onOpenChange(false);
                if (onSuccess) onSuccess();
            } else {
                toast.error(data.error || "Failed to save preferences");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-brand italic">Manage Widgets</DialogTitle>
                    <DialogDescription>
                        Choose which widgets you want to see on your dashboard.
                    </DialogDescription>
                </DialogHeader>

                {fetching ? (
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        {ALL_WIDGETS.map((widget) => (
                            <div key={widget.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                                        <widget.icon size={18} className="text-indigo-500" />
                                    </div>
                                    <Label htmlFor={widget.id} className="font-medium cursor-pointer">
                                        {widget.label}
                                    </Label>
                                </div>
                                <Switch
                                    id={widget.id}
                                    checked={widgets.includes(widget.id)}
                                    onCheckedChange={() => handleToggle(widget.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading || fetching}
                        className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
