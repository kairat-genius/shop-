import { useCallback, useEffect, useRef, useState } from "react";
import { useFilter } from "@/widgets/product-list/model/useFilter";
import { getProductListCategory } from "@/views/category/api/getProductListCategory";
import type { ProductListCategoryResponseType } from "@/types/product-list-category.type";

export function useProductList(
  initialData: ProductListCategoryResponseType,
  categoryId: string,
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
        categoryId,

        sortType: Number(filters.sortType),
        sortMode: filters.sortMode,
        categoryIds: filters.categories.map(String),
        brandIds: filters.brandIds.map(Number),
        fitIds: filters.fitIds.map(Number),
        sizes: filters.sizes.map(String),
        
        priceMin: filters.priceMin ?? undefined,
        priceMax: filters.priceMax ?? undefined,
      };

      const listData = await getProductListCategory(requestParams, false);

      setProductData(listData);
    } finally {
      setIsLoading(false);
    }
  }, [filters, categoryId]);

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
