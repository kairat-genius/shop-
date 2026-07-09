import { REVIEW_LIST } from "@/shared/api/endpoints";
import type {
  ReviewsListType,
  ReviewsListFilterType,
} from "./reviews-list.type";
import { buildQueryString } from "@/shared/utils/buildQueryString";
import { apiFetch } from "../apiFetch";

export async function getReviewList(
  params: ReviewsListFilterType,
): Promise<ReviewsListType> {
  const queryString = buildQueryString(params);

  const url = `${REVIEW_LIST}?${queryString}`;


  const res = await apiFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
