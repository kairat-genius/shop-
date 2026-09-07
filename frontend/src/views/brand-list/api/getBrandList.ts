import { BRAND_LIST } from "@/shared/api/endpoints";
import type { BrandListResponseType } from "@/types/brand-list.type";


export async function getBrandList(): Promise<BrandListResponseType> {

  const res = await fetch(BRAND_LIST, {
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
