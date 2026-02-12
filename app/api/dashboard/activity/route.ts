import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [tasks, notes, bookmarks] = await Promise.all([
            db.task.findMany({
                where: { userId: session.user.id },
                orderBy: { updatedAt: "desc" },
                take: 5,
            }),
            db.note.findMany({
                where: { userId: session.user.id },
                orderBy: { updatedAt: "desc" },
                take: 5,
            }),
            db.bookmark.findMany({
                where: { userId: session.user.id },
                orderBy: { updatedAt: "desc" },
                take: 5,
            }),
        ]);

        const activity = [
            ...tasks.map((t) => ({ id: t.id, title: t.title, type: "task", date: t.updatedAt })),
            ...notes.map((n) => ({ id: n.id, title: n.title, type: "note", date: n.updatedAt })),
            ...bookmarks.map((b) => ({ id: b.id, title: b.title, type: "bookmark", date: b.updatedAt })),
        ]
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 10);

        return NextResponse.json({ success: true, data: activity });
    } catch (error) {
        console.error("Dashboard activity error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
