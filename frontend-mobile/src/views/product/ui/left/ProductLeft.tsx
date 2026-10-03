"use client";
import Link from "next/link";
import ProductBrand from "./ProductBrand";
import Description from "./Description";
import ProductDetails from "./ProductDetails";
import SizeFinder from "./SizeFinder";
import Reviews from "./Reviews";
import AboutProduct from "./AboutProduct";
import { useProductDetailData } from "../../context/useCatalogData";

const ProductLeft = () => {
  const { productData, productId } = useProductDetailData();
  return (
    <>
      <AboutProduct />
      <div className="w-full h-[2.133vw] bg-slate-100" />
      <Reviews />
      {productData.sizeAssistantModule && (
        <>
          <div className="w-full h-[2.133vw] bg-slate-100" />
          <SizeFinder
            sizeAssistantModule={productData.sizeAssistantModule}
            productId={productId}
          />
        </>
      )}
      <div className="w-full h-[2.133vw] bg-slate-100" />
      <ProductBrand />
      {productData.detailImageList?.length > 0 && (
        <>
          <div className="w-full h-[2.133vw] bg-slate-100" />
          <ProductDetails detailImageList={productData.detailImageList} />
        </>
      )}
      {productData.detailTextModule && (
        <>
          <div className="w-full h-[2.133vw] bg-slate-100" />
          <Description detailTextModule={productData.detailTextModule} />
        </>
      )}
      {productData.authenticatedGuaranteeModule && (
        <>
          <div className="w-full h-[2.133vw] bg-slate-100" />
          <div className="px-[3.733vw] pt-[2.667vw] pb-[3.2vw]">
            <h2 className="text-[4.8vw] leading-[5.6vw] font-bold font-roboto_condensed">
              {productData.authenticatedGuaranteeModule.title}
            </h2>
            <Link href="/about-us" className="mt-[3.2vw] block">
              <img
                className="aspect-5/2 object-contain"
                src={productData.authenticatedGuaranteeModule.url}
                alt=""
              />
            </Link>
          </div>
        </>
      )}
      <div className="w-full h-[2.133vw] bg-slate-100" />
    </>
  );
};

export default ProductLeft;
