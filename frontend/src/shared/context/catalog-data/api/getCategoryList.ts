import {
  CategoryTreeResponseDto,
  ResponseError,
} from "@/shared/api/openapi";
import { productApi } from "@/shared/api/poizonApi";
import categoryData from "./categoryData.json";

export async function getCategoryList(): Promise<CategoryTreeResponseDto> {
  try {
    return categoryData;
    // return await productApi(true).poizonApiControllerGetCategoryTree();
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
