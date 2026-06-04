import { useState } from "react";
import F31Header from "../components/f31/F31Header";
import SiteFooter from "../components/layout/SiteFooter";
import { ASSET_PATH } from "../constants/assets";
import { mainNavigation } from "../data/routes";

// Each tile = a box with the brand logo (SVG) centered + a label below.
// On hover the box background changes to the brand colour; `invert` turns the
// logo white for dark hover backgrounds.
const investments = [
  { slug: "ppl", label: "League", hoverBg: "#111111", invert: false, w: 100, h: 41 },
  { slug: "ny-atlantics", label: "Professional Team", hoverBg: "#3705AD", invert: false, hoverImg: true, w: 80, h: 93 },
  { slug: "hexagon-cup", label: "Tournament", hoverBg: "#380078", invert: false, hoverImg: true, w: 80, h: 93 },
  { slug: "bay-padel", label: "Club Operator", hoverBg: "#1E1E1E", invert: true, w: 100, h: 48 },
  { slug: "padel-haus", label: "Club Operator", hoverBg: "#000000", invert: true, w: 80, h: 75 },
  { slug: "ultra", label: "Club Operator", hoverBg: "#A23D32", invert: false, w: 80, h: 56 },
  { slug: "padel39", label: "Club Operator", hoverBg: "#CED404", invert: false, w: 100, h: 35 },
  { slug: "clutch", label: "Smart Technology", hoverBg: "#175A44", invert: true, w: 80, h: 14 },
  { slug: "red-padel", label: "Rating System & Tournament Organizer", hoverBg: "#000000", invert: false, hoverImg: true, w: 80, h: 43 },
  { slug: "padelhub", label: "Club Operator", hoverBg: "#C2FF8E", invert: false, w: 130, h: 34 },
  { slug: "padel-india", label: "Club Operator", hoverBg: "#000000", invert: true, w: 100, h: 46 },
  { slug: "two-two", label: "Apparel Brand", hoverBg: "#D6FF00", invert: false }
];

const cplParagraphs = [
  {
    title: "",
    body:
      "The College Padel League (CPL) represents a pioneering initiative, introducing the rapidly growing sport of padel into the U.S. collegiate landscape. As a first-of-its-kind competitive platform, CPL operates as a private, non-NCAA sanctioned sport, offering universities and their student-athletes' unique opportunities for organized padel competition."
  },
  {
    title: "Accessibility and Inclusivity",
    body:
      "CPL is committed to fostering accessibility and inclusivity, welcoming students from a variety of athletic backgrounds that want to explore the fitness and community of Padel. By doing so, the league not only broadens participation but also creates new scholarship avenues through strategic alignment with campus sports initiatives."
  },
  {
    title: "Bridging Global and U.S. Momentum",
    body:
      "With padel experiencing a surge in global popularity, CPL serves as a bridge, connecting international enthusiasm for the sport with the U.S. college ecosystem. This approach cultivates a vibrant community, develops a talent pipeline, and launches a lifestyle movement centered on one of the world's most exciting emerging sports."
  },
  {
    title: "Growth Strategy and Partnerships",
    body:
      "To accelerate its development, CPL aims to partner with leading U.S.-based operators. Through these collaborations, the league will deliver nationwide reach, greater access, and top-tier coaching. These efforts are designed to establish CPL as a cornerstone for padel's continued expansion throughout the United States and a development hub for future talent to emerge into the PPL or simply just grow their exposure to the sport."
  }
];

const GetInTouchButton = ({ children, className = "" }) => (
  <a
    href="#contact"
    className={`inline-flex h-[40px] items-center justify-center rounded-full border border-[#154527] px-[28px] text-[10px] font-normal uppercase leading-none tracking-[0] text-[#154527] transition hover:bg-[#154527] hover:text-[#FFFCF2] md:h-[44px] md:text-[11px] ${className}`}
  >
    {children}
  </a>
);

const SectionHeading = ({ children, className = "" }) => (
  <h2 className={`font-display text-[46px] font-bold lowercase leading-[0.9] tracking-[0] text-[#FAD7D3] md:text-[86px] md:leading-[1.05] ${className}`}>
    {children}
  </h2>
);

const InvestCard = ({ item }) => {
  const [hover, setHover] = useState(false);
  const ext = item.ext || "svg";
  const useHoverImg = hover && item.hoverImg;
  const hoverBg = item.hoverBg.replace(/^background:\s*/i, "");
  // Auto-pick text colour from the hover background's brightness:
  // dark hover bg -> white text, light hover bg -> dark text.
  const hex = hoverBg.replace("#", "");
  const luminance = 0.299 * parseInt(hex.slice(0, 2), 16) + 0.587 * parseInt(hex.slice(2, 4), 16) + 0.114 * parseInt(hex.slice(4, 6), 16);
  const textColor = hover && luminance < 140 ? "#ffffff" : "#1E1E1E";
  const logoSrc = useHoverImg
    ? `${ASSET_PATH}invest-${item.slug}-hover.${ext}`
    : `${ASSET_PATH}invest-${item.slug}.${ext}`;

  return (
    <a href="#visit" className="block" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div
        className="flex aspect-[3/4] flex-col px-[20px] pb-[22px] pt-[24px] transition-colors duration-300"
        style={{ backgroundColor: hover ? hoverBg : "#D9D9D933" }}
      >
        <div className="flex flex-1 items-center justify-center">
          <img
            src={logoSrc}
            alt={item.label}
            className={`object-contain transition duration-300 ${item.w ? "" : "max-h-[58px] max-w-[68%]"}`}
            style={{
              width: item.w ? `${item.w}px` : undefined,
              height: item.h ? `${item.h}px` : undefined,
              maxWidth: "78%",
              filter: hover && item.invert && !item.hoverImg ? "brightness(0) invert(1)" : "none"
            }}
          />
        </div>
        <div className="text-center">
          <p className="text-[10px] font-normal uppercase leading-[1.3] tracking-[0]" style={{ color: textColor }}>{item.label}</p>
          <span className="mt-[6px] inline-block text-[10px] font-light leading-none tracking-[0] underline" style={{ color: textColor }}>Visit Website</span>
        </div>
      </div>
    </a>
  );
};

const InvestmentsPage = () => {
  return (
    <main className="bg-white font-sans text-[#154527]">
      <F31Header navigation={mainNavigation} floating={false} />

      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-[24px] pt-[20px] md:px-[50px] md:pt-[34px]">
        <div className="grid gap-[24px] md:grid-cols-4 md:items-start md:gap-[20px]">
          <SectionHeading className="md:col-span-2 md:-mb-[17px]">
            our
            <br />
            investments
          </SectionHeading>
          <p className="text-[12px] font-light leading-[18px] tracking-[0] text-[#547257] md:self-end md:text-[14px] md:leading-[20px]">
            We invest in padel startups driving innovation in the world's fastest-growing sport, focusing on U.S. and emerging market-based operators, professional leagues, tournaments, technology solutions, and performance apparel.
          </p>
          <div className="md:justify-self-end md:self-end">
            <GetInTouchButton>Get in touch with us</GetInTouchButton>
          </div>
        </div>
      </section>

      {/* Investment grid */}
      <section className="mx-auto max-w-[1440px] px-[24px] pt-[40px] md:px-[50px] md:pt-[90px]">
        <div className="grid grid-cols-2 gap-[16px] md:grid-cols-4 md:gap-[20px]">
          {investments.map((item) => (
            <InvestCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      {/* Incubation */}
      <section className="mx-auto max-w-[1440px] px-[24px] pt-[70px] md:px-[50px] md:pt-[120px]">
        <div className="grid gap-[24px] md:grid-cols-2 md:items-start md:gap-[21px]">
          <SectionHeading>incubation</SectionHeading>
          <p className="text-[12px] font-light leading-[18px] tracking-[0] text-[#547257] md:pt-[18px] md:text-[14px] md:leading-[20px]">
            America is the innovation capital country of the world. We at EPIC strive to become the most innovative padel company in North America. As veteran venture capitalists we understand and appreciate the power of technology and its impact on our lives.
          </p>
        </div>
      </section>

      {/* CPL */}
      <section className="mt-[48px] md:mt-[80px]">
        <img src={`${ASSET_PATH}invest-cpl.png`} alt="College Padel League" className="h-[220px] w-full object-cover object-center md:h-[540px]" />
        <div className="mx-auto max-w-[1440px] px-[24px] pt-[32px] md:px-[50px] md:pt-[48px]">
          <h3 className="text-[18px] font-normal uppercase leading-[1.3] tracking-[0] text-[#154527] md:text-[24px]">College Padel League | CPL</h3>
          <div className="mt-[20px] grid gap-[20px] text-[12px] font-light leading-[24px] tracking-[0] text-[#154527] md:mt-[24px] md:text-[16px] md:gap-[24px]">
            {cplParagraphs.map((item, index) => (
              <div key={index}>
                {item.title ? <p className="mb-[2px] font-normal">{item.title}</p> : null}
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <GetInTouchButton className="mt-[28px] md:text-[11px] md:mt-[45px]">Get in touch with CPL</GetInTouchButton>
        </div>
      </section>

      {/* ZERO.40 */}
      <section className="mt-[48px] md:mt-[90px]">
        <img src={`${ASSET_PATH}invest-zero40.png`} alt="Zero.40 booking app" className="h-[220px] w-full object-cover object-center md:h-[540px]" />
        <div className="mx-auto max-w-[1440px] px-[24px] pt-[32px] md:px-[50px] md:pt-[48px]">
          <h3 className="text-[18px] font-normal uppercase leading-none tracking-[0] text-[#154527] md:text-[24px]">Zero.40</h3>
          <p className="mt-[20px] max-w-[900px] text-[12px] font-light leading-[24px] tracking-[0] text-[#154527] md:mt-[24px] md:text-[16px]">
            Zero.40 is a fully integrated booking app that allows EPIC Padel and future clients to white-label its services. Zero.40 offerings include a fully integrated court booking system, camera-based player tracking, padel rating management, and other features designed to streamline club operations, enhance the player experience, and provide real-time insights for members and management.
          </p>
          <GetInTouchButton className="mt-[54px]">Get in touch with Zero.40</GetInTouchButton>
        </div>
      </section>

      <div className="mt-[60px] md:mt-[52px]">
        <SiteFooter />
      </div>
    </main>
  );
};

export default InvestmentsPage;
