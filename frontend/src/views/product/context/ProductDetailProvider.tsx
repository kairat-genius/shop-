"use client";

import { useRef, useState, type ReactNode } from "react";

import type { ProductDetailType } from "@/types/product-detail.type";
import { getProductDetailClient } from "../api/getProductDetailClient";
import { ProductDetailContext } from "./ProductDetailContext";

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
  const [currentProductData, setCurrentProductData] = useState(productData);
  const [currentProductId, setCurrentProductId] = useState(productId);
  const [isLoading, setIsLoading] = useState(false);
  const requestId = useRef(0);

  const skus = currentProductData.buyDialogModel.skus ?? [];
  const saleProperties = currentProductData.buyDialogModel.saleProperties ?? [];

  const sizeProperty = saleProperties.find(
    (property) => property.definitionId === 6,
  );

  const selectedSize = sizeProperty?.propertyList
    .flatMap((property) => property.propertyItemModels)
    .find((item) => item.selected);

  const defaultSku = skus.find((sku) =>
    sku.properties.some(
      (property) => property.propertyValueId === selectedSize?.propertyValueId,
    ),
  );

  const [activeSkuId, setActiveSkuId] = useState<number | null>(
    defaultSku?.skuId ?? skus[0]?.skuId ?? null,
  );

  const activeSku = skus.find((sku) => sku.skuId === activeSkuId) ?? defaultSku;

  const selectSku = (propertyValueId: number) => {
    const sku = skus.find((item) =>
      item.properties.some(
        (property) => property.propertyValueId === propertyValueId,
      ),
    );

    if (sku) {
      setActiveSkuId(sku.skuId);
    }
  };

  const selectProduct = async (nextProductId: number) => {
    const currentRequestId = ++requestId.current;
    setIsLoading(true);

    try {
      const nextProductData = await getProductDetailClient(nextProductId);

      if (currentRequestId !== requestId.current) {
        return;
      }

      setCurrentProductData(nextProductData);
      setCurrentProductId(nextProductId);
      const nextSkus = nextProductData.buyDialogModel.skus ?? [];
      const nextSaleProperties =
        nextProductData.buyDialogModel.saleProperties ?? [];
      const nextSizeProperty = nextSaleProperties.find(
        (property) => property.definitionId === 6,
      );
      const nextSelectedSize = nextSizeProperty?.propertyList
        .flatMap((property) => property.propertyItemModels)
        .find((item) => item.selected);
      const nextDefaultSku = nextSkus.find((sku) =>
        sku.properties.some(
          (property) =>
            property.propertyValueId === nextSelectedSize?.propertyValueId,
        ),
      );

      setActiveSkuId(nextDefaultSku?.skuId ?? nextSkus[0]?.skuId ?? null);
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <ProductDetailContext.Provider
      value={{
        productData: currentProductData,
        productId: currentProductId,
        activeSku,
        activeSkuId,
        selectSku,
        selectProduct,
        isLoading,
        seriesDialogModel: productData.seriesDialogModel
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};
