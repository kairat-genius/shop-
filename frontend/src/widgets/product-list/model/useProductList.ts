import { useCallback, useEffect, useRef, useState } from "react";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";
import { getProductList } from "@/shared/api/product-list/getProductList";
import { getProductListCount } from "@/shared/api/product-list/getProductListCount";
import {
  ProductControllerSearchV2CurrencyEnum,
  ProductControllerSearchV2GendersEnum,
  ProductControllerSearchV2SortByEnum,
  ProductControllerSearchV2SourcesEnum,
  ProductsResponseV2WithPaginationDto,
} from "@/shared/api/openapi";

export function useProductList(
  category_id: number,
  initialData: ProductsResponseV2WithPaginationDto,
  initialTotalCount = initialData.data.length,
) {
  const [productData, setProductData] =
    useState<ProductsResponseV2WithPaginationDto>(initialData);
  const [totalCount, setTotalCount] = useState<number>(initialTotalCount);

  const [isLoading, setIsLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const { filters, updateFilter, updateFilters, resetFilters } =
    useFiltersNuqs();

  const isFirstRender = useRef(true);

  const fetchFormList = useCallback(async () => {
    setIsLoading(true);

    if (productData.data.length === 0) {
      setShowSkeleton(true);
    }

    try {
      const parsedBrands = filters.brands?.map(Number);

      // 2. Конвертируем категории из фильтров в числа (если они есть)
      const parsedCategories = filters.categories?.map(Number) || [];

      // 3. Объединяем category_id из пропсов с категориями из фильтра,
      // используя Set, чтобы избежать дубликатов
      const mergedCategories = [...new Set([...parsedCategories, category_id])];

      const requestParams = {
        ...filters,
        cursor: filters.cursor ?? undefined,
        brands: parsedBrands,
        categories: mergedCategories,
        limit: 65,
        currency: "RUB" as ProductControllerSearchV2CurrencyEnum,
        genders: filters.genders as ProductControllerSearchV2GendersEnum[],
        priceMin: filters.priceMin ?? undefined,
        priceMax: filters.priceMax ?? undefined,
        sortBy: filters.sortBy as ProductControllerSearchV2SortByEnum,
        sources: ["POIZON"] as ProductControllerSearchV2SourcesEnum[]
      };

      const [listData, countData] = await Promise.all([
        getProductList(requestParams, false),
        getProductListCount(requestParams,
          false,
        ),
      ]);

      setProductData(listData);
      setTotalCount(countData.count ?? 0);
    } finally {
      setIsLoading(false);
      setShowSkeleton(false);
    }
  }, [filters, category_id, productData.data.length]);

  /**
   * 🔥 FETCH EFFECT
   */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      void fetchFormList();
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), category_id]);

  return {
    productData,
    totalCount,
    isLoading,
    showSkeleton,
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
  };
}
