import AutoCarousel from "../common/AutoCarousel";
import { ASSET_PATH } from "../../constants/assets";

const variants = {
  home: {
    section: "bg-[#154527] text-[#fff4a8]",
    container: "mx-auto max-w-[1440px] px-4 pb-7 pt-8 md:relative md:min-h-[620px] md:px-0 md:pb-0 md:pt-0",
    headerWrap: "md:absolute md:left-[50px] md:top-[60px]",
    heading: "font-display text-[46px] font-bold leading-[0.95] tracking-[0] text-[#FAD7D3] md:text-[86px] md:leading-[1.22]",
    description: "mt-6 max-w-[360px] text-[12px] font-light leading-[16px] text-white md:absolute md:left-[730px] md:top-[125px] md:mt-0 md:text-[14px] md:leading-[1.45]",
    mobileCarousel: "mt-8 md:hidden",
    desktopCarousel: "hidden md:absolute md:left-[50px] md:right-0 md:top-[405px] md:mt-0 md:block",
    desktopTrack: "facility-carousel-track items-start gap-10 md:gap-[72px]",
    cardWidth: "w-[54px] shrink-0 md:w-[148px]",
    iconBox: "flex h-[36px] items-start md:h-[86px]",
    icon: "max-h-[36px] w-auto object-contain md:max-h-none",
    label: "mt-3 max-w-[58px] text-[7px] font-light uppercase leading-[9px] tracking-[0] text-white md:mt-[18px] md:max-w-[145px] md:text-[14px] md:leading-[15px]"
  },
  findEpic: {
    section: "bg-[#154527] text-[#fff4a8]",
    container: "mx-auto grid max-w-[1440px] grid-cols-1 px-4 pb-7 pt-8 md:min-h-[465px] md:grid-cols-12 md:grid-rows-[auto_1fr_auto] md:px-[37px] md:pb-[58px] md:pt-[72px]",
    headerWrap: "grid gap-6 md:contents",
    heading: "font-display text-[35px] font-bold leading-[0.9] tracking-[0] text-[#FAD7D3] md:col-span-4 md:row-start-1 md:text-[86px] md:leading-[0.95]",
    description: "max-w-[520px] text-[10px] font-light leading-[15px] text-[#FFFCF2] md:col-span-5 md:col-start-7 md:row-start-1 md:max-w-none md:text-[13px] md:leading-[19px]",
    mobileCarousel: "mt-8 md:hidden",
    desktopCarousel: "hidden md:col-span-12 md:row-start-3 md:mt-[104px] md:block",
    desktopTrack: "facility-carousel-track items-start gap-[57px]",
    cardWidth: "w-[54px] shrink-0 md:w-[108px]",
    iconBox: "flex h-[36px] items-start md:h-[60px]",
    icon: "max-h-[36px] w-auto object-contain md:max-h-[60px]",
    label: "mt-3 max-w-[58px] text-[7px] font-light uppercase leading-[9px] tracking-[0] text-[#FFFCF2] md:mt-4 md:max-w-[108px] md:text-[12px] md:leading-[15px]"
  }
};

const FacilitiesSection = ({ description, facilities, variant = "home" }) => {
  const styles = variants[variant] ?? variants.home;
  const isHomeVariant = variant === "home";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {isHomeVariant ? (
          <>
            <div className={styles.headerWrap}>
              <h2 className={styles.heading}>
                our
                <br />
                facilities
              </h2>
            </div>
            <p className={styles.description}>{description}</p>
          </>
        ) : (
          <div className={styles.headerWrap}>
            <h2 className={styles.heading}>
              our
              <br />
              facilities
            </h2>
            <p className={styles.description}>{description}</p>
          </div>
        )}

        <AutoCarousel
          items={facilities}
          className={styles.mobileCarousel}
          trackClassName="facility-mobile-carousel-track items-start gap-7"
          getKey={(facility) => facility.label}
          renderItem={(facility, key) => <FacilityCard key={key} facility={facility} styles={styles} />}
        />

        <AutoCarousel
          items={facilities}
          className={styles.desktopCarousel}
          trackClassName={styles.desktopTrack}
          getKey={(facility) => facility.label}
          renderItem={(facility, key) => <FacilityCard key={key} facility={facility} styles={styles} />}
        />
      </div>
    </section>
  );
};

const FacilityCard = ({ facility, styles }) => (
  <article className={styles.cardWidth}>
    <div className={styles.iconBox}>
      <img src={`${ASSET_PATH}${facility.icon}`} alt="" loading="lazy" className={styles.icon} />
    </div>
    <p className={styles.label}>{facility.label}</p>
  </article>
);

export default FacilitiesSection;
