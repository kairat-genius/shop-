import { useCallback, useEffect, useRef, useState } from "react";

import type {
  BrandFeedResponseType,
  BrandItemType,
} from "@/types/brand-feed.type";
import { getBrandFeed } from "../api/getBrandFeed";

interface CategoryBrands {
  items: BrandItemType[];
  page: number;
  hasMore: boolean;
  isFetchingMore: boolean;
  /** Сколько подряд страниц вернулись без новых уникальных записей */
  emptyStreak: number;
}

const PAGE_SIZE = 10;
/** Сколько пустых (полностью дублирующих) страниц подряд терпим, прежде чем остановиться */
const MAX_EMPTY_PAGES = 3;

const getCategoryKey = (categoryId?: number | string) =>
  categoryId === undefined || categoryId === ""
    ? "all"
    : String(categoryId);

/** Мержим без дублей по brandId, сохраняя порядок */
const mergeUniqueBrands = (
  prev: BrandItemType[],
  incoming: BrandItemType[],
): BrandItemType[] => {
  const seen = new Set(prev.map((b) => b.brandId));
  const unique: BrandItemType[] = [];
  for (const brand of incoming) {
    if (seen.has(brand.brandId)) continue;
    seen.add(brand.brandId);
    unique.push(brand);
  }
  return [...prev, ...unique];
};

const dedupeBrands = (items: BrandItemType[]): BrandItemType[] => {
  const seen = new Set<number>();
  return items.filter((b) => {
    if (seen.has(b.brandId)) return false;
    seen.add(b.brandId);
    return true;
  });
};

export const useBrandFeed = (
  initialData: BrandFeedResponseType | undefined,
  initialCategoryKey: string = "all",
  activeCategoryId?: number,
) => {
  const [brandsByCategory, setBrandsByCategory] = useState<
    Record<string, CategoryBrands>
  >(() => {
    const items = dedupeBrands(initialData?.floorModularList ?? []);
    if (items.length === 0) return {};
    return {
      [initialCategoryKey]: {
        items,
        page: 1,
        hasMore: items.length >= PAGE_SIZE,
        isFetchingMore: false,
        emptyStreak: 0,
      },
    };
  });

  const brandsByCategoryRef = useRef(brandsByCategory);
  const pendingCategoriesRef = useRef(new Set<string>());

  useEffect(() => {
    brandsByCategoryRef.current = brandsByCategory;
  }, [brandsByCategory]);

  // Ленивая загрузка категории при переключении вкладки
  useEffect(() => {
    if (activeCategoryId === undefined) return;

    const categoryKey = getCategoryKey(activeCategoryId);
    if (
      brandsByCategoryRef.current[categoryKey] ||
      pendingCategoriesRef.current.has(categoryKey)
    ) {
      return;
    }

    pendingCategoriesRef.current.add(categoryKey);

    const load = async () => {
      try {
        const response = await getBrandFeed(
          {
            categoryId: String(activeCategoryId),
            pageSize: PAGE_SIZE,
            page: 1,
          },
          false,
        );
        const items = dedupeBrands(response.floorModularList ?? []);

        setBrandsByCategory((prev) => ({
          ...prev,
          [categoryKey]: {
            items,
            page: 1,
            hasMore: items.length >= PAGE_SIZE,
            isFetchingMore: false,
            emptyStreak: 0,
          },
        }));
      } catch (error) {
        console.error("Ошибка загрузки брендов:", error);
        setBrandsByCategory((prev) => ({
          ...prev,
          [categoryKey]: {
            items: [],
            page: 1,
            hasMore: false,
            isFetchingMore: false,
            emptyStreak: 0,
          },
        }));
      } finally {
        pendingCategoriesRef.current.delete(categoryKey);
      }
    };

    void load();
  }, [activeCategoryId]);

  const handleShowMore = useCallback(
    async (categoryId?: number) => {
      const categoryKey = getCategoryKey(categoryId);
      const current = brandsByCategory[categoryKey];
      if (!current?.hasMore || current.isFetchingMore) return;

      setBrandsByCategory((prev) => ({
        ...prev,
        [categoryKey]: { ...prev[categoryKey], isFetchingMore: true },
      }));

      // Локальные аккумуляторы — обновим стейт один раз в конце
      let page = current.page;
      let accumulatedItems = current.items;
      let accumulatedEmpty = current.emptyStreak ?? 0;
      let hasMore = true;

      try {
        // Цикл по страницам: пропускаем полностью дублирующие страницы,
        // останавливаемся на первой непустой, на реальном конце или на предохранителе
        while (true) {
          page += 1;

          const response = await getBrandFeed(
            {
              categoryId:
                categoryId === undefined ? undefined : String(categoryId),
              pageSize: PAGE_SIZE,
              page,
            },
            false,
          );
          const incoming = response.floorModularList ?? [];
          const merged = mergeUniqueBrands(accumulatedItems, incoming);
          const newCount = merged.length - accumulatedItems.length;

          // 1) Бэк вернул неполную страницу — это настоящий конец
          if (incoming.length < PAGE_SIZE) {
            accumulatedItems = merged;
            hasMore = false;
            break;
          }

          // 2) Страница целиком из дублей — идём дальше, но не бесконечно
          if (newCount === 0) {
            accumulatedEmpty += 1;
            if (accumulatedEmpty >= MAX_EMPTY_PAGES) {
              accumulatedItems = merged;
              hasMore = false;
              break;
            }
            continue;
          }

          // 3) Есть новые — фиксируем и выходим
          accumulatedItems = merged;
          accumulatedEmpty = 0;
          hasMore = true;
          break;
        }

        setBrandsByCategory((prev) => ({
          ...prev,
          [categoryKey]: {
            items: accumulatedItems,
            page,
            hasMore,
            isFetchingMore: false,
            emptyStreak: accumulatedEmpty,
          },
        }));
      } catch (error) {
        console.error("Ошибка подгрузки брендов:", error);
        setBrandsByCategory((prev) => ({
          ...prev,
          [categoryKey]: {
            ...prev[categoryKey],
            isFetchingMore: false,
          },
        }));
      }
    },
    [brandsByCategory],
  );

  return { brandsByCategory, handleShowMore };
};