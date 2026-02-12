import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { taskSchema } from "@/lib/validations/schemas";

export async function GET(_req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(_req.url);
    const status = searchParams.get("status");

    try {
        const tasks = await db.task.findMany({
            where: {
                userId: session.user.id,
                ...(status ? { status } : {}),
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: tasks });
    } catch (_error) {
        return NextResponse.json({ success: false, error: "Failed to fetch tasks" }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await _req.json();
        const validated = taskSchema.parse(body);

        const task = await db.task.create({
            data: {
                ...validated,
                dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
                userId: session.user.id!,
            },
        });
        return NextResponse.json({ success: true, data: task });
    } catch (_error) {
        if (_error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: _error.issues[0].message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: "Failed to create task" }, { status: 500 });
    }
}
