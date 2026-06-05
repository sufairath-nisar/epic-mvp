import { useState } from "react";
import ArrowCircle from "../components/common/ArrowCircle";
import F31Header from "../components/f31/F31Header";
import SiteFooter from "../components/layout/SiteFooter";
import RotatingImage from "../components/common/RotatingImage";
import BookingExperienceSection from "../components/sections/BookingExperienceSection";
import FacilitiesSection from "../components/sections/FacilitiesSection";
import MembershipsSection from "../components/sections/MembershipsSection";
import MembersTestimonialsSection from "../components/sections/MembersTestimonialsSection";
import TeamSection from "../components/sections/TeamSection";
import { ASSET_PATH } from "../constants/assets";
import { f31HomepageData } from "../data/f31Homepage";
import { mainNavigation } from "../data/routes";
import { teamMembers } from "../data/siteContent";
import { useSequentialImagePairs } from "../hooks/useSequentialImagePairs";
import { useFindEpicLocations } from "../hooks/useFindEpicLocations";
import { useMembershipPackages } from "../hooks/useMembershipPackages";

const findEpicHero = {
  eyebrow: "Padel finds its pulse in Charlotte",
  media: {
    type: "video",
    src: "",
    poster: "",
    label: "Charlotte location video"
  }
};

const findEpicFacilities = [
  { label: "5 PADEL COURTS", icon: "find-epic-facility-padel-courts.svg" },
  { label: "10 TENNIS COURTS", icon: "find-epic-facility-tennis-courts.svg" },
  { label: "4 PICKLEBALL COURTS", icon: "find-epic-facility-pickleball-courts.svg" },
  { label: "FITNESS CENTER", icon: "find-epic-facility-fitness-center.svg" },
  { label: "LOCKER ROOM", icon: "find-epic-facility-locker-room.svg" },
  { label: "PREMIUM SHOWERS", icon: "find-epic-facility-premium-showers.svg" },
  { label: "CAFE & JUICE BAR", icon: "find-epic-facility-cafe.svg" },
  { label: "COWORKING & LOUNGE SPACES", icon: "find-epic-facility-lounge.svg" }
];

const santiago = {
  name: "Santiago",
  role: "Director of Racquet Sports",
  image: "team-sam.png",
  summary: "Leads coaching programs, player development, and training initiatives for all racquet sports."
};

const findEpicTeamMembers = [santiago, ...teamMembers.slice(0, 2)];

const findEpicFacilitiesDescription = (
  <>
    The club is fully equipped to support both play and downtime, with indoor courts, locker and refresh areas, a dedicated fitness center, and comfortable locker rooms with showers.
    <br />
    <br />
    On-site cafe and juice bar options make it easy to refuel between sessions, while shared workspaces and retail touches round out the experience, creating a warm designed for full days, not just
    match time.
  </>
);

const FindEpicHeroMedia = ({ media }) => {
  if (media?.type === "video" && media.src) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={`${ASSET_PATH}${media.src}`}
        poster={media.poster ? `${ASSET_PATH}${media.poster}` : undefined}
        aria-label={media.label}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-[#1a1a1a]" aria-hidden="true" />
      <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[8px] font-light lowercase tracking-[0] text-[#FFFCF2] md:top-[340px] md:translate-y-0 md:text-[10px]">
        location video placeholder
      </p>
    </>
  );
};

const FindEpicHero = ({ hero = findEpicHero }) => (
  <section className="relative h-[164vw] min-h-[560px] max-h-[690px] overflow-hidden bg-[#1a1a1a] md:h-[820px] md:min-h-0 md:max-h-none">
    <FindEpicHeroMedia media={hero.media} />
    <F31Header navigation={mainNavigation} />
    <div className="absolute bottom-6 left-4 z-10 md:bottom-[152px] md:left-[50px]">
      <h1 className="max-w-[280px] text-[13px] font-light uppercase leading-[1.1] tracking-[0] text-[#fff4a8] md:max-w-[560px] md:text-[26px]">{hero.eyebrow}</h1>
      <div className="mt-2 flex items-start gap-2 md:mt-3 md:gap-4">
        <a
          href="#join-epic"
          className="flex h-[22px] w-[91px] items-center justify-center rounded-full bg-[#fff2a8] text-[8px] font-normal uppercase leading-none tracking-[0] text-epic-green transition hover:bg-[#154527] hover:text-[#fff2a8] md:h-[34px] md:w-[153px] md:text-[15px]"
        >
          Book a Court
        </a>
        <a
          href="#memberships"
          className="flex h-[22px] w-[116px] items-center justify-center rounded-full border border-[#fff2a8] text-[8px] font-normal uppercase leading-none tracking-[0] text-[#fff2a8] transition hover:border-[#154527] hover:bg-[#154527] hover:text-[#fff2a8] md:h-[34px] md:w-[178px] md:text-[15px]"
        >
          View Memberships
        </a>
      </div>
    </div>
  </section>
);

const PageHeading = ({ children, className = "" }) => <h2 className={`font-display font-bold leading-[0.9] tracking-[0] text-[#FAD7D3] ${className}`}>{children}</h2>;

const LocationIntro = ({ locations }) => {
  const [locationIndex, setLocationIndex] = useState(0);
  const activeImageIndexes = useSequentialImagePairs(locations.length, 1200);
  const hasLocations = locations.length > 0;
  const hasMultiple = locations.length > 1;
  const activeLocation = hasLocations ? locations[locationIndex] : null;
  const visibleLocations = hasMultiple ? [locations[locationIndex], locations[(locationIndex + 1) % locations.length]] : locations;
  const showNextLocationPair = () => setLocationIndex((current) => (current + 1) % locations.length);

  return (
    <section className="bg-white px-4 py-6 text-[#154527] md:px-[50px] md:pb-[85px] md:pt-[86px]">
      <div className="mx-auto max-w-[1340px]">
        <div className="grid gap-4 md:grid-cols-[560px_1fr] md:items-start md:gap-[118px]">
          <PageHeading className="text-[35px] md:text-[86px]">
            our
            <br />
            location
          </PageHeading>
          <div className="max-w-[640px] md:mt-0">
            <p className="text-[9px] font-light leading-[14px] text-[#154527] md:text-[13px] md:leading-[19px]">
              Epic Padel Charlotte is where the city comes to play, connect, and move together. Located at Prosperity Athletic Club, this outdoor yet secure blend helps local players compete with an
              ease, social energy that makes the court as good off court as it does on it.
            </p>
            <p className="mt-3 text-[9px] font-light leading-[14px] text-[#154527] md:text-[13px] md:leading-[19px]">
              With purpose-built courts, thoughtful amenities, and a community-first atmosphere, Charlotte is designed for players of all levels: from first-time hitters to regular competitors. It's a
              place to rally after work, spend weekends with friends and family, and feel part of something bigger than just the game.
            </p>
            <p className="mt-3 text-[9px] font-light leading-[14px] text-[#154527] md:text-[13px] md:leading-[19px]">This is padel, Charlotte-style: welcoming, active, and full of pulse.</p>
          </div>
        </div>

        {hasLocations ? (
          <>
            <div className="mt-5 md:hidden">
              <RotatingImage images={activeLocation.images} alt={activeLocation.city} activeIndex={activeImageIndexes[locationIndex]} className="group aspect-[298/372] w-full bg-[#e5e2d8]" />
              {hasMultiple && (
                <div className="mt-5 flex justify-center">
                  <ArrowCircle label="Show next location" onClick={showNextLocationPair} size="sm" tone="pink" />
                </div>
              )}
            </div>

            <div className="relative mt-5 hidden gap-4 md:mt-[86px] md:grid md:grid-cols-[440px_1fr] md:items-start md:gap-4 md:pr-[52px]">
              {visibleLocations.map((location, index) => (
                <RotatingImage
                  key={`${location.id}-${index}`}
                  images={location.images}
                  alt={location.city}
                  activeIndex={activeImageIndexes[(locationIndex + index) % locations.length]}
                  className="group aspect-[298/372] w-full bg-[#e5e2d8] md:h-[535px] md:aspect-auto"
                />
              ))}
              {hasMultiple && <ArrowCircle className="absolute bottom-2 right-0 flex" label="Show next location" onClick={showNextLocationPair} size="sm" tone="pink" />}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

const BillboardSection = () => (
  <section className="bg-white">
    <div className="h-[40px] bg-white md:h-[65px]" />
    <img src={`${ASSET_PATH}mobile-location-billboard.png`} alt="Epic billboard" className="w-full object-cover object-center md:hidden" />
    <img src={`${ASSET_PATH}home-billboard.png`} alt="Epic billboard" className="hidden h-[760px] w-full object-cover object-center md:block" />
  </section>
);

const FindEpicPage = () => {
  const { sportTabs, bookingTabs } = f31HomepageData;
  const locations = useFindEpicLocations();
  const { packages } = useMembershipPackages();
  // Show fully-populated cards first; "Not uploaded yet" cards fall to the end.
  const memberships = [...packages].sort((a, b) => Number(b.isComplete) - Number(a.isComplete));

  return (
    <main className="min-h-screen bg-white font-sans text-[#154527]">
      <FindEpicHero />
      <LocationIntro locations={locations} />
      <FacilitiesSection description={findEpicFacilitiesDescription} facilities={findEpicFacilities} variant="findEpic" />
      <BillboardSection />
      <MembershipsSection plans={memberships} id="memberships" />
      <BookingExperienceSection bookingTabs={bookingTabs} sportTabs={sportTabs} variant="findEpic" />
      <TeamSection members={findEpicTeamMembers} spacing="compact" variant="story" mobileNextArrowClassName="bottom-[-3px] right-[-55px]" />
      <MembersTestimonialsSection testimonials={f31HomepageData.testimonials} variant="home" />
      <SiteFooter />
    </main>
  );
};

export default FindEpicPage;
