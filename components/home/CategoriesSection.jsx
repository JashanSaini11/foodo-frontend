"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { categories } from "@/data/categories";
import ArrowButton from "@/components/ui/ArrowButton";

function CategoryItem({ category, onClick }) {
  return (
    <button
      onClick={() => onClick(category.value)}
      aria-label={`Browse ${category.name} restaurants`}
      className="
        flex flex-col items-center shrink-0 group
        gap-2 sm:gap-3 lg:gap-5
        focus-visible:outline-none
      "
    >
      <div
        className="
          rounded-full bg-bg-card overflow-hidden
          group-hover:scale-105 group-active:scale-95
          transition-transform duration-200
          shadow-card cursor-pointer
          w-[80px] h-[80px]
          sm:w-[120px] sm:h-[120px]
          lg:w-[200px] lg:h-[200px]
        "
      >
        <Image
          src={category.image}
          alt={category.name}
          width={200}
          height={200}
          className="w-full h-full object-fit"
          loading="lazy"
        />
      </div>

      <span
        className="
          font-body font-semibold text-text-heading text-center
          text-[12px] sm:text-[16px] lg:text-[24px]
          max-w-[80px] sm:max-w-[120px] lg:max-w-none
          leading-tight
        "
      >
        {category.name}
      </span>
    </button>
  );
}

// ─── CATEGORIES SECTION ───────────────────────────────────────
export default function CategoriesSection() {
  const router = useRouter();
  const guard = useAuthGuard();
  const scrollRef = useRef(null);

  // ── Arrow scroll ────────────────────────────────────────
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    // scroll amount scales with viewport
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  // ── Category click ──────────────────────────────────────
  // Not logged in → AuthModal
  // Logged in     → /restaurants?category=Pizza
  const handleCategoryClick = (categoryValue) => {
    guard(() => {
      router.push(`/restaurants?category=${encodeURIComponent(categoryValue)}`);
    });
  };

  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-bg-page py-10 sm:py-12 lg:py-[47px] px-4 sm:px-6 lg:px-[105px]"
    >
      <div className="max-w-[1920px] mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-[59px]">
        <div className="flex items-center justify-between">
          <h2
            id="categories-heading"
            className="
              font-display text-primary leading-tight
              text-[36px] sm:text-[48px] lg:text-[60px] lg:leading-[95px]
            "
          >
            Popular Categories
          </h2>

          <div
            className="hidden sm:flex items-center gap-3 sm:gap-4 lg:gap-5"
            aria-label="Carousel controls"
          >
            <ArrowButton direction="left" onClick={() => scroll("left")} />
            <ArrowButton direction="right" onClick={() => scroll("right")} />
          </div>
        </div>

        <div
          ref={scrollRef}
          role="list"
          aria-label="Food categories"
          className="
            flex overflow-x-auto
            gap-6 sm:gap-10 lg:gap-[98px]
            px-0 sm:px-4 lg:px-[73px]
            py-2 sm:py-3 lg:py-[14px]
            scroll-smooth
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch", // smooth iOS momentum scroll
          }}
        >
          {categories.map((cat) => (
            <div key={cat.name} role="listitem">
              <CategoryItem category={cat} onClick={handleCategoryClick} />
            </div>
          ))}
        </div>

        <p
          className="sm:hidden text-center font-body text-mini-sm text-text-muted"
          aria-hidden="true"
        >
          Swipe to see more →
        </p>
      </div>
    </section>
  );
}
