"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useUIStore from "@/store/uiStore";
import { googleLoginURL } from "@/lib/auth.api";
import { GoogleIcon } from "@/assets/icons/index";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useUIStore();
  const router = useRouter();
  const modalRef = useRef(null);

  // ── Close on Escape key ───────────────────────────────────
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeAuthModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isAuthModalOpen, closeAuthModal]);

  // ── Lock body scroll when open ────────────────────────────
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthModalOpen]);

  // ── Auto-focus modal on open ──────────────────────────────
  useEffect(() => {
    if (isAuthModalOpen) {
      modalRef.current?.focus();
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLogin = () => {
    closeAuthModal();
    router.push("/login");
  };

  const handleSignup = () => {
    closeAuthModal();
    router.push("/signup");
  };

  const handleGoogle = () => {
    closeAuthModal();
    window.location.href = googleLoginURL;
  };

  return (
    // ─── Backdrop ─────────────────────────────────────────────
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={closeAuthModal}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        tabIndex={-1}
        className="
          relative bg-white shadow-2xl
          w-full outline-none
          rounded-t-3xl sm:rounded-2xl
          max-w-full sm:max-w-[380px] md:max-w-[420px]
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Background food image ──────────────────────── */}
        <div className="relative h-32 sm:h-36 w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80')",
            }}
            aria-hidden="true"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          {/* Close button */}
          <button
            onClick={closeAuthModal}
            aria-label="Close sign in modal"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ─── Logo pill (overlaps image + card) ──────────── */}
        <div
          className="flex justify-center -mt-7 relative z-10"
          aria-hidden="true"
        >
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <Image
              src="/Logo.svg"
              alt="Foodo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
              priority
            />
          </div>
        </div>

        {/* ─── Content ──────────────────────────────────────── */}
        <div className="px-5 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-3 sm:pt-4 flex flex-col items-center gap-3 sm:gap-4">
          {/* Heading */}
          <div className="text-center">
            <h2
              id="auth-modal-title"
              className="font-display text-[26px] sm:text-[28px] md:text-[30px] leading-tight text-text-heading"
            >
              Welcome to Foodo
            </h2>
            <p className="font-body text-sm text-text-muted mt-1 leading-relaxed">
              Your daily dose of fresh & wholesome
              <br className="hidden sm:block" /> flavors delivered straight
              home.
            </p>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
            className="
              w-full h-11 sm:h-12 bg-primary rounded-xl
              font-body font-semibold text-sm sm:text-base text-text-heading
              flex items-center justify-center gap-2
              hover:opacity-90 active:scale-[0.98] transition-all
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer
            "
          >
            Sign In to Your Account
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* Create Account Button */}
          <button
            onClick={handleSignup}
            className="
              w-full h-11 sm:h-12 bg-white border-2 border-primary rounded-xl
              font-body font-semibold text-sm text-text-heading
              flex items-center justify-center
              hover:bg-primary/10 active:scale-[0.98] transition-all
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer
            "
          >
            Create a New Account
          </button>

          {/* Divider */}
          <div className="w-full flex items-center gap-3" aria-hidden="true">
            <span className="flex-1 h-px bg-border-light" />
            <span className="font-body text-[11px] text-text-muted tracking-wide">
              OR QUICK ACCESS
            </span>
            <span className="flex-1 h-px bg-border-light" />
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            className="
              w-full h-11 sm:h-12 bg-white border border-border-light rounded-xl
              font-body font-semibold text-sm text-text-heading
              flex items-center justify-center gap-3
              hover:bg-bg-input-alt active:scale-[0.98] transition-all
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-light cursor-pointer
            "
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Terms */}
          <p className="font-body text-[11px] text-text-muted text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <button className="underline hover:text-text-heading transition-colors">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="underline hover:text-text-heading transition-colors">
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
