import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "../../router/RouterProvider";

const variants = {
  home: {
    section: "bg-white px-4 py-8 md:px-12 md:py-20",
    heading: "font-display max-w-4xl text-[46px] font-bold leading-[0.9] tracking-[0] text-[#FAD7D3] md:text-[82px] md:leading-[0.95]",
    sportGrid: "mt-5 hidden grid-cols-3 gap-2 md:mt-14 md:grid md:gap-6",
    bookingGrid: "mt-2 hidden grid-cols-2 gap-2 md:mt-6 md:grid md:grid-cols-5 md:gap-8",
    placeholder: "mt-3 h-[402px] rounded-[12px] bg-[#d8d8d8] md:mt-10 md:h-[560px] md:rounded-[28px]",
    desktopButtonText: "md:text-[15px]"
  },
  findEpic: {
    section: "bg-white px-4 py-7 md:px-[50px] md:pb-[28px] md:pt-[42px]",
    heading: "font-display max-w-4xl text-[35px] font-bold leading-[0.9] tracking-[0] text-[#FAD7D3] md:text-[86px] md:leading-[0.95]",
    sportGrid: "mt-[42px] hidden grid-cols-3 gap-4 md:grid",
    bookingGrid: "mt-5 hidden grid-cols-5 gap-4 md:grid",
    placeholder: "mt-3 h-[402px] rounded-[12px] bg-[#d8d8d8] md:mt-[30px] md:h-[520px] md:rounded-[28px]",
    desktopButtonText: "md:text-[12px]"
  }
};

const BookingExperienceSection = ({ bookingTabs, headingLines = ["book your", "next epic experience"], id = "join-epic", sportTabs, variant = "home" }) => {
  const { navigate } = useRouter();
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const styles = variants[variant] ?? variants.home;
  const buttonBase = `flex h-7 w-full items-center justify-center rounded-full border-2 px-3 text-[8px] font-normal uppercase leading-none tracking-[0] text-[#154527] transition hover:border-[#fff2a8] hover:bg-[#fff2a8] md:h-10 ${styles.desktopButtonText}`;
  const activeButton = "border-[#fff2a8] bg-[#fff2a8]";
  const inactiveButton = "border-[#154527] bg-transparent";

  const getBookingPath = (index) => {
    if (index === 0) return "/booking/court";
    if (index === 1) return "/booking/programs";
    return "/booking";
  };

  const handleBookingClick = (tab, index) => {
    setSelectedBooking(tab);
    navigate(getBookingPath(index));
  };

  return (
    <section id={id} className={styles.section}>
      <div className="mx-auto max-w-[1340px]">
        <h2 className={styles.heading}>
          {headingLines[0]}
          <br />
          {headingLines[1]}
        </h2>
        <div className="mt-7 grid gap-2 md:hidden">
          <MobileBookingDropdown label="Select Sport" options={sportTabs} value={selectedSport} onChange={setSelectedSport} />
          <MobileBookingDropdown label="Select Category" options={bookingTabs} value={selectedBooking} onChange={setSelectedBooking} />
        </div>
        <div className={styles.sportGrid}>
          {sportTabs.map((tab) => (
            <button key={tab} type="button" onClick={() => setSelectedSport(tab)} className={`${buttonBase} ${selectedSport === tab ? activeButton : inactiveButton}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className={styles.bookingGrid}>
          {bookingTabs.map((tab, index) => (
            <button key={tab} type="button" onClick={() => handleBookingClick(tab, index)} className={`${buttonBase} ${selectedBooking === tab ? activeButton : inactiveButton}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className={styles.placeholder} />
      </div>
    </section>
  );
};

const MobileBookingDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative font-sans">
      <button
        type="button"
        aria-expanded={isOpen}
        className={`flex h-7 w-full items-center justify-between rounded-full border border-[#154527] bg-transparent px-4 text-[10px] font-normal uppercase leading-none tracking-[0] text-[#154527] transition ${isOpen ? "bg-[#fff2a8]" : ""}`}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{value ?? label}</span>
        <ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} size={13} strokeWidth={1.8} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[34px] z-20 overflow-hidden rounded-[10px] border border-[#154527] bg-[#FFFCF2] py-1 shadow-sm">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`block h-7 w-full px-4 text-left text-[10px] font-normal uppercase leading-none tracking-[0] text-[#154527] transition hover:bg-[#fff2a8] ${value === option ? "bg-[#fff2a8]" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingExperienceSection;
