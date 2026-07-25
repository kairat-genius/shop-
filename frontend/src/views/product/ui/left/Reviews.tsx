"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { reviewsData } from "../../data/reviews.data";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
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
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

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

  // Первые 6 отзывов с фото для галереи на странице
  const galleryPreviews = useMemo(
    () => reviewsWithImages.slice(0, 6),
    [reviewsWithImages],
  );

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

  return (
    <div className="mt-10">
      <Button
        className="justify-between gap-5 w-full"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-1.5 font-roboto_condensed font-bold text-[24px] leading-[28.13px]">
          <span>ОТЗЫВЫ</span>
          <span>(37)</span>
        </div>
        <Icon
          icon="chevron-right"
          width={14}
          height={14}
          className="shrink-0 text-slate-500"
        />
      </Button>
      <Button className="w-full" onClick={() => setIsModalOpen(true)}>
        <RatingSummaryCard className="w-40" />
      </Button>

      <div className="mt-3 flex gap-1 items-center w-full">
        <div className="grid grid-cols-6 gap-1">
          {galleryPreviews.map((review, idx) => (
            <img
              key={review.username + review.date}
              className="aspect-3/4 object-cover cursor-pointer"
              src={review.images[0]}
              alt={`Фото от ${review.username}`}
              onClick={() => openGallery(idx)}
            />
          ))}
        </div>
        <Button onClick={openGalleryWithoutScroll}>
          <Icon icon="chevron-right" width={14} height={14} className="ml-1" />
        </Button>
      </div>
      <div className="bg-slate-100 h-px my-4" />
      <div className="space-y-6">
        {reviewsData.slice(0, 2).map((item, index) => (
          <div
            key={index}
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center">
                  <img className="w-3.5 h-3.5 mr-1" src={item.avatar} alt="" />
                  <span className="text-[12px] leading-3.5 text-slate-500">
                    {item.username}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Icon
                    icon="star"
                    className="text-slate-500"
                    width={12}
                    height={12}
                  />
                  <Icon
                    icon="star"
                    className="text-slate-500"
                    width={12}
                    height={12}
                  />
                  <Icon
                    icon="star"
                    className="text-slate-500"
                    width={12}
                    height={12}
                  />
                  <Icon
                    icon="star"
                    className="text-slate-500"
                    width={12}
                    height={12}
                  />
                  <Icon
                    icon="star"
                    className="text-slate-500"
                    width={12}
                    height={12}
                  />
                </div>
              </div>
              <span className="text-[12px] leading-[14.06px] text-slate-500">
                {item.date}
              </span>
            </div>
            <div className="mt-2 text-[12px] leading-[normal] font-light truncate text-slate-500">
              Размер: 39 RU (40 EU), Цвет: Розовый
            </div>
            <div className="mt-3">
              <div className="overflow-hidden">
                <span className="text-[14px] leading-4 font-light line-clamp-2">
                  {item.text}
                </span>
              </div>
            </div>
          </div>
        ))}
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
