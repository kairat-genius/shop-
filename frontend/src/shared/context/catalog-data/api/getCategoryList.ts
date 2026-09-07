import { CATEGORY_TREE } from "@/shared/api/endpoints";
import { CategoryListResponseType } from "@/types/category-list.type";

export async function getCategoryList(): Promise<CategoryListResponseType> {
  const res = await fetch(CATEGORY_TREE, {
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
