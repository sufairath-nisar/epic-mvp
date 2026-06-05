// Carries the Join Epic sign-up details across the multi-step flow
// (Join form -> OTP -> Membership) until the backend API is wired in.
const STORAGE_KEY = "epic-join-flow";

export const saveJoinDetails = (details) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch {
    // Ignore storage failures (e.g. private mode); UI falls back to placeholders.
  }
};

export const getJoinDetails = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const clearJoinDetails = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
};
