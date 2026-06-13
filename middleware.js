// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Protects routes based on authentication
// Runs before every page request
// Redirects unauthenticated users to login

import { NextResponse } from "next/server";

// ─── PROTECTED ROUTES ─────────────────────────────────────────
const protectedRoutes = [
    "/home",
    "/cart",
    "/checkout",
    "/orders",
    "/profile",
    "/restaurant",
    "/delivery",
    "/admin",
];

// ─── AUTH ROUTES ──────────────────────────────────────────────
// If logged in user tries to access these → redirect to home
// NOTE: "/forgot-password" (token-based password reset, reached
// via emailed link) is intentionally NOT in this list — an
// authenticated user may still need to reset their password from
// that link, so it's left unguarded by this redirect.
const authRoutes = ["/login", "/signup", "/forgot-password-request"];

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if user has accessToken cookie
    const accessToken = request.cookies.get("accessToken")?.value;
    const isAuthenticated = !!accessToken;

    // ─── Redirect authenticated users away from auth pages ────
    if (isAuthenticated && authRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    // ─── Redirect unauthenticated users to login ──────────────
    if (!isAuthenticated && protectedRoutes.some((route) => pathname.startsWith(route))) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname); // remember where they were going
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// ─── WHICH ROUTES THIS MIDDLEWARE RUNS ON ─────────────────────
export const config = {
    matcher: [
        "/home/:path*",
        "/cart/:path*",
        "/checkout/:path*",
        "/orders/:path*",
        "/profile/:path*",
        "/restaurant/:path*",
        "/delivery/:path*",
        "/admin/:path*",
        "/login",
        "/signup",
        "/forgot-password-request",
    ],
};