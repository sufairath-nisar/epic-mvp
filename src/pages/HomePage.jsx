import { useState } from "react";
import AutoCarousel from "../components/common/AutoCarousel";
import MobileNextButton from "../components/common/MobileNextButton";
import RotatingImage from "../components/common/RotatingImage";
import F31Header from "../components/f31/F31Header";
import { BookCourtCta, DownloadAppCta } from "../components/f31/HeroCtas";
import SiteFooter from "../components/layout/SiteFooter";
import BookingExperienceSection from "../components/sections/BookingExperienceSection";
import FacilitiesSection from "../components/sections/FacilitiesSection";
import MembersTestimonialsSection from "../components/sections/MembersTestimonialsSection";
import { ASSET_PATH } from "../constants/assets";
import { useHomepageData } from "../hooks/useHomepageData";
import { useSequentialImagePairs } from "../hooks/useSequentialImagePairs";
import { Link } from "../router/RouterProvider";

const Hero = ({ navigation }) => (
  <section id="top" className="relative h-[124vw] min-h-[460px] max-h-[560px] overflow-hidden bg-[#b8b0a0] md:h-auto md:min-h-[820px] md:max-h-none">
    <img src={`${ASSET_PATH}home-hero-player-mobile.png`} alt="Padel player" className="absolute inset-0 h-full w-full object-cover object-top md:hidden" />
    <img src={`${ASSET_PATH}home-hero-player.png`} alt="Padel player" className="absolute inset-0 hidden h-full w-full object-cover object-center md:block" />
    <div className="absolute inset-0 bg-[#4b4f3f]/10" />
    <F31Header navigation={navigation} />
    <div className="absolute bottom-6 left-4 z-10 md:bottom-36 md:left-12">
      <h1 className="max-w-[205px] text-[11px] font-light uppercase leading-[1.05] tracking-wide text-[#fff4a8] md:max-w-3xl md:text-[32px] md:leading-none">WHERE PADEL FINDS ITS PULSE</h1>
      <div className="mb-[15px] mt-2 flex flex-row items-start gap-2 md:mb-0 md:mt-5 md:gap-8">
        <BookCourtCta />
        <DownloadAppCta />
      </div>
    </div>
  </section>
);

const Locations = ({ locations }) => {
  const [mobileLocationIndex, setMobileLocationIndex] = useState(0);
  const featuredLocation = locations[mobileLocationIndex];
  const activeImageIndexes = useSequentialImagePairs(locations.length);
  const showNextMobileLocation = () => setMobileLocationIndex((current) => (current + 1) % locations.length);

  return (
    <section id="find-epic" className="bg-white px-4 py-8 text-epic-green md:px-12 md:py-24">
      <div className="mx-auto max-w-[1340px]">
        <div className="grid gap-5 md:grid-cols-[0.9fr_1fr_220px] md:items-start md:gap-10">
          <h2 className="font-display text-[46px] font-bold leading-[0.9] tracking-[0] text-epic-pink md:text-[86px]">
            our
            <br />
            locations
          </h2>
          <p className="max-w-md text-[13px] font-light leading-[18px] text-epic-green md:mt-12 md:text-[14px] md:leading-6">
            From outdoor courts built for regions with outdoor seasons, to full-scale indoor clubs designed for year-round play, every Epic location carries its own identity, brought to life through
            local culture, community, and creative collaboration.
          </p>
          <Link
            to="/find-epic"
            className="inline-flex h-8 w-full items-center justify-center rounded-full border border-[#154527] px-5 text-[10px] font-light uppercase text-epic-green transition hover:bg-[#154527] hover:text-[#fff4a8] md:mt-14 md:h-11 md:w-fit md:px-8 md:text-[12px] md:font-normal"
          >
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

  return (
    <article className="group relative w-full shrink-0 md:w-[calc((100vw-96px-48px)/3)] 2xl:w-[calc((1340px-48px)/3)]">
      <RotatingImage images={cardImages} alt={location.city} activeIndex={activeImageIndex} className="aspect-[393/478] bg-[#e5e2d8] md:aspect-[1.02]" />
      <h3 className="mt-5 text-[13px] font-normal uppercase leading-none tracking-[0] text-epic-green md:mt-7 md:text-[20px]">{location.city}</h3>
      <p className="mt-3 h-[64px] max-w-[285px] overflow-hidden text-[11px] font-light leading-[16px] text-epic-green md:h-[96px] md:max-w-none md:text-[14px] md:leading-6">{location.description}</p>
      <Link
        to={location.path}
        className="mt-4 inline-flex h-8 min-w-[180px] items-center justify-center rounded-full border border-[#154527] px-6 text-[10px] font-normal uppercase text-epic-green transition hover:bg-[#154527] hover:text-[#fff4a8] md:mt-5 md:h-10 md:px-8 md:text-[15px]"
      >
        {location.cta}
      </Link>
      {onNext && <MobileNextButton label="Show next location" className="absolute right-0 top-[calc(100%-82px)]" onClick={onNext} />}
    </article>
  );
};

const homeFacilitiesDescription =
  "At Epic Padel, the experience goes beyond the court. From premium playing surfaces to modern locker rooms and fitness areas, our spaces are built to move with you, supporting every level of play, before and after the match.";

const Billboard = () => (
  <section>
    <div className="h-5 bg-white" />
    <img src={`${ASSET_PATH}mobile-location-billboard.png`} alt="EPIC billboard" className="w-full object-cover object-center md:hidden" />
    <img src={`${ASSET_PATH}home-billboard.png`} alt="EPIC billboard" className="hidden h-[760px] w-full object-cover object-center md:block" />
  </section>
);

const HomePage = () => {
  const { data, isLoading } = useHomepageData();

  if (isLoading || !data) {
    return <div className="min-h-screen bg-[#FFFCF2]" />;
  }

  return (
    <main className="min-h-screen bg-[#FFFCF2] font-sans text-epic-green">
      <Hero navigation={data.navigation} />
      <Locations locations={data.locations} />
      <FacilitiesSection description={homeFacilitiesDescription} facilities={data.facilities} variant="home" />
      <Billboard />
      <BookingExperienceSection bookingTabs={data.bookingTabs} sportTabs={data.sportTabs} variant="home" />
      <MembersTestimonialsSection testimonials={data.testimonials} variant="home" />
      <SiteFooter />
    </main>
  );
};

export default HomePage;
