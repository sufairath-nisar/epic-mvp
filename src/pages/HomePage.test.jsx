import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "./HomePage";
import { RouterProvider } from "../router/RouterProvider";

// Keep the home page data deterministic and offline: serve the bundled mock
// data instead of hitting the live API. This isolates the component test from
// the network and from changing backend content.
vi.mock("../api/homepageApi", async () => {
  const { f31HomepageData } = await import("../data/f31Homepage");
  return { getHomepageData: () => Promise.resolve(f31HomepageData) };
});

// The header loads court names for its "find epic" submenu; stub it offline.
vi.mock("../hooks/useLocations", () => ({ useLocations: () => [] }));

// Smoke tests for the home page. These only render the page in memory and
// assert that key content shows up — they never modify app code or design.
const renderHomePage = () =>
  render(
    <RouterProvider>
      <HomePage />
    </RouterProvider>
  );

describe("HomePage", () => {
  it("renders without crashing", () => {
    expect(() => renderHomePage()).not.toThrow();
  });

  it("shows the hero heading once data has loaded", async () => {
    renderHomePage();
    expect(await screen.findByText(/WHERE PADEL FINDS ITS PULSE/i)).toBeInTheDocument();
  });

  it("renders the locations section heading", async () => {
    renderHomePage();
    // The data loads asynchronously, so wait for a location to appear first.
    // "CHARLOTTE, NC" shows in the mobile card and the (duplicated) desktop
    // carousel, so there can be several matches — findAllByText handles that.
    const charlotte = await screen.findAllByText(/CHARLOTTE, NC/i);
    expect(charlotte.length).toBeGreaterThan(0);
    expect(screen.getByText(/locations/i)).toBeInTheDocument();
  });

  it("renders the facilities and members sections", async () => {
    renderHomePage();
    expect(await screen.findByText(/facilities/i)).toBeInTheDocument();
    expect(screen.getByText(/our members/i)).toBeInTheDocument();
  });
});
