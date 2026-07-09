export const PUBLIC_API_BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost";
export const DOCKER_API_BASE_URL =
  process.env.NEXT_PUBLIC_INTERNAL_DOCKER_API_URL || "http://backend:8000";

export const TOO_MANY_REQUESTS_MESSAGE =
  "Too many requests. Please try again later.";

export const IPHONE_CASES_CATEGORY_SLUG = "chekhly-dlya-iphone";
export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_APP_ENV === "development";
export const CDN = process.env.NEXT_PUBLIC_CDN || ""