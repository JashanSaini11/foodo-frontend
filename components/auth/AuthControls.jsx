// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Shared primary (dark) button, Google OAuth button, and
// "or" divider — reused across login / signup pages

export function PrimaryButton({ children, loading, ...rest }) {
  return (
    <button
      className="w-full h-14 rounded-xl bg-text-heading text-primary
                 font-body font-semibold text-lg
                 hover:bg-black transition-colors
                 disabled:opacity-60 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2"
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
      <GoogleIcon />
      {children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 48 48">
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
