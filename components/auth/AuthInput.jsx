"use client";
// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Single input component used across login / signup / forgot password
// Matches design.md spec: bg-input white, radius-md, placeholder color
// Supports a password variant with show/hide eye toggle

import { useState } from "react";

export default function AuthInput({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  ...rest
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`
            w-full h-14 px-5 rounded-md bg-bg-input
            font-body text-base font-semibold text-text-heading
            placeholder:text-text-placeholder placeholder:font-semibold
            border ${error ? "border-red-400" : "border-border-light"}
            focus:outline-none focus:ring-2 focus:ring-primary-stroke/40
            transition-shadow
          `}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-heading transition-colors"
          >
            <EyeIcon open={show} />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm font-body text-red-600">{error}</p>
      )}
    </div>
  );
}

function EyeIcon({ open }) {
  if (open) {
    // eye-off
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    );
  }
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
