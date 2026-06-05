import { apiGet } from "./apiClient";

// Shared "locations" source used by the home page, Find Epic and the Join Epic
// membership step. Maps an API "court" onto the location card shape:
// { id, city, image, images, path, description, cta }
//
// Images come from `cover_image.path` (absolute S3 URL). The court API only
// provides ONE image, so for the card's two-image switch effect we pair the API
// image with a local image as the second frame. When a court has no API image,
// `images` is left empty so the card shows an "images not uploaded yet"
// placeholder instead of a local stand-in.

// One local image used as the SECOND frame of the switch effect by default
// (the first frame is always the real API image).
const DEFAULT_SECONDARY_IMAGE = "location-carousel-player.png";

// Returns the court's OWN second image when the backend provides one, otherwise
// the shared default. The court API has no second image field yet, so this
// returns the default today — but the per-court ("respective") pairing is
// already wired, so it activates automatically once the backend adds the field.
function getSecondaryImage(court) {
  const ownSecondImage = court.secondary_image?.path ?? court.banner_image?.path ?? null;
  return ownSecondImage ?? DEFAULT_SECONDARY_IMAGE;
}

function stripHtml(text) {
  return (text ?? "").replace(/<[^>]*>/g, "").trim();
}

export function mapCourtToLocation(court) {
  const apiImage = court.cover_image?.path ?? court.cover_image?.imagekit_full_path ?? null;

  return {
    id: court.slug ?? String(court.id),
    city: court.name,
    image: apiImage,
    // Pair the API image (frame 1) with the court's second image (frame 2).
    images: apiImage ? [apiImage, getSecondaryImage(court)] : [],
    path: "/find-epic",
    description: stripHtml(court.description ?? court.home_page_content),
    cta: "VIEW MEMBERSHIPS"
  };
}

export async function getLocations() {
  const response = await apiGet("/public/courts/getHomePageCourtList", { page: 1, limit: 20 });
  const courts = Array.isArray(response?.data) ? response.data : [];

  return courts.filter((court) => court.show_on_home && court.is_published).map(mapCourtToLocation);
}

// Single court detail by slug. Frame 1 of the Find Epic location image.
export async function getCourtBySlug(slug) {
  const response = await apiGet(`/public/courts/slug/${encodeURIComponent(slug)}`);
  return response?.data ?? null;
}

export { DEFAULT_SECONDARY_IMAGE };
