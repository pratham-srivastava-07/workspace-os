import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: { preferences: true },
        });

        return NextResponse.json({ success: true, data: user?.preferences });
    } catch (error) {
        console.error("Fetch preferences error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const user = await db.user.update({
            where: { id: session.user.id },
            data: { preferences: body },
        });

        return NextResponse.json({ success: true, data: user.preferences });
    } catch (error) {
        console.error("Update preferences error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
