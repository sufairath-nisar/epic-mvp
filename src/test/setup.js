import "@testing-library/jest-dom/vitest";

// jsdom does not implement window.scrollTo (used by the router on navigation).
// Stub it so tests that trigger navigation don't throw. Does not affect app code.
window.scrollTo = window.scrollTo || (() => {});
