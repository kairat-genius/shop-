import {
  ProductControllerSearchV2Request,
  ProductsResponseV2WithPaginationDto,
  ResponseError,
} from "../openapi";
import { productApi } from "../poizonApi";
import { cleanEmptyParams } from "@/shared/utils/cleanEmptyParams";

export async function getProductList(
  params: ProductControllerSearchV2Request,
  isServer = false,
): Promise<ProductsResponseV2WithPaginationDto> {
  try {
    return await productApi(isServer).productControllerSearchV2(
      cleanEmptyParams(params) as ProductControllerSearchV2Request,
    );
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
