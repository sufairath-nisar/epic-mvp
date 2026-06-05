import { useEffect, useState } from "react";
import { getLocations } from "../api/locationsApi";

// Provides the location list from the API only (no local fallback), so pages
// render purely API-driven content. Starts empty until the request resolves.
export const useLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let mounted = true;

    getLocations()
      .then((apiLocations) => {
        if (mounted) setLocations(apiLocations);
      })
      .catch((error) => {
        console.error("Failed to load locations from API:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return locations;
};
