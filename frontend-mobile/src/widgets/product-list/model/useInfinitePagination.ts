import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfinitePaginationParams {
  pageSize: number;
  loadPage: (page: number) => Promise<number>;
  initialPage?: number;
}

export const useInfinitePagination = ({
  pageSize,
  loadPage,
  initialPage = 1,
}: UseInfinitePaginationParams) => {
  const [page, setPage] = useState(initialPage);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isFetchingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMore = useCallback(async () => {
    if (!hasMore || isFetchingRef.current) {
      return;
    }

    const nextPage = page + 1;

    isFetchingRef.current = true;
    setIsFetchingMore(true);

    try {
      const itemsCount = await loadPage(nextPage);

      setPage(nextPage);
      setHasMore(itemsCount === pageSize);
    } catch (error) {
      console.error("Ошибка при подгрузке страницы:", error);
    } finally {
      isFetchingRef.current = false;
      setIsFetchingMore(false);
    }
  }, [hasMore, page, pageSize, loadPage]);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();

      if (!node) {
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            void loadMore();
          }
        },
        {
          rootMargin: "300px",
        },
      );

      observerRef.current.observe(node);
    },
    [loadMore],
  );

  const resetPagination = useCallback(() => {
    setPage(initialPage);
    setHasMore(true);
    isFetchingRef.current = false;
  }, [initialPage]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    page,
    isFetchingMore,
    hasMore,
    loadMoreRef,
    resetPagination,
  };
};