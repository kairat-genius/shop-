"use client";
import type { ReactNode } from "react";

import { ProductDetailContext } from "./ProductDetailContext";
import type { ProductDetailType } from "@/types/product-detail.type";

interface ProductDetailProviderProps {
  children: ReactNode;
  productData: ProductDetailType;
  productId: number;
}

export const ProductDetailProvider = ({
  children,
  productData,
  productId,
}: ProductDetailProviderProps) => {
  return (
    <ProductDetailContext.Provider value={{ productData, productId }}>
      {children}
    </ProductDetailContext.Provider>
  );
};
