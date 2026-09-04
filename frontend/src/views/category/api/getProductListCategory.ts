import {
  PoizonApiControllerSearchByCategoryRequest,
  ResponseError,
  SearchResponseDto,
} from "@/shared/api/openapi";
import { productApi } from "@/shared/api/poizonApi";
import { cleanEmptyParams } from "@/shared/utils/cleanEmptyParams";
import ProductCategory from "./ProductCategoryList.json" 

export async function getProductListCategory(
  params: PoizonApiControllerSearchByCategoryRequest,
  isServer = false,
): Promise<SearchResponseDto> {
  try {
    return ProductCategory;
    // return await productApi(isServer).poizonApiControllerSearchByCategory(
    //   cleanEmptyParams(params) as PoizonApiControllerSearchByCategoryRequest,
    // );
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
