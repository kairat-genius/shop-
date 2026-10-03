import { buildQueryParams } from "@/shared/utils/buildQueryParams";
import { apiFetch } from "../apiFetch";
import type { ProductListSearchFilterType, ProductListSearchResponseType } from "@/types/product-list-search.type";
import { LIST_PRODUCT_SEARCH } from "../endpoints";

export async function getProductListSearch(
  params: ProductListSearchFilterType,
  isServer = false,
): Promise<ProductListSearchResponseType> {
  const query = buildQueryParams(params);
  const url = `${LIST_PRODUCT_SEARCH}?${query}`;

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
