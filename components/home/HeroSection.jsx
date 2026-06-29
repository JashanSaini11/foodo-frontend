"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  const handleFindFood = () => {
    router.push("/restaurants");
  };

  return (
    <section className="bg-bg-page min-h-screen pt-[81px] flex items-center  overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-[120px] py-[40px] flex items-center gap-10 w-full">

        {/* ─── LEFT CONTENT ─────────────────────────────────── */}
        <div className="flex flex-col gap-6 items-start flex-1 max-w-[640px]">

          {/* Badge pill */}
          <div className="flex items-center gap-3 bg-primary px-5 py-2 rounded-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#412402" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-body font-medium text-[16px] text-primary-dark whitespace-nowrap">
              Free delivery today in your city
            </span>
          </div>

          {/* Headline */}
          <div className="font-display leading-none">
            <p className="text-[96px] leading-[110px] text-text-heading">
              Order delivery
            </p>
            <p className="text-[96px] leading-[110px]">
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

          <p className="font-body font-semibold text-[20px] text-text-body leading-[32px] max-w-[520px]">
            Fresh food from the best restaurants in your city, delivered fast and hot
          </p>

          {/* Search + CTA */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white border-[1.5px] border-border-light rounded-[14px] px-5 h-[64px] w-[420px] shadow-card">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FCDD0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                placeholder="Enter delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 bg-transparent font-body font-semibold text-[18px] text-text-heading placeholder:text-text-placeholder outline-none"
              />
            </div>
            <button
              onClick={handleFindFood}
              className="h-[64px] w-[180px] bg-text-heading rounded-[14px] font-body font-semibold text-[18px] text-primary hover:bg-black transition-colors shrink-0"
            >
              Find food
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="font-body font-medium text-[16px] text-[#666]">500+ restaurants</span>
            </div>
            <span className="text-text-light text-sm">|</span>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="font-body font-medium text-[16px] text-[#666]">Safe & hygienic</span>
            </div>
            <span className="text-text-light text-sm">|</span>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span className="font-body font-medium text-[16px] text-[#666]">Live tracking</span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT VISUAL ─────────────────────────────────── */}
        <div className="relative shrink-0 w-[700px] h-[700px]">
          {/* Decorative circles */}
          <div
            className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full"
            style={{ background: "rgba(252,221,12,0.18)" }}
          />
          <div
            className="absolute bottom-20 right-20 w-[400px] h-[400px] rounded-full"
            style={{ background: "rgba(252,221,12,0.10)" }}
          />

          {/* Food image card */}
          <div className="absolute top-[59px] left-[22px] w-[460px] h-[460px] bg-bg-card rounded-[32px] overflow-hidden">
            <img
              src="https://www.figma.com/api/mcp/asset/f1d32efe-f453-4ba2-978e-3493b3ec8f44"
              alt="Delicious burger"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Stat pill — Rating */}
          <div className="absolute bottom-[120px] left-[100px] flex items-center gap-2 bg-white border border-border-card rounded-[12px] px-3 py-2.5 shadow-card">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FCDD0C" stroke="#FCDD0C" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-body font-bold text-[14px] text-text-heading">4.9</span>
            <span className="font-body font-semibold text-[12px] text-text-muted">rating</span>
          </div>

          {/* Stat pill — Time */}
          <div className="absolute bottom-[120px] left-[220px] flex items-center gap-2 bg-white border border-border-card rounded-[12px] px-3 py-2.5 shadow-card">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-body font-bold text-[14px] text-text-heading">30 min</span>
          </div>
        </div>
      </div>
    </section>
  );
}