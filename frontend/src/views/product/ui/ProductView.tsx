"use client";
import RelatedBrandsThemes from "@/views/category/ui/RelatedBrandsThemes";
import ProductStickyDetails from "./right/ProductStickyDetails";
import ProductLeft from "./left/ProductLeft";
import RecommendedProducts from "./RecommendedProducts";
import ViewedProducts from "./ViewedProducts";
import { ProductInfoResponseDto } from "@/shared/api/openapi";

interface ProductViewProps {
  productData: ProductInfoResponseDto;
  productId: number;
}

const ProductView = ({ productData, productId }: ProductViewProps) => {
  console.log("ProductView productData:", productData);
  return (
    <main className="mt-5.5">
      <div className="grid grid-cols-[minmax(0,600fr)_minmax(0,544fr)] gap-[2.8rem] w-[60rem] mx-auto">
        <ProductLeft productData={productData} />
        <ProductStickyDetails productData={productData} productId={productId} />
      </div>
      <ViewedProducts />
      <RecommendedProducts />
      <RelatedBrandsThemes className="w-[60rem] mx-auto mt-16" />
    </main>
  );
};

export default ProductView;
