import { buildQueryParams } from "@/shared/utils/buildQueryParams";

import { apiFetch } from "@/shared/api/apiFetch";
import { BRAND_FEED } from "@/shared/api/endpoints";
import type { BrandFeedFilterType, BrandFeedResponseType } from "@/types/brand-feed.type";

export async function getBrandFeed(
  params: BrandFeedFilterType,
  isServer = false,
): Promise<BrandFeedResponseType> {
  const query = buildQueryParams(params);
  const url = `${BRAND_FEED}?${query}`;

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
