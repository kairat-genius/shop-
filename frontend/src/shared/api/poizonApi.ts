import { POIZON_API_KEY } from "../settings";
import { apiFetch } from "./apiFetch";
import { Configuration, PoizonApiApi } from "./openapi";

function createConfiguration(isServer = false) {
  return new Configuration({
    apiKey: POIZON_API_KEY,
    fetchApi: isServer ? fetch : apiFetch,
  });
}
export function productApi(isServer: boolean) {
  return new PoizonApiApi(createConfiguration(isServer));
}
