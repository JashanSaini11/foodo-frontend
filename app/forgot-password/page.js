"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthInput from "@/components/auth/AuthInput";
import { PrimaryButton } from "@/components/auth/AuthControls";
import { resetPasswordAPI } from "@/lib/auth.api";

// ─── Separate component to safely use useSearchParams ─────────
function ResetForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token"); // reads ?token=xxx from URL

    const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // No token in URL → show error
    if (!token) {
        return (
            <div className="text-center">
                <p className="font-body text-base text-red-700 bg-white/60 rounded-md px-4 py-3">
                    Invalid or missing reset link. Please request a new one.
                </p>
                <Link
                    href="/forgot-password-request"
                    className="mt-4 inline-block font-body text-sm font-semibold underline text-text-heading hover:text-primary-dark"
                >
                    Request new link
                </Link>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((errs) => ({ ...errs, [name]: "" }));
        setFormError("");
    };

    const validate = () => {
        const errs = {};
        if (!form.newPassword) {
            errs.newPassword = "Enter a new password";
        } else if (form.newPassword.length < 6) {
            errs.newPassword = "Password must be at least 6 characters";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.newPassword)) {
            errs.newPassword = "Must have uppercase, lowercase and a number";
        }
        if (form.confirmPassword !== form.newPassword) {
            errs.confirmPassword = "Passwords don't match";
        }
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        setLoading(true);
        setFormError("");
        try {
            await resetPasswordAPI({ token, newPassword: form.newPassword });
            setSuccess(true);
            // Redirect to login after 2 seconds
            setTimeout(() => router.replace("/login"), 2000);
        } catch (err) {
            setFormError(
                err?.response?.data?.message ||
                "Link has expired or is invalid. Please request a new one."
            );
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <p className="font-body text-base text-text-heading text-center bg-white/60 rounded-md px-4 py-3">
                Password changed successfully! Redirecting to login...
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4" noValidate>
            <AuthInput
                type="password"
                name="newPassword"
                placeholder="New Password"
                autoComplete="new-password"
                value={form.newPassword}
                onChange={handleChange}
                error={errors.newPassword}
            />
            <AuthInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
            />

            {formError && (
                <p className="text-sm font-body text-red-700 bg-white/60 rounded-md px-3 py-2 text-center">
                    {formError}
                </p>
            )}

            <PrimaryButton type="submit" loading={loading}>
                {loading ? "Saving..." : "Change Password"}
            </PrimaryButton>
        </form>
    );
}

// ─── Page wrapper — Suspense required for useSearchParams ─────
export default function ForgotPasswordPage() {
    return (
        <AuthShell eyebrow="Change Password" heading="Change Password">
            <Suspense
                fallback={
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                }
            >
                <ResetForm />
            </Suspense>

            <p className="mt-6 font-body text-sm text-text-heading text-center">
                Remembered your password?{" "}
                <Link
                    href="/login"
                    className="font-semibold underline hover:text-primary-dark"
                >
                    Login
                </Link>
            </p>
        </AuthShell>
    );
}