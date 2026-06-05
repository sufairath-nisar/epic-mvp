import { describe, it, expect } from "vitest";
import { mapBlog } from "./blogApi";

describe("mapBlog", () => {
  it("maps an API blog onto the card shape", () => {
    const result = mapBlog({
      slug: "sport-post",
      title: "Sport Post",
      description: "A great read",
      cover_image: "https://cdn/cover.jpg",
      created_at: "2026-01-28T06:19:15.000000Z",
      type: "blog"
    });

    expect(result.slug).toBe("sport-post");
    expect(result.title).toBe("Sport Post");
    expect(result.description).toBe("A great read");
    expect(result.image).toBe("https://cdn/cover.jpg");
    expect(result.category).toBe("blog");
    expect(result.date).toContain("2026");
  });

  it("handles missing fields without throwing", () => {
    const result = mapBlog({ slug: "x" });
    expect(result.title).toBe("");
    expect(result.description).toBe("");
    expect(result.image).toBeNull();
    expect(result.date).toBe("");
  });
});
