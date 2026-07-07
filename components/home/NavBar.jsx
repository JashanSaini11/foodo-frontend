"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import useAuthStore from "@/store/authStore";
import { HamburgerIcon, CartButton } from "@/assets/icons/index";
import LocationDropdown from "@/components/ui/LocationDropdown";
import MobileDrawer from "@/components/ui/MobileDrawer";
import UserMenu from "@/components/ui/UserMenu";



// ─── AuthLinks ────────────────────────────────────────────────
// Login + Sign Up buttons for non-authenticated users
function AuthLinks({ scrolled }) {
  const compact = scrolled;
  return (
    <>
      <Link
        href="/login"
        className={`
          flex items-center justify-center rounded-md2
          font-body font-semibold hover:opacity-90
          transition-all duration-300
          ${compact ? "h-9 px-4 text-[13px]" : "h-11 px-7 text-mini-lg"}
        `}
        style={{
          backgroundColor: "var(--color-text-heading)",
          color: "var(--color-bg-page)",
        }}
      >
        Login
      </Link>
      <Link
        href="/signup"
        className={`
          flex items-center justify-center rounded-md2
          font-body font-semibold hover:opacity-90
          transition-all duration-300
          ${compact ? "h-9 px-4 text-[13px]" : "h-11 px-7 text-mini-lg"}
        `}
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-text-heading)",
        }}
      >
        Sign Up
      </Link>
    </>
  );
}



// ─── NAVBAR ───────────────────────────────────────────────────
export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-300 ease-in-out
          ${scrolled ? "bg-transparent" : "bg-bg-page/95 backdrop-blur-sm"}
        `}
      >
        <div
          className={`
            flex items-center justify-between
            transition-all duration-300 ease-in-out
            ${
              scrolled
                ? "mx-3 sm:mx-6 md:mx-auto md:max-w-4xl mt-3 h-14 px-4 sm:px-5 bg-bg-page/90 rounded-full backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
                : "mx-auto max-w-480 px-4 sm:px-6 lg:px-10 h-20"
            }
          `}
        >
          {/* ── Left ────────────────────────────────────────── */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0"
              aria-label="Foodo home"
            >
              <Image
                src="/Logo.svg"
                alt=""
                width={48}
                height={30}
                priority
                className={`w-auto transition-all duration-300 ${scrolled ? "h-7" : "h-9 sm:h-10"}`}
              />
              <span
                className={`
                font-display font-black text-text-heading leading-none tracking-[-2px]
                transition-all duration-300
                ${scrolled ? "text-[22px] sm:text-[26px]" : "text-[28px] sm:text-h4"}
              `}
              >
                Foodo
              </span>
            </Link>

            <span
              className="h-6 w-px bg-border-light shrink-0 hidden sm:block"
              aria-hidden="true"
            />

            <div className="hidden sm:block">
              <LocationDropdown scrolled={scrolled} />
            </div>
          </div>

          {/* ── Center: Search ───────────────────────────────── */}
          <div
            className={`
            hidden lg:block flex-1 transition-all duration-300
            ${scrolled ? "max-w-72 mx-4" : "max-w-125 mx-8"}
          `}
          >
            <div
              className={`
              flex items-center gap-3 bg-bg-input-alt border border-border-light
              rounded-xl px-3 sm:px-4 cursor-pointer hover:shadow-card
              transition-all duration-300
              ${scrolled ? "py-1.5" : "py-3"}
            `}
              role="search"
              aria-label="Search restaurants or dishes"
            >
              <svg
                width="16"
                height="16"
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
              <span
                className={`font-body font-semibold text-text-placeholder transition-all duration-300 ${scrolled ? "text-[13px]" : "text-mini-lg"}`}
              >
                Search restaurants or dishes
              </span>
            </div>
          </div>

          {/* ── Right ────────────────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <CartButton scrolled={scrolled} />
                  <UserMenu size={scrolled ? "sm" : "md"} />
                </>
              ) : (
                <AuthLinks scrolled={scrolled} />
              )}
            </div>

            {/* Mobile — UserMenu reused here (no duplication) */}
            {isAuthenticated && (
              <div className="lg:hidden">
                <UserMenu size="sm" />
              </div>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition-colors"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}
