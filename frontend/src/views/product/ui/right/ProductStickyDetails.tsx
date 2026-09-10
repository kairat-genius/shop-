"use client";
import ProductBreadcrumbs from "./ProductBreadcrumbs";
import ModelVariants from "./ModelVariants";
import SizeSelector from "./SizeSelector";
import BuyActionSection from "./BuyActionSection";
import ProductHeader from "./ProductHeader";
import DeliveryInfo from "./DeliveryInfo";
import { useProductDetailData } from "../../context/useCatalogData";
import { generateProductSlug } from "@/shared/utils/slug";
import Share from "./Share";

const ProductStickyDetails = () => {
  const {
    productData: {
      buyDialogModel: { detail, saleProperties },
      rankingModule,
      price,
    },
    seriesDialogModel,
    productId
  } = useProductDetailData();
  const sizeProperty = saleProperties?.find(
    (property) => property.definitionId === 6,
  );

  return (
    <div className="relative h-full flex-1">
      <div className="pr-1 pb-3 sticky h-fit top-32.5 z-1">
        <div className="relative">
          <div className="flex items-center justify-between">
            {detail && (
              <ProductBreadcrumbs
                items={[
                  { label: "Главная", href: "/" },
                  {
                    label: detail.frontCategoryName,
                    href: `/category/${generateProductSlug(detail.frontCategoryName, detail.frontCategoryId)}`,
                  },
                  {
                    label: detail.brandName,
                    href: `/category/${generateProductSlug(detail.brandName, detail.brandId)}`,
                  },
                ]}
              />
            )}
            <Share />
          </div>
          <h1 className="font-roboto_condensed text-[20px] font-bold mt-0.5 leading-[1.2]">
            {detail.title}
          </h1>
          <ProductHeader price={price} rankingModule={rankingModule} />
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
            {seriesDialogModel && <ModelVariants seriesDialogModel={seriesDialogModel} productId={productId} />}
            {sizeProperty && <SizeSelector saleProperty={sizeProperty} />} 
          </div>
          <BuyActionSection />
          <DeliveryInfo />
        </div>
      </div>
    </div>
  );
};

export default ProductStickyDetails;
