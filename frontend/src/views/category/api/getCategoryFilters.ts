import {
  PoizonApiControllerGetCategoryFiltersRequest,
  ResponseError,
  CategoryFiltersResponseDto,
} from "@/shared/api/openapi";
import { productApi } from "@/shared/api/poizonApi";
import CategoryFilter from "./CategoryFilter.json" 

export async function getCategoryFilters(
  params: PoizonApiControllerGetCategoryFiltersRequest,
  isServer = false,
): Promise<CategoryFiltersResponseDto> {
  try {
    return CategoryFilter;
    // return await productApi(isServer).poizonApiControllerGetCategoryFilters(params);
  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(
        "Dewu API error:",
        error.response.status,
        await error.response.text(),
      );
    }

    throw error;
  }
}
