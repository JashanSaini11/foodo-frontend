// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// Creates a configured axios instance for all API calls
// Automatically sends cookies with every request
// Handles token refresh when access token expires

import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────
// If any request gets 401 (token expired) → auto refresh token
api.interceptors.response.use(
    (response) => response, // success → return as is

    async (error) => {
        const originalRequest = error.config;

        // If 401 and we haven't retried yet → try refreshing token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call refresh token endpoint
                await api.post("/auth/refresh-token");
                // Retry original request with new token (cookie auto-sent)
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed → redirect to login
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;