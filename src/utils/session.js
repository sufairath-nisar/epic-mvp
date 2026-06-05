import { clearProfileDetails, getProfileDetails } from "./profileFlow";
import { clearJoinDetails, getJoinDetails } from "./joinFlow";
import { clearSelectedMembership } from "./membershipFlow";
import { clearAuthToken, getAuthToken } from "../api/authApi";

// Merged user details from whichever flow saved them (join or profile);
// profile values win when both exist.
export const getCurrentUser = () => ({ ...getJoinDetails(), ...getProfileDetails() });

// A user is considered signed in once they've registered/logged in through any
// flow — an auth token exists, or we captured their email along the way.
export const isLoggedIn = () => Boolean(getAuthToken()) || Boolean(getCurrentUser().email);

// Clears every piece of user data on logout so nothing (account details,
// checkout prefill, selected plan, auth token) lingers after signing out.
export const clearSession = () => {
  clearProfileDetails();
  clearJoinDetails();
  clearSelectedMembership();
  clearAuthToken();
};
