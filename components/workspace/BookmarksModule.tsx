"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks, addBookmark, deleteBookmark, RootState, AppDispatch } from "@/store/store";
import { GlassCard, FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ExternalLink, Bookmark as BookmarkIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function BookmarksModule() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: bookmarks, loading } = useSelector((state: RootState) => state.bookmarks);
    const [newBookmark, setNewBookmark] = useState({ title: "", url: "" });
    const [actionId, setActionId] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookmarkToDelete, setBookmarkToDelete] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchBookmarks());
    }, [dispatch]);

    const handleAddBookmark = async () => {
        if (!newBookmark.title.trim() || !newBookmark.url.trim()) return;
        try {
            await dispatch(addBookmark(newBookmark)).unwrap();
            setNewBookmark({ title: "", url: "" });
            toast.success("Bookmark added");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add bookmark");
        }
    };

    const handleDeleteBookmark = (id: string) => {
        setBookmarkToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!bookmarkToDelete) return;
        setActionId(bookmarkToDelete);
        try {
            await dispatch(deleteBookmark(bookmarkToDelete)).unwrap();
            toast.success("Bookmark deleted");
        } catch {
            toast.error("Failed to delete bookmark");
        } finally {
            setActionId(null);
            setBookmarkToDelete(null);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <ConfirmModal
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                title="Delete Bookmark"
                description="Are you sure you want to delete this bookmark? This action cannot be undone."
                onConfirm={handleConfirmDelete}
            />
            <FadeIn>
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-brand italic">Bookmarks</h1>
                </header>
            </FadeIn>

            <FadeIn delay={0.1}>
                <GlassCard className="flex flex-col md:flex-row gap-4">
                    <Input
                        placeholder="Title"
                        value={newBookmark.title}
                        onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                        className="rounded-xl glass flex-1"
                    />
                    <Input
                        placeholder="URL (https://...)"
                        value={newBookmark.url}
                        onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                        className="rounded-xl glass flex-[2]"
                    />
                    <Button onClick={handleAddBookmark} className="rounded-xl px-6 h-12 gap-2 shadow-lg">
                        <Plus size={18} />
                        Add
                    </Button>
                </GlassCard>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(loading && bookmarks.length === 0) ? (
                    <p className="col-span-full text-center text-slate-500 py-10 italic">Loading bookmarks...</p>
                ) : bookmarks.length === 0 ? (
                    <FadeIn delay={0.2} className="col-span-full">
                        <p className="text-center text-slate-500 py-10 glass rounded-3xl">No bookmarks found. Add one above.</p>
                    </FadeIn>
                ) : (
                    bookmarks.map((bookmark, index) => (
                        <FadeIn key={bookmark.id} delay={0.1 + index * 0.05}>
                            <GlassCard className="relative group hover:shadow-xl cursor-pointer hover:bg-white/5 transition-all duration-300">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500">
                                            <BookmarkIcon size={18} />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 h-8 w-8"
                                            onClick={() => handleDeleteBookmark(bookmark.id)}
                                            disabled={actionId === bookmark.id}
                                        >
                                            {actionId === bookmark.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={16} />}
                                        </Button>
                                    </div>
                                    <h3 className="font-bold truncate" title={bookmark.title}>{bookmark.title}</h3>
                                    <a
                                        href={bookmark.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-indigo-500 hover:underline flex items-center gap-1 mt-1 truncate"
                                    >
                                        {bookmark.url}
                                        <ExternalLink size={10} />
                                    </a>
                                </div>
                            </GlassCard>
                        </FadeIn>
                    ))
                )}
            </div>
        </div>
    );
}
