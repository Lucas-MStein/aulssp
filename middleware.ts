// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const AULSSP_AUTH_COOKIE = "aulssp_auth";

const protectedRoutes = [
    "/dashboard",
    "/kalender",
    "/episode",
    "/ideen",
    "/archiv",
    "/joker",
    "/einstellungen",
];

export function middleware(request: NextRequest) {
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
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)"],
};