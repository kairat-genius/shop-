import type { ReviewType } from "@/types/review.type";
import { useState, useCallback, useMemo, useEffect } from "react";
import { getProductReviews } from "../api/getProductReviews";

export const useReviews = (spuId?: number) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !spuId) return;

    setIsLoading(true);
    try {
      const data = await getProductReviews(spuId, page);
      setReviews((prev) => {
        // Защита от дублей при StrictMode
        const newReviews = data.contents.filter(
          (newRev) => !prev.some((p) => p.reviewId === newRev.reviewId),
        );
        return [...prev, ...newReviews];
      });
      setTotal(data.total);
      setHasMore(data.pageNum < data.pages);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, [spuId, page, isLoading, hasMore]);

  // Загрузка первой страницы
  useEffect(() => {
    if (spuId && page === 1 && reviews.length === 0) {
      loadMore();
    }
  }, [spuId, loadMore, page, reviews.length]);

  const reviewsWithImages = useMemo(
    () => reviews.filter((review) => review.images && review.images.length > 0),
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
