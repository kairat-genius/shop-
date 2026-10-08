import type { ReviewType } from "@/types/review.type";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getProductReviews } from "../api/getProductReviews";

export const useReviews = (spuId?: number) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  // refs — чтобы не зависеть от устаревших замыканий и не перезапускать эффекты
  const pageRef = useRef(1);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const loadedForRef = useRef<number | undefined>(undefined);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMoreRef.current || !spuId) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const data = await getProductReviews(spuId, pageRef.current);
      const rawContents = data?.contents ?? [];

      setReviews((prev) => {
        // безопасная дедупликация: не выкидываем записи без reviewId
        const seen = new Set(
          prev.map((r) => r.reviewId).filter(Boolean),
        );
        const newReviews = rawContents.filter(
          (r) => !r.reviewId || !seen.has(r.reviewId),
        );
        return [...prev, ...newReviews];
      });

      setTotal(data?.total ?? 0);

      // ⚠️ проверь имена полей в реальном ответе API!
      const more = Boolean(data?.pageNum && data?.pages && data.pageNum < data.pages);
      hasMoreRef.current = more;
      setHasMore(more);

      pageRef.current += 1;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [spuId]);

  // сброс + первая загрузка при смене spuId
  useEffect(() => {
    if (!spuId) return;
    if (loadedForRef.current === spuId) return; // защита от двойного маунта в StrictMode
    loadedForRef.current = spuId;

    // сброс состояния
    setReviews([]);
    setTotal(0);
    setHasMore(true);
    hasMoreRef.current = true;
    pageRef.current = 1;
    isLoadingRef.current = false;
    setIsLoading(false);

    loadMore();
  }, [spuId, loadMore]);

  const reviewsWithImages = useMemo(
    () => reviews.filter((r) => r.images && r.images.length > 0),
    [reviews],
  );

  const galleryPhotos = useMemo(() => {
    return reviewsWithImages.flatMap((review) => {
      const { images, ...rest } = review;
      return (images || []).map((img) => ({
        ...rest,
        src: img.imageUrl,
        width: img.width,
        height: img.height,
      }));
    });
  }, [reviewsWithImages]);

  return {
    reviews,
    reviewsWithImages,
    galleryPhotos,
    total,
    loadMore,
    hasMore,
    isLoading,
  };
};