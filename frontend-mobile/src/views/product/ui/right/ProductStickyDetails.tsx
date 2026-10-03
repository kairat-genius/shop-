"use client";
import ModelVariants from "./ModelVariants";
import SizeSelector from "./SizeSelector";
import ProductHeader from "./ProductHeader";
import DeliveryInfo from "./DeliveryInfo";
import { useProductDetailData } from "../../context/useCatalogData";
import EditionSelector from "./EditionSelector";
import ColorSelector from "./ColorSelector";

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

  const propertyId1 = saleProperties?.find(
    (property) => property.definitionId === 1 || property.definitionId === 3690,
  );
  const propertyId12 = saleProperties?.find((p) => p.definitionId === 12);

  return (
    <>
      <ProductHeader />
      <div className="my-[2.667vw] h-px w-full bg-slate-100 px-[3.733vw] bg-clip-content" />
      <div className=" space-y-[2.667vw]">
        {seriesDialogModel && (
          <ModelVariants
            seriesDialogModel={seriesDialogModel}
            productId={productId}
            categoryId={detail.frontCategoryId}
          />
        )}
        {propertyId1 && <ColorSelector saleProperty={propertyId1} />}

        {propertyId12 && <EditionSelector saleProperty={propertyId12} />}
      </div>
      {sizeProperty && <SizeSelector saleProperty={sizeProperty} />}
      <div className="w-full h-[2.133vw] bg-slate-100" />
      <DeliveryInfo />
    </>
  );
};

export default ProductStickyDetails;
