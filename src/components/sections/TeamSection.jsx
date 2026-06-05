import { useMemo, useState } from "react";
import ArrowCircle from "../common/ArrowCircle";
import { ASSET_PATH } from "../../constants/assets";

const thumbnailPositions = ["md:left-[117px]", "md:left-[344px]"];

const SectionHeading = ({ children, className = "" }) => <h2 className={`font-display font-bold leading-[0.92] tracking-[0] text-[#FAD7D3] ${className}`}>{children}</h2>;

const storySectionSpacing = {
  default: "bg-white px-4 py-5 md:px-8 md:pt-[100px] md:pb-[120px]",
  compact: "bg-white px-4 pb-5 pt-2 md:px-8 md:pb-[120px] md:pt-[38px]"
};

const TeamSection = ({ members, spacing = "default", thumbnails = [], variant = "story" }) => {
  if (variant === "findEpic") {
    return <FindEpicTeamSection member={members[0]} thumbnails={thumbnails} />;
  }

  return <StoryTeamSection members={members} spacing={spacing} />;
};

const StoryTeamSection = ({ members, spacing }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const orderedMembers = useMemo(() => members.map((_, index) => members[(activeIndex + index) % members.length]), [activeIndex, members]);
  const featured = orderedMembers[0];
  const thumbnails = orderedMembers.slice(1, 3);

  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === members.length - 1;
  const goPrevious = () => setActiveIndex((current) => Math.max(current - 1, 0));
  const goNext = () => setActiveIndex((current) => Math.min(current + 1, members.length - 1));
  const goNextMobile = () => setActiveIndex((current) => (current + 1) % members.length);

  return (
    <section className={storySectionSpacing[spacing] ?? storySectionSpacing.default}>
      <div className="mx-auto max-w-[1302px] md:relative md:h-[524px]">
        <div className="md:hidden">
          <SectionHeading className="text-[45px]">
            our
            <br />
            team
          </SectionHeading>
          <div className="relative mt-4 w-[298px] max-w-full">
            <TeamImage member={featured} featured />
            <TeamArrow direction="next" onClick={goNextMobile} className="absolute bottom-[-13px] right-[-37px] z-10 md:hidden" />
          </div>
          <TeamBio member={featured} showArrow={false} onNext={goNextMobile} className="mt-3 max-w-[210px]" />
        </div>

        <div className="md:absolute md:left-0 md:top-0">
          <SectionHeading className="hidden text-[34px] md:block md:text-[86px] md:leading-[1.02]">
            our
            <br />
            team
          </SectionHeading>
          <TeamArrow direction="previous" isEnd={isAtStart} onClick={goPrevious} className="hidden md:absolute md:left-[6px] md:top-[479px] md:block md:mt-0" />
        </div>

        <div className="hidden md:mt-0 md:block">
          {thumbnails.map((member, index) => (
            <article key={member.name} className={`group overflow-hidden md:absolute md:top-[249px] ${thumbnailPositions[index]}`}>
              <TeamImage member={member} />
            </article>
          ))}
        </div>

        <div className="hidden md:mt-0 md:block">
          <div className="md:absolute md:left-[571px] md:top-[24px]">
            <TeamImage member={featured} featured />
          </div>
          <div className="md:absolute md:left-[1024px] md:top-[255px]">
            <TeamBio member={featured} onNext={goNext} />
          </div>
          <TeamArrow direction="next" isEnd={isAtEnd} onClick={goNext} className="hidden md:absolute md:left-[1024px] md:top-[479px] md:block md:mt-0" />
        </div>
      </div>
    </section>
  );
};

const FindEpicTeamSection = ({ member, thumbnails }) => (
  <section className="bg-white px-4 py-8 md:px-[50px] md:py-[86px]">
    <div className="mx-auto grid max-w-[1340px] gap-5 md:grid-cols-[360px_1fr_300px] md:items-end md:gap-8">
      <SectionHeading className="text-[35px] md:self-start md:text-[86px]">
        our
        <br />
        team
      </SectionHeading>
      <div className="grid grid-cols-[0.55fr_1fr] items-end gap-4 md:grid-cols-[207px_207px_400px]">
        {thumbnails.map((thumbnail) => (
          <img key={thumbnail.name} src={`${ASSET_PATH}${thumbnail.image}`} alt={thumbnail.name} loading="lazy" className="hidden aspect-[207/274] w-full object-cover md:block" />
        ))}
        <img src={`${ASSET_PATH}${member.image}`} alt={member.name} loading="lazy" className="aspect-[298/372] w-full object-cover md:aspect-[400/500]" />
      </div>
      <article className="max-w-[240px]">
        <h3 className="text-[12px] font-normal uppercase leading-tight text-[#154527] md:text-[17px]">{member.name}</h3>
        <p className="text-[10px] font-light uppercase leading-tight text-[#154527] md:text-[14px]">{member.role}</p>
        <p className="mt-3 text-[10px] font-light leading-[14px] text-[#154527] md:mt-5 md:text-[14px] md:leading-5">{member.summary}</p>
      </article>
    </div>
  </section>
);

const TeamImage = ({ member, featured = false }) => (
  <article className="group overflow-hidden">
    <img
      src={`${ASSET_PATH}${member.image}`}
      alt={member.name}
      loading="lazy"
      className={
        featured
          ? "h-[372px] w-[298px] max-w-full object-cover transition duration-500 group-hover:scale-105 md:h-[500px] md:w-[400px]"
          : "aspect-[207/274] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[274px] md:w-[207px]"
      }
    />
  </article>
);

const TeamArrow = ({ direction, isEnd = false, onClick, className = "" }) => {
  const label = direction === "previous" ? "Previous team member" : "Next team member";
  const arrowDirection = direction === "previous" ? "left" : "right";

  return (
    <ArrowCircle
      className={`md:mt-[3.75px] ${className}`}
      direction={arrowDirection}
      iconClassName={arrowDirection === "right" ? "translate-x-[2px] md:translate-x-[7px]" : "md:translate-x-[7px]"}
      label={label}
      onClick={onClick}
      size="team"
      strokeWidth={2.5}
      tone={isEnd ? "pinkWhite" : "yellowWhite"}
    />
  );
};

const TeamBio = ({ member, className = "", showArrow = true, onNext }) => (
  <article className={`relative max-w-[260px] ${className}`}>
    <h3 className="font-sans text-[12px] font-normal uppercase leading-tight text-[#154527] md:text-[20px]">{member.name}</h3>
    <p className="mt-0.5 font-sans text-[10px] font-light uppercase leading-tight text-[#154527] md:text-[16px]">{member.role}</p>
    <p className="mb-4 mt-3 font-sans text-[10px] font-light leading-[14px] text-[#154527] md:mb-0 md:mt-5 md:text-[16px] md:leading-5">{member.summary}</p>
    {showArrow && <TeamArrow direction="next" onClick={onNext} className="md:hidden" />}
  </article>
);

export default TeamSection;
