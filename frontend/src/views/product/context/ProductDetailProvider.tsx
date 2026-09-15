"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import type { ProductDetailType } from "@/types/product-detail.type";
import { getProductDetailClient } from "../api/getProductDetailClient";
import { ProductDetailContext } from "./ProductDetailContext";
import { addViewedProduct } from "../model/storage";

interface ProductDetailProviderProps {
  children: ReactNode;
  productData: ProductDetailType;
  productId: number;
}

const getSelectedValuesByDefinition = (data: ProductDetailType) => {
  const selectedValues: Record<number, number> = {};

  for (const saleProperty of data.buyDialogModel.saleProperties ?? []) {
    const selectedItem = saleProperty.propertyList
      .flatMap((property) => property.propertyItemModels)
      .find((item) => item.selected);

    if (selectedItem) {
      selectedValues[saleProperty.definitionId] = selectedItem.propertyValueId;
    }
  }

  return selectedValues;
};

const findDefinitionIdByPropertyValueId = (
  data: ProductDetailType,
  propertyValueId: number,
) => {
  return (data.buyDialogModel.saleProperties ?? []).find((saleProperty) =>
    saleProperty.propertyList.some((property) =>
      property.propertyItemModels.some(
        (item) => item.propertyValueId === propertyValueId,
      ),
    ),
  )?.definitionId;
};

const findSkuBySelectedValues = (
  skus: ProductDetailType["buyDialogModel"]["skus"],
  selectedValues: Record<number, number>,
) => {
  const selectedEntries = Object.entries(selectedValues);

  if (selectedEntries.length === 0) {
    return skus[0];
  }

  return (
    skus.find((sku) =>
      selectedEntries.every(([, valueId]) =>
        sku.properties.some((property) => property.propertyValueId === valueId),
      ),
    ) ?? skus[0]
  );
};

export const ProductDetailProvider = ({
  children,
  productData,
  productId,
}: ProductDetailProviderProps) => {
  const [currentProductData, setCurrentProductData] = useState(productData);
  const [currentProductId, setCurrentProductId] = useState(productId);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValuesByDefinition, setSelectedValuesByDefinition] = useState<
    Record<number, number>
  >(() => getSelectedValuesByDefinition(productData));
  const requestId = useRef(0);

  const skus = useMemo(
    () => currentProductData.buyDialogModel.skus ?? [],
    [currentProductData],
  );

  const activeSkuId = useMemo(() => {
    const sku = findSkuBySelectedValues(skus, selectedValuesByDefinition);
    return sku?.skuId ?? skus[0]?.skuId ?? null;
  }, [selectedValuesByDefinition, skus]);

  const activeSku = skus.find((sku) => sku.skuId === activeSkuId) ?? skus[0];

  const selectSku = (propertyValueId: number) => {
    const definitionId = findDefinitionIdByPropertyValueId(
      currentProductData,
      propertyValueId,
    );

    if (definitionId === undefined) {
      return;
    }

    setSelectedValuesByDefinition((prev) => ({
      ...prev,
      [definitionId]: propertyValueId,
    }));
  };

  const serverSkus = productData.buyDialogModel.skus ?? [];

  const serverDefaultSku =
    serverSkus.find(
      (sku) => sku.skuId === productData.buyDialogModel.defaultSelectSku?.skuId,
    ) ?? serverSkus[0];

  useEffect(() => {
    if (!productData) return;
    addViewedProduct({
      title: productData.buyDialogModel.detail.title,
      logoUrl: productData.buyDialogModel.detail.logoUrl,
      saleTag: productData.productTextInfo.soldText,
      spuId: productData.buyDialogModel.detail.spuId,
      minSpuPrice: serverDefaultSku?.minPrice,
    });
  }, [productData, serverDefaultSku?.minPrice]);

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
      setSelectedValuesByDefinition(
        getSelectedValuesByDefinition(nextProductData),
      );
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
        seriesDialogModel: productData.seriesDialogModel,
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};
