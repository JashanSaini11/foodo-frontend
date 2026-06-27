"use client";
// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// /forgot-password route — first step of password reset.
// User enters their email, forgotPasswordAPI sends a reset link
// (containing a token) to that email. The link points to
// /reset-password?token=... (see app/forgot-password/page.js,
// which despite its folder name is the *second* step / Figma
// "Change Password" screen).
//
// Not present as its own Figma screen in this batch, but required
// as the entry point before the "Change Password" screen can be
// reached — added so the "Forgot password?" link on /login has
// somewhere real to go.

import { useState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthInput from "@/components/auth/AuthInput";
import { PrimaryButton } from "@/components/auth/AuthControls";
import { forgotPasswordAPI } from "@/lib/auth.api";
import { toast } from "sonner";

export default function ForgotPasswordRequestPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Enter your email");
            toast.error("Enter your email");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Enter a valid email");
            toast.error("Enter a valid email");
            return;
        }

        setLoading(true);
        setFormError("");
        try {
            await forgotPasswordAPI({ email: email.trim() });
            toast.success("Reset link sent! Check your inbox.", { id });
            setSent(true);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Couldn't send the reset link. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell eyebrow="Forgot Password" heading="Reset Your Password">
            {sent ? (
                <p className="font-body text-base text-text-heading text-center bg-white/60 rounded-md px-4 py-3">
                    If an account exists for {email}, a reset link is on its way. Check your inbox.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4" noValidate>
                    <AuthInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                            setFormError("");
                        }}
                        error={error}
                    />

                    {formError && (
                        <p className="text-sm font-body text-red-700 bg-white/60 rounded-md px-3 py-2 text-center">
                            {formError}
                        </p>
                    )}

                    <PrimaryButton type="submit" loading={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </PrimaryButton>
                </form>
            )}

            <p className="mt-6 font-body text-sm text-text-heading text-center">
                Remembered your password?{" "}
                <Link href="/login" className="font-semibold underline hover:text-primary-dark">
                    Login
                </Link>
            </p>
        </AuthShell>
    );
}