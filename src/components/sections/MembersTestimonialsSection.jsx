import { useState } from "react";
import ArrowCircle from "../common/ArrowCircle";
import MobileNextButton from "../common/MobileNextButton";
import { ASSET_PATH } from "../../constants/assets";

const variants = {
  home: {
    section: "bg-[#154527] px-4 py-8 text-[#FAD7D3] md:px-12 md:py-24",
    heading: "font-display text-[46px] font-bold leading-[0.9] tracking-[0] text-[#FAD7D3] md:text-[86px] md:leading-[0.95]",
    mobileGrid: "relative mt-8 grid grid-cols-2 gap-x-8 gap-y-7 md:hidden",
    desktopGrid: "relative mt-24 hidden grid-cols-3 gap-12 pr-20 md:grid",
    quote: "text-[10px] font-light leading-[14px] tracking-[0] text-[#FFFCF2] md:text-[14px] md:leading-[20px]",
    author: "mt-4 text-[10px] font-light leading-[14px] tracking-[0] text-[#FAD7D3] md:mt-5 md:text-[14px] md:leading-[20px]"
  },
  findEpic: {
    section: "bg-[#154527] px-4 py-8 text-[#FFFCF2] md:px-[50px] md:py-[76px]",
    heading: "font-display text-[35px] font-bold leading-[0.9] tracking-[0] text-[#FAD7D3] md:text-[86px]",
    mobileGrid: "relative mt-8 grid grid-cols-2 gap-x-8 gap-y-7 pr-8 md:hidden",
    desktopGrid: "relative mt-8 grid grid-cols-2 gap-x-8 gap-y-7 pr-8 md:mt-[126px] md:grid-cols-3 md:gap-16 md:pr-16",
    quote: "text-[10px] font-light leading-[14px] text-[#FFFCF2] md:text-[14px] md:leading-[20px]",
    author: "mt-4 text-[10px] font-light leading-[14px] text-[#FAD7D3] md:mt-5 md:text-[14px] md:leading-[20px]"
  }
};

const MembersTestimonialsSection = ({ testimonials, variant = "home" }) => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const styles = variants[variant] ?? variants.home;
  const ratingMarks = Array.from({ length: 5 }, (_, index) => index);
  const mobileTestimonials = [testimonials[mobileIndex], testimonials[(mobileIndex + 1) % testimonials.length]].filter(Boolean);
  const desktopTestimonials = [testimonials[desktopIndex], testimonials[(desktopIndex + 1) % testimonials.length], testimonials[(desktopIndex + 2) % testimonials.length]].filter(Boolean);

  const showNextMobile = () => setMobileIndex((current) => (current + 1) % testimonials.length);
  const showNextDesktop = () => setDesktopIndex((current) => (current + 1) % testimonials.length);

  return (
    <section className={styles.section}>
      <div className="mx-auto max-w-[1340px]">
        <h2 className={styles.heading}>
          from
          <br />
          our members
        </h2>
        <div className={styles.mobileGrid}>
          {mobileTestimonials.map((item, index) => (
            <TestimonialCard key={`${mobileIndex}-${item.author}-${index}`} item={item} ratingMarks={ratingMarks} styles={styles} />
          ))}
          <MobileNextButton label="Show next testimonial" className="absolute bottom-0 right-0 translate-y-1" onClick={showNextMobile} />
        </div>
        <div className={styles.desktopGrid}>
          {desktopTestimonials.map((item, index) => (
            <TestimonialCard key={`${desktopIndex}-${item.author}-${index}`} item={item} ratingMarks={ratingMarks} styles={styles} />
          ))}
          <ArrowCircle className="absolute bottom-0 right-0 translate-y-1" label="Show next testimonial" onClick={showNextDesktop} size="sm" tone="pink" />
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ item, ratingMarks, styles }) => (
  <article className="max-w-xs">
    <div className="mb-5 flex items-center gap-1.5" aria-label="5 star rating">
      {ratingMarks.map((mark) => (
        <img key={mark} src={`${ASSET_PATH}testimonial-mark.png`} alt="" loading="lazy" className="h-3 w-3 object-contain" />
      ))}
    </div>
    <p className={styles.quote}>"{item.quote}"</p>
    <p className={styles.author}>-{item.author}</p>
  </article>
);

export default MembersTestimonialsSection;
