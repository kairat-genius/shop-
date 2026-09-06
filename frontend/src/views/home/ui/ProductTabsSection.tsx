"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import HomeTabs from "./HomeTabs";
import ProductCard from "@/entities/product-card";
import { getProductListSearch } from "@/shared/api/product-list/getProductListSearch";
import { useCatalogData } from "@/shared/context/catalog-data";
import type { ProductListSearchResponseType } from "@/types/product-list-search.type";

interface ProductTabsSectionProps {
  initialData: ProductListSearchResponseType;
}

type SpuItem = NonNullable<
  ProductListSearchResponseType["searchSpuList"]
>["spuList"][0];

interface CategoryCache {
  items: SpuItem[];
  page: number;
  hasMore: boolean;
  isFetchingMore: boolean;
}

// Извлекает товары: сначала из spuList, а если он пуст — из fallbackSpuList
const extractSpuItems = (data?: ProductListSearchResponseType): SpuItem[] => {
  const spuList = data?.searchSpuList?.spuList;
  if (spuList && spuList.length > 0) return spuList;

  const fallbackList = data?.searchSpuList?.fallbackSpuList;
  if (fallbackList && fallbackList.length > 0) return fallbackList;

  return [];
};

const ProductTabsSection = ({ initialData }: ProductTabsSectionProps) => {
  const { categoryData } = useCatalogData();
  const [activeTab, setActiveTab] = useState("Все");
  const [isLoading, setIsLoading] = useState(false);

  // Кеш всех загруженных категорий
  const [cache, setCache] = useState<Record<string, CategoryCache>>(() => {
    const initialItems = extractSpuItems(initialData);

    return {
      Все: {
        items: initialItems,
        page: 1,
        hasMore: initialItems.length > 0,
        isFetchingMore: false,
      },
    };
  });

  // Формируем список вкладок
  const tabNames = useMemo(() => {
    const sliced =
      categoryData?.categories?.slice(0, 7).map((c) => c.name) ?? [];
    return ["Все", ...sliced];
  }, [categoryData?.categories]);

  // Ищем ID выбранной категории
  const activeCategoryId = useMemo(() => {
    if (activeTab === "Все") return;
    return categoryData?.categories?.find((c) => c.name === activeTab)?.id;
  }, [activeTab, categoryData?.categories]);

  const latestState = useRef({ cache, activeTab, activeCategoryId });
  useEffect(() => {
    latestState.current = { cache, activeTab, activeCategoryId };
  }, [cache, activeTab, activeCategoryId]);

  // 1. ПЕРВИЧНАЯ ЗАГРУЗКА (При переключении вкладок)
  useEffect(() => {
    const loadInitialCategory = async () => {
      // Если данные уже есть в кеше — повторный запрос не делаем
      if (cache[activeTab]) return;

      setIsLoading(true);
      try {
        const response = await getProductListSearch(
          {
            categoryIds: activeCategoryId
              ? [String(activeCategoryId)]
              : undefined,
            pageSize: 24,
            page: 1,
          },
          false,
        );

        const newItems = extractSpuItems(response);

        setCache((prev) => ({
          ...prev,
          [activeTab]: {
            items: newItems,
            page: 1,
            hasMore: newItems.length > 0,
            isFetchingMore: false,
          },
        }));
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialCategory();
  }, [activeTab, activeCategoryId]);

  // 2. ПАГИНАЦИЯ (Подгрузка при скролле)
  const loadMore = useCallback(async () => {
    const {
      cache: currentCache,
      activeTab: tab,
      activeCategoryId: catId,
    } = latestState.current;
    const currentData = currentCache[tab];

    if (!currentData || !currentData.hasMore || currentData.isFetchingMore)
      return;

    setCache((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], isFetchingMore: true },
    }));

    try {
      const nextPage = currentData.page + 1;
      const response = await getProductListSearch(
        {
          categoryIds: catId ? [String(catId)] : undefined,
          pageSize: 24,
          page: nextPage,
        },
        false,
      );

      const newItems = extractSpuItems(response);

      setCache((prev) => {
        const prevItems = prev[tab]?.items || [];
        const mergedItems = [...prevItems, ...newItems];

        return {
          ...prev,
          [tab]: {
            items: mergedItems,
            page: nextPage,
            hasMore: newItems.length > 0, // если массив пуст — товары закончились
            isFetchingMore: false,
          },
        };
      });
    } catch (error) {
      console.error("Ошибка при подгрузке:", error);
      setCache((prev) => ({
        ...prev,
        [tab]: { ...prev[tab], isFetchingMore: false },
      }));
    }
  }, []);

  // Intersection Observer для бесконечного скролла
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const { cache: c, activeTab: t } = latestState.current;
            if (c[t] && c[t].hasMore && !c[t].isFetchingMore && !isLoading) {
              loadMore();
            }
          }
        },
        { rootMargin: "200px" },
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, loadMore],
  );

  const currentCategoryData = cache[activeTab];
  const spuList = currentCategoryData?.items || [];
  const isEmpty = !isLoading && spuList.length === 0;

  return (
    <div className="container mt-7.5 mb-5">
      <HomeTabs
        categories={tabNames}
        activeCategory={activeTab}
        onCategoryChange={setActiveTab}
      />

      {/* Лоадер первой загрузки категории */}
      {isLoading && (
        <div className="my-11.5 mx-auto w-full flex items-center justify-center">
          <div className="w-10 h-10 animate-spin">
            <img
              className="object-contain"
              src="https://cdn-img.thepoizon.ru/node-common/45a0ec66-395e-e7a8-c213-25245aedaa89-120-120.png?x-oss-process=image/format,webp"
              alt="loading"
            />
          </div>
        </div>
      )}

      {/* Сетка товаров */}
      {!isLoading && (
        <div className="grid grid-cols-6 gap-x-[.8rem] gap-y-8 mt-6">
          {spuList.map((product, index) => {
            const isTargetElement = index === spuList.length - 2;
            return (
              <div
                key={`${product.spuId}-${index}`}
                ref={isTargetElement ? lastElementRef : null}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      )}

      {/* Индикатор загрузки при скролле */}
      {currentCategoryData?.isFetchingMore && (
        <div className="my-11.5 mx-auto w-full flex items-center justify-center">
          <div className="w-10 h-10 animate-spin">
            <img
              className="object-contain"
              src="https://cdn-img.thepoizon.ru/node-common/45a0ec66-395e-e7a8-c213-25245aedaa89-120-120.png?x-oss-process=image/format,webp"
              alt="loading"
            />
          </div>
        </div>
      )}

      {/* Заглушка при отсутствии данных */}
      {isEmpty && (
        <div className="mt-5 flex justify-center w-full">
          <div className="relative w-35 h-35">
            <img
              loading="lazy"
              className="w-full h-full object-contain"
              src="https://cdn-img.thepoizon.ru/node-common/4fddf0e0-6603-3c6a-eb37-65f7c3796d78.svg"
              alt="empty"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTabsSection;
