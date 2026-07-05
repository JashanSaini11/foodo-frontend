import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { ArrowRight } from "@/assets/icons/index";


function FeatureCard({
  imageSrc,
  imageAlt,
  heading,
  description,
  buttonLabel,
  buttonStyle, // "yellow" | "white"
  route,
}) {
  const router = useRouter();
  const guard = useAuthGuard();

  const handleClick = () => {
    guard(() => router.push(route));
  };

  return (
    <article
      className="
        relative overflow-hidden rounded-[24px] sm:rounded-[32px]
        flex flex-col justify-between
        p-6 sm:p-8 lg:p-[50px]
        w-full lg:w-[840px]
        min-h-[360px] sm:min-h-[440px] lg:h-[540px]
      "
    >
      {/* ─── Background image ──────────────────────────────── */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* ─── Dark overlay ──────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

      {/* ─── Content ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
        <h3
          className="
            font-display text-white
            text-[32px] leading-[42px]
            sm:text-[42px] sm:leading-[56px]
            lg:text-[55px] lg:leading-[72px]
            max-w-full lg:max-w-[763px]
          "
          style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
        >
          {heading}
        </h3>
        <p
          className="
            font-body font-semibold text-white
            text-[15px] sm:text-[17px] lg:text-[20px]
            max-w-full lg:max-w-[699px]
            leading-relaxed
          "
          style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
        >
          {description}
        </p>
      </div>

      {/* ─── CTA Button ────────────────────────────────────── */}
      <div className="relative z-10 mt-6 sm:mt-8 lg:mt-0">
        <button
          onClick={handleClick}
          className={`
            flex items-center justify-center gap-2
            rounded-full font-body font-semibold
            text-[16px] sm:text-[18px] lg:text-[20px]
            h-10 sm:h-11 lg:h-[44px]
            px-6 sm:px-8
            backdrop-blur-sm transition-colors
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            ${
              buttonStyle === "yellow"
                ? "border border-[rgba(252,221,12,0.4)] bg-[rgba(252,221,12,0.2)] text-primary hover:bg-[rgba(252,221,12,0.40)] focus-visible:outline-primary"
                : "border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.35)] focus-visible:outline-white"
            }
          `}
        >
          {buttonLabel}
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

export default FeatureCard;