"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPipelines, RootState, AppDispatch } from "@/store/store";
import { GlassCard, FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MoreVertical, Layout, GripVertical, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function PipelinesModule() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: pipelines, loading } = useSelector((state: RootState) => state.pipelines);
    const [activePipelineId, setActivePipelineId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [newPipelineTitle, setNewPipelineTitle] = useState("");

    const handleCreatePipeline = async () => {
        if (!newPipelineTitle.trim()) return;

        setIsCreating(true);
        try {
            const res = await fetch("/api/pipelines", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newPipelineTitle }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Pipeline created!");
                dispatch(fetchPipelines());
                if (data.data?.id) setActivePipelineId(data.data.id);
                setCreateModalOpen(false);
                setNewPipelineTitle("");
            } else {
                toast.error(data.error || "Failed to create pipeline");
            }
        } catch (error) {
            toast.error("Error creating pipeline");
        } finally {
            setIsCreating(false);
        }
    };

    useEffect(() => {
        dispatch(fetchPipelines());
    }, [dispatch]);

    useEffect(() => {
        if (pipelines.length > 0 && !activePipelineId) {
            setActivePipelineId(pipelines[0].id);
        }
    }, [pipelines, activePipelineId]);

    const activePipeline = pipelines.find(p => p.id === activePipelineId);

    return (
        <div className="space-y-8 h-full flex flex-col">
            <FadeIn>
                <header className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-brand italic">Pipelines</h1>
                        {pipelines.length > 1 && (
                            <select
                                value={activePipelineId || ""}
                                onChange={(e) => setActivePipelineId(e.target.value)}
                                className="bg-transparent border-none font-medium text-slate-500 focus:ring-0"
                            >
                                {pipelines.map(p => (
                                    <option key={p.id} value={p.id}>{p.title}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <Button
                        className="rounded-full gap-2 shadow-lg"
                        onClick={() => setCreateModalOpen(true)}
                        disabled={isCreating}
                    >
                        <Plus size={18} />
                        New Pipeline
                    </Button>
                </header>
            </FadeIn>

            <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Pipeline</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Pipeline Name</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Sales Funnel, Product Roadmap"
                                value={newPipelineTitle}
                                onChange={(e) => setNewPipelineTitle(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleCreatePipeline()}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreatePipeline} disabled={isCreating || !newPipelineTitle.trim()}>
                            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Pipeline
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="flex-1 overflow-x-auto px-6 pb-6">
                <div className="flex gap-6 h-full min-w-max">
                    {loading ? (
                        <p className="text-center w-full py-20 italic text-slate-500">Loading pipelines...</p>
                    ) : !activePipeline ? (
                        <div className="flex flex-col items-center justify-center w-full py-20 gap-4">
                            <Layout size={48} className="text-slate-200" />
                            <p className="text-slate-500">No pipelines yet. Create one to get started.</p>
                        </div>
                    ) : (
                        <>
                            {activePipeline.stages.map((stage, sIdx) => (
                                <FadeIn key={stage.id} delay={sIdx * 0.1} className="w-80 flex flex-col gap-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                            {stage.name}
                                            <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-normal">0</span>
                                        </h3>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </div>

                                    <div className="flex-1 space-y-4 min-h-[500px] bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-4 border border-dashed border-slate-200 dark:border-slate-800">
                                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-400 hover:text-slate-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl" size="sm">
                                            <Plus size={14} />
                                            Add Card
                                        </Button>

                                        {/* Placeholder Card */}
                                        <GlassCard className="p-4 cursor-grab group">
                                            <div className="flex items-start justify-between mb-2">
                                                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Design</span>
                                                <GripVertical size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <h4 className="text-sm font-medium mb-2">Build OS Interface</h4>
                                            <p className="text-xs text-slate-500 line-clamp-2">Implement the glassmorphism design for the main dashboard.</p>
                                        </GlassCard>
                                    </div>
                                </FadeIn>
                            ))}
                            <div className="w-80 pt-1">
                                <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed bg-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 gap-2">
                                    <Plus size={18} />
                                    Add Stage
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
