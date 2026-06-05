import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import OverlayShell from "../components/layout/OverlayShell";
import { ASSET_PATH } from "../constants/assets";
import { Link, useRouter } from "../router/RouterProvider";
import { clearProfileDetails, getProfileDetails, saveProfileDetails } from "../utils/profileFlow";

const menuItems = [
  { label: "INFO", slug: "info" },
  { label: "BOOKINGS", slug: "bookings" },
  { label: "MEMBERSHIPS & PACKAGES", slug: "memberships" },
  { label: "RED PADEL RANKING", slug: "ranking" },
  { label: "CLUTCH AI", slug: "clutch-ai" },
  { label: "ORDERS", slug: "orders" },
  { label: "WISHLIST", slug: "wishlist" },
  { label: "PAYMENT METHODS", slug: "payment-methods" },
  { label: "NOTIFICATIONS", slug: "notifications" }
];

const fieldConfig = [
  { label: "First Name", name: "firstName", placeholder: "Enter your first name" },
  { label: "Last Name", name: "lastName", placeholder: "Enter your last name" },
  { label: "Email", name: "email", placeholder: "Enter your email" },
  { label: "Mobile Number", name: "mobile", placeholder: "+1 Enter your mobile number" },
  { label: "Birthday", name: "birthday", placeholder: "dd/mm/yyyy" }
];

const MenuRow = ({ item, active, onHover }) => {
  const className = `relative -mx-[33px] flex items-center justify-between whitespace-nowrap px-[33px] py-[15px] text-[12px] font-light uppercase tracking-[0] text-[#154527] transition-colors hover:bg-[#D9D9D933] md:-mx-[34px] md:px-[34px] md:py-[11px] md:text-[12px] ${
    active ? "bg-[#D9D9D933]" : ""
  }`;

  return (
    <Link to={`/account/${item.slug}`} scroll={false} onMouseEnter={onHover} className={className}>
      <span>{item.label}</span>
      <ChevronRight size={18} strokeWidth={1.6} className="md:hidden" />
    </Link>
  );
};

// Read-only avatar (profile view). Shows the saved photo, or the placeholder
// icon that turns green on hover.
const Avatar = ({ photo }) => (
  <div className="group flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-[20px] bg-white md:aspect-auto md:h-[246px] md:w-[185px]">
    {photo ? (
      <img src={photo} alt="Profile" className="h-full w-full object-cover" />
    ) : (
      <>
        <img src={`${ASSET_PATH}profile-avatar.svg`} alt="" className="w-[72%] group-hover:hidden md:w-[74%]" />
        <img src={`${ASSET_PATH}profile-avatar-hover.svg`} alt="" className="hidden w-[72%] group-hover:block md:w-[74%]" />
      </>
    )}
  </div>
);

const ProfileField = ({ field, value }) => (
  <label className="block text-[12px] font-light leading-none tracking-[0] text-[#154527]">
    {field.label}
    <input
      readOnly
      value={value}
      placeholder={field.placeholder}
      className="mt-[8px] h-[48px] w-full rounded-[7px] bg-white px-[16px] text-[12px] font-light text-[#154527] outline-none placeholder:text-[#c9c9c9] md:h-[37px]"
    />
  </label>
);

// Profile view (read-only).
const InfoContent = ({ details }) => (
  <>
    <div className="mt-[24px] md:mt-0 md:flex md:gap-[32px]">
      <Avatar photo={details.photo} />

      <div className="mt-[22px] grid gap-[14px] md:mt-0 md:w-[345px]">
        {fieldConfig.map((field) => (
          <ProfileField key={field.name} field={field} value={details[field.name] || ""} />
        ))}
      </div>
    </div>

    {/* Desktop edit (bottom-right) */}
    <Link
      to="/account/edit"
      scroll={false}
      aria-label="Edit"
      className="absolute bottom-[58px] right-[78px] hidden transition hover:opacity-70 md:block"
    >
      <img src={`${ASSET_PATH}edit-icon.svg`} alt="Edit" className="h-[20px] w-[20px]" />
    </Link>
  </>
);

// Profile edit (editable form + photo upload + save).
const EditContent = ({ details, onSaved }) => {
  const [form, setForm] = useState(() => ({
    firstName: details.firstName || "",
    lastName: details.lastName || "",
    email: details.email || "",
    mobile: details.mobile || "",
    birthday: details.birthday || "",
    photo: details.photo || ""
  }));

  const handleField = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  const handlePhoto = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveProfileDetails(form);
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-[24px] md:mt-0 md:flex md:gap-[32px]">
        {/* Avatar upload */}
        <label className="relative flex aspect-[3/4] w-full cursor-pointer flex-col items-center overflow-hidden rounded-[20px] bg-white pt-[24px] md:aspect-auto md:h-[246px] md:w-[185px]">
          <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
          {form.photo ? (
            <img src={form.photo} alt="Profile" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <>
              <span className="text-[14px] font-light leading-none tracking-[0] text-[#154527]">Add Profile Photo</span>
              <span className="flex flex-1 items-center justify-center pb-[10px]">
                <img src={`${ASSET_PATH}profile-avatar.svg`} alt="" className="w-[72%] md:w-[74%]" />
              </span>
            </>
          )}
        </label>

        {/* Editable fields */}
        <div className="mt-[22px] grid gap-[14px] md:mt-0 md:w-[345px]">
          {fieldConfig.map((field) => (
            <label key={field.name} className="block text-[12px] font-light leading-none tracking-[0] text-[#154527]">
              {field.label}
              <input
                name={field.name}
                value={form[field.name]}
                onChange={(event) => handleField(field.name, event.target.value)}
                placeholder={field.placeholder}
                className="mt-[8px] h-[48px] w-full rounded-[7px] bg-white px-[16px] text-[12px] font-light text-[#154527] outline-none placeholder:text-[#c9c9c9] md:h-[37px]"
              />
            </label>
          ))}
        </div>
      </div>

      {/* SAVE CHANGES — full width on mobile, bottom-right pill on desktop */}
      <button
        type="submit"
        className="mt-[28px] h-[30px] w-full rounded-full bg-[#154527] text-[10px] font-light uppercase tracking-[0.08em] text-[#FCEFA7] transition hover:bg-[#FCEFA7] hover:text-[#154527] md:absolute md:bottom-[40px] md:right-[40px] md:mt-0 md:h-[30px] md:w-auto md:px-[34px]"
      >
        Save Changes
      </button>
    </form>
  );
};

const PlaceholderContent = ({ label }) => (
  <div className="mt-[24px] md:mt-[6px]">
    <h2 className="text-[16px] font-normal uppercase tracking-[0] text-[#154527] md:text-[18px]">{label}</h2>
    <p className="mt-[12px] text-[12px] font-light leading-[18px] tracking-[0] text-[#547257]">Nothing to show here yet.</p>
  </div>
);

const AccountPage = ({ section = "menu" }) => {
  const { navigate } = useRouter();
  const [hovered, setHovered] = useState(null);
  const isMenu = section === "menu";
  const isEditing = section === "edit";
  const routedSlug = isMenu || isEditing ? "info" : section;
  // Hovering a menu item previews its content (view mode only); editing stays put.
  const displaySlug = isEditing ? "info" : hovered || routedSlug;
  const displayItem = menuItems.find((item) => item.slug === displaySlug) || menuItems[0];
  const isInfo = displaySlug === "info";
  const details = getProfileDetails();
  const greeting = `Hi ${details.firstName || ""}`.trim();

  const handleLogout = () => {
    clearProfileDetails();
    navigate("/");
  };

  return (
    <OverlayShell>
      <div className="relative flex min-h-[calc(100vh-71px)] w-full flex-col overflow-hidden rounded-t-[34px] bg-white md:grid md:min-h-0 md:h-[563px] md:w-[886px] md:shrink-0 md:grid-cols-[224px_662px] md:rounded-[45px]">
        {/* Close (mobile menu + desktop) */}
        <Link
          to="/"
          aria-label="Close"
          className={`absolute right-[24px] top-[26px] z-10 text-[#154527] transition hover:text-[#FAD7D3] md:right-[45px] md:top-[31px] ${
            isMenu ? "block" : "hidden md:block"
          }`}
        >
          <X size={20} strokeWidth={2} />
        </Link>

        {/* Sidebar / menu */}
        <aside
          className={`${
            isMenu ? "flex" : "hidden"
          } flex-col bg-white px-[33px] pb-[40px] pt-[34px] md:flex md:h-[563px] md:px-[34px] md:pb-[40px] md:pt-[55px]`}
        >
          <p className="font-display text-[30px] font-bold leading-none tracking-[0] text-[#FAD7D3] md:text-[26px]">
            {greeting}
          </p>

          <nav className="mt-[26px] md:mt-[7px]" onMouseLeave={() => setHovered(null)}>
            {menuItems.map((item) => (
              <MenuRow
                key={item.slug}
                item={item}
                active={item.slug === displaySlug}
                onHover={() => setHovered(item.slug)}
              />
            ))}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-auto h-[30px] w-full rounded-full bg-[#154527] text-[10px] font-light uppercase tracking-[0.08em] text-[#FCEFA7] transition hover:bg-[#FCEFA7] hover:text-[#154527] md:h-[30px]"
          >
            Logout
          </button>
        </aside>

        {/* Detail panel */}
        <section
          className={`${
            isMenu ? "hidden" : "block"
          } relative flex-1 bg-[#D9D9D933] px-[24px] pb-[40px] pt-[18px] md:block md:h-[563px] md:px-[32px] md:pb-0 md:pt-[60px]`}
        >
          {/* Mobile top bar: back + edit */}
          <div className="flex items-center justify-between md:hidden">
            <Link to={isEditing ? "/account/info" : "/account"} aria-label="Back" className="text-[#154527]">
              <ChevronLeft size={22} strokeWidth={2} />
            </Link>
            {isInfo && !isEditing ? (
              <Link to="/account/edit" scroll={false} aria-label="Edit" className="text-[#154527]">
                <img src={`${ASSET_PATH}edit-icon.svg`} alt="Edit" className="h-[18px] w-[18px]" />
              </Link>
            ) : null}
          </div>

          {isInfo ? (
            isEditing ? (
              <EditContent details={details} onSaved={() => navigate("/account/info")} />
            ) : (
              <InfoContent details={details} />
            )
          ) : (
            <PlaceholderContent label={displayItem.label} />
          )}
        </section>
      </div>
    </OverlayShell>
  );
};

export default AccountPage;
