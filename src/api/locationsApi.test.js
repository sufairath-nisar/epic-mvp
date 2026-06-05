import { describe, it, expect } from "vitest";
import { mapCourtToLocation } from "./locationsApi";

describe("mapCourtToLocation", () => {
  it("maps a court with a cover image into a paired location card", () => {
    const result = mapCourtToLocation({
      slug: "charlotte",
      name: "Charlotte, NC",
      description: "<strong>Open now</strong>",
      cover_image: { path: "https://cdn/img.jpg" }
    });

    expect(result.id).toBe("charlotte");
    expect(result.city).toBe("Charlotte, NC");
    expect(result.image).toBe("https://cdn/img.jpg");
    // API image first, local default as the second switch frame.
    expect(result.images[0]).toBe("https://cdn/img.jpg");
    expect(result.images).toHaveLength(2);
    expect(result.description).toBe("Open now"); // HTML stripped
    expect(result.path).toBe("/find-epic#memberships");
  });

  it("leaves images empty when the court has no cover image", () => {
    const result = mapCourtToLocation({ slug: "x", name: "No Image", cover_image: null });
    expect(result.images).toEqual([]);
    expect(result.image).toBeNull();
  });
});
