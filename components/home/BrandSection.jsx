import { brands } from "@/data/brands";
import BrandItem from "@/components/ui/BrandItem";

// Duplicate for seamless infinite loop
const marqueeItems = [...brands, ...brands];

// ─── BRAND STRIP ─────────────────────────────────────────────
export default function BrandSection() {
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
            className="brand-marquee flex items-center gap-8 sm:gap-12 lg:gap-16 w-max"
            style={{ animation: "foodo-marquee 30s linear infinite" }}
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
