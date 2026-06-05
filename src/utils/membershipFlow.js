// Carries the membership plan chosen on /join-epic/membership to the checkout
// page, so the checkout can show the selected plan's details dynamically.
const STORAGE_KEY = "epic-selected-membership";

export const saveSelectedMembership = (plan) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {
    // Ignore storage failures (e.g. private mode).
  }
};

export const getSelectedMembership = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearSelectedMembership = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
};
