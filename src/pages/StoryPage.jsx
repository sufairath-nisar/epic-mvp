import { useMemo, useState } from "react";
import F31Header from "../components/f31/F31Header";
import SiteFooter from "../components/layout/SiteFooter";
import { ASSET_PATH } from "../constants/assets";
import { mainNavigation } from "../data/routes";
import { storyLinks, teamMembers } from "../data/siteContent";
import { Link } from "../router/RouterProvider";

const StoryHero = () => {
  return (
    <section className="relative h-[560px] overflow-hidden bg-[#143c25] md:h-[735px]">
      <img src={`${ASSET_PATH}story-hero.png`} alt="Epic Padel club wall" className="h-full w-full object-cover object-center" />
      <F31Header navigation={mainNavigation} />
    </section>
  );
};

const StoryIndex = () => {
  return (
    <section className="bg-[#FFFCF2] px-8 py-16 md:px-16 md:py-[88px]">
      <div className="mx-auto grid max-w-[1340px] gap-12 md:grid-cols-[250px_1fr] md:items-start">
        <h1 className="text-[64px] font-semibold leading-[0.95] tracking-[-0.06em] text-epic-pink md:text-[72px]">
          our
          <br />
          story
        </h1>
        <div className="grid max-w-[650px] gap-10 md:pt-5">
          {storyLinks.map((item) => (
            <Link key={item.label} to={item.path} className="group grid grid-cols-[38px_1fr] items-center gap-16 text-[14px] font-bold uppercase tracking-[0.01em] text-[#154527]">
              <img src={`${ASSET_PATH}arrow-right.png`} alt="" className="h-8 w-8 object-contain transition group-hover:scale-105" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const orderedMembers = useMemo(
    () => teamMembers.map((_, index) => teamMembers[(activeIndex + index) % teamMembers.length]),
    [activeIndex]
  );
  const featured = orderedMembers[0];
  const thumbnails = orderedMembers.slice(1, 3);

  const goPrevious = () => setActiveIndex((current) => (current - 1 + teamMembers.length) % teamMembers.length);
  const goNext = () => setActiveIndex((current) => (current + 1) % teamMembers.length);

  return (
    <section className="bg-[#FFFCF2] px-8 py-16 md:px-16 md:py-[132px]">
      <div className="mx-auto max-w-[1302px] md:relative md:h-[524px]">
        <div className="md:absolute md:left-0 md:top-0">
          <h2 className="text-[64px] font-semibold leading-[1.02] tracking-[-0.06em] text-epic-pink md:text-[84px]">
            our
            <br />
            team
          </h2>
          <button className="mt-20 hidden transition hover:scale-105 md:block md:absolute md:left-[6px] md:top-[478px] md:mt-0" type="button" onClick={goPrevious} aria-label="Previous team member">
            <img src={`${ASSET_PATH}arrow-left.png`} alt="" className="h-[45px] w-[45px] object-contain" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 md:mt-0 md:block">
          {thumbnails.map((member) => (
            <article key={member.name} className="group overflow-hidden md:absolute md:top-[249px] md:[&:nth-child(1)]:left-[117px] md:[&:nth-child(2)]:left-[344px]">
              <img src={`${ASSET_PATH}${member.image}`} alt={member.name} className="aspect-[207/274] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[274px] md:w-[207px]" />
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-9 md:mt-0 md:block">
          <img src={`${ASSET_PATH}${featured.image}`} alt={featured.name} className="aspect-[400/500] w-full object-cover md:absolute md:left-[571px] md:top-[24px] md:h-[500px] md:w-[400px]" />
          <article className="relative max-w-[260px] md:absolute md:left-[1024px] md:top-[215px] md:h-[217px] md:pb-[72px]">
            <h3 className="text-[17px] font-extrabold uppercase leading-tight text-[#154527]">{featured.name}</h3>
            <p className="text-[14px] font-bold uppercase text-[#154527]">{featured.role}</p>
            <p className="mt-5 mb-5 text-[14px] font-medium leading-5 text-[#154527]">{featured.summary}</p>
            <button className="mt-10 transition hover:scale-105 md:bottom-0 md:left-0 md:mt-0" type="button" onClick={goNext} aria-label="Next team member">
              <img src={`${ASSET_PATH}arrow-right.png`} alt="" className="h-[45px] w-[45px] object-contain" />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};

const StoryPage = () => {
  return (
    <main className="min-h-screen bg-[#FFFCF2] font-sans text-[#154527]">
      <StoryHero />
      <StoryIndex />
      <img src={`${ASSET_PATH}story-billboard.png`} alt="Epic Padel billboard" className="h-[420px] w-full object-cover object-center md:h-[742px]" />
      <TeamSection />
      <SiteFooter />
    </main>
  );
};

export default StoryPage;
