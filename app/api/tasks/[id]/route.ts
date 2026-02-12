import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { status } = body;

        const task = await db.task.update({
            where: {
                id: id,
                userId: session.user.id
            },
            data: { status },
        });

        return NextResponse.json({ success: true, data: task });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update task" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        await db.task.delete({
            where: {
                id: id,
                userId: session.user.id
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete task" }, { status: 500 });
    }
}
