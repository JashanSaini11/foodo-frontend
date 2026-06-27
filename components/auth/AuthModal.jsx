"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import useUIStore from "@/store/uiStore";
import { googleLoginURL } from "@/lib/auth.api";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useUIStore();
  const router = useRouter();

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={closeAuthModal}
    >
      {/* ─── Modal Card ─────────────────────────────────────── */}
      <div
        className="relative bg-white rounded-2xl w-full max-w-80 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Background food image ────────────────────────── */}
        <div className="relative h-35 w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80')",
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            aria-label="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ─── Logo pill ────────────────────────────────────── */}
        <div className="flex justify-center -mt-7 relative z-10">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🛵</span>
          </div>
        </div>

        {/* ─── Content ──────────────────────────────────────── */}
        <div className="px-6 pb-6 pt-3 flex flex-col items-center gap-4">
          <div className="text-center">
            <h2 className="font-display text-[28px] leading-tight text-text-heading font-semibold">
              Welcome to Foodo
            </h2>
            <p className="font-body text-sm text-text-muted mt-1 leading-relaxed">
              Your daily dose of fresh & wholesome
              <br />
              flavors delivered straight home.
            </p>
          </div>

          {/* ─── Sign In Button ───────────────────────────────── */}
          <button
            onClick={handleLogin}
            className="w-full h-12 bg-primary rounded-xl font-body font-semibold text-base text-text-heading flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Sign In to Your Account
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* ─── Create Account Button ────────────────────────── */}
          <button
            onClick={handleSignup}
            className="w-full h-12 bg-white border-2 border-primary rounded-xl font-body font-semibold text-sm text-text-heading flex items-center justify-center hover:bg-primary/10 transition-colors"
          >
            Create a New Account
          </button>

          {/* ─── Divider ──────────────────────────────────────── */}
          <div className="w-full flex items-center gap-3">
            <span className="flex-1 h-px bg-border-light" />
            <span className="font-body text-xs text-text-muted">
              OR QUICK ACCESS
            </span>
            <span className="flex-1 h-px bg-border-light" />
          </div>

          {/* ─── Google Button ────────────────────────────────── */}
          <button
            onClick={handleGoogle}
            className="w-full h-12 bg-white border border-border-light rounded-xl font-body font-semibold text-sm text-text-heading flex items-center justify-center gap-3 hover:bg-bg-input-alt transition-colors"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* ─── Terms ───────────────────────────────────────── */}
          <p className="font-body text-[11px] text-text-muted text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20.5H24v7h11.3C33.7 31.6 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.1l5.4-5.4C34.5 5.5 29.5 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5 44.5 35.3 44.5 24c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l5.8 4.3C13.8 15.2 18.6 12 24 12c3.1 0 5.9 1.2 8.1 3.1l5.4-5.4C34.5 6.5 29.5 4.5 24 4.5c-7.7 0-14.4 4.4-17.7 10.2z"
      />
      <path
        fill="#4CAF50"
        d="M24 44.5c5.4 0 10.3-1.9 14-5.2l-6.5-5.3C29.6 35.6 26.9 36.5 24 36.5c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.5 39.9 16.2 44.5 24 44.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20.5H24v7h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.5 5.3C41.4 35.4 44.5 30.3 44.5 24c0-1.2-.1-2.4-.9-3.5z"
      />
    </svg>
  );
}
