"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, toggleTask, deleteTask, RootState, AppDispatch } from "@/store/store";
import { GlassCard, FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, CheckCircle, Circle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function TasksModule() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: tasks, loading, error } = useSelector((state: RootState) => state.tasks);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [actionId, setActionId] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;
        try {
            await dispatch(addTask({ title: newTaskTitle })).unwrap();
            setNewTaskTitle("");
            toast.success("Task created");
        } catch (err: any) {
            toast.error(err.message || "Failed to add task");
        }
    };

    const handleToggleTask = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "DONE" ? "TODO" : "DONE";
        setActionId(id);
        try {
            await dispatch(toggleTask({ id, status: newStatus })).unwrap();
        } catch (err: any) {
            toast.error("Failed to update task");
        } finally {
            setActionId(null);
        }
    };

    const handleDeleteTask = (id: string) => {
        setTaskToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return;
        setActionId(taskToDelete);
        try {
            await dispatch(deleteTask(taskToDelete)).unwrap();
            toast.success("Task deleted");
        } catch (err: any) {
            toast.error("Failed to delete task");
        } finally {
            setActionId(null);
            setTaskToDelete(null);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <ConfirmModal
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                title="Delete Task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                onConfirm={handleConfirmDelete}
            />
            <FadeIn>
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-brand italic">Tasks</h1>
                </header>
            </FadeIn>

            <FadeIn delay={0.1}>
                <div className="flex gap-4">
                    <Input
                        placeholder="What needs to be done?"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                        className="rounded-xl h-12 glass"
                    />
                    <Button onClick={handleAddTask} className="rounded-xl px-6 h-12 gap-2 shadow-lg hover:shadow-indigo-500/20">
                        <Plus size={18} />
                        Add Task
                    </Button>
                </div>
            </FadeIn>

            <div className="space-y-4">
                {loading && tasks.length === 0 ? (
                    <p className="text-center text-slate-500 py-10 italic">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <FadeIn delay={0.2}>
                        <p className="text-center text-slate-500 py-10 glass rounded-3xl">No tasks yet. Start by adding one!</p>
                    </FadeIn>
                ) : (
                    tasks.map((task, index) => (
                        <FadeIn key={task.id} delay={0.1 + index * 0.05}>
                            <GlassCard className="flex items-center justify-between py-4 px-6 group cursor-pointer hover:bg-white/5 transition-colors duration-300">
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 rounded-full p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        onClick={() => handleToggleTask(task.id, task.status)}
                                        disabled={actionId === task.id}
                                    >
                                        {actionId === task.id ? <Loader2 size={14} className="animate-spin text-slate-400" /> : (
                                            task.status === "DONE" ? <CheckCircle size={18} className="text-emerald-500" /> : <Circle size={18} className="text-slate-300" />
                                        )}
                                    </Button>
                                    <span className={task.status === "DONE" ? "line-through text-slate-400" : ""}>
                                        {task.title}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    onClick={() => handleDeleteTask(task.id)}
                                    disabled={actionId === task.id}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </GlassCard>
                        </FadeIn>
                    ))
                )}
            </div>
        </div>
    );
}
