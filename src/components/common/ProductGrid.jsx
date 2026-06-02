import { ASSET_PATH } from "../../constants/assets";
import { Link } from "../../router/RouterProvider";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {products.map((product) => (
        <Link key={product.slug} to={`/wear-epic/product?item=${product.slug}`} className="group">
          <div className="aspect-square overflow-hidden bg-[#e4e4e1]">
            <img src={`${ASSET_PATH}${product.image}`} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
          <h3 className="mt-5 text-[14px] font-semibold text-[#154527]">{product.name}</h3>
          <p className="mt-1 text-[13px] text-[#154527]/75">{product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
