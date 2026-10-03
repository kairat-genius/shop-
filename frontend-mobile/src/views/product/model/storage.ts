import { ProductType } from "@/types/product.type";


const STORAGE_KEY = "viewed-products";
const MAX_ITEMS = 10;

/** Событие для синхронизации компонентов в одной вкладке */
export const VIEWED_PRODUCTS_EVENT = "viewed-products-updated";

export const getViewedProducts = (): ProductType[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as ProductType[]) : [];
  } catch {
    return [];
  }
};

/**
 * Добавляет товар в начало списка.
 * - дубликаты (по skuId) удаляются и товар поднимается наверх
 * - максимум 10 штук, самый старый вытесняется
 */
export const addViewedProduct = (product: ProductType): ProductType[] => {
  if (typeof window === "undefined") return [];

  const current = getViewedProducts();
  const withoutDuplicate = current.filter(
    (item) => item.spuId !== product.spuId,
  );

  const updated = [product, ...withoutDuplicate].slice(0, MAX_ITEMS);

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(VIEWED_PRODUCTS_EVENT));
  } catch {
    // например, переполнение квоты — молча игнорируем
  }

  return updated;
};

export const clearViewedProducts = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(VIEWED_PRODUCTS_EVENT));
};