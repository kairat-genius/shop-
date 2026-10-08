import { useCallback, useEffect, useRef, useState } from "react";
import { getProductListSearch } from "@/shared/api/product-list/getProductListSearch";
import type { ProductListSearchResponseType } from "@/types/product-list-search.type";
import { extractSpuItems } from "@/shared/utils/extractSpuItems";

type SpuItem = NonNullable<
  ProductListSearchResponseType["searchSpuList"]
>["spuList"][number];

interface CategoryProducts {
  items: SpuItem[];
  page: number;
  hasMore: boolean;
  isFetchingMore: boolean;
}

const getCategoryKey = (categoryId?: number) =>
  categoryId === undefined ? "all" : String(categoryId);

export const useCategoryProducts = (
  initialData: ProductListSearchResponseType | undefined,
  // 👇 КЛЮЧ, под которым положить initialData. Это тот же id,
  // с которым делали запрос на сервере (frontCategoryId).
  initialCategoryId: number | undefined,
  activeCategoryId?: number,
) => {
  const [productsByCategory, setProductsByCategory] = useState<
    Record<string, CategoryProducts>
  >(() => {
    if (!initialData || initialCategoryId === undefined) return {};
    const initialItems = extractSpuItems(initialData);
    if (initialItems.length === 0) return {};

    const key = getCategoryKey(initialCategoryId);
    return {
      [key]: {
        items: initialItems,
        page: 1,
        hasMore: true,
        isFetchingMore: false,
      },
    };
  });

  const productsByCategoryRef = useRef(productsByCategory);
  const pendingCategoriesRef = useRef(new Set<string>());

  useEffect(() => {
    productsByCategoryRef.current = productsByCategory;
  }, [productsByCategory]);

  useEffect(() => {
    if (activeCategoryId === undefined) return;

    const categoryKey = getCategoryKey(activeCategoryId);
    if (
      productsByCategoryRef.current[categoryKey] ||
      pendingCategoriesRef.current.has(categoryKey)
    ) {
      return;
    }

    pendingCategoriesRef.current.add(categoryKey);

    const loadCategory = async () => {
      try {
        const response = await getProductListSearch(
          {
            categoryIds: [String(activeCategoryId)],
            pageSize: 24,
            page: 1,
          },
          false,
        );
        const items = extractSpuItems(response);

        setProductsByCategory((prev) => ({
          ...prev,
          [categoryKey]: {
            items,
            page: 1,
            hasMore: items.length > 0,
            isFetchingMore: false,
          },
        }));
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
        setProductsByCategory((prev) => ({
          ...prev,
          [categoryKey]: {
            items: [],
            page: 1,
            hasMore: false,
            isFetchingMore: false,
          },
        }));
      } finally {
        pendingCategoriesRef.current.delete(categoryKey);
      }
    };

    void loadCategory();
  }, [activeCategoryId]);

  const handleShowMore = useCallback(
    async (categoryId?: number) => {
      const categoryKey = getCategoryKey(categoryId);
      const currentCategory = productsByCategory[categoryKey];
      if (!currentCategory?.hasMore || currentCategory.isFetchingMore) return;

      setProductsByCategory((prev) => ({
        ...prev,
        [categoryKey]: { ...prev[categoryKey], isFetchingMore: true },
      }));

      try {
        const nextPage = currentCategory.page + 1;
        const response = await getProductListSearch(
          {
            categoryIds:
              categoryId === undefined ? undefined : [String(categoryId)],
            pageSize: 24,
            page: nextPage,
          },
          false,
        );
        const newItems = extractSpuItems(response);

        setProductsByCategory((prev) => ({
          ...prev,
          [categoryKey]: {
            items: [...(prev[categoryKey]?.items ?? []), ...newItems],
            page: nextPage,
            hasMore: newItems.length > 0,
            isFetchingMore: false,
          },
        }));
      } catch (error) {
        console.error("Ошибка при подгрузке товаров:", error);
        setProductsByCategory((prev) => ({
          ...prev,
          [categoryKey]: {
            ...prev[categoryKey],
            isFetchingMore: false,
          },
        }));
      }
    },
    [productsByCategory],
  );

  return {
    productsByCategory,
    handleShowMore,
  };
};