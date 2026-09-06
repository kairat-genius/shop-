import { PUBLIC_API_BASE_URL } from "@/shared/settings";

export const CATEGORY_FILTERS = (categoryId: string) =>
  PUBLIC_API_BASE_URL + `/category-filters/${categoryId}`;

export const CATEGORY_LIST_PRODUCT = PUBLIC_API_BASE_URL + "/search-by-category"

export const LIST_PRODUCT_SEARCH = PUBLIC_API_BASE_URL + "/search"