"use client";

import { useState } from "react";
import { brands } from "@/data/brands";

// Duplicate for seamless infinite loop
const marqueeItems = [...brands, ...brands];

// ─── Brand Item ───────────────────────────────────────────────
function BrandItem({ brand, ariaHidden }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="shrink-0 flex items-center gap-4 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default select-none px-2"
      aria-hidden={ariaHidden}
    >
      <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
        {imgError ? (
          <span
            className="text-3xl sm:text-6xl md:text-7xl"
            role="img"
            aria-label={brand.name}
          >
            {brand.fallback}
          </span>
        ) : (
            
            <div
            style={{ transform: `scale(${brand.scale ?? 1})`, transformOrigin: "center" }}
            className="flex items-center justify-center"
            >
             
            <img
              src={brand.logo}
              alt={brand.name}
              width={96}
              height={96}
              className="h-full w-auto object-contain block"
              onError={() => setImgError(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BRAND STRIP ─────────────────────────────────────────────
export default function BrandStrip() {
  return (
    <section
      aria-label="Trusted brands"
      className="bg-bg-page py-12 sm:py-17 overflow-hidden"
    >
      <div className="flex flex-col items-center gap-8 sm:gap-15">
        {/* ─── Heading ──────────────────────────────────────── */}
        <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[60px] leading-tight text-primary text-center px-4">
          Trusted by popular brands
        </h2>

        {/* ─── Marquee ──────────────────────────────────────── */}
        <div
          className="relative w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div
            className="flex items-center gap-8 sm:gap-12 lg:gap-16 w-max"
            style={{ animation: "foodo-marquee 30s linear infinite" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.animationPlayState = "paused")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.animationPlayState = "running")
            }
          >
            {marqueeItems.map((brand, index) => (
              <BrandItem
                key={`${brand.name}-${index}`}
                brand={brand}
                ariaHidden={index >= brands.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
