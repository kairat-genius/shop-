import { POIZON_API_KEY } from "../settings";
import { apiFetch } from "./apiFetch";
import { BrandApi, CategoryApi, Configuration, ProductApi } from "./openapi";

function createConfiguration(isServer = false) {
  return new Configuration({
    apiKey: POIZON_API_KEY,
    fetchApi: isServer ? fetch : apiFetch,
  });
}

export const categoryApi = new CategoryApi(createConfiguration());
export const brandApi = new BrandApi(createConfiguration());

export function productApi(isServer: boolean) {
  return new ProductApi(createConfiguration(isServer));
}
