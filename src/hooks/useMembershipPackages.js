import { useEffect, useState } from "react";
import { getMembershipPackages } from "../api/membershipApi";

// Loads membership packages from the API. Returns { packages, loaded } so pages
// can show their own empty/loading handling. API content only (no local seed).
export const useMembershipPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    getMembershipPackages()
      .then((list) => {
        if (mounted) setPackages(list);
      })
      .catch((error) => console.error("Failed to load membership packages from API:", error))
      .finally(() => {
        if (mounted) setLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { packages, loaded };
};
