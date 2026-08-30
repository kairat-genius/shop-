import { unstable_cache } from "next/cache";
import type { CategoriesResponseWithPaginationDto } from "@/shared/api/openapi";
import { ResponseError } from "@/shared/api/openapi";
import { categoryApi } from "@/shared/api/poizonApi";
import { CategoriesWithSlugsResponse } from "@/types/category-slug.type";

const transliteration: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  і: "i",
  ї: "yi",
  є: "ie",
  ґ: "g",
};

function createSlug(name: string): string {
  return [...name.toLocaleLowerCase("ru-RU")]
    .map((character) => transliteration[character] ?? character)
    .join("")
    .normalize("NFKD")
    .replaceAll(/[\u0300-\u036F]/gu, "")
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-+|-+$/gu, "");
}

async function fetchCategoriesFromApi(): Promise<CategoriesResponseWithPaginationDto> {
  try {
    const categories = await categoryApi.categoryControllerGetCategories();

    return categories;
  } catch (error) {
    if (error instanceof ResponseError) {
      const requestError = new Error("FETCH_ERROR");
      requestError.cause = error;
      Object.assign(requestError, {
        digest: `STATUS:${error.response.status}`,
      });

      throw requestError;
    }
    return {
      data: [],
      meta: {
        total: 0,
      },
    };
  }
}

async function loadCategories(): Promise<CategoriesWithSlugsResponse> {
  const categories = await fetchCategoriesFromApi();

  return {
    ...categories,
    data: categories.data.map((category) => ({
      ...category,
      slug: createSlug(category.name),
    })),
  };
}

export const getCachedCategories = unstable_cache(
  loadCategories,
  ["categories-with-slugs"],
  { revalidate: 3600, tags: ["catalog"] },
);
