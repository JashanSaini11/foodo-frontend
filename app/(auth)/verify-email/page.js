"use client";
// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// /verify-email route — last step of signup
// User lands here from /signup with ?email=... in the URL
// Enters the 6-digit OTP sent to that email → verifyOTPAPI
// On success → fetchUser() + redirect to home/dashboard
// "Resend code" button has a 30s cooldown, hits resendOTPAPI

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import OTPInput from "@/components/auth/OTPInput";
import { PrimaryButton } from "@/components/auth/AuthControls";
import { verifyOTPAPI, resendOTPAPI } from "@/lib/auth.api";
import { toast } from "sonner";
import useAuthStore from "@/store/authStore";

const RESEND_COOLDOWN_SECONDS = 30;

function VerifyForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const { fetchUser, getRedirectPath } = useAuthStore();

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);

    const [resending, setResending] = useState(false);
    const [resendMessage, setResendMessage] = useState("");
    const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);

    // tick the cooldown timer down every second
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    // No email in URL → can't verify anything, send back to signup
    if (!email) {
        return (
            <div className="text-center">
                <p className="font-body text-base text-red-700 bg-white/60 rounded-md px-4 py-3">
                    Missing email address. Please sign up again.
                </p>
                <Link
                    href="/signup"
                    className="mt-4 inline-block font-body text-sm font-semibold underline text-text-heading hover:text-primary-dark"
                >
                    Back to sign up
                </Link>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setFormError("");

        if (otp.length !== 6) {
            setError("Enter the full 6-digit code");
            toast.error("Enter the full 6-digit code");
            return;
        }

        setLoading(true);
        try {
            await verifyOTPAPI({ email, otp });
            // backend sets the auth cookie on successful verification
            await fetchUser();
            toast.success("Email verified! Welcome to Foodo 🎉", { id });
            router.replace(getRedirectPath());
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "That code didn't work. Check it and try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0 || resending) return;

        setResending(true);
        setResendMessage("");
        setFormError("");
        try {
            await resendOTPAPI({ email });
             toast.success("New code sent! Check your inbox.", { id });
            setCooldown(RESEND_COOLDOWN_SECONDS);
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Couldn't resend the code. Please try again."
            );
        } finally {
            setResending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5" noValidate>
            <p className="font-body text-base text-text-body text-center -mt-2">
                We sent a 6-digit code to <span className="font-semibold text-text-heading">{email}</span>
            </p>

            <OTPInput
                onChange={(value) => {
                    setOtp(value);
                    setError("");
                    setFormError("");
                }}
                error={error}
            />

            {formError && (
                <p className="text-sm font-body text-red-700 bg-white/60 rounded-md px-3 py-2 text-center w-full">
                    {formError}
                </p>
            )}

            {resendMessage && !formError && (
                <p className="text-sm font-body text-green-700 bg-white/60 rounded-md px-3 py-2 text-center w-full">
                    {resendMessage}
                </p>
            )}

            <PrimaryButton type="submit" loading={loading} className="w-full">
                {loading ? "Verifying..." : "Verify Email"}
            </PrimaryButton>

            <p className="font-body text-sm text-text-heading text-center">
                Didn&apos;t get the code?{" "}
                {cooldown > 0 ? (
                    <span className="text-text-muted">Resend in {cooldown}s</span>
                ) : (
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resending}
                        className="font-semibold underline hover:text-primary-dark disabled:opacity-60"
                    >
                        {resending ? "Sending..." : "Resend code"}
                    </button>
                )}
            </p>
        </form>
    );
}

export default function VerifyEmailPage() {
    return (
        <AuthShell eyebrow="Verify Email" heading="Verify Your Email">
            <Suspense
                fallback={
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                }
            >
                <VerifyForm />
            </Suspense>
        </AuthShell>
    );
}