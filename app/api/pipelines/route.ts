import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { pipelineSchema } from "@/lib/validations/schemas";

export async function GET(_req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const pipelines = await db.pipeline.findMany({
            where: { userId: session.user.id },
            include: { stages: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: pipelines });
    } catch (_error) {
        return NextResponse.json({ success: false, error: "Failed to fetch pipelines" }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const body = await _req.json();
        const validated = pipelineSchema.parse(body);
        const pipeline = await db.pipeline.create({
            data: {
                title: validated.title,
                userId: session.user.id!,
                stages: {
                    create: [
                        { name: "To Do" },
                        { name: "In Progress" },
                        { name: "Done" },
                    ]
                }
            },
            include: { stages: true }
        });
        return NextResponse.json({ success: true, data: pipeline });
    } catch (_error) {
        if (_error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: _error.issues[0].message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: "Failed to create pipeline" }, { status: 500 });
    }
}
