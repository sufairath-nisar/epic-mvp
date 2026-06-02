import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ASSET_PATH } from "../constants/assets";
import { useHomepageData } from "../hooks/useHomepageData";
import AutoCarousel from "../components/common/AutoCarousel";
import RotatingImage from "../components/common/RotatingImage";
import F31Header from "../components/f31/F31Header";
import { BookCourtCta, DownloadAppCta } from "../components/f31/HeroCtas";
import SiteFooter from "../components/layout/SiteFooter";
import { useSequentialImagePairs } from "../hooks/useSequentialImagePairs";
import { Link, useRouter } from "../router/RouterProvider";

const Hero = ({ navigation }) => {
  return (
    <section id="top" className="relative min-h-[390px] overflow-hidden bg-[#b8b0a0] md:min-h-[820px]">
      <img src={`${ASSET_PATH}home-hero-player-mobile.png`} alt="Padel player" className="absolute inset-0 h-full w-full object-cover object-center md:hidden" />
      <img src={`${ASSET_PATH}home-hero-player.png`} alt="Padel player" className="absolute inset-0 hidden h-full w-full object-cover object-center md:block" />
      <div className="absolute inset-0 bg-[#4b4f3f]/10" />
      <F31Header navigation={navigation} />
      <div className="absolute bottom-8 left-5 z-10 md:bottom-36 md:left-12">
        <h1 className="max-w-[210px] text-[18px] font-light uppercase leading-none tracking-wide text-[#fff4a8] md:max-w-3xl md:text-[32px]">
          WHERE PADEL FINDS ITS PULSE
        </h1>
        <div className="mt-4 flex flex-row items-start gap-3 md:mt-5 md:gap-8">
          <BookCourtCta />
          <DownloadAppCta />
        </div>
      </div>
    </section>
  );
};

const Locations = ({ locations }) => {
  const [mobileLocationIndex, setMobileLocationIndex] = useState(0);
  const featuredLocation = locations[mobileLocationIndex];
  const activeImageIndexes = useSequentialImagePairs(locations.length);
  const showNextMobileLocation = () => setMobileLocationIndex((current) => (current + 1) % locations.length);

  return (
    <section id="find-epic" className="bg-[#FFFCF2] px-4 py-8 text-epic-green md:px-12 md:py-28">
      <div className="mx-auto max-w-[1340px]">
        <div className="grid gap-5 md:grid-cols-[0.9fr_1fr_220px] md:items-start md:gap-10">
          <h2 className="font-display text-[46px] font-bold leading-[0.9] tracking-[0] text-epic-pink md:text-[76px]">our<br />locations</h2>
          <p className="max-w-md text-[13px] font-light leading-[18px] text-epic-green md:mt-12 md:text-[14px] md:leading-6">
            From outdoor courts built for regions with outdoor seasons, to full-scale indoor clubs designed for year-round play, every Epic location carries its own identity, brought to life through local culture, community, and creative collaboration.
          </p>
          <Link to="/find-epic/charlotte" className="inline-flex h-8 w-full items-center justify-center rounded-full border border-[#154527] px-5 text-[10px] font-light uppercase text-epic-green transition hover:bg-[#154527] hover:text-[#fff4a8] md:mt-14 md:h-11 md:w-fit md:px-8 md:text-[12px] md:font-normal">
            Find a Club Near You
          </Link>
        </div>

        <div className="mt-7 md:hidden">
          <LocationCard location={featuredLocation} activeImageIndex={activeImageIndexes[mobileLocationIndex]} onNext={showNextMobileLocation} />
        </div>

        <AutoCarousel
          items={locations}
          className="hidden md:mt-16 md:block"
          trackClassName="location-carousel-track gap-6"
          renderItem={(location, key, index) => <LocationCard key={key} location={location} activeImageIndex={activeImageIndexes[index % locations.length]} />}
        />
      </div>
    </section>
  );
};

const LocationCard = ({ location, activeImageIndex = 0, onNext }) => {
  const cardImages = location.images ?? [location.image];
  const arrowButtonClass = "absolute right-0 top-[calc(100%-82px)] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#FAD7D3] text-[#154527] md:hidden";

  return (
    <article className="group relative w-full shrink-0 md:w-[calc((100vw-96px-48px)/3)] 2xl:w-[calc((1340px-48px)/3)]">
      <RotatingImage images={cardImages} alt={location.city} activeIndex={activeImageIndex} className="aspect-[393/478] bg-[#e5e2d8] md:aspect-[1.02]" />
      <h3 className="mt-5 text-[13px] font-normal uppercase leading-none tracking-[0] text-epic-green md:mt-7 md:text-[20px]">{location.city}</h3>
      <p className="mt-3 max-w-[285px] text-[11px] font-light leading-[16px] text-epic-green md:min-h-20 md:max-w-none md:text-[14px] md:leading-6">{location.description}</p>
      <Link to={location.path} className="mt-4 inline-flex h-8 min-w-[180px] items-center justify-center rounded-full border border-[#154527] px-6 text-[10px] font-normal uppercase text-epic-green transition hover:bg-[#154527] hover:text-[#fff4a8] md:mt-5 md:h-10 md:px-8 md:text-[15px]">
        {location.cta}
      </Link>
      {onNext && (
        <button type="button" aria-label="Show next location" className={arrowButtonClass} onClick={onNext}>
          <ArrowRight size={12} strokeWidth={3} />
        </button>
      )}
    </article>
  );
};

const Facilities = ({ facilities }) => {
  return (
    <section className="bg-[#154527] text-[#fff4a8]">
      <div className="mx-auto max-w-[1440px] px-4 py-8 md:relative md:min-h-[603px] md:px-0 md:py-0">
        <div className="md:absolute md:left-[50px] md:top-[78px]">
          <h2 className="font-display text-[46px] font-bold leading-[0.95] tracking-[0] text-epic-pink md:text-[82px] md:leading-[1.22]">our<br />facilities</h2>
        </div>

        <p className="mt-6 max-w-[360px] text-[12px] font-light leading-[16px] text-white md:absolute md:left-[730px] md:top-[125px] md:mt-0 md:text-[15px] md:font-normal md:leading-[1.45]">
            At Epic Padel, the experience goes beyond the court. From premium playing surfaces to modern locker rooms and fitness areas, our spaces are built to move with you.
        </p>

        <AutoCarousel
          items={facilities}
          className="mt-8 md:hidden"
          trackClassName="facility-mobile-carousel-track items-start gap-7"
          getKey={(facility) => facility.label}
          renderItem={(facility, key) => <FacilityCard key={key} facility={facility} />}
        />

        <AutoCarousel
          items={facilities}
          className="hidden md:absolute md:left-[50px] md:right-0 md:top-[380px] md:mt-0 md:block"
          trackClassName="facility-carousel-track items-start gap-10 md:gap-[72px]"
          getKey={(facility) => facility.label}
          renderItem={(facility, key) => <FacilityCard key={key} facility={facility} />}
        />
      </div>
    </section>
  );
};

const FacilityCard = ({ facility }) => {
  return (
    <div className="w-[54px] shrink-0 md:w-[148px]">
      <div className="flex h-[36px] items-start md:h-[86px]">
        <img src={`${ASSET_PATH}${facility.icon}`} alt="" className="max-h-[36px] w-auto object-contain md:max-h-none" />
      </div>
      <p className="mt-3 max-w-[58px] text-[7px] font-normal uppercase leading-[9px] tracking-[0] text-white md:mt-[18px] md:max-w-[145px] md:text-[12px] md:leading-[15px]">
        {facility.label}
      </p>
    </div>
  );
};

const Billboard = () => {
  return (
    <section>
      <img src={`${ASSET_PATH}mobile-location-billboard.png`} alt="EPIC billboard" className="w-full object-cover object-center md:hidden" />
      <img src={`${ASSET_PATH}home-billboard.png`} alt="EPIC billboard" className="hidden h-[760px] w-full object-cover object-center md:block" />
    </section>
  );
};

const Booking = ({ sportTabs, bookingTabs }) => {
  const { navigate } = useRouter();
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const buttonBase = "flex h-7 w-full items-center justify-center rounded-full border-2 text-[8px] font-normal uppercase leading-none tracking-[0] text-epic-green transition hover:border-[#fff2a8] hover:bg-[#fff2a8] md:h-10 md:text-[15px]";
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
    <section id="join-epic" className="bg-[#FFFCF2] px-4 py-8 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1340px]">
        <h2 className="font-display max-w-4xl text-[46px] font-bold leading-[0.9] tracking-[0] text-epic-pink md:text-[82px] md:leading-[0.95]">
          book your<br/>next epic experience
        </h2>
        <div className="mt-7 grid gap-2 md:hidden">
          <MobileBookingDropdown
            label="Select Sport"
            options={sportTabs}
            value={selectedSport}
            onChange={setSelectedSport}
          />
          <MobileBookingDropdown
            label="Select Category"
            options={bookingTabs}
            value={selectedBooking}
            onChange={setSelectedBooking}
          />
        </div>
        <div className="mt-5 hidden grid-cols-3 gap-2 md:mt-14 md:grid md:gap-6">
          {sportTabs.map((tab) => (
            <button key={tab} type="button" onClick={() => setSelectedSport(tab)} className={`${buttonBase} ${selectedSport === tab ? activeButton : inactiveButton}`}>{tab}</button>
          ))}
        </div>
        <div className="mt-2 hidden grid-cols-2 gap-2 md:mt-6 md:grid md:grid-cols-5 md:gap-8">
          {bookingTabs.map((tab, index) => (
            <button key={tab} type="button" onClick={() => handleBookingClick(tab, index)} className={`${buttonBase} ${selectedBooking === tab ? activeButton : inactiveButton}`}>{tab}</button>
          ))}
        </div>
        <div className="mt-3 h-[402px] rounded-[12px] bg-[#d8d8d8] md:mt-10 md:h-[560px] md:rounded-[28px]" />
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

const Members = ({ testimonials }) => {
  const ratingMarks = Array.from({ length: 5 }, (_, index) => index);

  return (
    <section className="bg-[#154527] px-4 py-8 text-epic-pink md:px-12 md:py-24">
      <div className="mx-auto max-w-[1340px]">
        <h2 className="font-display text-[46px] font-bold leading-[0.9] tracking-[0] text-epic-pink md:text-[76px] md:leading-[0.95]">from<br/>our members</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 md:mt-24 md:grid-cols-3 md:gap-12">
          {testimonials.map((item, index) => (
            <article key={item.author + item.quote} className="max-w-xs">
              <div className="mb-5 flex items-center gap-1.5" aria-label="5 star rating">
                {ratingMarks.map((mark) => (
                  <img key={mark} src={`${ASSET_PATH}testimonial-mark.png`} alt="" className="h-3 w-3 object-contain" />
                ))}
              </div>
              <p className="text-[10px] font-light leading-[14px] tracking-[0] text-epic-cream md:text-[14px] md:leading-[20px]">"{item.quote}"</p>
              <p className="mt-4 text-[10px] font-light leading-[14px] tracking-[0] text-epic-pink md:mt-5 md:text-[14px] md:leading-[20px]">-{item.author}</p>
              {index === 1 && (
                <button className="mt-3 stroke-width=3 ml-auto flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FAD7D3] text-[11px] leading-none text-[#154527] md:hidden" type="button" aria-label="Next testimonial">
                  →
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const { data, isLoading } = useHomepageData();

  if (isLoading || !data) {
    return <div className="min-h-screen bg-[#FFFCF2]" />;
  }

  return (
    <main className="min-h-screen bg-[#FFFCF2] font-sans text-epic-green">
      <Hero navigation={data.navigation} />
      <Locations locations={data.locations} />
      <Facilities facilities={data.facilities} />
      <Billboard />
      <Booking sportTabs={data.sportTabs} bookingTabs={data.bookingTabs} />
      <Members testimonials={data.testimonials} />
      <SiteFooter />
    </main>
  );
};

export default HomePage;
