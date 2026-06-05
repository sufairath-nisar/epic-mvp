import ProductGrid from "../components/common/ProductGrid";
import SiteFooter from "../components/layout/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader";
import { ASSET_PATH } from "../constants/assets";
import { products } from "../data/siteContent";
import { Link } from "../router/RouterProvider";

const ProductPage = () => {
  const product = products[0];

  return (
    <main className="bg-white text-[#154527]">
      <section className="relative px-8 pb-24 pt-32 md:px-12">
        <SiteHeader />
        <div className="mx-auto grid max-w-[1340px] gap-12 md:grid-cols-2">
          <img src={`${ASSET_PATH}${product.image}`} alt={product.name} className="aspect-square w-full object-cover" />
          <div className="pt-10">
            <p className="text-sm uppercase">{product.type}</p>
            <h1 className="mt-4 text-6xl font-semibold leading-none tracking-[-0.06em]">{product.name}</h1>
            <p className="mt-6 text-2xl">{product.price}</p>
            <p className="mt-8 max-w-md leading-7">A soft, oversized club essential designed for travel days, warm-ups, and post-match recovery.</p>
            <Link to="/wear-epic/cart" className="mt-10 inline-flex rounded-full bg-[#154527] px-12 py-4 text-xs font-bold uppercase text-[#fff4a8]">
              Add to cart
            </Link>
          </div>
        </div>
      </section>
      <section className="px-8 pb-24 md:px-12">
        <div className="mx-auto max-w-[1340px]">
          <ProductGrid products={products} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default ProductPage;
