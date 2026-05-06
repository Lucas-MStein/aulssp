// proxy.ts
import { NextRequest, NextResponse } from "next/server";

const AULSSP_AUTH_COOKIE = "aulssp_auth";

const protectedRoutes = [
    "/dashboard",
    "/kalender",
    "/planen",
    "/episode",
    "/ideen",
    "/archiv",
];

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    const isAuthenticated =
        request.cookies.get(AULSSP_AUTH_COOKIE)?.value === "true";

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/kalender/:path*",
        "/planen/:path*",
        "/episode/:path*",
        "/ideen/:path*",
        "/archiv/:path*",
    ],
};