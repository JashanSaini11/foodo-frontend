"use client";
// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// /signup route — full name, email, phone, password, confirm
// password, plus Google OAuth. On success redirects to OTP
// verification with email in query string (verify-email page is
// a separate piece of work — see TODO at bottom)

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthInput from "@/components/auth/AuthInput";
import { PrimaryButton, OrDivider, GoogleButton } from "@/components/auth/AuthControls";
import { signupAPI, googleLoginURL } from "@/lib/auth.api";
import { toast } from "sonner";

export default function SignupPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
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
        if (!form.name.trim()) errs.name = "Enter your full name";
        if (!form.email.trim()) errs.email = "Enter your email";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
        if (form.phone.trim() && !/^[0-9]{10}$/.test(form.phone.trim())) errs.phone = "Enter a 10-digit phone number";
        if (!form.password) errs.password = "Create a password";
        else if (form.password.length < 8) errs.password = "Password must be at least 8 characters";
        if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords don't match";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            const first = Object.values(errs)[0];
            if (first) toast.error(first);
            return;
        }

        setLoading(true);
        setFormError("");
        try {
            await signupAPI({
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
                phone: form.phone.trim(),
            });
            toast.success("Account created! Check your email for the OTP.", { id });
            // Backend sends an OTP to verify the email — send the user there next
            router.push(`/verify-email?email=${encodeURIComponent(form.email.trim())}`);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Couldn't create your account. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell eyebrow="SignUp" heading={<>Create Your Account <span aria-hidden="true">🚀</span></>}>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4" noValidate>
                <AuthInput
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                />
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
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                />
                <AuthInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <AuthInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
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
                    {loading ? "Creating account..." : "Sign Up"}
                </PrimaryButton>
            </form>

            <OrDivider />

            <GoogleButton onClick={() => (window.location.href = googleLoginURL)} />

            <p className="mt-6 font-body text-sm text-text-heading text-center">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold underline hover:text-primary-dark">
                    Login
                </Link>
            </p>
        </AuthShell>
    );
}