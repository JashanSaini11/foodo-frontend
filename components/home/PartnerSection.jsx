"use client";
import FeatureCard from "@/components/ui/FeatureCard";
import DeliveryCardImg from "@/assets/images/DeliveryCardImg.png";
import RestaurantsCardImg from "@/assets/images/RestaurantsCardImg.png";

export default function FeatureCards() {
  return (
    <section
      aria-label="Partner with Foodo"
      className="bg-bg-page py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-[100px]"
    >
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-4 sm:gap-5 justify-center">
        {/* ─── Delivery Partner Card ─────────────────────────── */}
        <FeatureCard
          imageSrc={DeliveryCardImg.src}
          imageAlt="Delivery partner on a motorbike"
          heading="Deliver smiles. Earn on your own terms."
          description="Drive with Foodo and enjoy the freedom to choose when and where you deliver."
          buttonLabel="For couriers"
          buttonStyle="yellow"
          route="/delivery/register"
        />

        {/* ─── Restaurant Partner Card ───────────────────────── */}
        <FeatureCard
          imageSrc={RestaurantsCardImg.src}
          imageAlt="Restaurant kitchen with chefs"
          heading="Partner with Foodo — Grow your business faster"
          description="Join the Foodo family and reach thousands of hungry customers in your area."
          buttonLabel="For merchants"
          buttonStyle="white"
          route="/restaurant/register"
        />
      </div>
    </section>
  );
}
