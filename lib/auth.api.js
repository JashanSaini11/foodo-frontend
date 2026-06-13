// ─── WHAT THIS FILE DOES ──────────────────────────────────────
// All auth related API calls in one place
// Components import these functions instead of calling axios directly

import api from "./api";

// ─── SIGNUP ───────────────────────────────────────────────────
export const signupAPI = async ({ name, email, password, phone }) => {
    const response = await api.post("/auth/signup", {
        name,
        email,
        password,
        phone,
    });
    return response.data;
};

// ─── VERIFY OTP ───────────────────────────────────────────────
export const verifyOTPAPI = async ({ email, otp }) => {
    const response = await api.post("/auth/verify-email", { email, otp });
    return response.data;
};

// ─── RESEND OTP ───────────────────────────────────────────────
export const resendOTPAPI = async ({ email }) => {
    const response = await api.post("/auth/resend-otp", { email });
    return response.data;
};

// ─── LOGIN ────────────────────────────────────────────────────
export const loginAPI = async ({ email, password }) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

// ─── LOGOUT ───────────────────────────────────────────────────
export const logoutAPI = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

// ─── GET CURRENT USER ─────────────────────────────────────────
export const getMeAPI = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};

// ─── FORGOT PASSWORD ──────────────────────────────────────────
export const forgotPasswordAPI = async ({ email }) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
};

// ─── RESET PASSWORD ───────────────────────────────────────────
export const resetPasswordAPI = async ({ token, newPassword }) => {
    const response = await api.post("/auth/reset-password", { token, newPassword });
    return response.data;
};

// ─── GOOGLE OAUTH ─────────────────────────────────────────────
// Redirects browser to Google login page
// Backend handles the callback and sets cookies
export const googleLoginURL = `${process.env.NEXT_PUBLIC_SOCKET_URL}/api/auth/google`;