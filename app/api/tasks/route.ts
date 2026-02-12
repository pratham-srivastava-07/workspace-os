import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { taskSchema } from "@/lib/validations/schemas";

export async function GET(req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
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
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch tasks" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validated = taskSchema.parse(body);

        const task = await db.task.create({
            data: {
                ...validated,
                dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
                userId: session.user.id!,
            },
        });
        return NextResponse.json({ success: true, data: task });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: error.issues[0].message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: "Failed to create task" }, { status: 500 });
    }
}
