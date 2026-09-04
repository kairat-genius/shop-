import {
  PoizonApiControllerGetProductInfoRequest,
  ResponseError,
  ProductInfoResponseDto,
} from "@/shared/api/openapi";
import { productApi } from "@/shared/api/poizonApi";

import ProductDetail from "./ProductDetail.json";

export async function getProductDetail(
  params: PoizonApiControllerGetProductInfoRequest,
  isServer = false,
): Promise<ProductInfoResponseDto> {
  try {
    return ProductDetail;
    // return await productApi(isServer).poizonApiControllerGetProductInfo(params);
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
