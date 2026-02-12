"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    loading?: boolean;
}

export function ConfirmModal({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
    loading,
}: ConfirmModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="text-slate-500 pt-2">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2 sm:gap-0 pt-4">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                        className="rounded-xl flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        disabled={loading}
                        className="rounded-xl flex-1 bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
