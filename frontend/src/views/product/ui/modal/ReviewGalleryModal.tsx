"use client";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import { useEffect, useState, useMemo } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { cn } from "@/shared/utils/clsx";

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

interface ReviewGalleryModalProps {
  onClose: () => void;
  images: GalleryImage[];
  initialSlide: number;
  loadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

const ReviewGalleryModal = ({
  onClose,
  images,
  initialSlide,
  loadMore,
  hasMore,
  isLoading,
}: ReviewGalleryModalProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const activeImage = images[activeIndex];

  useBodyScrollLock(true);

  // 1. Мемоизируем модули, чтобы Swiper не пересоздавался при каждом рендере
  const swiperModules = useMemo(() => [Thumbs, Navigation], []);

  // Обновляем состояния начала и конца слайдера при подгрузке новых изображений
  useEffect(() => {
    if (thumbsSwiper && !thumbsSwiper.destroyed) {
      thumbsSwiper.update();
      setIsBeginning(thumbsSwiper.isBeginning);
      setIsEnd(thumbsSwiper.isEnd);
    }
  }, [images, thumbsSwiper]);

  // Фоновая подгрузка при просмотре главных фото (если осталось 8 до конца)
  useEffect(() => {
    if (
      hasMore &&
      !isLoading &&
      loadMore &&
      images.length - activeIndex <= 8
    ) {
      loadMore();
    }
  }, [activeIndex, images.length, hasMore, isLoading, loadMore]);

  const handleScroll = () => {
    if (hasMore && !isLoading && loadMore) {
      loadMore();
    }
  };

  return (
    <Modal
      onClose={onClose}
      className="bg-white rounded flex flex-col max-w-240"
    >
      {/* Шапка */}
      <div className="flex items-center justify-between px-6 py-[19.5px]">
        <h2 className="font-roboto_condensed leading-5.75 tracking-[-.5px] text-[20px] font-bold">
          Подборка образов
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" width={20} height={20} />
        </Button>
      </div>

      <div className="overflow-y-auto pb-6 px-6 h-[calc(88vh-54px)]">
        <div className="flex mb-4 gap-4">
          {/* Главный слайдер */}
          <div className="w-144 h-144 relative">
            <Swiper
              className="w-full h-full"
              modules={swiperModules}
              // 2. Включаем обсерверы
              observer={true}
              observeParents={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              initialSlide={initialSlide}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              navigation={{
                nextEl: ".review-gallery-next",
                prevEl: ".review-gallery-prev",
              }}
              allowTouchMove={false}
            >
              {images.map((img, idx) => (
                // 3. Уникальный ключ
                <SwiperSlide key={`${img.src}-${idx}`}>
                  <img
                    src={img.src}
                    alt={`Фото от ${img.userName}`}
                    className="w-full h-full aspect-square object-contain bg-slate-150"
                    draggable={false}
                  />
                </SwiperSlide>
              ))}
              <div
                style={{
                  cursor:
                    "url('https://cdn-img.thepoizon.ru/node-common/c6afa077-085c-c77b-af22-3ee9727cbb4c-120-120.png?x-oss-process=image/format,webp/resize,w_40/resize,h_40') 12 12, w-resize",
                }}
                className="absolute w-1/2 h-full top-0 left-0 z-10 review-gallery-prev disabled:cursor-not-allowed"
              />
              <div
                className="absolute w-1/2 h-full top-0 right-0 z-10 review-gallery-next disabled:cursor-not-allowed"
                style={{
                  cursor:
                    "url('https://cdn-img.thepoizon.ru/node-common/ef736441-4ec1-b0e7-6b14-2b2b14e55551-120-120.png?x-oss-process=image/format,webp/resize,w_40/resize,h_40') 12 12, w-resize",
                }}
              />
            </Swiper>
          </div>

          {/* Информация о пользователе */}
          {activeImage && (
            <div className="w-full">
              <div className="flex">
                <img
                  className="w-5.5 h-5.5 rounded-full object-cover"
                  src={activeImage.userIcon}
                  alt={activeImage.userName}
                />

                <div className="font-light text-[12px] ml-1 leading-normal">
                  {activeImage.userName}
                </div>
                <div className="flex gap-1 items-center ml-1">
                  <Icon icon="star" width={12} height={12} />
                  <Icon icon="star" width={12} height={12} />
                  <Icon icon="star" width={12} height={12} />
                  <Icon icon="star" width={12} height={12} />
                  <Icon icon="star" width={12} height={12} />
                </div>
                <div className="font-light text-[12px] ml-auto">
                  {activeImage.publishDate}
                </div>
              </div>
              <div className="mt-1 text-[12px] leading-4 font-light text-slate-500">
                {activeImage.skuProperty}
              </div>
              <div className="text-[12px] leading-4.5 mt-3">
                {activeImage.reviewData.join(" ")}
              </div>
            </div>
          )}
        </div>
        <div className="w-144 flex items-center gap-2.5">
          <Button
            className="disabled:cursor-not-allowed disabled:text-slate-300 shrink-0"
            onClick={() => thumbsSwiper?.slidePrev()}
            disabled={isBeginning}
          >
            <Icon
              icon="chevron-right"
              className="rotate-180"
              width={20}
              height={20}
            />
          </Button>
          {images.length > 1 && (
            <Swiper
              modules={swiperModules}
              // 2. Включаем обсерверы
              observer={true}
              observeParents={true}
              onSwiper={(swiper) => {
                setThumbsSwiper(swiper);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
                
                // 4. Подгрузка при прокрутке миниатюр
                if (swiper.progress > 0.6 && hasMore && !isLoading && loadMore) {
                  loadMore();
                }
              }}
              spaceBetween={4}
              slidesPerGroup={13}
              slidesPerView={13}
              watchSlidesProgress
              className="w-full"
              allowTouchMove={false}
            >
              {images.map((img, idx) => (
                <SwiperSlide
                  // 3. Уникальный ключ
                  key={`${img.src}-${idx}`}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    activeIndex === idx && "border-scale before:border-2",
                  )}
                >
                  <img
                    src={img.src}
                    className="w-full h-full object-cover aspect-3/4"
                    alt={`thumb-${idx}`}
                  />
                  {activeIndex === idx && (
                    <div className="absolute border border-white inset-px pointer-events-none" />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <Button
            className="disabled:cursor-not-allowed disabled:text-slate-300 shrink-0"
            onClick={() => {
              if (isEnd) {
                handleScroll();
              } else {
                thumbsSwiper?.slideNext();
              }
            }}
            disabled={isEnd && !hasMore}
          >
            <Icon icon="chevron-right" width={20} height={20} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewGalleryModal;