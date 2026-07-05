"use client";
// components/home/Navbar.jsx

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import useAuthStore from "@/store/authStore";
import useLocationStore from "@/store/locationStore";
import useUIStore from "@/store/uiStore";
import { ChevronDown, LocationIcon, HamburgerIcon } from "@/assets/icons/index";

// ─── Plus Icon (inline — no extra asset needed) ───────────────
function PlusIcon() {
  return (
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ─── Spinner ──────────────────────────────────────────────────
function Spinner() {
  return (
    <span
      className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin shrink-0"
      aria-hidden="true"
    />
  );
}

// ─── Location Dropdown ────────────────────────────────────────
// First click → opens dropdown (NOT direct GPS)
// Not logged in → AuthModal
// Logged in → dropdown with options
function LocationDropdown({ scrolled }) {
  const router = useRouter();
  const { city, setLocation } = useLocationStore();
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isGettingGPS, setIsGettingGPS] = useState(false);
  const wrapperRef = useRef(null);

  // ── Close when clicking outside ───────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // ── Close on Escape ───────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // ── Trigger button click ──────────────────────────────────
  const handleTrigger = () => {
    if (!isAuthenticated) {
      openAuthModal(); // not logged in → auth modal
      return;
    }
    setIsOpen((o) => !o); // logged in → toggle dropdown
  };

  // ── Get GPS location ──────────────────────────────────────
  const handleGPS = () => {
    if (!navigator.geolocation) return;
    setIsGettingGPS(true);

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
          setLocation({
            city: cityName,
            address: shortAddress,
            latitude,
            longitude,
          });
        } catch {
          setLocation({
            city: "Current Location",
            address: "Current Location",
            latitude,
            longitude,
          });
        }
        setIsGettingGPS(false);
        setIsOpen(false);
      },
      () => setIsGettingGPS(false),
    );
  };

  // ── Add new address ───────────────────────────────────────
  const handleAddNew = () => {
    setIsOpen(false);
    router.push("/profile/addresses");
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {/* ── Trigger button ──────────────────────────────────── */}
      <button
        onClick={handleTrigger}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={
          city
            ? `Delivering to ${city}. Click to change`
            : "Set delivery location"
        }
        className={`
          flex items-center gap-2 transition-opacity
          ${isOpen ? "opacity-70" : "hover:opacity-80"}
          ${
            !city
              ? "px-3 py-1.5 rounded-xl border border-dashed border-primary bg-primary/10 hover:bg-primary/20"
              : ""
          }
        `}
      >
        <LocationIcon size={16} fill="none" color="var(--color-primary)" />

        {city ? (
          // ── Has location ──────────────────────────────────
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
        ) : (
          // ── No location ───────────────────────────────────
          <span className="font-body font-semibold text-mini-md text-text-heading whitespace-nowrap">
            Set location
          </span>
        )}

        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── Dropdown panel ──────────────────────────────────── */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select delivery location"
          className="
            absolute top-full left-0 mt-3 w-72
            bg-white rounded-2xl shadow-modal
            border border-border-light z-50
            overflow-hidden
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          {/* ── Current location (if set) ───────────────────── */}
          {city && (
            <div className="px-4 py-3 bg-primary/5 border-b border-border-light">
              <p className="font-body text-[11px] text-text-muted uppercase tracking-wide mb-1.5">
                Current delivery location
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-green-500 shrink-0"
                  aria-hidden="true"
                />
                <p className="font-body font-semibold text-[14px] text-text-heading truncate">
                  {city}
                </p>
              </div>
            </div>
          )}

          {/* ── Use GPS ─────────────────────────────────────── */}
          <button
            onClick={handleGPS}
            disabled={isGettingGPS}
            role="option"
            aria-selected="false"
            className="
              w-full flex items-center gap-3 px-4 py-3.5
              hover:bg-bg-page transition-colors
              border-b border-border-light
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            <div
              className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <LocationIcon
                size={16}
                color="var(--color-primary)"
                fill="none"
              />
            </div>
            <div className="text-left flex-1">
              <p className="font-body font-semibold text-[14px] text-text-heading">
                {isGettingGPS ? "Getting location…" : "Use current location"}
              </p>
              <p className="font-body text-[12px] text-text-muted">
                GPS — most accurate
              </p>
            </div>
            {isGettingGPS && <Spinner />}
          </button>

          {/* ── Saved addresses (placeholder — connect later) ── */}
          {/* 
            TODO: fetch from GET /api/users/addresses and map here
            Each saved address:
            <button onClick={() => { setLocation(...); setIsOpen(false); }}>
              <HomeIcon /> {address.label} · {address.city}
            </button>
          */}

          {/* ── Add new address ─────────────────────────────── */}
          <button
            onClick={handleAddNew}
            role="option"
            aria-selected="false"
            className="
              w-full flex items-center gap-3 px-4 py-3.5
              hover:bg-bg-page transition-colors
            "
          >
            <div
              className="w-9 h-9 rounded-full bg-border-light/70 flex items-center justify-center shrink-0 text-text-muted"
              aria-hidden="true"
            >
              <PlusIcon />
            </div>
            <p className="font-body font-semibold text-[14px] text-text-heading text-left">
              Add new address
            </p>
          </button>
        </div>
      )}
    </div>
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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Lock body scroll when mobile menu open ────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleNav = useCallback(
    (path) => {
      closeMobile();
      router.push(path);
    },
    [router, closeMobile],
  );

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────── */}
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
                ? `
                  mx-3 sm:mx-6 md:mx-auto md:max-w-4xl
                  mt-3 h-14 px-4 sm:px-5 bg-bg-page/90
                  rounded-full
                  backdrop-blur-xl
                  border border-white/50
                  shadow-[0_8px_32px_rgba(0,0,0,0.10)]
                `
                : `
                  mx-auto max-w-480
                  px-4 sm:px-6 lg:px-10
                  h-20
                `
            }
          `}
        >
          {/* ── Left: Logo + Divider + Location ─────────────── */}
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
                className={`w-auto transition-all duration-300 ${scrolled ? "h-7" : "h-9 sm:h-10"}`}
                priority
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

            {/* Divider */}
            <span
              className="h-6 w-px bg-border-light shrink-0 hidden sm:block"
              aria-hidden="true"
            />

            {/* Location Dropdown */}
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
                flex items-center gap-3
                bg-bg-input-alt border border-border-light
                rounded-xl px-3 sm:px-4 cursor-pointer
                hover:shadow-card transition-all duration-300
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
                className={`
                font-body font-semibold text-text-placeholder transition-all duration-300
                ${scrolled ? "text-[13px]" : "text-mini-lg"}
              `}
              >
                Search restaurants or dishes
              </span>
            </div>
          </div>

          {/* ── Right: Auth + Hamburger ──────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop auth */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNav("/cart")}
                    aria-label="View cart"
                    className={`
                      relative flex items-center justify-center rounded-full
                      hover:bg-black/5 transition-all duration-300
                      ${scrolled ? "w-8 h-8" : "w-11 h-11"}
                    `}
                  >
                    <svg
                      width={scrolled ? 18 : 22}
                      height={scrolled ? 18 : 22}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-text-heading)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </button>
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
                      font-body font-semibold hover:opacity-90
                      transition-all duration-300
                      ${scrolled ? "h-9 px-4 text-[13px]" : "h-11 px-7 text-mini-lg"}
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
                      ${scrolled ? "h-9 px-4 text-[13px]" : "h-11 px-7 text-mini-lg"}
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

            {/* Mobile avatar */}
            {isAuthenticated && (
              <button
                onClick={() => handleNav("/profile")}
                aria-label="View profile"
                className="lg:hidden w-8 h-8 rounded-full bg-primary flex items-center justify-center font-body font-bold text-primary-dark text-xs shrink-0"
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </button>
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

      {/* ── MOBILE MENU ─────────────────────────────────────── */}

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
          fixed top-0 right-0 bottom-0 z-50
          w-[min(320px,85vw)] bg-bg-page flex flex-col
          transition-transform duration-300 ease-in-out lg:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-border-light shrink-0">
          <Link
            href="/"
            onClick={closeMobile}
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
            onClick={closeMobile}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <HamburgerIcon open />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex flex-col gap-6 px-5 py-6 flex-1 overflow-y-auto">
          {/* Location in mobile */}
          <div className="pb-4 border-b border-border-light">
            <p className="font-body text-mini-xs text-text-muted uppercase tracking-wide mb-3">
              Delivery location
            </p>
            <LocationDropdown scrolled={false} />
          </div>

          {/* Mobile search */}
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

        {/* Drawer footer */}
        {!isAuthenticated ? (
          <div className="px-5 pb-8 pt-4 border-t border-border-light flex flex-col gap-3 shrink-0">
            <Link
              href="/login"
              onClick={closeMobile}
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
              onClick={closeMobile}
              className="w-full h-12 flex items-center justify-center rounded-md2 font-body font-semibold text-mini-lg hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-text-heading)",
              }}
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="px-5 pb-8 pt-4 border-t border-border-light shrink-0">
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
          </div>
        )}
      </div>
    </>
  );
}
