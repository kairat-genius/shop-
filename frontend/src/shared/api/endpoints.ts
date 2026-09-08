import { PUBLIC_API_BASE_URL } from "@/shared/settings";

export const CATEGORY_FILTERS = (categoryId: string) =>
  PUBLIC_API_BASE_URL + `/category-filters/${categoryId}`;

export const CATEGORY_LIST_PRODUCT = PUBLIC_API_BASE_URL + "/search-by-category"
export const BRAND_LIST_PRODUCT = PUBLIC_API_BASE_URL + "/search-by-brand"

export const LIST_PRODUCT_SEARCH = PUBLIC_API_BASE_URL + "/search"

export const BRAND_LIST = PUBLIC_API_BASE_URL + "/brand-list"

export const CATEGORY_TREE = PUBLIC_API_BASE_URL + "/category-tree"

export const PRODUCT_DETAIL  = (spuId: number) =>
  PUBLIC_API_BASE_URL + `/product-info/${spuId}`;