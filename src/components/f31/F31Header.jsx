import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ASSET_PATH } from "../../constants/assets";
import { Link, useRouter } from "../../router/RouterProvider";

const F31Header = ({ navigation, tone = "dark", floating = true }) => {
  const isLight = tone === "light";
  const textColor = isLight ? "text-[#154527]" : "text-[#fff4a8]";
  const logoFile = isLight ? "logo-green.png" : "logo-cream.svg";
  const navHover = isLight ? "hover:text-[#FAD7D3]" : "hover:text-[#154527]";
  const navActive = isLight ? "text-[#FAD7D3]" : "text-[#154527]";
  const headerClass = floating ? "absolute inset-x-0 top-0 z-20" : "relative z-20";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const [desktopSubmenuMode, setDesktopSubmenuMode] = useState("closed");
  const desktopSubmenuRef = useRef(null);
  const { path } = useRouter();
  const isDesktopSubmenuOpen = desktopSubmenuMode !== "closed";
  const isActivePath = (itemPath) => path === itemPath || (itemPath !== "/" && path.startsWith(`${itemPath}/`));
  const isWeAreEpicActive = path === "/our-story" || path === "/investments" || path === "/our-journal";
  const weAreEpicLinks = [
    { label: "our story", path: "/our-story" },
    { label: "our investments", path: "/investments" },
    { label: "our journal", path: "/our-journal" }
  ];
  const primaryMobileLinks = navigation.filter((item) => item.path !== "/our-story");

  useEffect(() => {
    if (!isDesktopSubmenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!desktopSubmenuRef.current?.contains(event.target)) {
        setDesktopSubmenuMode("closed");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isDesktopSubmenuOpen]);

  return (
    <header className={headerClass}>
      <nav className={`mx-auto grid max-w-[1340px] grid-cols-3 items-center px-5 py-4 ${textColor} md:flex md:px-12 md:py-9`}>
        <button
          className="justify-self-start md:hidden"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => {
            setIsMenuOpen((current) => !current);
            setIsMobileSubmenuOpen(false);
          }}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="block justify-self-center md:justify-self-auto">
          <img src={`${ASSET_PATH}${logoFile}`} alt="EPIC Padel" className="h-[20px] w-auto md:h-[33px]" />
        </Link>

        <div className="font-display ml-auto hidden items-center gap-16 text-[15px] font-bold lowercase md:flex">
          {navigation.map((item) => (
            item.path === "/our-story" ? (
              <div
                key={item.label}
                ref={desktopSubmenuRef}
                className="relative"
                onMouseEnter={() => setDesktopSubmenuMode((current) => (current === "closed" ? "hover" : current))}
                onMouseLeave={() => setDesktopSubmenuMode((current) => (current === "hover" ? "closed" : current))}
              >
                <button
                  type="button"
                  aria-expanded={isDesktopSubmenuOpen}
                  className={`lowercase transition ${navHover} ${isWeAreEpicActive || isDesktopSubmenuOpen ? navActive : ""}`}
                  onClick={() => setDesktopSubmenuMode((current) => (current === "click" ? "closed" : "click"))}
                >
                  {item.label}
                </button>
                {isDesktopSubmenuOpen && (
                  <div className="absolute left-0 top-full z-30 mt-3 w-[170px] text-[#FAD7D3]">
                    <nav className="grid gap-2 font-display text-[15px] font-bold leading-none">
                      {weAreEpicLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`w-fit transition ${navHover} ${isActivePath(link.path) ? navActive : ""}`}
                          onClick={() => setDesktopSubmenuMode("closed")}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} to={item.path} className={`transition ${navHover} ${isActivePath(item.path) ? navActive : ""}`}>
                {item.label}
              </Link>
            )
          ))}
        </div>
        <Link to="/profile" aria-label="Profile" className={`justify-self-end ${textColor} md:ml-16 md:block md:justify-self-auto`}>
          <img src={`${ASSET_PATH}profile-icon.png`} alt="" className="h-[15px] w-[15px] object-contain md:h-[18px] md:w-[18px]" />
        </Link>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#154527] px-[33px] py-[35px] text-[#fff4a8] md:hidden">
          <div className="grid grid-cols-3 items-center">
            <button
              type="button"
              aria-label="Close menu"
              className="justify-self-start text-[#fff4a8]"
              onClick={() => {
                setIsMenuOpen(false);
                setIsMobileSubmenuOpen(false);
              }}
            >
              <Menu size={25} strokeWidth={1.7} />
            </button>
            <Link
              to="/"
              className="justify-self-center"
              onClick={() => {
                setIsMenuOpen(false);
                setIsMobileSubmenuOpen(false);
              }}
            >
              <img src={`${ASSET_PATH}logo-cream.svg`} alt="EPIC Padel" className="h-[30px] w-auto" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              className="justify-self-end text-[#fff4a8]"
              onClick={() => {
                setIsMenuOpen(false);
                setIsMobileSubmenuOpen(false);
              }}
            >
              <X size={26} strokeWidth={1.7} />
            </button>
          </div>

          <nav className="font-display mt-[62px] grid gap-6 text-[22px] font-bold lowercase leading-none">
            <div>
              <button
                type="button"
                aria-expanded={isMobileSubmenuOpen}
                className="inline-flex items-center gap-[92px] text-[#fff4a8] transition"
                onClick={() => setIsMobileSubmenuOpen((current) => !current)}
              >
                <span>we are epic</span>
                <ChevronDown className={`transition ${isMobileSubmenuOpen ? "rotate-180" : ""}`} size={17} strokeWidth={2.4} />
              </button>
              {isMobileSubmenuOpen && (
                <div className="mt-7 grid gap-3 text-[#FAD7D3]">
                  {weAreEpicLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="w-fit text-[#FAD7D3] transition"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileSubmenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {primaryMobileLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="w-fit text-[#fff4a8] transition"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsMobileSubmenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/profile"
              aria-label="Profile"
              className="fixed bottom-[22px] left-[33px]"
              onClick={() => {
                setIsMenuOpen(false);
                setIsMobileSubmenuOpen(false);
              }}
            >
              <img src={`${ASSET_PATH}profile-icon.png`} alt="" className="h-[19px] w-[19px] object-contain" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default F31Header;
