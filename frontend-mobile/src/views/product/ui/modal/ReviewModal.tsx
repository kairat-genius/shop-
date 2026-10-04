"use client";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { ReviewType } from "@/types/review.type";
import { useProductDetailData } from "../../context/useCatalogData";
import { cn } from "@/shared/utils/clsx";
import RatingSummaryCard from "../left/RatingSummaryCard";

const ReviewGalleryModal = dynamic(
  () => import("../modal/ReviewGalleryModal"),
  {
    ssr: false,
  },
);

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
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [detailReview, setDetailReview] = useState<ReviewType | null>(null);
  const [detailPhotoIndex, setDetailPhotoIndex] = useState(0);

  const {
    productData: { commodityReviews },
  } = useProductDetailData();
  const sizeFeelingModule = commodityReviews.sizeFeelingModule ?? [];

  const openGallery = useCallback(
    (reviewIndex: number, photoIndexInReview: number) => {
      setSelectedReviewIndex(reviewIndex);
      setSelectedPhotoIndex(photoIndexInReview);
      setIsModalGalleryOpen(true);
    },
    [],
  );

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
    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      hasMore &&
      !isLoading
    ) {
      loadMore();
    }
  };

  return (
    <Modal onClose={onClose} className="bg-white flex flex-col h-full">
      <div className="flex items-center px-[3.733vw] min-h-[11.733vw] relative">
        <h2 className="flex items-center gap-[1.067vw] font-roboto_condensed leading-[5.067vw] text-[4.8vw] font-bold absolute left-1/2 -translate-x-1/2">
          <span>ОТЗЫВЫ</span>
          <span>({commodityReviews.reviewsCount})</span>
        </h2>
        <Button className="w-[6.4vw] h-[6.4vw]" onClick={onClose}>
          <Icon icon="chevron-right" className="w-full h-full rotate-180" />
        </Button>
      </div>

      <div className="overflow-y-auto" onScroll={handleScroll}>
        {sizeFeelingModule.length > 0 && commodityReviews.spuAvgScore && (
          <div className="px-[3.733vw] mt-[3.2vw]">
            <RatingSummaryCard
              spuAvgScore={commodityReviews.spuAvgScore}
              sizeFeelingModule={sizeFeelingModule}
            />
          </div>
        )}
        <div className="mt-[3.2vw] flex w-full">
          <div className="h-[32vw] overflow-x-auto scrollbar-none">
            <div className="inline-flex items-center gap-[1.067vw] min-w-max px-[3.733vw]">
              {reviewsWithImages.map((review, reviewIdx) =>
                review.images?.map((image, imgIdx) => (
                  <img
                    key={`${review.userName}-${review.publishDate}-${imgIdx}`}
                    className="h-[32vw] w-[24vw] object-cover cursor-pointer"
                    src={image.imageUrl}
                    alt={`Фото от ${review.userName}`}
                    onClick={() => openGallery(reviewIdx, imgIdx)}
                  />
                )),
              )}
            </div>
          </div>
        </div>
        <div className="px-[3.733vw]">
          <div className="py-[3.2vw] flex">
            <Icon
              icon="shield-check"
              className="text-[#01C2C3] w-[4.267vw] h-[4.267vw]"
            />
            <div className="ml-[.533vw] text-slate-500 text-[3.467vw] leading-[normal] font-light">
              Опираясь на передовые алгоритмы и экспертную оценку, мы
              представляем вам достоверные и действенные отзывы.
            </div>
          </div>
        </div>
        <div className="h-[2.133vw] bg-slate-100" />
        <div className="px-[3.733vw]">
          {reviews.map((item, index) => (
            <div key={index} className="py-[3.2vw] border-b border-slate-100">
              <div className="cOT">
                <div className="flex items-center gap-[3.2vw] mb-[2.133vw]">
                  <div className="flex items-center gap-[3.2vw] flex-1">
                    <div className="flex items-center">
                      <img
                        className="w-[5.867vw] h-[5.867vw] mr-[1.067vw]"
                        src={item.userIcon || item.defaultIcon}
                        alt=""
                      />
                      <span className="text-[2.933vw] leading-[normal]">
                        {item.userName}
                      </span>
                    </div>
                    <div className="flex gap-[1.067vw]">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <Icon
                          key={starIndex}
                          icon="star"
                          className={cn(
                            "w-[3.2vw] h-[3.2vw]",
                            starIndex < Math.floor(Number(item.score))
                              ? "text-slate-500"
                              : "text-slate-300",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[2.933vw] text-slate-500">
                    {item.publishDate}
                  </span>
                </div>
                <div className="mt-[1.067vw] font-light text-[2.667vw] leading-[normal] text-slate-500">
                  {item.skuProperty}
                </div>
                <div className="mt-[3.2vw] leading-[3.733vw] font-light text-[3.2vw]">
                  {item.reviewData}
                </div>
                <div className="mt-[2.133vw] flex flex-wrap gap-x-[2.133vw] gap-y-[3.2vw] text-[2.667vw] leading-[normal] text-slate-500">
                  <div>{item.sizeFeelingText}</div>
                  {item.bodyParamList?.map((param, paramIndex) => (
                    <div key={paramIndex}>
                      {param.questionName}: {param.optionContent}
                    </div>
                  ))}
                </div>
              </div>
              {item.images?.length ? (
                <div className="mt-[3.2vw] grid grid-cols-3 gap-px">
                  {item.images?.map((img, imgIndex) => (
                    <img
                      src={img.imageUrl}
                      key={imgIndex}
                      alt=""
                      className="w-[30.667vw] h-[30.667vw] object-cover"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {isModalGalleryOpen && reviewsWithImages.length > 0 && (
        <ReviewGalleryModal
          onClose={() => setIsModalGalleryOpen(false)}
          reviews={reviewsWithImages}
          initialReviewIndex={selectedReviewIndex}
          initialPhotoIndex={selectedPhotoIndex}
          loadMore={loadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      )}
    </Modal>
  );
};

export default ReviewModal;
