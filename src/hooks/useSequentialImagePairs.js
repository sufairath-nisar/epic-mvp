import { useEffect, useState } from "react";

// Toggles the active image index for a set of cards. All cards switch together
// on each interval (no per-card wait). Returns an array of indexes (0 or 1),
// one per item, so existing consumers can keep reading activeIndexes[i].
export const useSequentialImagePairs = (itemCount, interval = 2400) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!itemCount) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current === 1 ? 0 : 1));
    }, interval);

    return () => window.clearInterval(timer);
  }, [itemCount, interval]);

  return Array.from({ length: itemCount }, () => activeIndex);
};
