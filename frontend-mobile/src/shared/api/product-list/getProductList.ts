import { PRODUCT_LIST } from "@/shared/api/endpoints";
import type {
  ProductListType,
  ProductListFilterType,
} from "./product-list.type";
import { buildQueryString } from "@/shared/utils/buildQueryString";
import { apiFetch } from "../apiFetch";

export async function getProductList(
  params: ProductListFilterType,
  isServer: boolean = false,
): Promise<ProductListType> {
  const queryString = buildQueryString(params);

  const url = `${PRODUCT_LIST(isServer)}?${queryString}`;

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
