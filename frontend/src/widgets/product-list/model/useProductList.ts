import { useCallback, useEffect, useRef, useState } from "react";
import { useFilter } from "@/widgets/product-list/model/useFilter";
import { getProductListCategory } from "@/views/category-brand/api/getProductListCategory";
import type { ProductListCategoryResponseType } from "@/types/product-list-category.type";
import { getProductListSearch } from "@/shared/api/product-list/getProductListSearch";

export function useProductList(
  initialData: ProductListCategoryResponseType,
  params: { categoryId?: string; brandId?: string; keyword?: string },
) {
  const [productData, setProductData] =
    useState<ProductListCategoryResponseType>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const { filters, updateFilter, updateFilters, resetFilters } = useFilter();

  const isFirstRender = useRef(true);

  const fetchFormList = useCallback(async () => {
    setIsLoading(true);
    try {
      const requestParams = {
        page: filters.page,
        pageSize: 60,
        categoryId: params.categoryId,
        brandId: params.brandId,

        sortType: Number(filters.sortType),
        sortMode: filters.sortMode,
        categoryIds: filters.categories.map(String),
        brandIds: filters.brandIds.map(Number),
        fitIds: filters.fitIds.map(Number),
        sizes: filters.sizes.map(String),

        priceMin: filters.priceMin ?? undefined,
        priceMax: filters.priceMax ?? undefined,
      };

      const listData =
        params.keyword === undefined
          ? await getProductListCategory(requestParams, false)
          : await getProductListSearch(requestParams, false);

      setProductData(listData);
    } finally {
      setIsLoading(false);
    }
  }, [filters, params]);

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
  }, [JSON.stringify(filters)]);

  return {
    productData,
    isLoading,
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
  };
}
