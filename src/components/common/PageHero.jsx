import { ASSET_PATH } from "../../constants/assets";
import SiteHeader from "../layout/SiteHeader";

const PageHero = ({ image, title, subtitle, dark = false }) => {
  return (
    <section className={`relative min-h-[560px] overflow-hidden ${dark ? "bg-[#191919]" : "bg-[#f8f8f3]"}`}>
      <SiteHeader tone={dark ? "dark" : "light"} />
      {image && <img src={`${ASSET_PATH}${image}`} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <div className={`absolute inset-0 ${dark ? "bg-black/45" : "bg-white/10"}`} />
      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1340px] items-end px-8 pb-20 md:px-12">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-wide text-[#fff4a8]">{subtitle}</p>
          <h1 className={`mt-4 max-w-4xl text-[64px] font-semibold leading-[0.95] tracking-[-0.06em] md:text-[92px] ${dark ? "text-[#fff4a8]" : "text-epic-pink"}`}>
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
