import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "./HomePage";
import { RouterProvider } from "../router/RouterProvider";

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
