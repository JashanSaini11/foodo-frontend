"use client";
// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Handles Google OAuth redirect
// Backend redirects here after Google login
// We fetch user data → store in Zustand → redirect to correct dashboard

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function AuthCallbackPage() {
    const router = useRouter();
    const { fetchUser, getRedirectPath } = useAuthStore();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Fetch user from backend (cookie is already set by backend)
                await fetchUser();
                // Redirect based on role
                const path = getRedirectPath();
                router.replace(path);
            } catch (error) {
                router.replace("/login?error=google_failed");
            }
        };

        handleCallback();
    }, []);

    return (
        <div className="min-h-screen bg-bg-page flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-text-body font-body">Signing you in...</p>
            </div>
        </div>
    );
}