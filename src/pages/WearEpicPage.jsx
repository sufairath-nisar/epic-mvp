import ProductGrid from "../components/common/ProductGrid";
import PageHero from "../components/common/PageHero";
import SiteFooter from "../components/layout/SiteFooter";
import { products } from "../data/siteContent";

const WearEpicPage = () => {
  return (
    <main className="bg-[#FFFCF2] text-[#154527]">
      <PageHero image="product-zip-green.png" title="the epic zip-up" subtitle="Wear Epic" dark />
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto max-w-[1340px]">
          <p className="mb-10 text-sm font-semibold">Shop the Epic Zip-Up</p>
          <ProductGrid products={products} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default WearEpicPage;
