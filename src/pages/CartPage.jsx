import SiteFooter from "../components/layout/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader";
import { ASSET_PATH } from "../constants/assets";
import { products } from "../data/siteContent";
import { Link } from "../router/RouterProvider";

const CartPage = () => {
  const product = products[0];

  return (
    <main className="min-h-screen bg-[#FFFCF2] text-[#154527]">
      <section className="relative px-8 pb-24 pt-32 md:px-12">
        <SiteHeader />
        <div className="mx-auto max-w-[900px]">
          <h1 className="text-7xl font-semibold tracking-[-0.06em] text-epic-pink">cart</h1>
          <div className="mt-12 flex gap-6 rounded-3xl border border-[#154527]/20 bg-white p-6">
            <img src={`${ASSET_PATH}${product.image}`} alt={product.name} className="h-32 w-32 object-cover" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="mt-2">{product.price}</p>
              <p className="mt-4 text-sm">Quantity: 1</p>
            </div>
          </div>
          <Link to="/booking/checkout" className="mt-10 inline-flex rounded-full bg-[#154527] px-12 py-4 text-xs font-bold uppercase text-[#fff4a8]">Checkout</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default CartPage;
