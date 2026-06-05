import { useEffect, useState } from "react";
import { getCourtBySlug, DEFAULT_SECONDARY_IMAGE } from "../api/locationsApi";

// The Find Epic page is the Charlotte location, so its "our location" section is
// built entirely from /public/courts/slug/charlotte (NOT the home court list).
const FIND_EPIC_SLUG = "charlotte";

// Collect every usable image from the court detail: the cover image plus any
// sport pictures. These feed the card's switch effect.
function collectImages(court) {
  const images = [];
  const cover = court.cover_image?.path ?? court.cover_image?.imagekit_full_path;
  if (cover) images.push(cover);
  (court.sports_details ?? []).forEach((sport) => {
    if (sport.picture) images.push(sport.picture);
  });
  return [...new Set(images)];
}

export const useFindEpicLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let mounted = true;

    getCourtBySlug(FIND_EPIC_SLUG)
      .then((court) => {
        if (!mounted || !court) return;

        const apiImages = collectImages(court);
        // Two+ API images → pair the first two; one → pair with the local
        // default; none → empty (placeholder shows).
        let images = [];
        if (apiImages.length >= 2) images = apiImages.slice(0, 2);
        else if (apiImages.length === 1) images = [apiImages[0], DEFAULT_SECONDARY_IMAGE];

        setLocations([
          {
            id: court.slug ?? "charlotte",
            city: court.name,
            image: images[0] ?? null,
            images,
            path: "/find-epic",
            description: (court.description ?? court.home_page_content ?? "").replace(/<[^>]*>/g, "").trim(),
            cta: "VIEW MEMBERSHIPS"
          }
        ]);
      })
      .catch((error) => console.error("Failed to load Find Epic location from API:", error));

    return () => {
      mounted = false;
    };
  }, []);

  return locations;
};
