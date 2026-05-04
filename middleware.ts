// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { AULSSP_AUTH_COOKIE } from "@/lib/auth";

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
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Matcht alle Routes außer:
         * - api
         * - _next/static
         * - _next/image
         * - favicon.ico
         * - Icons/Bilder im public-Verzeichnis
         */
        "/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)",
    ],
};