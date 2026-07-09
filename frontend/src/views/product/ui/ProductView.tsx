import RelatedBrandsThemes from "@/views/category/ui/RelatedBrandsThemes";
import ProductStickyDetails from "./right/ProductStickyDetails";
import ProductLeft from "./left/ProductLeft";
import RecommendedProducts from "./RecommendedProducts";
import ViewedProducts from "./ViewedProducts";

const ProductView = () => {
  return (
    <main className="mt-5.5">
      <div className="grid grid-cols-[minmax(0,600fr)_minmax(0,544fr)] gap-14 max-w-310 mx-auto px-5">
        <ProductLeft />
        <ProductStickyDetails />
      </div>
      <ViewedProducts />
      <RecommendedProducts />
      <RelatedBrandsThemes className="max-w-310 mx-auto mt-16" />
    </main>
  );
};

export default ProductView;
