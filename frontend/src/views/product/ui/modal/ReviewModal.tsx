"use client";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { useCallback, useMemo, useState } from "react";
import { reviewsData } from "../../data/reviews.data";
import dynamic from "next/dynamic";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ReviewGalleryModal = dynamic(
  () => import("../modal/ReviewGalleryModal"),
  {
    ssr: false,
  },
);

interface ReviewModalProps {
  onClose: () => void;
}

const ReviewModal = ({ onClose }: ReviewModalProps) => {
  useBodyScrollLock(true);
  const [isModalGalleryOpen, setIsModalGalleryOpen] = useState(false);
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
    () => reviewsWithImages.slice(0, 20),
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

  return (
    <Modal
      onClose={onClose}
      className="bg-white flex flex-col max-w-240 rounded"
    >
      <div className="flex items-center justify-between px-6 py-[19.5px] border-b border-slate-100">
        <h2 className="font-roboto_condensed leading-5.75 tracking-[-.5px] text-[20px] font-bold">
          <span>ОТЗЫВЫ</span>
          <span>(58)</span>
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" width={20} height={20} />
        </Button>
      </div>

      <div className="overflow-y-auto h-[calc(88vh-54px)] px-6">
        <div
          className="mt-3 p-4 rounded-sm gap-4 w-full flex"
          style={{ backgroundColor: "rgba(245, 245, 249, .6)" }}
        >
          <div className="w-80 flex items-center flex-col">
            <div className="text-[32px] font-bold leading-7 font-roboto_condensed">
              5,0
            </div>
            <div className="mt-2 flex gap-1 items-center justify-center">
              <div className="flex gap-1 items-center">
                <Icon icon="star" width={14} height={14} className="shrink-0" />
                <Icon icon="star" width={14} height={14} className="shrink-0" />
                <Icon icon="star" width={14} height={14} className="shrink-0" />
                <Icon icon="star" width={14} height={14} className="shrink-0" />
                <Icon icon="star" width={14} height={14} className="shrink-0" />
              </div>
              <Icon
                icon="circle-question-mark"
                width={14}
                height={14}
                className="shrink-0 text-slate-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-1 text-[12px] text-slate-500 leading-4">
              <div className="max-w-20 w-full truncate text-left">
                Маломерит
              </div>
              <div className="rounded-xs h-1 relative bg-gray-200 w-full">
                <div
                  className="bg-slate-500 rounded-sm absolute left-0 h-1"
                  style={{ width: "11%" }}
                />
              </div>
              <div className="w-8 text-right shrink-0">11%</div>
            </div>
            <div className="flex items-center gap-1 text-[12px] text-slate-500 leading-4">
              <div className="max-w-20 w-full truncate text-left">В размер</div>
              <div className="rounded-xs h-1 relative bg-gray-200 w-full">
                <div
                  className="bg-slate-500 rounded-sm absolute left-0 h-1"
                  style={{ width: "89%" }}
                />
              </div>
              <div className="w-8 text-right shrink-0">89%</div>
            </div>
            <div className="flex items-center gap-1 text-[12px] text-slate-500 leading-4">
              <div className="max-w-20 w-full truncate text-left">
                Большемерит
              </div>
              <div className="rounded-xs h-1 relative bg-gray-200 w-full">
                <div
                  className="bg-slate-500 rounded-sm absolute left-0 h-1"
                  style={{ width: "0%" }}
                />
              </div>
              <div className="w-8 text-right shrink-0">0%</div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-3.5 items-center w-full">
          <Button className="review-gallery1-prev disabled:cursor-not-allowed disabled:text-[#C7C7D7]">
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
            modules={[Navigation]}
            className="w-full"
            navigation={{
              nextEl: ".review-gallery1-next",
              prevEl: ".review-gallery1-prev",
            }}
            allowTouchMove={false}
          >
            {galleryPreviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <img
                  key={review.username + review.date}
                  className="aspect-3/4 object-cover cursor-pointer"
                  src={review.images[0]}
                  alt={`Фото от ${review.username}`}
                  onClick={() => openGallery(idx)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Button className="review-gallery1-next disabled:cursor-not-allowed disabled:text-[#C7C7D7]">
            <Icon icon="chevron-right" width={20} height={20} />
          </Button>
        </div>
        <div className="py-3 border-b border-slate-100 flex gap-0.5">
          <Icon
            icon="shield-check"
            className="text-[#01C2C3]"
            width={20}
            height={20}
          />
          <div className="text-slate-500 text-[14px] font-light leading-[19.6px]">
            Опираясь на передовые алгоритмы и экспертную оценку, мы представляем
            вам достоверные и действенные отзывы.
          </div>
        </div>
        <div className="">
          {reviewsData.slice(0, 10).map((item, index) => (
            <div key={index} className="py-3 border-b border-slate-100">
              <div>
                <div className="flex items-center">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center">
                      <img
                        className="w-5.5 h-5.5 mr-1"
                        src={item.avatar}
                        alt=""
                      />
                      <span className="text-[12px] leading-normal">
                        {item.username}
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
                    {item.date}
                  </span>
                </div>
                <div className="mt-4 font-light text-[12px] truncate leading-normal text-slate-500">
                  <span>Размер: {item.size}</span>
                  <span>, </span>
                  <span>Цвет: {item.color}</span>
                </div>
                <div className="mt-3 leading-[16.41px] font-light text-[14px]">
                  {item.text}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-3 text-[12px] font-light leading-normal text-slate-500">
                  <div>Соответствие размеру: В размер</div>
                </div>
              </div>
              <div className="mt-3 flex gap-1 mb-7.5">
                {item.images.map((img, imgindex) => (
                  <img
                    src={img}
                    key={imgindex}
                    alt=""
                    className="max-w-24.5 max-h-24.5 aspect-square object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalGalleryOpen && reviewsWithImages.length > 0 && (
        <ReviewGalleryModal
          onClose={() => setIsModalGalleryOpen(false)}
          images={galleryPhotos}
          initialSlide={selectedPhotoIndex}
        />
      )}
    </Modal>
  );
};

export default ReviewModal;
