// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Global UI state — controls AuthModal visibility
// Any component can trigger the auth modal without prop drilling

import { create } from "zustand";

const useUIStore = create((set) => ({
    // ─── AUTH MODAL ────────────────────────────────────────────
    isAuthModalOpen: false,
    openAuthModal: () => set({ isAuthModalOpen: true }),
    closeAuthModal: () => set({ isAuthModalOpen: false }),
}));

export default useUIStore;