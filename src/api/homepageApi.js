import { f31HomepageData } from "../data/f31Homepage";

export async function getHomepageData() {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(f31HomepageData), 120);
  });
}
