import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [taskCount, pipelineCount, noteCount, bookmarkCount] = await Promise.all([
            db.task.count({ where: { userId: session.user.id } }),
            db.pipeline.count({ where: { userId: session.user.id } }),
            db.note.count({ where: { userId: session.user.id } }),
            db.bookmark.count({ where: { userId: session.user.id } }),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                tasks: taskCount,
                pipelines: pipelineCount,
                notes: noteCount,
                bookmarks: bookmarkCount,
            }
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
