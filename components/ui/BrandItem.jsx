"use client";

import { useState } from "react";

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
              loading="lazy"
              decoding="async"
              className="h-full w-auto object-contain block"
              onError={() => setImgError(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandItem;