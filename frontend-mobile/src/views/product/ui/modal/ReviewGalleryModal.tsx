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

interface ReviewGalleryModalProps {
  onClose: () => void;
  reviews: Array<{
    username: string;
    avatar: string;
    date: string;
    images: string[];
  }>;
  initialIndex: number; // индекс отзыва, к которому нужно проскроллить
}

const ReviewGalleryModal = ({
  onClose,
  reviews,
  initialIndex,
}: ReviewGalleryModalProps) => {
  useBodyScrollLock(true);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (initialIndex >= 0) {
      const target = itemRefs.current[initialIndex];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [initialIndex]);

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

      <div ref={listRef} className="overflow-y-auto h-[calc(90vh-16vw)]">
        {reviews.map((review, index) => (
          <div
            key={review.username + review.date}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="border-b-[2.133vw] border-slate-100"
          >
            {/* Карусель фотографий отзыва */}
            <div>
              <Swiper
                slidesPerView={1}
                loop={review.images.length >= 2}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="w-full [&_.swiper-pagination-bullet]:w-1 [&_.swiper-pagination-bullet]:h-1 [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination]:bottom-[3.733vw]"
                wrapperClass="h-full"
              >
                {review.images.map((image, imgIndex) => (
                  <SwiperSlide key={imgIndex}>
                    <img
                      src={image}
                      alt={`Фото ${imgIndex + 1} от ${review.username}`}
                      loading={
                        index === initialIndex && imgIndex === 0
                          ? undefined
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
            <div className="p-[3.733vw] flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="rounded-full w-[5.867vw] h-[5.867vw]"
                  src={review.avatar}
                  alt=""
                />
                <div className="ml-[1.067vw] text-[2.933vw] leading-[normal]">
                  {review.username}
                </div>
              </div>
              <div className="text-[2.933vw] leading-[normal] text-slate-500">
                {review.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ReviewGalleryModal;
