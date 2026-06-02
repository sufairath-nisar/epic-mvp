import { useEffect, useState } from "react";
import { getHomepageData } from "../api/homepageApi";

export const useHomepageData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getHomepageData().then((homepageData) => {
      if (mounted) {
        setData(homepageData);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading };
};
