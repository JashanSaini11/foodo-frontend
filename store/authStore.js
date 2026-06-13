// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Global auth state using Zustand
// Stores user info, loading state, error state
// Components read from here instead of making their own API calls

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getMeAPI, logoutAPI } from "@/lib/auth.api";

const useAuthStore = create(
    persist(
        (set, get) => ({
            // ─── STATE ─────────────────────────────────────────────
            user: null,           
            isLoading: false,     
            isAuthenticated: false,

            // ─── ACTIONS ───────────────────────────────────────────

            // Set user after login/signup
            setUser: (user) => set({ user, isAuthenticated: !!user }),

            // Fetch current user from backend
            fetchUser: async () => {
                set({ isLoading: true });
                try {
                    const response = await getMeAPI();
                    set({
                        user: response.data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return response.data.user;
                } catch (error) {
                    set({ user: null, isAuthenticated: false, isLoading: false });
                    return null;
                }
            },

            // Logout → clear user state
            logout: async () => {
                try {
                    await logoutAPI();
                } catch (error) {
                    // Even if API fails → clear local state
                }
                set({ user: null, isAuthenticated: false });
            },

            // Get redirect path based on role
            getRedirectPath: () => {
                const { user } = get();
                if (!user) return "/login";

                switch (user.role) {
                    case "ADMIN":
                        return "/admin/dashboard";
                    case "RESTAURANT_OWNER":
                        return "/restaurant/dashboard";
                    case "DELIVERY_PARTNER":
                        return "/delivery/dashboard";
                    default:
                        return "/home";
                }
            },
        }),
        {
            name: "foodo-auth",         // key in localStorage
            partialize: (state) => ({   // only persist user, not loading state
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;