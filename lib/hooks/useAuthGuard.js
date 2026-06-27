// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Returns a wrapper function that checks if user is logged in
// If not → opens AuthModal instead of running the action
// Usage: const guard = useAuthGuard()
//        guard(() => router.push("/cart"))

import useAuthStore from "@/store/authStore";
import useUIStore from "@/store/uiStore";

export function useAuthGuard() {
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useUIStore();

  return (action) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    action();
  };
}