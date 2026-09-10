"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { reviewsData } from "../../data/reviews.data";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import RatingSummaryCard from "./RatingSummaryCard";
import { useProductDetailData } from "../../context/useCatalogData";
import { cn } from "@/shared/utils/clsx";

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
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const {
    productData: { commodityReviews },
  } = useProductDetailData();

  // Все отзывы, у которых есть изображения (полный список для модалки)
  const reviewsWithImages = useMemo(
    () =>
      reviewsData.filter((review) => review.images && review.images.length > 0),
    [],
  );

  const galleryPhotos = useMemo(() => {
    return reviewsWithImages.flatMap((review) => {
      const { images, ...rest } = review;
      return images.map((src) => ({
        ...rest,
        src,
        size_fit: rest.size_fit || "",
      }));
    });
  }, [reviewsWithImages]);

  // Открыть модалку с прокруткой к выбранному отзыву
  const openGallery = useCallback(
    (reviewIndex: number) => {
      const photoIndex = reviewsWithImages
        .slice(0, reviewIndex)
        .reduce((sum, review) => sum + review.images.length, 0);
      setSelectedPhotoIndex(photoIndex);
      setIsModalGalleryOpen(true);
    },
    [reviewsWithImages],
  );
  const openGalleryWithoutScroll = useCallback(() => {
    setSelectedPhotoIndex(0);
    setIsModalGalleryOpen(true);
  }, []);

  if (!commodityReviews) return null;
  
  const sizeFeelingModule = commodityReviews.sizeFeelingModule ?? [];

  return (
    <div className="mt-10">
      <Button
        className="justify-between gap-5 w-full"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-1.5 font-roboto_condensed font-bold text-[24px] leading-[28.13px]">
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
                      starIndex >
                        Math.floor(
                          Number(
                            commodityReviews.spuAvgScoreNumber ||
                              commodityReviews.spuAvgScore,
                          ),
                        ) && "text-slate-500",
                    )}
                    width={14}
                    height={14}
                  />
                ))}
              </div>
              <Icon
                icon="circle-question-mark"
                width={14}
                height={14}
                className="text-slate-500"
              />
            </>
          )}
          {commodityReviews.reviewsCount && (
            <span>({commodityReviews.reviewsCount})</span>
          )}
        </div>
        <Icon
          icon="chevron-right"
          width={14}
          height={14}
          className="shrink-0 text-slate-500"
        />
      </Button>{" "}
      {sizeFeelingModule.length > 0 && commodityReviews.spuAvgScore && (
        <Button className="w-full" onClick={() => setIsModalOpen(true)}>
          <RatingSummaryCard
            spuAvgScore={commodityReviews.spuAvgScore}
            className="w-40"
            sizeFeelingModule={sizeFeelingModule}
          />
        </Button>
      )}
      {commodityReviews.goodsContents && (
        <div className="mt-3 flex gap-1 items-center w-full">
          <div className="grid grid-cols-6 gap-1">
            {commodityReviews.goodsContents.map((review, idx) => (
              <img
                key={idx}
                className="aspect-3/4 object-cover cursor-pointer"
                src={review.images[0].imageUrl}
                alt=""
                onClick={() => openGallery(idx)}
              />
            ))}
          </div>
          <Button onClick={openGalleryWithoutScroll}>
            <Icon
              icon="chevron-right"
              width={14}
              height={14}
              className="ml-1"
            />
          </Button>
        </div>
      )}
      <div className="bg-slate-100 h-px my-4" />
      <div className="space-y-6">
        {commodityReviews.reviewsDetailList.slice(0, 2).map((item, index) => {
          const score = Number(item.score);

          return (
            <div
              key={index}
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center">
                    <img
                      className="w-3.5 h-3.5 mr-1"
                      src={item.userIcon || item.defaultIcon}
                      alt=""
                    />
                    <span className="text-[12px] leading-3.5 text-slate-500">
                      {item.userName}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Icon
                        key={starIndex}
                        icon="star"
                        className={
                          starIndex < Math.floor(score)
                            ? "text-slate-500"
                            : "text-slate-300"
                        }
                        width={12}
                        height={12}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[12px] leading-[14.06px] text-slate-500">
                  {item.publishDate}
                </span>
              </div>
              <div className="mt-2 text-[12px] leading-[normal] font-light truncate text-slate-500">
                {item.skuProperty}
              </div>
              <div className="mt-3">
                <div className="overflow-hidden">
                  <span className="text-[14px] leading-4 font-light line-clamp-2">
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
          images={galleryPhotos}
          initialSlide={selectedPhotoIndex}
        />
      )}
      {isModalOpen && <ReviewModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Reviews;
