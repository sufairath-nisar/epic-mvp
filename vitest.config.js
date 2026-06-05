import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Dedicated test config. Vitest reads this file; `vite build` ignores it,
// so the production build and app behaviour are completely unaffected.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    include: ["src/**/*.{test,spec}.{js,jsx}"]
  }
});
