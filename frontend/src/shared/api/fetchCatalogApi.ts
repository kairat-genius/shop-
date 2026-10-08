import { API_KEY } from "../settings";

const CACHE_REVALIDATE_SECONDS = 60;

export function fetchCatalogApi(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    next: {
      revalidate: CACHE_REVALIDATE_SECONDS,
      tags: ["catalog"],
    },
  });
}
