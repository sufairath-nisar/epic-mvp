import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import F31Header from "../components/f31/F31Header";
import SiteFooter from "../components/layout/SiteFooter";
import { ASSET_PATH } from "../constants/assets";
import { mainNavigation } from "../data/routes";
import { Link } from "../router/RouterProvider";

const zipUps = [
  { name: "The Epic Zip-Up - Court Green", price: "$100.00", image: "product-zip-green.png" },
  { name: "The Epic Zip-Up - Butter Rally Yellow", price: "$100.00", image: "product-zip-butter.png" },
  { name: "The Epic Zip-Up - Clay Blush", price: "$100.00", image: "product-zip-blush.png" },
  { name: "The Epic Zip-Up - Base Brown", price: "$100.00", image: "product-zip-brown.png" }
];

const caps = [
  { name: "The Epic Performance Cap - Butter Rally Yellow", price: "$50.00", image: "product-cap-cream.png" },
  { name: "The Epic Performance Cap - Court Green", price: "$50.00", image: "product-cap-green.png" },
  { name: "The Epic Performance Cap - Clay Blush", price: "$50.00", image: "product-cap-blush.png" },
  { name: "The Epic Performance Cap - Black", price: "$50.00", image: "product-cap-black.png" }
];

const recentlyViewed = [
  { name: "The Epic Zip-Up - Court Green", price: "$100.00", image: "product-zip-green.png" },
  { name: "The Epic Performance Cap - Chalk White", price: "$50.00", image: "product-cap-chalk.png" },
  { name: "The Epic Zip-Up - Clay Blush", price: "$100.00", image: "product-zip-blush.png" },
  { name: "The Epic Zip-Up - Black", price: "$100.00", image: "product-zip-black.png" }
];

const ProductCard = ({ product }) => (
  <Link to="/wear-epic/product" className="block w-[280px] shrink-0 md:w-[320px]">
    <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-[#ededed]">
      <img src={`${ASSET_PATH}${product.image}`} alt={product.name} className="h-full w-full object-cover" />
    </div>
    <p className="mt-[12px] text-[12px] font-light leading-[16px] tracking-[0] text-[#154527] md:mt-[14px] md:text-[13px]">{product.name}</p>
    <p className="mt-[2px] text-[11px] font-light leading-none tracking-[0] text-[#154527] md:text-[12px]">{product.price}</p>
  </Link>
);

const ProductCarousel = ({ title, products }) => {
  const trackRef = useRef(null);
  const scrollBy = (direction) => trackRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-[1440px] px-[24px] pt-[26px] md:px-[50px] md:pt-[40px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-light tracking-[0] text-[#154527] md:text-[16px]">{title}</h2>
        <div className="flex items-center gap-[18px]">
          <button type="button" aria-label="Previous" onClick={() => scrollBy(-1)} className="text-[#FAD7D3] transition hover:text-[#154527]">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Next" onClick={() => scrollBy(1)} className="text-[#FAD7D3] transition hover:text-[#154527]">
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div ref={trackRef} className="no-scrollbar mt-[18px] flex gap-[20px] overflow-x-auto pb-[6px] md:mt-[28px]">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
};

const HeroBanner = ({ image, title, button, withHeader = false, className = "" }) => (
  <section className={`relative ${className}`}>
    <img src={`${ASSET_PATH}${image}`} alt={title || ""} className="h-[560px] w-full object-cover object-center md:h-[760px]" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
    {withHeader ? <F31Header navigation={mainNavigation} /> : null}
    {title ? (
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1440px] px-[24px] pb-[26px] md:px-[50px] md:pb-[40px]">
          <h2 className="text-[22px] font-normal uppercase leading-none tracking-[0.04em] text-[#FCEFA7] md:text-[34px]">{title}</h2>
          {button ? (
            <Link
              to="/wear-epic/all"
              className="mt-[16px] inline-flex h-[40px] items-center justify-center rounded-full bg-[#FCEFA7] px-[28px] text-[11px] font-normal uppercase tracking-[0.06em] text-[#154527] transition hover:bg-white md:mt-[22px] md:h-[44px] md:text-[12px]"
            >
              {button}
            </Link>
          ) : null}
        </div>
      </div>
    ) : null}
  </section>
);

const WearEpicPage = () => {
  return (
    <main className="bg-white font-sans text-[#154527]">
      <HeroBanner image="wear-zip-hero.png" title="The Epic Zip-Up" button="Shop all Epic originals" withHeader />

      <ProductCarousel title="Shop the Epic Zip-Up" products={zipUps} />

      <HeroBanner image="wear-cap-hero.png" title="The Epic Performance Cap" className="mt-[44px] md:mt-[80px]" />

      <ProductCarousel title="Shop the Epic Performance Cap" products={caps} />

      {/* Lifestyle band */}
      <img
        src={`${ASSET_PATH}wear-band.png`}
        alt="Epic Padel"
        className="mt-[44px] h-[260px] w-full object-cover object-center md:mt-[80px] md:h-[420px]"
      />

      <ProductCarousel title="Products You Recently Viewed" products={recentlyViewed} />

      <div className="mt-[70px] md:mt-[110px]">
        <SiteFooter />
      </div>
    </main>
  );
};

export default WearEpicPage;
