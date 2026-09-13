import { useState, useEffect, useCallback } from "react";
import { getProductListSearch } from "@/shared/api/product-list/getProductListSearch";
import type { ProductType } from "@/types/product.type";

export const useRecommendedProducts = (frontCategoryId: number) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(
    async (targetPage: number) => {
      if (!frontCategoryId) return;

      setIsLoading(true);
      try {
        const res = await getProductListSearch({
          page: targetPage,
          pageSize: 30,
          categoryIds: [String(frontCategoryId)],
        });

        const newItems = res?.searchSpuList?.spuList ?? [];
        const total = res?.searchSpuList?.total ?? 0;

        setProducts((prev) =>
          targetPage === 1 ? newItems : [...prev, ...newItems],
        );
        
        // Устанавливаем страницу ПОСЛЕ успешного запроса
        // Это решает ошибку eslint, так как вызов происходит асинхронно, а не во время рендера
        setPage(targetPage);
        setHasMore(targetPage * 30 < total);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [frontCategoryId]
  );

  // Первичная загрузка при смене категории
  useEffect(() => {
    void fetchProducts(1);
  }, [frontCategoryId, fetchProducts]);

  const handleLoadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    void fetchProducts(page + 1);
  }, [isLoading, hasMore, page, fetchProducts]);

  return {
    products,
    isLoading,
    hasMore,
    handleLoadMore,
  };
};