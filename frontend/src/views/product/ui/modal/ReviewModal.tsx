"use client";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import RatingSummaryCard from "../left/RatingSummaryCard";
import { useProductDetailData } from "../../context/useCatalogData";
import { ReviewType } from "@/types/review.type";

const ReviewGalleryModal = dynamic(
  () => import("../modal/ReviewGalleryModal"),
  {
    ssr: false,
  },
);

const ReviewDetailModal = dynamic(() => import("../modal/ReviewDetailModal"), {
  ssr: false,
});

interface GalleryImage {
  src: string;
  publishDate: string;
  userName: string;
  userId: number;
  skuProperty: string;
  sizeFeelingText: string;
  score: string;
  originType: number;
  reviewData: string[];
  poizonReply: string;
  userIcon: string;
  reviewId: string;
  trackingId: string;
}


interface ReviewModalProps {
  onClose: () => void;
  reviews: ReviewType[];
  reviewsWithImages: ReviewType[];
  galleryPhotos: GalleryImage[];
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}
const ReviewModal = ({
  onClose,
  reviews,
  reviewsWithImages,
  galleryPhotos,
  loadMore,
  hasMore,
  isLoading,
}: ReviewModalProps) => {
  useBodyScrollLock(true);
  const [isModalGalleryOpen, setIsModalGalleryOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [detailReview, setDetailReview] = useState<ReviewType | null>(null);
  const [detailPhotoIndex, setDetailPhotoIndex] = useState(0);

  const {
    productData: { commodityReviews },
  } = useProductDetailData();
  const sizeFeelingModule = commodityReviews.sizeFeelingModule ?? [];

  const openGallery = useCallback((photoIndex: number) => {
    setSelectedPhotoIndex(photoIndex);
    setIsModalGalleryOpen(true);
  }, []);

  const openDetailModal = useCallback(
    (review: ReviewType, photoIndex: number) => {
      setDetailReview(review);
      setDetailPhotoIndex(photoIndex);
    },
    [],
  );

  const closeDetailModal = useCallback(() => setDetailReview(null), []);

  // Логика бесконечного скролла для главного списка
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !isLoading) {
        loadMore();
      }
  };

  return (
    <Modal
      onClose={onClose}
      className="bg-white flex flex-col max-w-240 rounded"
    >
      <div className="flex items-center justify-between px-6 py-[19.5px] border-b border-slate-100">
        <h2 className="font-roboto_condensed leading-5.75 tracking-[-.5px] text-[20px] font-bold">
          <span>ОТЗЫВЫ</span>
          {/* Динамическое количество отзывов (опционально) */}
          <span>({reviews.length})</span>
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" width={20} height={20} />
        </Button>
      </div>

      <div
        className="overflow-y-auto h-[calc(88vh-54px)] px-6"
        onScroll={handleScroll}
      >
        {sizeFeelingModule.length > 0 && commodityReviews.spuAvgScore && (
          <RatingSummaryCard
            spuAvgScore={commodityReviews.spuAvgScore}
            sizeFeelingModule={sizeFeelingModule}
          />
        )}
        <div className="mt-3 flex gap-3.5 items-center w-full">
          <Button className="review-gallery1-prev disabled:cursor-not-allowed disabled:text-slate-300">
            <Icon
              icon="chevron-right"
              className="rotate-180"
              width={20}
              height={20}
            />
          </Button>

          <Swiper
            slidesPerView={8}
            slidesPerGroup={7}
            spaceBetween={4}
            // 1. Выносим массив из inline, чтобы Swiper не пересоздавался
            modules={useMemo(() => [Navigation], [])}
            // 2. Включаем обсерверы для правильной реакции на новые слайды
            observer={true}
            observeParents={true}
            className="w-full"
            navigation={{
              nextEl: ".review-gallery1-next",
              prevEl: ".review-gallery1-prev",
            }}
            allowTouchMove={false}
            onSlideChange={(swiper) => {
              if (swiper.progress > 0.5 && hasMore && !isLoading && loadMore) {
                loadMore();
              }
            }}
          >
            {galleryPhotos.map((photo, idx) => (
              // 3. Делаем уникальный составной ключ, чтобы React не путался
              <SwiperSlide key={`${photo.src}-${idx}`}>
                <img
                  className="aspect-3/4 object-cover cursor-pointer"
                  src={photo.src}
                  alt={`Фото от ${photo.userName}`}
                  onClick={() => openGallery(idx)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Button className="review-gallery1-next disabled:cursor-not-allowed disabled:text-slate-300">
            <Icon icon="chevron-right" width={20} height={20} />
          </Button>
        </div>
        <div className="py-3 border-b border-slate-100 flex gap-0.5">
          <Icon
            icon="shield-check"
            className="text-teal-400"
            width={20}
            height={20}
          />
          <div className="text-slate-500 text-[14px] font-light leading-[19.6px]">
            Опираясь на передовые алгоритмы и экспертную оценку, мы представляем
            вам достоверные и действенные отзывы.
          </div>
        </div>

        <div className="">
          {reviews.map((item) => (
            <div key={item.reviewId} className="py-3 border-b border-slate-100">
              <div>
                <div className="flex items-center">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center">
                      <img
                        className="w-5.5 h-5.5 mr-1"
                        src={item.userIcon}
                        alt=""
                      />
                      <span className="text-[12px] leading-normal">
                        {item.userName}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Icon
                        icon="star"
                        width={12}
                        height={12}
                        className="text-slate-500"
                      />
                      <Icon
                        icon="star"
                        width={12}
                        height={12}
                        className="text-slate-500"
                      />
                      <Icon
                        icon="star"
                        width={12}
                        height={12}
                        className="text-slate-500"
                      />
                      <Icon
                        icon="star"
                        width={12}
                        height={12}
                        className="text-slate-500"
                      />
                      <Icon
                        icon="star"
                        width={12}
                        height={12}
                        className="text-slate-500"
                      />
                    </div>
                  </div>
                  <span className="text-[12px] ml-auto text-slate-500 leading-normal">
                    {item.publishDate}
                  </span>
                </div>
                <div className="mt-4 font-light text-[12px] truncate leading-normal text-slate-500">
                  {item.skuProperty}
                </div>
                <div className="mt-3 leading-[16.41px] font-light text-[14px]">
                  {item.reviewData.join(" ")}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-3 text-[12px] font-light leading-normal text-slate-500">
                  <div>{item.sizeFeelingText}</div>
                </div>
              </div>
              {item.images && item.images.length > 0 && (
                <div className="mt-3 flex gap-1 mb-7.5">
                  {item.images.map((img, imgIndex) => (
                    <img
                      src={img.imageUrl}
                      key={imgIndex}
                      alt=""
                      className="max-w-24.5 max-h-24.5 aspect-square object-cover cursor-pointer"
                      onClick={() => openDetailModal(item, imgIndex)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalGalleryOpen && reviewsWithImages.length > 0 && (
        <ReviewGalleryModal
          onClose={() => setIsModalGalleryOpen(false)}
          images={galleryPhotos}
          initialSlide={selectedPhotoIndex}
          loadMore={loadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      )}

      {detailReview && (
        <ReviewDetailModal
          review={detailReview}
          initialSlide={detailPhotoIndex}
          onClose={closeDetailModal}
        />
      )}
    </Modal>
  );
};

export default ReviewModal;
