import { ProductDetailType } from "@/types/product-detail.type";
import { createContext } from "react";

interface ProductDetailContextType {
  productData: ProductDetailType;
  productId: number;
}

export const ProductDetailContext = createContext<
  ProductDetailContextType | undefined
>(undefined);
