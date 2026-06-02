import { useEffect, useState } from "react";

export const useSequentialImagePairs = (itemCount, interval = 2400) => {
  const [visibleImages, setVisibleImages] = useState(() => Array.from({ length: itemCount }, () => 0));

  useEffect(() => {
    if (!itemCount) return undefined;

    setVisibleImages(Array.from({ length: itemCount }, () => 0));

    let currentIndex = 0;
    let nextImage = 1;

    const timer = window.setInterval(() => {
      setVisibleImages((current) => current.map((value, index) => (index === currentIndex ? nextImage : value)));

      currentIndex += 1;

      if (currentIndex >= itemCount) {
        currentIndex = 0;
        nextImage = nextImage === 1 ? 0 : 1;
      }
    }, interval);

    return () => window.clearInterval(timer);
  }, [itemCount, interval]);

  return visibleImages;
};
