import { useState } from "react";
import ArrowCircle from "../components/common/ArrowCircle";
import F31Header from "../components/f31/F31Header";
import SiteFooter from "../components/layout/SiteFooter";
import TeamSection from "../components/sections/TeamSection";
import { ASSET_PATH } from "../constants/assets";
import { mainNavigation } from "../data/routes";
import { storyLinks, teamMembers } from "../data/siteContent";

const storyDetails = {
  "What is Epic": "We're building more than clubs. We're building community-led spaces defined by movement, connection, and shared energy.",
  "Why Epic": "To put padel, play, and club life in a more accessible, social, and elevated setting that fits modern city life.",
  "The ones behind Epic": "Behind Epic Padel is a team of builders, operators, and padel believers creating experiences that make people want to return."
};

const StoryHero = () => (
  <section className="relative h-[132vw] min-h-[430px] max-h-[520px] overflow-hidden bg-[#143c25] md:h-[clamp(560px,56.944vw,820px)] md:min-h-0 md:max-h-none">
    <img src={`${ASSET_PATH}story-hero-mobile.png`} alt="Epic Padel club wall" className="h-full w-full object-cover object-center md:hidden" />
    <img src={`${ASSET_PATH}story-hero.png`} alt="Epic Padel club wall" className="hidden h-full w-full object-cover object-center md:block" />
    <F31Header navigation={mainNavigation} />
  </section>
);

const SectionHeading = ({ children, className = "" }) => <h1 className={`font-display font-bold leading-[0.92] tracking-[0] text-[#FAD7D3] ${className}`}>{children}</h1>;

const StoryAccordionItem = ({ isOpen, isVisited, item, onToggle }) => {
  const arrowTone = isOpen || isVisited ? "pinkWhite" : "yellow";

  return (
    <article className="font-sans text-[#154527]">
      <button
        type="button"
        className="group grid w-full grid-cols-[15px_1fr] items-center gap-4 text-left text-[8px] font-light uppercase leading-none tracking-[0] md:grid-cols-[37.5px_1fr] md:gap-10 md:text-[24px]"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <ArrowCircle as="span" className="group-hover:bg-[#FAD7D3] group-hover:text-[#FFFCF2]" direction={isOpen ? "down" : "right"} size="story" strokeWidth={2.5} tone={arrowTone} />
        <span>{item.label}</span>
      </button>

      {isOpen && (
        <p className="ml-[31px] mt-3 max-w-[640px] text-[10px] font-light normal-case leading-[15px] tracking-[0] text-[#154527] md:ml-[77.5px] md:mt-4 md:text-[14px] md:leading-5">
          {storyDetails[item.label]}
        </p>
      )}
    </article>
  );
};

const StoryIndex = () => {
  const [openLabel, setOpenLabel] = useState(null);
  const [visitedLabels, setVisitedLabels] = useState([]);

  const toggleStoryItem = (label) => {
    setOpenLabel((current) => (current === label ? null : label));
    setVisitedLabels((current) => (current.includes(label) ? current : [...current, label]));
  };

  return (
    <section className="bg-white px-4 py-4 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-[1340px] gap-4 md:grid-cols-[250px_1fr] md:items-start md:gap-[78px]">
        <SectionHeading className="text-[45px] md:text-[86px]">
          our
          <br />
          story
        </SectionHeading>
        <div className="grid max-w-[760px] gap-3 pt-1 md:gap-10 md:pt-4">
          {storyLinks.map((item) => (
            <StoryAccordionItem key={item.label} isOpen={openLabel === item.label} isVisited={visitedLabels.includes(item.label)} item={item} onToggle={() => toggleStoryItem(item.label)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StoryBillboard = () => (
  <>
    <img src={`${ASSET_PATH}mobile-location-billboard.png`} alt="Epic Padel billboard" className="w-full object-cover object-center md:hidden" />
    <img src={`${ASSET_PATH}story-billboard.png`} alt="Epic Padel billboard" className="hidden h-[742px] w-full object-cover object-center md:block" />
  </>
);

const StoryPage = () => {
  return (
    <main className="min-h-screen bg-white font-sans text-[#154527]">
      <StoryHero />
      <StoryIndex />
      <StoryBillboard />
      <TeamSection members={teamMembers} variant="story" />
      <SiteFooter />
    </main>
  );
};

export default StoryPage;
