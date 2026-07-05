// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Shared primary (dark) button, Google OAuth button, and
// "or" divider — reused across login / signup pages

import { GoogleIcon } from "@/assets/icons/index";

export function PrimaryButton({ children, loading, className = "", ...rest }) {
  return (
    <button
      className={`h-14 rounded-xl bg-text-heading text-primary
                 font-body font-semibold text-lg
                 hover:bg-black transition-colors
                 disabled:opacity-60 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2 ${className}`}
      disabled={loading}
      {...rest}
    >
      {loading && (
        <span className="w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

export function OrDivider() {
  return (
    <div className="w-full flex items-center gap-4 my-2">
      <span className="flex-1 h-px bg-primary-dark/20" />
      <span className="font-body text-sm text-primary-dark/60">or</span>
      <span className="flex-1 h-px bg-primary-dark/20" />
    </div>
  );
}

export function GoogleButton({ onClick, children = "Continue with Google" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-14 rounded-xl bg-bg-input border border-border-light
                 font-body font-semibold text-base text-text-heading
                 hover:bg-bg-input-alt transition-colors
                 flex items-center justify-center gap-3"
    >
      <GoogleIcon width={25} height={25} />
      {children}
    </button>
  );
}

