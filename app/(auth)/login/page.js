"use client";
// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// /login route — email + password login, Google OAuth, links to
// signup and forgot-password. On success, fetches user and
// redirects based on role via authStore.getRedirectPath()

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthInput from "@/components/auth/AuthInput";
import { PrimaryButton, OrDivider, GoogleButton } from "@/components/auth/AuthControls";
import { loginAPI, googleLoginURL } from "@/lib/auth.api";
import { toast } from "sonner";
import useAuthStore from "@/store/authStore";

export default function LoginPage() {
    const router = useRouter();
    const { fetchUser, getRedirectPath } = useAuthStore();

    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((errs) => ({ ...errs, [name]: "" }));
        setFormError("");
    };

    const validate = () => {
        const errs = {};
        if (!form.email.trim()) errs.email = "Enter your email";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.password) errs.password = "Enter your password";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            // show first validation error as toast
            const first = Object.values(errs)[0];
            if (first) toast.error(first);
            return;
        }

        setLoading(true);
        setFormError("");
        try {
            await loginAPI({ email: form.email, password: form.password });
            await fetchUser();
            toast.success("Welcome back! 👋", { id });
            router.replace(getRedirectPath());
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Couldn't sign you in. Check your email and password and try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell heading={<>Welcome Back <span aria-hidden="true">👋</span></>}>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4" noValidate>
                <AuthInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <AuthInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <div className="flex justify-end -mt-1">
                    <Link
                        href="/forgot-password-request"
                        className="font-body text-sm font-medium text-primary-dark hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {formError && (
                    <p className="text-sm font-body text-red-700 bg-white/60 rounded-md px-3 py-2 text-center">
                        {formError}
                    </p>
                )}

                <PrimaryButton type="submit" loading={loading}>
                    {loading ? "Logging in..." : "Login"}
                </PrimaryButton>
            </form>

            <OrDivider />

            <GoogleButton onClick={() => (window.location.href = googleLoginURL)} />

            <p className="mt-6 font-body text-sm text-text-heading text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold underline hover:text-primary-dark">
                    Sign up
                </Link>
            </p>
        </AuthShell>
    );
}