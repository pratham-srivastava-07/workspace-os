import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, image } = body;

        const user = await db.user.update({
            where: { id: session.user.id },
            data: {
                name: name || undefined,
                image: image || undefined,
            },
        });

        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
