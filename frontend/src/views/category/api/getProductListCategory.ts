import { apiFetch } from "@/shared/api/apiFetch";
import { CATEGORY_LIST_PRODUCT } from "@/shared/api/endpoints";
import { buildQueryParams } from "@/shared/utils/buildQueryParams";
import type {
  CategoryProductListFilterType,
  ProductListCategoryResponseType,
} from "@/types/product-list-category.type";

export async function getProductListCategory(
  params: CategoryProductListFilterType,
  isServer: boolean = false,
): Promise<ProductListCategoryResponseType> {
  const query = buildQueryParams(params);
  const url = `${CATEGORY_LIST_PRODUCT}?${query}`;

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
