// Thin fetch wrapper for the Epic API.
// Reads the base URL + key from Vite env vars (VITE_*), attaches the
// `x-api-key` header, and serialises query params. Kept deliberately small so
// every endpoint module (homepageApi, etc.) shares one consistent caller.

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const API_KEY = import.meta.env.VITE_API_KEY ?? "";

export async function apiGet(path, params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value);
    }
  });

  const queryString = query.toString();
  const url = `${BASE_URL}${path}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}) for ${path}`);
  }

  return response.json();
}

export async function apiPost(path, body = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  });

  // Parse the body even on errors — the API returns useful messages there
  // (e.g. { status: "error", message: "Invalid or expired OTP." }).
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.status === "error") {
    const error = new Error(data?.message || `API request failed (${response.status})`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
