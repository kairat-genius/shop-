"use client";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useRef } from "react";
import { Pagination } from "swiper/modules";
import { ReviewType } from "@/types/review.type";
import { cn } from "@/shared/utils/clsx";

interface ReviewGalleryModalProps {
  onClose: () => void;
  reviews: ReviewType[];
  /** индекс отзыва, к которому нужно проскроллить */
  initialReviewIndex: number;
  /** индекс фото внутри этого отзыва */
  initialPhotoIndex: number;
  loadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

const ReviewGalleryModal = ({
  onClose,
  reviews,
  initialReviewIndex,
  initialPhotoIndex,
  isLoading,
  hasMore,
  loadMore,
}: ReviewGalleryModalProps) => {
  useBodyScrollLock(true);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Бесконечный скролл — как в ReviewModal
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!loadMore || !hasMore || isLoading) return;

    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMore();
    }
  };

  // Скролл к выбранному отзыву при открытии модалки
  useEffect(() => {
    if (!listRef.current) return;

    const target = itemRefs.current[initialReviewIndex];
    if (!target) return;

    const rafId = requestAnimationFrame(() => {
      const list = listRef.current;
      if (!list) return;

      const listRect = list.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      list.scrollTop += targetRect.top - listRect.top;
    });

    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      onClose={onClose}
      className="bg-white rounded-t-[2.133vw] flex flex-col"
      overlayClassName="justify-end items-end"
    >
      <div className="flex items-center justify-between px-[3.733vw] h-[16vw]">
        <h2 className="font-roboto_condensed leading-[5.067vw] text-[4.267vw] font-bold">
          Подборка образов
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" className="w-[4.267vw] h-[4.267vw]" />
        </Button>
      </div>

      <div
        ref={listRef}
        onScroll={handleScroll}
        className="overflow-y-auto h-[calc(90vh-16vw)]"
      >
        {reviews.map((review, index) => {
          const isTargetReview = index === initialReviewIndex;
          const photosCount = review.images?.length ?? 0;

          return (
            <div
              key={review.userName + review.publishDate}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="border-b-[2.133vw] border-slate-100"
            >
              {/* Карусель фотографий отзыва */}
              <div>
                <Swiper
                  slidesPerView={1}
                  loop={photosCount >= 2}
                  // Для выбранного отзыва — открываем нужный слайд,
                  // для остальных — с первого
                  initialSlide={
                    isTargetReview && photosCount > 0
                      ? Math.min(initialPhotoIndex, photosCount - 1)
                      : 0
                  }
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  className="w-full [&_.swiper-pagination-bullet]:w-1 [&_.swiper-pagination-bullet]:h-1 [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination]:bottom-[3.733vw]"
                  wrapperClass="h-full"
                >
                  {review.images?.map((image, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <img
                        src={image.imageUrl}
                        alt={`Фото ${imgIndex + 1} от ${review.userName}`}
                        loading={
                          isTargetReview && imgIndex === initialPhotoIndex
                            ? "eager"
                            : "lazy"
                        }
                        decoding="async"
                        className="w-full h-full aspect-430/573 object-cover"
                        draggable={false}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Информация об авторе */}
              <div className="p-[3.733vw]">
                <div className="flex items-center">
                  <img
                    className="rounded-full w-[5.867vw] h-[5.867vw]"
                    src={review.userIcon || review.defaultIcon}
                    alt=""
                  />
                  <div className="ml-[1.067vw] text-[2.933vw] leading-[normal]">
                    {review.userName}
                  </div>
                  <div className="ml-[3.2vw] flex items-center gap-[1.067vw]">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Icon
                        key={starIndex}
                        icon="star"
                        className={cn(
                          "w-[3.2vw] h-[3.2vw]",
                          starIndex < Math.floor(Number(review.score))
                            ? "text-slate-500"
                            : "text-slate-300",
                        )}
                      />
                    ))}
                  </div>
                  <div className="text-[2.933vw] leading-[normal] text-slate-500 ml-auto">
                    {review.publishDate}
                  </div>
                </div>
                <div className="mt-[1.067vw] text-[2.667vw] leading-[normal] font-light text-slate-500">
                  {review.skuProperty}
                </div>
                <div className="mt-[3.2vw] text-[3.2vw] font-light leading-[3.733vw]">
                  {review.reviewData.join(" ")}
                </div>
              </div>
            </div>
          );
        })}

        {/* Индикатор загрузки / конец списка */}
        {isLoading && (
          <div className="flex justify-center py-[4vw] text-slate-400 text-[3vw]">
            Загрузка...
          </div>
        )}
        {!hasMore && reviews.length > 0 && (
          <div className="flex justify-center py-[4vw] text-slate-400 text-[3vw]">
            Больше нет отзывов
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReviewGalleryModal;