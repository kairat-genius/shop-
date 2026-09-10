"use client";
import RelatedBrandsThemes from "@/views/category-brand/ui/RelatedBrandsThemes";
import ProductStickyDetails from "./right/ProductStickyDetails";
import ProductLeft from "./left/ProductLeft";
import RecommendedProducts from "./RecommendedProducts";
import ViewedProducts from "./ViewedProducts";
import Loader from "@/shared/ui/loader";
import { useProductDetailData } from "../context/useCatalogData";

const ProductView = () => {
  const { isLoading } = useProductDetailData();

  return (
    <main className="relative mt-5.5">
      {isLoading && <Loader />}
      <div className="grid grid-cols-[minmax(0,600fr)_minmax(0,544fr)] gap-[2.8rem] w-[60rem] mx-auto">
        <ProductLeft />
        <ProductStickyDetails />
      </div>
      <ViewedProducts />
      <RecommendedProducts />
      <RelatedBrandsThemes className="w-[60rem] mx-auto mt-16" />
    </main>
  );
};

export default ProductView;
