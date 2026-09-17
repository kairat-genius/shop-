import { useCallback, useEffect, useRef, useState } from "react";
import { getProductListSearch } from "@/shared/api/product-list/getProductListSearch";
import type { FacetType } from "@/types/category-filters.type";
import type { ProductType } from "@/types/product.type";

export interface ModelVariantsFilters {
  sizes: string[];
  fitIds: number[];
  priceMin?: number;
  priceMax?: number;
  colors: string[];
  sortType: number;
  sortMode: string;
}

const FIRST_PAGE_SIZE = 40;
const PAGE_SIZE = 20;

export const useModelVariantsProducts = (
  categoryId: number,
  filters: ModelVariantsFilters,
) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [facets, setFacets] = useState<FacetType[]>([]);
  const loadingRef = useRef(false);
  const loadedCountRef = useRef(0);
  const requestVersionRef = useRef(0);

  const fetchProducts = useCallback(
    async (targetPage: number) => {
      const isInitialRequest = targetPage === 1;

      if (loadingRef.current && !isInitialRequest) return;

      if (isInitialRequest) {
        requestVersionRef.current += 1;
        loadedCountRef.current = 0;
        setProducts([]);
      }

      const requestVersion = requestVersionRef.current;

      loadingRef.current = true;
      setIsLoading(true);

      try {
        const response = await getProductListSearch({
          page: targetPage,
          pageSize: targetPage === 1 ? FIRST_PAGE_SIZE : PAGE_SIZE,
          categoryIds: [String(categoryId)],
          sortType: filters.sortType,
          sortMode: filters.sortMode,
          sizes: filters.sizes.length > 0 ? filters.sizes : undefined,
          fitIds: filters.fitIds.length > 0 ? filters.fitIds : undefined,
          colors: filters.colors.length > 0 ? filters.colors : undefined,
          priceMin: filters.priceMin,
          priceMax: filters.priceMax,
        });

        const list = response.searchSpuList?.spuList ?? [];
        const responseTotal = response.searchSpuList?.total ?? 0;

        if (requestVersion !== requestVersionRef.current) {
          return;
        }

        const rawResponse = response as typeof response & {
          facetPanel?: FacetType[];
        };
        const fetchedFacets =
          rawResponse.facetList && rawResponse.facetList.length > 0
            ? rawResponse.facetList
            : rawResponse.facetPanel && rawResponse.facetPanel.length > 0
              ? rawResponse.facetPanel
              : [];

        if (targetPage === 1 && fetchedFacets.length > 0) {
          setFacets(fetchedFacets);
        }
        loadedCountRef.current =
          targetPage === 1 ? list.length : loadedCountRef.current + list.length;
        setProducts((previous) =>
          targetPage === 1 ? list : [...previous, ...list],
        );
        setPage(targetPage);
        setHasMore(loadedCountRef.current < responseTotal);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      } finally {
        if (requestVersion === requestVersionRef.current) {
          loadingRef.current = false;
          setIsLoading(false);
        }
      }
    },
    [categoryId, filters],
  );

  useEffect(() => {
    loadedCountRef.current = 0;

    const requestId = window.setTimeout(() => {
      void fetchProducts(1);
    }, 0);

    return () => window.clearTimeout(requestId);
  }, [fetchProducts]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

      if (
        scrollHeight <= clientHeight ||
        scrollHeight - scrollTop - clientHeight >= 150 ||
        !hasMore ||
        loadingRef.current
      ) {
        return;
      }

      void fetchProducts(page === 1 ? 3 : page + 1);
    },
    [fetchProducts, hasMore, page],
  );

  return {
    products,
    facets,
    isLoading,
    hasMore,
    handleScroll,
  };
};
