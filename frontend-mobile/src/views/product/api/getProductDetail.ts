import { PRODUCT_DETAIL } from "@/shared/api/endpoints";
import type { ProductDetailType } from "@/types/product-detail.type";

export async function getProductDetail(spuId: number): Promise<ProductDetailType | 404> {
  const res = await fetch(PRODUCT_DETAIL(spuId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    return 404;
  }

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return res.json();
}
