// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Shared visual shell for /login, /signup, /forgot-password pages
// Pulled into its own component so the three auth pages stay
// visually consistent and only differ in their form content

import Image from "next/image";

export default function AuthShell({
  heading,
  children,
  maxWidth = "max-w-[28rem]",
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 relative bg-primary"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`relative z-10 w-full ${maxWidth} flex flex-col items-center justify-center pt-40`}
      >
        {/* Foodo logo mark */}
        <Image
          src="/Logo.svg"
          alt="Foodo"
          width={145}
          height={92}
          className="w-32 h-auto mb-4"
          priority
        />

        {heading && (
          <h1 className="font-display text-3xl md:text-4xl text-text-heading text-center mb-8 leading-tight">
            {heading}
          </h1>
        )}

        {children}
      </div>
    </div>
  );
}
