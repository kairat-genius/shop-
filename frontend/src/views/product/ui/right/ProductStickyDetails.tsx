import ProductBreadcrumbs from "./ProductBreadcrumbs";
import ModelVariants from "./ModelVariants";
import SizeSelector from "./SizeSelector";
import BuyActionSection from "./BuyActionSection";
import ProductHeader from "./ProductHeader";
import DeliveryInfo from "./DeliveryInfo";

const ProductStickyDetails = () => {
  return (
    <div className="relative h-full flex-1">
      <div className="pr-1 pb-3 sticky h-fit top-32.5 z-1">
        <div className="relative">
          <ProductBreadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Кроссовки", href: "/category/sneakers" },
              { label: "Nike", href: "/brand/nike" },
            ]}
          />
          <ProductHeader />
          <div
            className="my-3 h-px w-full"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #c7c7d7 0, #c7c7d7 20%, transparent 20%)",
              backgroundRepeat: "repeat-x",
              backgroundSize: "5px 1px",
            }}
          />
          <div>
            <ModelVariants />
            <SizeSelector />
          </div>
          <BuyActionSection />
          <DeliveryInfo/>
        </div>
      </div>
    </div>
  );
};

export default ProductStickyDetails;
