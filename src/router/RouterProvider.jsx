import { createContext, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);

const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
};

export const RouterProvider = ({ children }) => {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const value = useMemo(
    () => ({
      path,
      navigate(nextPath, options = {}) {
        const normalized = normalizePath(nextPath);
        if (normalized !== window.location.pathname) {
          window.history.pushState({}, "", normalized);
        }
        setPath(normalized);
        if (options.scroll !== false) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }),
    [path]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

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
