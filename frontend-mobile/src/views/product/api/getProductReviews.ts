import { apiFetch } from "@/shared/api/apiFetch";
import { PRODUCT_DETAIL_REVIEWS } from "@/shared/api/endpoints";

import type { ReviewsListType } from "@/types/review.type";

export async function getProductReviews(
  spuId: number,
  page: number = 1,
): Promise<ReviewsListType> {
  const res = await apiFetch(`${PRODUCT_DETAIL_REVIEWS(spuId)}?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
