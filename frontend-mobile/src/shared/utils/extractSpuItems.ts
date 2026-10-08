import type { ProductListSearchResponseType } from "@/types/product-list-search.type";

export const extractSpuItems = (data: ProductListSearchResponseType) => {
  const spuList = data.searchSpuList?.spuList;
  if (spuList && spuList.length > 0) return spuList;

  const fallbackList = data.searchSpuList?.fallbackSpuList;
  if (fallbackList && fallbackList.length > 0) return fallbackList;

  return [];
};