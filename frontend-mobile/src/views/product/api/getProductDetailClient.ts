import { apiFetch } from "@/shared/api/apiFetch";
import { PRODUCT_DETAIL } from "@/shared/api/endpoints";
import type { ProductDetailType } from "@/types/product-detail.type";

export async function getProductDetailClient(
  spuId: number,
): Promise<ProductDetailType> {
  const res = await apiFetch(PRODUCT_DETAIL(spuId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
