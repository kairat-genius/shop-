import {
  ProductControllerSearchCountRequest,
  ResponseError,
  SearchProductsCountResponseDto,
} from "../openapi";
import { productApi } from "../poizonApi";
import { cleanEmptyParams } from "@/shared/utils/cleanEmptyParams";

export async function getProductListCount(
  params: ProductControllerSearchCountRequest,
  isServer = false,
): Promise<SearchProductsCountResponseDto> {
  try {
    return await productApi(isServer).productControllerSearchCount(
      cleanEmptyParams(params) as ProductControllerSearchCountRequest,
    );
  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(
        "Dewu API count error:",
        error.response.status,
        await error.response.text(),
      );
    }

    throw error;
  }
}
