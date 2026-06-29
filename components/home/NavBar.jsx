"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { ChevronDown, PinIcon } from "@/assets/icons/index";
import useLocationStore from "@/store/locationStore";

// ─── Location Button ──────────────────────────────────────────
function LocationButton({ scrolled }) {
  const { city, setLocation } = useLocationStore();

  const handleClick = () => {
    if (!navigator.geolocation) return;
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
      },
    );
  };

  if (city) {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <PinIcon color="var(--color-primary)" size={18} />
        <div className="flex flex-col items-start leading-none gap-0.5">
          {!scrolled && (
            <span className="font-body text-mini-xs text-text-muted uppercase tracking-wide">
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
    >
      <PinIcon color="var(--color-primary)" size={16} />
      <span className="font-body font-semibold text-mini-md text-text-heading whitespace-nowrap">
        Set location
      </span>
      <ChevronDown size={12} />
    </button>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────
export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  // ── Scroll detection ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40
        bg-bg-page/95 backdrop-blur-sm
        transition-all duration-500 ease-in-out
        ${scrolled ? "h-15 " : "h-20"}
      `}
    >
      {/* ── Inner container — shrinks width when scrolled ──── */}
      <div
        className={`
          mx-auto h-full flex items-center justify-between
          transition-all duration-300 ease-in-out
          ${scrolled ? "max-w-7xl px-6" : "max-w-480 px-10"}
        `}
      >
        {/* ─── Left: Logo + Divider + Location ──────────────── */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/Logo.svg"
              alt="Foodo logo"
              width={48}
              height={30}
              className={`w-auto transition-all duration-300 ${scrolled ? "h-8" : "h-10"}`}
            />
            <span
              className={`
                font-display font-black text-text-heading leading-none tracking-[-2px]
                transition-all duration-300
                ${scrolled ? "text-[28px]" : "text-h4"}
              `}
            >
              Foodo
            </span>
          </Link>

          {/* Divider */}
          <span className="h-7 w-px bg-border-light shrink-0" />

          {/* Location */}
          <LocationButton scrolled={scrolled} />
        </div>

        {/* ─── Center: Search ───────────────────────────────── */}
        <div
          className={`
            flex-1 transition-all duration-300
            ${scrolled ? "max-w-90 mx-6" : "max-w-125 mx-8"}
          `}
        >
          <div
            className={`
              flex items-center gap-3 bg-bg-input-alt border border-border-light
              rounded-xl px-4 cursor-pointer hover:shadow-card transition-all duration-300
              ${scrolled ? "py-2" : "py-3"}
            `}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-placeholder)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span
              className={`
                font-body font-semibold text-text-placeholder transition-all duration-300
                ${scrolled ? "text-mini-md" : "text-mini-lg"}
              `}
            >
              Search restaurants or dishes
            </span>
          </div>
        </div>

        {/* ─── Right: Actions ───────────────────────────────── */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <>
              {/* Cart */}
              <button
                onClick={() => router.push("/cart")}
                className={`
                  relative flex items-center justify-center rounded-full
                  hover:bg-black/5 transition-all duration-300
                  ${scrolled ? "w-9 h-9" : "w-11 h-11"}
                `}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-heading)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </button>

              {/* Avatar */}
              <button
                onClick={() => router.push("/profile")}
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
                  font-body font-semibold bg-text-heading text-bg-page
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
                  flex items-center justify-center bg-primary rounded-md2
                  font-body font-semibold text-text-heading
                  hover:opacity-90 transition-all duration-300
                  ${scrolled ? "h-9 px-5 text-mini-md" : "h-11 px-7 text-mini-lg"}
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-text-heading)" }}
                `}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
