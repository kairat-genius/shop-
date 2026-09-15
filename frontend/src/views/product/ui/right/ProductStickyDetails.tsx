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
import ColorSelector from "./ColorSelector";
import { cn } from "@/shared/utils/clsx";
import EditionSelector from "./EditionSelector";

const ProductStickyDetails = () => {
  const {
    productData: {
      buyDialogModel: { detail, saleProperties },
    },
    seriesDialogModel,
    productId,
  } = useProductDetailData();
  const sizeProperty = saleProperties?.find(
    (propertyList) => propertyList.definitionId === 6,
  );

  const propertyId1 = saleProperties?.find((p) => p.definitionId === 1);
  const propertyId12 = saleProperties?.find((p) => p.definitionId === 12);

  // console.log("ffff", saleProperties);

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
            {seriesDialogModel && (
              <ModelVariants
                seriesDialogModel={seriesDialogModel}
                productId={productId}
              />
            )}
            {propertyId1 && <ColorSelector saleProperty={propertyId1} />}

            {propertyId12 && <EditionSelector saleProperty={propertyId12} />}
            {sizeProperty && <SizeSelector saleProperty={sizeProperty} />}
        
            {/* <div className="mt-6">
              <div className="mb-2 font-roboto_condensed font-bold text-[16px] leading-[100%] line-clamp-1">
                Упаковка
              </div>
              <div className="grid grid-cols-2">
                <div className="flex items-center justify-center flex-col border border-slate-950 h-12 cursor-pointer">
                  <div className="text-[14px] leading-4 line-clamp-1 px-[.4rem] font-medium text-center">
                    Без коробки и пакета
                  </div>
                  <div className="text-[12px] leading-3.5 line-clamp-1 px-[.4rem] mt-0.5">
                    2&nbsp;736&nbsp;₽
                  </div>
                </div>
                <div className="flex items-center justify-center flex-col border-t border-r border-b border-slate-100 h-12 cursor-pointer">
                  <div className="text-[14px] leading-4 line-clamp-1 px-[.4rem] font-medium text-center">
                    Коробка не включена, аксессуары включены
                  </div>
                  <div className="text-[12px] leading-3.5 line-clamp-1 px-[.4rem] mt-0.5">
                    3&nbsp;014&nbsp;₽
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <BuyActionSection />
          <DeliveryInfo />
        </div>
      </div>
    </div>
  );
};

export default ProductStickyDetails;
