import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { noteSchema } from "@/lib/validations/schemas";

export async function GET(_req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const notes = await db.note.findMany({
            where: { userId: session.user.id },
            orderBy: { updatedAt: "desc" },
        });
        return NextResponse.json({ success: true, data: notes });
    } catch (_error) {
        return NextResponse.json({ success: false, error: "Failed to fetch notes" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validated = noteSchema.parse(body);

        const note = await db.note.create({
            data: {
                ...validated,
                userId: session.user.id!,
            },
        });
        return NextResponse.json({ success: true, data: note });
    } catch (_error) {
        return NextResponse.json({ success: false, error: "Failed to create note" }, { status: 500 });
    }
}
