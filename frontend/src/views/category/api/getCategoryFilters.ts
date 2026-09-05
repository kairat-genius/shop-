import { CATEGORY_FILTERS } from "@/shared/api/endpoints";
import type { CategoryFiltersResponseType } from "@/types/category-filters.type";

export async function getCategoryFilters(
  categoryId: string,
): Promise<CategoryFiltersResponseType | 404> {
  const res = await fetch(CATEGORY_FILTERS(categoryId), {
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
