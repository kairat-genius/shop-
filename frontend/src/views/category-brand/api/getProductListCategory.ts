import { apiFetch } from "@/shared/api/apiFetch";
import {
  BRAND_LIST_PRODUCT,
  CATEGORY_LIST_PRODUCT,
} from "@/shared/api/endpoints";
import { buildQueryParams } from "@/shared/utils/buildQueryParams";
import type {
  ProductListFilterType,
  ProductListCategoryResponseType,
} from "@/types/product-list-category.type";

export async function getProductListCategory(
  params: ProductListFilterType,
  isServer: boolean = false,
): Promise<ProductListCategoryResponseType> {
  const query = buildQueryParams(params);
  const endpoint = params.brandId ? BRAND_LIST_PRODUCT : CATEGORY_LIST_PRODUCT;
  const url = `${endpoint}?${query}`;

  if (isServer) {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return res.json();
  }

  const res = await apiFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
