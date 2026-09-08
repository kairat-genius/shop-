"use client";
import { useContext } from "react";
import { ProductDetailContext } from "./ProductDetailContext";

export const useProductDetailData = () => {
  const context = useContext(ProductDetailContext);
  if (!context)
    throw new Error(
      "useProductDetailData must be used within a ProductDetailProvider",
    );
  return context;
};
