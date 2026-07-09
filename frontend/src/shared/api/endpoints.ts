import {
  DOCKER_API_BASE_URL,
  IS_DEVELOPMENT,
  PUBLIC_API_BASE_URL,
} from "@/shared/settings";

const API_VERSION_PREFIX = "/api/v1/";

const PUBLIC_API_URL = PUBLIC_API_BASE_URL + API_VERSION_PREFIX;
const DOCKER_API_URL = DOCKER_API_BASE_URL + API_VERSION_PREFIX;

// универсальный конкатенатор
const getApiUrl = (endpoint: string, ssr: boolean = false): string => {
  return (
    (ssr
      ? DOCKER_API_URL
      : (IS_DEVELOPMENT
        ? PUBLIC_API_URL
        : API_VERSION_PREFIX)) + endpoint
  );
};

// Auth
export const USER_REQUEST = getApiUrl("auth/otp/request/");
export const USER_VERIFY = getApiUrl("auth/otp/verify/");
export const USER_AUTH_GOOGLE = getApiUrl("auth/google/");
export const USER_LOGOUT = getApiUrl("auth/logout/");

export const USER_TOKEN_REFRESH = getApiUrl(`auth/refresh/`);

export const USER_DATA = getApiUrl("profile/me/");
export const USER_UPDATE = getApiUrl("profile/me/update/");

export const USER_UPDATE_EMAIL_REQUEST = getApiUrl("profile/me/email/request/");
export const USER_UPDATE_EMAIL_CONFIRM = getApiUrl("profile/me/email/confirm/");

// Catalog
export const CATEGORY_LIST = getApiUrl("catalog/categories/", true);
export const PRODUCT_LIST = (isServer: boolean) =>
  getApiUrl("products/search/", isServer);
export const COLLECTION_LIST = getApiUrl("catalog/collections/", true);
export const CURRENCIES_LIST = getApiUrl("currencies/", true);

// Search
export const SUGGEST_SEARCH = getApiUrl("suggest/search/");

export const PRODUCT_SIMILAR = (product_id: number) =>
  getApiUrl(`products/${product_id}/similar/`);

// detail product
export const PRODUCT_DETAIL = (slug: string) =>
  getApiUrl(`products/detail/${slug}/`, true);

export const PRODUCT_DETAIL_YOU_MAY_LIKE = (product_id: number) =>
  getApiUrl(`products/${product_id}/you-may-like/`);
export const PRODUCT_DETAIL_DESIGN_VARIANTS = (product_id: number) =>
  getApiUrl(`products/${product_id}/design-variants/`);

export const PRODUCT_DETAIL_DEVICE_LIST = (product_id: number) =>
  getApiUrl(`products/${product_id}/device-variants/`, true);

// корзина
export const CART_PRODCUT = getApiUrl("cart/");
export const CART_PRODUCT_ADD = getApiUrl("cart/products/");
export const CART_PRODUCT_COUNT = getApiUrl("cart/products/count/");
export const CART_PRODCUT_EDIT_COUNT = (item_id: number) =>
  getApiUrl(`cart/products/${item_id}/`);
export const CART_PRODCUT_DELETE = (item_id: number) =>
  getApiUrl(`cart/products/${item_id}/remove/`);

// отзывы
export const REVIEW_CREATE = getApiUrl("reviews/create/");
export const REVIEW_LIST = getApiUrl("reviews/");
export const REVIEW_STATIC = (category_id: string) => getApiUrl(`reviews/stats/${category_id}`, true)