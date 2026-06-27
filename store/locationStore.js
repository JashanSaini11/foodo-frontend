// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Stores user's selected delivery location
// Persisted in localStorage so it survives page refresh

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocationStore = create(
    persist(
        (set) => ({
            // ─── STATE ───────────────────────────────────────────────
            city: null,
            address: null,
            latitude: null,
            longitude: null,

            // ─── ACTIONS ─────────────────────────────────────────────
            setLocation: ({ city, address, latitude, longitude }) =>
                set({ city, address, latitude, longitude }),

            clearLocation: () =>
                set({ city: null, address: null, latitude: null, longitude: null }),
        }),
        {
            name: "foodo-location",
        }
    )
);

export default useLocationStore;