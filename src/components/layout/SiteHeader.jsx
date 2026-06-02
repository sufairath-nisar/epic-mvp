import { Menu, ShoppingCart } from "lucide-react";
import { ASSET_PATH } from "../../constants/assets";
import { mainNavigation } from "../../data/routes";
import { Link, useRouter } from "../../router/RouterProvider";

const SiteHeader = ({ tone = "light" }) => {
  const { path } = useRouter();
  const isDark = tone === "dark";
  const textColor = isDark ? "text-[#fff4a8]" : "text-[#154527]";
  const logo = isDark ? "logo-cream.svg" : "logo-green.png";
  const isActivePath = (itemPath) => path === itemPath || (itemPath !== "/" && path.startsWith(`${itemPath}/`));
  const navInteractiveColor = isDark ? "hover:text-[#154527]" : "hover:text-[#FAD7D3]";
  const activeColor = isDark ? "text-[#154527]" : "text-[#FAD7D3]";

  return (
    <header className={`absolute inset-x-0 top-0 z-20 ${textColor}`}>
      <nav className="mx-auto flex max-w-[1340px] items-center px-8 py-8 md:px-12">
        <button className="md:hidden" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <Link to="/" className="block">
          <img src={`${ASSET_PATH}${logo}`} alt="EPIC Padel" className="h-7 w-auto" />
        </Link>
        <div className="ml-auto hidden items-center gap-14 text-[13px] font-semibold lowercase md:flex">
          {mainNavigation.map((item) => (
            <Link key={item.path} to={item.path} className={`transition ${navInteractiveColor} ${isActivePath(item.path) ? activeColor : ""}`}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-5 md:ml-14">
          <Link to="/wear-epic/cart" aria-label="Cart">
            <ShoppingCart size={17} />
          </Link>
          <Link to="/profile" aria-label="Profile">
            <img src={`${ASSET_PATH}profile-icon.png`} alt="" className="h-[18px] w-[18px] object-contain" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
