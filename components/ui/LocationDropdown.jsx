import useLocationStore from "@/store/locationStore";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import useUIStore from "@/store/uiStore";
import { useState } from "react";
import { ChevronDown, LocationIcon, PlusIcon } from "@/assets/icons/index";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/common/dropdown-menu";

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
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
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
              <span className="font-body font-semibold text-mini-md text-text-heading whitespace-nowrap">
                Set location
              </span>
            )}

            <ChevronDown
              size={12}
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={6}
          className="w-72 border border-border-light bg-white rounded-2xl shadow-modal p-1"
        >
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

          <DropdownMenuItem
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-bg-page transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            onSelect={handleGPS}
          >
            <div
              className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <LocationIcon size={16} color="var(--color-primary)" fill="none" />
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
          </DropdownMenuItem>

          <DropdownMenuItem
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-bg-page transition-colors"
            onSelect={handleAddNew}
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
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default LocationDropdown;
