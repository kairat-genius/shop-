import RelatedBrandsThemes from "@/views/category/ui/RelatedBrandsThemes";
import RecommendedProducts from "./RecommendedProducts";
import ProductLeft from "./left/ProductLeft";

const ProductView = () => {
  return (
    <main className="mt-5.5">
      <ProductLeft/>
      <RecommendedProducts />
      <RelatedBrandsThemes />
    </main>
  );
};

export default ProductView;
