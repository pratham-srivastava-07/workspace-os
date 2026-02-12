"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type EntityType = "task" | "note" | "bookmark" | "pipeline";

interface QuickCreateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function QuickCreateModal({ open, onOpenChange, onSuccess }: QuickCreateModalProps) {
    const [type, setType] = useState<EntityType>("task");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        setLoading(true);
        try {
            const apiPath = type === "pipeline" ? "/api/pipelines" : `/api/${type}s`;
            const payload = type === "bookmark" ? { title, url: "https://" } : { title };

            const res = await fetch(apiPath, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} created!`);
                setTitle("");
                onOpenChange(false);
                if (onSuccess) onSuccess();
            } else {
                toast.error(data.error || `Failed to create ${type}`);
            }
        } catch (_error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-brand italic">Quick Create</DialogTitle>
                    <DialogDescription>
                        Quickly add something new to your workspace.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="type">What do you want to create?</Label>
                        <Select value={type} onValueChange={(v) => setType(v as EntityType)}>
                            <SelectTrigger id="type" className="rounded-xl">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="task">Task</SelectItem>
                                <SelectItem value="note">Note</SelectItem>
                                <SelectItem value="bookmark">Bookmark</SelectItem>
                                <SelectItem value="pipeline">Pipeline</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder={`Enter ${type} title...`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="rounded-xl"
                            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button
                        onClick={handleCreate}
                        disabled={loading}
                        className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
