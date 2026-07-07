"use client";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HamburgerIcon } from "@/assets/icons/index";
import LocationDropdown from "@/components/ui/LocationDropdown";
import { useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "My Orders", href: "/orders" },
];

// ─── MobileDrawer ─────────────────────────────────────────────
function MobileDrawer({ isOpen, onClose }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleNav = useCallback(
    (path) => {
      onClose();
      router.push(path);
    },
    [router, onClose],
  );

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`
          fixed inset-0 z-30 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 lg:hidden
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`
          fixed top-0 right-0 bottom-0 z-50
          w-[min(320px,85vw)] bg-bg-page flex flex-col
          transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-border-light shrink-0">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2"
            aria-label="Foodo home"
          >
            <Image
              src="/Logo.svg"
              alt=""
              width={36}
              height={24}
              className="h-8 w-auto"
            />
            <span className="font-display text-[26px] font-black text-text-heading leading-none tracking-[-2px]">
              Foodo
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <HamburgerIcon open />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6 px-5 py-6 flex-1 overflow-y-auto">
          {/* Location */}
          <div className="pb-4 border-b border-border-light">
            <p className="font-body text-mini-xs text-text-muted uppercase tracking-wide mb-3">
              Delivery location
            </p>
            <LocationDropdown scrolled={false} />
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 bg-bg-input-alt border border-border-light rounded-xl px-4 py-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-placeholder)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="font-body font-semibold text-mini-md text-text-placeholder">
              Search restaurants or dishes
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={onClose}
                className="font-body font-semibold text-[16px] text-text-heading px-3 py-3 rounded-xl hover:bg-black/5 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-5 pb-8 pt-4 border-t border-border-light shrink-0">
          {isAuthenticated ? (
            <button
              onClick={() => handleNav("/cart")}
              className="w-full h-12 flex items-center justify-center gap-3 rounded-md2 font-body font-semibold text-mini-lg bg-primary text-text-heading hover:opacity-90 transition-opacity"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              View Cart
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={onClose}
                className="w-full h-12 flex items-center justify-center rounded-md2 font-body font-semibold text-mini-lg hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "var(--color-text-heading)",
                  color: "var(--color-bg-page)",
                }}
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={onClose}
                className="w-full h-12 flex items-center justify-center rounded-md2 font-body font-semibold text-mini-lg hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-text-heading)",
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MobileDrawer;
