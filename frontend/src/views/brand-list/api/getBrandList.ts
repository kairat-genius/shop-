import { BrandListResponseDto, ResponseError } from "@/shared/api/openapi";
import { productApi } from "@/shared/api/poizonApi";
import BrandList from "./BrandList.json";

export async function getBrandList(
  isServer = false,
): Promise<BrandListResponseDto> {
  try {
    return BrandList;
    // return await productApi(isServer).poizonApiControllerGetBrandList();
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
