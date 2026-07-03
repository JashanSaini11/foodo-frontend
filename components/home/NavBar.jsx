"use client";
// components/home/Navbar.jsx

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import useAuthStore from "@/store/authStore";
import { ChevronDown, LocationIcon } from "@/assets/icons/index";
import useLocationStore from "@/store/locationStore";

// ─── Location Button ──────────────────────────────────────────
function LocationButton({ scrolled, onClose }) {
  const { city, setLocation } = useLocationStore();

  const handleClick = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;
    onClose?.();
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await res.json();
          const cityName =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "Your Location";
          const shortAddress =
            data.address?.suburb || data.address?.neighbourhood || cityName;
          setLocation({ city: cityName, address: shortAddress, latitude, longitude });
        } catch {
          setLocation({ city: "Current Location", address: "Current Location", latitude, longitude });
        }
      },
    );
  }, [setLocation, onClose]);

  if (city) {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label={`Delivering to ${city}. Click to change location`}
      >
        <LocationIcon size={16} fill="none" />
        <div className="flex flex-col items-start leading-none gap-0.5">
          {!scrolled && (
            <span className="font-body text-mini-xs text-text-muted uppercase tracking-wide hidden sm:block">
              Delivering to
            </span>
          )}
          <span className="font-body font-semibold text-[15px] text-text-heading max-w-35 truncate">
            {city}
          </span>
        </div>
        <ChevronDown />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-dashed border-primary bg-primary/10 hover:bg-primary/20 transition-colors"
      aria-label="Set your delivery location"
    >
      <LocationIcon size={16} fill="none" />
      <span className="font-body font-semibold text-mini-md text-text-heading whitespace-nowrap">
        Set location
      </span>
      <ChevronDown size={12} />
    </button>
  );
}

// ─── Hamburger Icon ───────────────────────────────────────────
function HamburgerIcon({ open }) {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="var(--color-text-heading)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────
export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll detection ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu on route change ─────────────────────
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  // ── Lock body scroll when mobile menu is open ─────────────
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleNav = useCallback((path) => {
    closeMobile();
    router.push(path);
  }, [router, closeMobile]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-300 ease-in-out
          ${scrolled
            ? "h-15 border-b border-white/40 bg-bg-page/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            : "h-20 bg-bg-page/95 backdrop-blur-sm"
          }
        `}
      >
        {/* ── Inner container ─────────────────────────────── */}
        <div
          className={`
            mx-auto h-full flex items-center justify-between
            transition-all duration-300 ease-in-out
            px-4 sm:px-6
            ${scrolled ? "max-w-7xl lg:px-6" : "max-w-480 lg:px-10"}
          `}
        >
          {/* ─── Left: Logo + Divider + Location ───────────── */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Logo */}
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
                className={`w-auto transition-all duration-300 ${scrolled ? "h-8" : "h-9 sm:h-10"}`}
                priority
              />
              <span
                className={`
                  font-display font-black text-text-heading leading-none tracking-[-2px]
                  transition-all duration-300
                  ${scrolled ? "text-[24px] sm:text-[28px]" : "text-[28px] sm:text-h4"}
                `}
              >
                Foodo
              </span>
            </Link>

            {/* Divider — hidden on small mobile */}
            <span className="h-7 w-px bg-border-light shrink-0 hidden sm:block" />

            {/* Location — hidden on small mobile */}
            <div className="hidden sm:block">
              <LocationButton scrolled={scrolled} onClose={closeMobile} />
            </div>
          </div>

          {/* ─── Center: Search — hidden on mobile ─────────── */}
          <div
            className={`
              hidden lg:block flex-1 transition-all duration-300
              ${scrolled ? "max-w-90 mx-6" : "max-w-125 mx-8"}
            `}
          >
            <div
              className={`
                flex items-center gap-3 bg-bg-input-alt border border-border-light
                rounded-xl px-4 cursor-pointer
                hover:shadow-card transition-all duration-300
                ${scrolled ? "py-2" : "py-3"}
              `}
              role="search"
              aria-label="Search restaurants or dishes"
            >
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="var(--color-text-placeholder)" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span
                className={`
                  font-body font-semibold text-text-placeholder
                  transition-all duration-300
                  ${scrolled ? "text-mini-md" : "text-mini-lg"}
                `}
              >
                Search restaurants or dishes
              </span>
            </div>
          </div>

          {/* ─── Right: Desktop actions + Mobile hamburger ─── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop auth actions */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Cart */}
                  <button
                    onClick={() => handleNav("/cart")}
                    aria-label="View cart"
                    className={`
                      relative flex items-center justify-center rounded-full
                      hover:bg-black/5 transition-all duration-300
                      ${scrolled ? "w-9 h-9" : "w-11 h-11"}
                    `}
                  >
                    <svg
                      width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke="var(--color-text-heading)" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </button>

                  {/* Avatar */}
                  <button
                    onClick={() => handleNav("/profile")}
                    aria-label="View profile"
                    className={`
                      rounded-full bg-primary flex items-center justify-center
                      font-body font-bold text-primary-dark shrink-0
                      transition-all duration-300
                      ${scrolled ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"}
                    `}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`
                      flex items-center justify-center rounded-md2
                      font-body font-semibold
                      hover:opacity-90 transition-all duration-300
                      ${scrolled ? "h-9 px-5 text-mini-md" : "h-11 px-7 text-mini-lg"}
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
                      font-body font-semibold
                      hover:opacity-90 transition-all duration-300
                      ${scrolled ? "h-9 px-5 text-mini-md" : "h-11 px-7 text-mini-lg"}
                    `}
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-text-heading)",
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile: avatar or hamburger */}
            {isAuthenticated && (
              <button
                onClick={() => handleNav("/profile")}
                aria-label="View profile"
                className="lg:hidden w-9 h-9 rounded-full bg-primary flex items-center justify-center font-body font-bold text-primary-dark text-sm shrink-0"
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </button>
            )}

            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu Overlay ─────────────────────────────── */}
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeMobile}
        className={`
          fixed inset-0 z-30 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 lg:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`
          fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)]
          bg-bg-page flex flex-col
          transition-transform duration-300 ease-in-out lg:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-border-light shrink-0">
          <Link href="/" onClick={closeMobile} className="flex items-center gap-2" aria-label="Foodo home">
            <Image src="/Logo.svg" alt="" width={36} height={24} className="h-8 w-auto" />
            <span className="font-display text-[28px] font-black text-text-heading leading-none tracking-[-2px]">
              Foodo
            </span>
          </Link>
          <button
            onClick={closeMobile}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <HamburgerIcon open />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex flex-col gap-6 px-5 py-6 flex-1 overflow-y-auto">
          {/* Location in mobile menu */}
          <div className="pb-4 border-b border-border-light">
            <p className="font-body text-mini-xs text-text-muted uppercase tracking-wide mb-2">
              Delivery location
            </p>
            <LocationButton scrolled={false} onClose={closeMobile} />
          </div>

          {/* Mobile search */}
          <div className="flex items-center gap-3 bg-bg-input-alt border border-border-light rounded-xl px-4 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="var(--color-text-placeholder)" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="font-body font-semibold text-mini-md text-text-placeholder">
              Search restaurants or dishes
            </span>
          </div>

          {/* Mobile nav links */}
          <nav className="flex flex-col gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "Restaurants", href: "/restaurants" },
              { label: "My Orders", href: "/orders" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMobile}
                className="font-body font-semibold text-[16px] text-text-heading px-3 py-3 rounded-xl hover:bg-black/5 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Drawer footer — auth buttons */}
        {!isAuthenticated && (
          <div className="px-5 pb-8 pt-4 border-t border-border-light flex flex-col gap-3 shrink-0">
            <Link
              href="/login"
              onClick={closeMobile}
              className="w-full h-12 flex items-center justify-center rounded-md2 font-body font-semibold text-mini-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--color-text-heading)", color: "var(--color-bg-page)" }}
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={closeMobile}
              className="w-full h-12 flex items-center justify-center rounded-md2 font-body font-semibold text-mini-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-text-heading)" }}
            >
              Sign Up
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="px-5 pb-8 pt-4 border-t border-border-light shrink-0">
            <button
              onClick={() => handleNav("/cart")}
              className="w-full h-12 flex items-center justify-center gap-3 rounded-md2 font-body font-semibold text-mini-lg bg-primary text-text-heading hover:opacity-90 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              View Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}