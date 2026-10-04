"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { useProductDetailData } from "../../context/useCatalogData";
import { useReviews } from "../../model/useReviews";
import { cn } from "@/shared/utils/clsx";
import RatingSummaryCard from "./RatingSummaryCard";

const ReviewGalleryModal = dynamic(
  () => import("../modal/ReviewGalleryModal"),
  {
    ssr: false,
  },
);

const ReviewModal = dynamic(() => import("../modal/ReviewModal"), {
  ssr: false,
});

const Reviews = () => {
  const [isModalGalleryOpen, setIsModalGalleryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const {
    productData: { commodityReviews },
    productId,
  } = useProductDetailData();

  const {
    reviews,
    reviewsWithImages,
    galleryPhotos,
    loadMore,
    hasMore,
    isLoading,
  } = useReviews(productId);

  const openGallery = useCallback((reviewIndex: number) => {
    setSelectedReviewIndex(reviewIndex);
    setSelectedPhotoIndex(0);
    setIsModalGalleryOpen(true);
  }, []);

  const openGalleryWithoutScroll = useCallback(() => {
    setSelectedReviewIndex(0);
    setSelectedPhotoIndex(0);
    setIsModalGalleryOpen(true);
  }, []);

  if (!commodityReviews) return null;

  const sizeFeelingModule = commodityReviews.sizeFeelingModule ?? [];

  return (
    <section className="mt-[3.2vw] bg-white">
      <div className="px-[3.733vw]">
        <Button
          className="justify-between gap-5 w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center gap-[1.6vw] font-roboto_condensed font-bold leading-[5.624vw] text-[4.8vw]">
            <span>{commodityReviews.title}</span>
            {commodityReviews.spuAvgScore && (
              <span>{commodityReviews.spuAvgScore}</span>
            )}
            {(commodityReviews.spuAvgScoreNumber ||
              commodityReviews.spuAvgScore) && (
              <>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Icon
                      key={starIndex}
                      icon="star"
                      className={cn(
                        "w-[3.2vw] h-[3.2vw]",
                        starIndex >
                          Math.floor(
                            Number(
                              commodityReviews.spuAvgScoreNumber ||
                                commodityReviews.spuAvgScore,
                            ),
                          ) && "text-slate-500",
                      )}
                    />
                  ))}
                </div>
                <Icon
                  icon="circle-question-mark"
                  className="text-slate-500 w-[3.2vw] h-[3.2vw]"
                />
              </>
            )}
            {commodityReviews.reviewsCount && (
              <span>({commodityReviews.reviewsCount})</span>
            )}
          </div>
          <Icon
            icon="chevron-right"
            className="w-[3.2vw] h-[3.2vw] text-slate-400"
          />
        </Button>
        {sizeFeelingModule.length > 0 && commodityReviews.spuAvgScore && (
          <Button className="w-full" onClick={() => setIsModalOpen(true)}>
            <RatingSummaryCard
              spuAvgScore={commodityReviews.spuAvgScore}
              sizeFeelingModule={sizeFeelingModule}
            />
          </Button>
        )}
      </div>
      {commodityReviews.goodsContents && (
        <div className="pb-[5.333vw] mt-[3.2vw] flex w-full">
          <div className="h-[32vw] overflow-x-auto scrollbar-none">
            <div className="inline-flex items-center gap-[1.067vw] min-w-max px-[3.733vw]">
              {reviewsWithImages.map((review, idx) => (
                <img
                  key={idx}
                  className="h-[32vw] w-[24vw] object-cover cursor-pointer"
                  src={review.images?.[0]?.imageUrl}
                  alt=""
                  onClick={() => openGallery(idx)}
                />
              ))}
              <div
                className="px-[3.2vw] flex items-center gap-[.533vw] shrink-0"
                onClick={openGalleryWithoutScroll}
              >
                <Icon icon={"arrow-left"} className="w-[3.2vw] h-[3.2vw]" />
                <div className="text-[3.467vw] leading-[normal]">Ещё</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="px-[3.733vw] space-y-[3.2vw]">
        {commodityReviews.reviewsDetailList.slice(0, 2).map((item, index) => {
          const score = Number(item.score);

          return (
            <div
              key={index}
              className="pb-[3.2vw]"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="flex items-center gap-[3.2vw] mb-[2.133vw]">
                <div className="flex items-center gap-[3.2vw] flex-1">
                  <div className="flex items-center">
                    <img
                      className="w-[3.733vw] h-[3.733vw] mr-[1.067vw]"
                      src={item.userIcon || item.defaultIcon}
                      alt=""
                    />
                    <span className="text-[2.933vw] leading-[3.733vw] text-slate-500">
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
                          starIndex < Math.floor(score)
                            ? "text-slate-500"
                            : "text-slate-300",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[2.933vw] leading-[3.437vw] text-slate-500">
                  {item.publishDate}
                </span>
              </div>
              <div className="mt-[1.067vw] text-[2.667vw] leading-[normal] font-light truncate text-slate-500">
                {item.skuProperty}
              </div>
              <div className="mt-[3.2vw]">
                <div className="overflow-hidden">
                  <span className="text-[3.2vw] leading-[3.733vw] font-light line-clamp-2">
                    {item.reviewData}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isModalGalleryOpen && reviewsWithImages.length > 0 && (
        <ReviewGalleryModal
          onClose={() => setIsModalGalleryOpen(false)}
          reviews={reviewsWithImages}
          initialPhotoIndex={selectedPhotoIndex}
          initialReviewIndex={selectedReviewIndex}
          loadMore={loadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      )}

      {isModalOpen && (
        <ReviewModal
          onClose={() => setIsModalOpen(false)}
          reviews={reviews}
          reviewsWithImages={reviewsWithImages}
          galleryPhotos={galleryPhotos}
          loadMore={loadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

export default Reviews;
