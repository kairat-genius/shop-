import { PRODUCT_SIMILAR } from "@/shared/api/endpoints";
import { apiFetch } from "../apiFetch";
import type { ProductType } from "@/entities/product-card";

export async function getSimilar(
  product_id: number,
  currency: string,
): Promise<ProductType[]> {
  const url = `${PRODUCT_SIMILAR(product_id)}?currency=${currency}`;

  const res = await apiFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
