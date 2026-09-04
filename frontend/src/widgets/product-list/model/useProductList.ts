import { useCallback, useEffect, useRef, useState } from "react";
import { useFilter } from "@/widgets/product-list/model/useFilter";
import { getProductListCategory } from "@/views/category/api/getProductListCategory";
import { SearchResponseDto } from "@/shared/api/openapi";

export function useProductList(
  initialData: SearchResponseDto,
  categoryId: string,
) {
  const [productData, setProductData] =
    useState<SearchResponseDto>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const { filters, updateFilter, updateFilters, resetFilters } =
    useFilter();

  const isFirstRender = useRef(true);

  const fetchFormList = useCallback(async () => {
    setIsLoading(true);

    if (productData.searchSpuList.spuList.length === 0) {
      setShowSkeleton(true);
    }

    try {
      const requestParams = {
        page: filters.page,
        pageSize: 65,
        categoryId: categoryId,
      };

      const listData = await getProductListCategory(requestParams, false);

      setProductData(listData);
    } finally {
      setIsLoading(false);
      setShowSkeleton(false);
    }
  }, [filters, productData.searchSpuList.spuList.length, categoryId]);

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
    showSkeleton,
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
  };
}
