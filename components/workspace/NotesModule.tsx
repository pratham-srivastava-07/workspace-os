"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, addNote, deleteNote, RootState, AppDispatch } from "@/store/store";
import { GlassCard, FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, StickyNote, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function NotesModule() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: notes, loading } = useSelector((state: RootState) => state.notes);
    const [newNote, setNewNote] = useState({ title: "", content: "" });
    const [actionId, setActionId] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    const handleAddNote = async () => {
        if (!newNote.title.trim()) return;
        try {
            await dispatch(addNote(newNote)).unwrap();
            setNewNote({ title: "", content: "" });
            toast.success("Note created");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add note");
        }
    };

    const handleDeleteNote = (id: string) => {
        setNoteToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!noteToDelete) return;
        setActionId(noteToDelete);
        try {
            await dispatch(deleteNote(noteToDelete)).unwrap();
            toast.success("Note deleted");
        } catch {
            toast.error("Failed to delete note");
        } finally {
            setActionId(null);
            setNoteToDelete(null);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <ConfirmModal
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                title="Delete Note"
                description="Are you sure you want to delete this note? This action cannot be undone."
                onConfirm={handleConfirmDelete}
            />
            <FadeIn>
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-brand italic">Notes</h1>
                </header>
            </FadeIn>

            <FadeIn delay={0.1}>
                <GlassCard className="space-y-4">
                    <Input
                        placeholder="Note Title"
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        className="rounded-xl glass"
                    />
                    <Textarea
                        placeholder="Write your note here..."
                        value={newNote.content}
                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        className="rounded-xl min-h-[100px] glass"
                    />
                    <Button onClick={handleAddNote} className="w-full rounded-xl py-6 gap-2 shadow-lg hover:shadow-indigo-500/20">
                        <Plus size={18} />
                        Save Note
                    </Button>
                </GlassCard>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(loading && notes.length === 0) ? (
                    <p className="col-span-2 text-center text-slate-500 py-10 italic">Loading notes...</p>
                ) : notes.length === 0 ? (
                    <FadeIn delay={0.2} className="col-span-2">
                        <p className="text-center text-slate-500 py-10 glass rounded-3xl">No notes yet. Create your first one!</p>
                    </FadeIn>
                ) : (
                    notes.map((note, index) => (
                        <FadeIn key={note.id} delay={0.1 + index * 0.05}>
                            <GlassCard className="relative group min-h-[160px] hover:shadow-xl cursor-pointer hover:bg-white/5 transition-all duration-500">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500"
                                    onClick={() => handleDeleteNote(note.id)}
                                    disabled={actionId === note.id}
                                >
                                    {actionId === note.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={16} />}
                                </Button>
                                <div className="flex items-center gap-3 mb-4">
                                    <StickyNote size={20} className="text-indigo-500" />
                                    <h3 className="font-bold truncate">{note.title}</h3>
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-4 leading-relaxed">{note.content}</p>
                            </GlassCard>
                        </FadeIn>
                    ))
                )}
            </div>
        </div>
    );
}
