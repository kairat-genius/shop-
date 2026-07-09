import { getSessionKey } from "@/shared/utils/session";
import {
  CART_PRODCUT,
  CART_PRODUCT_ADD,
  CART_PRODCUT_DELETE,
  CART_PRODCUT_EDIT_COUNT,
  CART_PRODUCT_COUNT,
} from "@/shared/api/endpoints";
import type { CartProductType } from "../type";
import { fetchWithAuth } from "@/shared/api/fetchWithAuth";

// Хелпер для заголовков
const getHeaders = () => ({
  "Content-Type": "application/json",
  "X-Session-Key": getSessionKey(),
});

export async function getCartProductsCount(): Promise<{ count: number }> {
  const res = await fetchWithAuth(CART_PRODUCT_COUNT, {
    method: "GET",
    headers: getHeaders(),
  });
  return res.json();
}

export async function getCartProducts(
  currency: string,
): Promise<CartProductType> {
  const res = await fetchWithAuth(`${CART_PRODCUT}?currency=${currency}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return res.json();
}

export async function addCartProduct(product_id: number, quantity: number = 1) {
  await fetchWithAuth(CART_PRODUCT_ADD, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ product_id, quantity }),
  });
}

export async function deleteCartProduct(item_id: number) {
  await fetchWithAuth(CART_PRODCUT_DELETE(item_id), {
    method: "DELETE",
    headers: getHeaders(),
  });
}

export async function updateCartProductCount(
  item_id: number,
  quantity: number,
) {
  await fetchWithAuth(CART_PRODCUT_EDIT_COUNT(item_id), {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ quantity }),
  });
}
