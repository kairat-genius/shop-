import {
  PoizonApiControllerSearchRequest,
  ResponseError,
  SearchResponseDto,
} from "@/shared/api/openapi";
import { productApi } from "@/shared/api/poizonApi";
import { cleanEmptyParams } from "@/shared/utils/cleanEmptyParams";
import ProductData from "./product.data.json";

export async function getProductList(
  params: PoizonApiControllerSearchRequest,
  isServer = false,
): Promise<SearchResponseDto> {
  try {
    return ProductData;
    // return await productApi(isServer).poizonApiControllerSearch(
    //   cleanEmptyParams(params),
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
