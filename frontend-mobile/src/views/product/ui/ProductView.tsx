
import RecommendedProducts from "./RecommendedProducts";
import ProductLeft from "./left/ProductLeft";
import ProductStickyDetails from "./right/ProductStickyDetails";
import BuyActionSection from "./BuyActionSection";
import Gallery from "./Gallery";

const ProductView = () => {
  return (
    <main>
      <Gallery />
      <ProductStickyDetails />
      <ProductLeft />
      {/* <RecommendedProducts /> */}
      {/* <RelatedBrandsThemes /> */}
      <BuyActionSection />
    </main>
  );
};

export default ProductView;
