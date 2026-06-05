import { createContext, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);

const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
};

// Scroll to an in-page anchor by id. The target may live on a lazily-loaded
// page (or one whose content is still fetching), so poll a few frames until the
// element exists before giving up.
const scrollToHash = (hash) => {
  const id = hash.replace(/^#/, "");
  if (!id) {
    return;
  }

  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (attempts++ < 60) {
      window.setTimeout(tryScroll, 50);
    }
  };
  tryScroll();
};

export const RouterProvider = ({ children }) => {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // On a direct load / refresh of a URL that carries a hash (e.g. shared link
  // or opening the CTA in a new tab), scroll to that section once it renders.
  useEffect(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }
  }, []);

  const value = useMemo(
    () => ({
      path,
      navigate(nextPath, options = {}) {
        const [rawPath, hash] = String(nextPath).split("#");
        const normalized = normalizePath(rawPath);
        const url = normalized + (hash ? `#${hash}` : "");
        if (url !== window.location.pathname + window.location.hash) {
          window.history.pushState({}, "", url);
        }
        setPath(normalized);
        if (hash) {
          scrollToHash(hash);
        } else if (options.scroll !== false) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }),
    [path]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

// The router hook intentionally lives alongside the provider/Link components.
// This only disables a dev-time Fast Refresh hint, not a correctness rule.
// eslint-disable-next-line react-refresh/only-export-components
export const useRouter = () => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("useRouter must be used inside RouterProvider");
  }

  return context;
};

export const Link = ({ to, children, className = "", scroll = true, ...props }) => {
  const { navigate } = useRouter();

  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        event.preventDefault();
        navigate(to, { scroll });
      }}
      {...props}
    >
      {children}
    </a>
  );
};
