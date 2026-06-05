import { apiPost } from "./apiClient";

// Authentication endpoints.
// Phone flow:  sendOtp -> loginWithOtp
// Email flow:  loginWithEmail -> verifyEmailOTP
// Each returns the parsed API response; failures throw an Error whose `message`
// is the API's message (so the UI can show it directly).

export function sendOtp({ phone, country }) {
  return apiPost("/public/auth/sendOtp", { phone, country });
}

export function loginWithOtp({ phone, country, otp }) {
  return apiPost("/public/auth/loginWithOtp", { phone, country, otp });
}

export function loginWithEmail({ email, password }) {
  return apiPost("/public/auth/loginWithEmail", { email, password });
}

export function verifyEmailOTP({ email, otp }) {
  return apiPost("/public/auth/verifyEmailOTP", { email, otp });
}

// Splits a typed mobile string into { country, phone } for the phone OTP flow.
// "+1 5123213123" -> { country: "+1", phone: "5123213123" }; a bare number
// defaults to country "+1".
export function splitPhone(mobile) {
  const raw = (mobile ?? "").trim();
  const match = raw.match(/^\+(\d{1,3})[\s-]*(.*)$/);
  if (match) {
    return { country: `+${match[1]}`, phone: match[2].replace(/\D/g, "") };
  }
  return { country: "+1", phone: raw.replace(/\D/g, "") };
}

// --- Auth token storage -----------------------------------------------------
// The API field name for the token isn't documented yet, so extractToken()
// checks the common shapes. Stored in localStorage so it survives reloads.
const TOKEN_KEY = "epic-auth-token";

export function extractToken(response) {
  return response?.token ?? response?.access_token ?? response?.data?.token ?? response?.data?.access_token ?? null;
}

export function setAuthToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Ignore storage failures (e.g. private mode).
  }
}

export function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearAuthToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore storage failures.
  }
}
