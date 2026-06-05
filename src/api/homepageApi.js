import { getLocations } from "./locationsApi";
import { f31HomepageData } from "../data/f31Homepage";

export async function getHomepageData() {
  try {
    const locations = await getLocations();

    // If the API returns no usable locations, keep the existing ones rather
    // than rendering an empty section.
    if (!locations.length) {
      return f31HomepageData;
    }

    return { ...f31HomepageData, locations };
  } catch (error) {
    // Network/API failure: fall back to the bundled mock data so the page
    // always renders. Logged for debugging, not surfaced to the user.
    console.error("Failed to load home page locations from API:", error);
    return f31HomepageData;
  }
}
