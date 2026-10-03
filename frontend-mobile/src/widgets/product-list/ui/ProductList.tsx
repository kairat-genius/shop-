"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useProductList } from "../model/useProductList";
import ProductCard from "@/entities/product-card";
import FavoriteButton from "@/features/favorites-button";
import Icon from "@/shared/icon";

import type { FacetType } from "@/types/category-filters.type";
import type { ProductListCategoryResponseType } from "@/types/product-list-category.type";
import { cn } from "@/shared/utils/clsx";
import Filter from "./filter/Filter";

interface ProductListProps {
  initialData: ProductListCategoryResponseType;
  categoryId?: string;
  brandId?: string;
  filtersData?: Array<FacetType>;
  keyword?: string;
}

const PAGE_SIZE = 20;

const ProductList = ({
  initialData,
  categoryId,
  brandId,
  filtersData,
  keyword,
}: ProductListProps) => {
  const {
    productData,
    isLoading,
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
  } = useProductList(initialData, { categoryId, brandId, keyword });

  const searchSpuList = productData.searchSpuList;

  // «Сырой» результат текущей страницы
  const productItems = useMemo(
    () =>
      searchSpuList.spuList?.length > 0
        ? searchSpuList.spuList
        : (searchSpuList.fallbackSpuList ?? []),
    [searchSpuList.spuList, searchSpuList.fallbackSpuList],
  );

  const totalPages = Math.max(
    1,
    Math.ceil((searchSpuList.total ?? 0) / PAGE_SIZE),
  );
  const hasMore = filters.page < totalPages && productItems.length > 0;

  // Накопленный список
  const [items, setItems] = useState(productItems);

  // Сигнатура фильтров без page — по ней определяем, что фильтры изменились
  const filtersKey = useMemo(
    () =>
      JSON.stringify({
        sortType: filters.sortType,
        sortMode: filters.sortMode,
        categories: filters.categories,
        brandIds: filters.brandIds,
        fitIds: filters.fitIds,
        sizes: filters.sizes,
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
      }),
    [filters],
  );
  const prevFiltersKeyRef = useRef(filtersKey);
  const prevItemsRef = useRef(productItems);

  // Слияние страниц: заменяем при смене фильтров, добавляем при инкременте page
  useEffect(() => {
    if (prevItemsRef.current === productItems) return;
    prevItemsRef.current = productItems;

    const filtersChanged = prevFiltersKeyRef.current !== filtersKey;
    prevFiltersKeyRef.current = filtersKey;

    if (filtersChanged || filters.page === 1) {
      setItems(productItems);
      return;
    }

    setItems((prev) => {
      const seen = new Set(prev.map((p) => p.spuId));
      const additions = productItems.filter((p) => !seen.has(p.spuId));
      return additions.length > 0 ? [...prev, ...additions] : prev;
    });
  }, [productItems, filtersKey, filters.page]);

  // Подгрузка следующей страницы
  const isFetchingMoreRef = useRef(false);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore || isFetchingMoreRef.current) return;
    isFetchingMoreRef.current = true;
    updateFilter("page", filters.page + 1);
  }, [isLoading, hasMore, updateFilter, filters.page]);

  // Сбрасываем флаг, когда пришли новые данные
  useEffect(() => {
    isFetchingMoreRef.current = false;
  }, [productItems]);

  // IntersectionObserver
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) loadMore();
        },
        { rootMargin: "600px 0px" },
      );
      observerRef.current.observe(node);
    },
    [loadMore],
  );

  const showFirstLoader = isLoading && items.length === 0;
  const showMoreLoader = isLoading && items.length > 0;

  return (
    <>
      <div className="min-h-screen">
        <Filter
          filters={filters}
          updateFilter={updateFilter}
          updateFilters={updateFilters}
          resetFilters={resetFilters}
          filtersData={filtersData}
        />

        {showFirstLoader ? (
          <div className="col-span-full flex min-h-80 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />
          </div>
        ) : items.length > 0 ? (
          <>
            <div className="grid grid-cols-2 pt-px">
              {items.map((item, index) => {
                const isLeft = index % 2 === 0;
                const isFirstRow = index < 2;

                return (
                  <ProductCard
                    key={`${item.spuId}-${index}`}
                    product={item}
                    className={cn(
                      "border-b",
                      isLeft && "border-r",
                      isFirstRow && "border-t",
                    )}
                  >
                    <FavoriteButton className="absolute right-[4vw] top-[4.8vw] text-slate-500">
                      <Icon icon="heart" className="h-[4.8vw] w-[4.8vw]" />
                    </FavoriteButton>
                  </ProductCard>
                );
              })}
            </div>

            {/* Сентинел — на нём висит IntersectionObserver */}
            <div ref={sentinelRef} aria-hidden className="h-px w-full" />

            {/* Лоадер подгрузки */}
            {showMoreLoader && (
              <div className="col-span-full flex min-h-20 items-center justify-center py-6">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />
              </div>
            )}

            {/* Конец списка */}
            {!hasMore && !isLoading && (
              <div className="py-6 text-center text-[3.2vw] text-slate-400">
                Больше товаров нет
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center flex-col pt-[26.667vw]">
            <Icon
              icon="box"
              className="text-slate-100 h-[37.333vw] w-[37.333vw]"
            />
            <div className="text-[3.467vw] leading-[normal]">
              Ой, ничего нет здесь :-(
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;