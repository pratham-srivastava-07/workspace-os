import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { bookmarkSchema } from "@/lib/validations/schemas";

export async function GET(_req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const bookmarks = await db.bookmark.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: bookmarks });
    } catch (_error) {
        return NextResponse.json({ success: false, error: "Failed to fetch bookmarks" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const validated = bookmarkSchema.parse(body);
        const bookmark = await db.bookmark.create({
            data: { ...validated, userId: session.user.id! },
        });
        return NextResponse.json({ success: true, data: bookmark });
    } catch (_error) {
        return NextResponse.json({ success: false, error: "Failed to create bookmark" }, { status: 500 });
    }
}
