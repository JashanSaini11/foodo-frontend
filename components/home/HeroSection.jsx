"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ClockIcon, LocationIcon } from "@/assets/icons/index";
import HeroImg from "@/assets/images/HeroImg.png";
import Image from "next/image";
import useAuthStore from "@/store/authStore";
import useUIStore from "@/store/uiStore";

export default function HeroSection() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useUIStore();

  const handleFindFood = () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    router.push("/restaurants");
  };

  return (
    <section className="bg-bg-page min-h-screen pt-20 flex items-center overflow-hidden">
      <div className="max-w-480 mx-auto px-6 md:px-lg xl:px-2xl py-10 flex flex-col xl:flex-row items-center justify-around gap-10 w-full">
        {/* ─── LEFT CONTENT ─────────────────────────────────── */}
        <div className="flex flex-col gap-5 md:gap-6 items-start flex-1 max-w-full xl:max-w-160 w-full">
          {/* Badge pill */}
          <div className="flex items-center gap-3 bg-primary px-5 py-2 rounded-full">
            <LocationIcon size={18} stroke="#412402" fill="none" />
            <span className="font-body font-medium text-mini-md md:text-[16px] text-primary-dark whitespace-nowrap">
              Free delivery today in your city
            </span>
          </div>

          {/* Headline */}
          <div className="font-display leading-none">
            <p className="text-[48px] md:text-[72px] xl:text-[96px] leading-tight xl:leading-27 text-text-heading">
              Order delivery
            </p>
            <p className="text-[48px] md:text-[72px] xl:text-[96px] leading-tight xl:leading-27">
              <span className="text-text-heading">near </span>
              <span
                className="text-primary"
                style={{
                  WebkitTextStroke: "2px #B8A000",
                  paintOrder: "stroke fill",
                }}
              >
                you
              </span>
            </p>
          </div>

          <p className="font-body font-semibold text-[16px] md:text-mini-lg xl:text-[20px] text-text-body leading-7 md:leading-8 max-w-full xl:max-w-130">
            Fresh food from the best restaurants in your city, delivered fast
            and hot
          </p>

          {/* Search + CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
            <div className="flex items-center gap-3 bg-white border-[1.5px] border-border-light rounded-md md:rounded-md2 px-5 h-16 flex-1 xl:w-102 shadow-card">
              <LocationIcon size={20} stroke="#FCDD0C" fill="none" />
              <input
                type="text"
                placeholder="Enter delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 bg-transparent font-body font-semibold text-[15px] md:text-mini-lg text-text-heading placeholder:text-text-placeholder outline-none py-2"
              />
            </div>
            <button
              onClick={handleFindFood}
              className="h-14 md:h-16 px-8 xl:w-45 bg-text-heading rounded-md  font-body font-semibold text-[15px] md:text-mini-lg text-primary hover:bg-black transition-colors shrink-0 cursor-pointer"
            >
              Find food
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-6">
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="font-body font-medium text-mini-md md:text-[16px] text-[#666]">
                500+ restaurants
              </span>
            </div>
            <span className="text-text-light text-sm hidden sm:block">|</span>
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="font-body font-medium text-mini-md md:text-[16px] text-[#666]">
                Safe & hygienic
              </span>
            </div>
            <span className="text-text-light text-sm hidden sm:block">|</span>
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span className="font-body font-medium text-mini-md md:text-[16px] text-[#666]">
                Live tracking
              </span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT VISUAL ─────────────────────────────────── */}
        <div
          className="relative shrink-0 hidden md:block
                        w-85 h-95
                        lg:w-110 lg:h-120
                        xl:w-130 xl:h-140"
        >
          {/* Decorative glow circles — behind everything */}
          <div
            className="absolute -bottom-10 -right-10 w-[110%] h-[110%] rounded-full blur-[100px] opacity-60 -z-10"
            style={{ background: "rgba(252,221,12,0.28)" }}
          />
          <div
            className="absolute top-10 -left-5 w-[55%] h-[55%] rounded-full blur-[80px] opacity-40 -z-10"
            style={{ background: "rgba(252,221,12,0.18)" }}
          />

          {/* ── Food image card ─────────────────────────────── */}
          <div className="relative w-full h-full bg-bg-card rounded-[28px] overflow-hidden border border-white/60 shadow-[0_24px_64px_rgba(0,0,0,0.14)]">
            {/* Subtle inner gradient for depth */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
            <Image
              src={HeroImg}
              fill
              sizes="( max-width: 640px ) 100vw, ( max-width: 1024px ) 50vw, 33vw"
              alt="Delicious burger"
              className="object-cover scale-105"
              priority
            />

            {/* ── Pills anchored INSIDE the card, bottom edge ── */}

            {/* Rating pill — bottom-left of card */}
            <div
              className="absolute bottom-5 left-5 z-20
                            flex items-center gap-2
                            bg-white/95 backdrop-blur-sm
                            border border-white
                            rounded-2xl px-4 py-2.5
                            shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center gap-1">
                <Star size={16} fill="#FCDD0C" />
                <Star size={16} fill="#FCDD0C" />
                <Star size={16} fill="#FCDD0C" />
                <Star size={16} fill="#FCDD0C" />
                <Star size={16} fill="#FCDD0C" />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-body font-bold text-[13px] text-text-heading">
                  4.9 rating
                </span>
                <span className="font-body text-[11px] text-text-muted">
                  2.4k reviews
                </span>
              </div>
            </div>

            {/* Delivery time pill — bottom-right of card */}
            <div
              className="absolute bottom-5 right-5 z-20
                            flex items-center gap-2.5
                            bg-primary
                            rounded-2xl px-4 py-2.5
                            shadow-[0_8px_24px_rgba(252,221,12,0.40)]"
            >
              <ClockIcon size={16} color="#412402" />
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-body font-bold text-[13px] text-primary-dark">
                  30 min
                </span>
                <span className="font-body text-[11px] text-primary-dark/70">
                  delivery
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -top-3 -right-3 z-20
                          flex items-center gap-2.5
                          bg-text-heading
                          rounded-2xl px-4 py-2.5
                          shadow-[0_8px_24px_rgba(0,0,0,0.20)]">
            {/* Pulsing green live indicator */}
            <span className="relative flex items-center justify-center w-2 h-2 shrink-0">
              <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
            </span>
            <div className="flex flex-col leading-none gap-0.5">
              <span className="font-body font-bold text-[13px] text-white">
                1.2k orders
              </span>
              <span className="font-body text-[11px] text-white/60">
                placed today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
