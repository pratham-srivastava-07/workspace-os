import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard") ||
        req.nextUrl.pathname.startsWith("/workspace") ||
        req.nextUrl.pathname.startsWith("/settings");

    if (isAuthPage) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }
        return null;
    }

    if (isDashboardPage && !isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
    }

    return null;
});

export const config = {
    matcher: ["/dashboard/:path*", "/workspace/:path*", "/settings/:path*", "/auth/:path*"],
};
