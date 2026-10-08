import ProductLeft from "./left/ProductLeft";
import ProductStickyDetails from "./right/ProductStickyDetails";
import BuyActionSection from "./BuyActionSection";
import Gallery from "./Gallery";
import ViewedProducts from "./ViewedProducts";
import RecommendedProductsSection from "./RecommendedProductsSection";
import { Suspense } from "react";

const ProductView = ({ frontCategoryId }: { frontCategoryId: number }) => {
  return (
    <main className="relative">
      <Gallery />
      <ProductStickyDetails />
      <ProductLeft />
      <ViewedProducts />
      <div className="w-full h-[2.133vw] bg-slate-100" />
      <Suspense fallback={<div></div>}>
        <RecommendedProductsSection frontCategoryId={frontCategoryId} />
      </Suspense>
      {/* <RelatedBrandsThemes /> */}
      <BuyActionSection />
    </main>
  );
};

export default ProductView;
