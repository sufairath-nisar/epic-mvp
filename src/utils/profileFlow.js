// Carries the profile sign-in details across the flow
// (Profile signup -> OTP -> Account view) until the backend API is wired in.
// Kept separate from the Join Epic flow so the two never share state.
const STORAGE_KEY = "epic-profile-flow";

export const saveProfileDetails = (details) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch {
    // Ignore storage failures (e.g. private mode); UI falls back to placeholders.
  }
};

export const getProfileDetails = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const clearProfileDetails = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
};
