"use client";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { reviewsData } from "../../data/reviews.data";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "@/shared/utils/clsx";

interface ReviewDetailModalProps {
  review: (typeof reviewsData)[number];
  initialSlide: number;
  onClose: () => void;
}

const ReviewDetailModal = ({
  onClose,
  initialSlide,
  review,
}: ReviewDetailModalProps) => {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide);

  // Переключение слайда по клику на миниатюру
  const handleThumbClick = (index: number) => {
    mainSwiper?.slideTo(index);
    setActiveIndex(index);
  };

  return (
    <Modal
      onClose={onClose}
      className="bg-white flex flex-col max-w-234 rounded"
    >
      <Button
        className="text-slate-500 absolute top-6 right-6 z-10"
        onClick={onClose}
      >
        <Icon icon="x" width={24} height={24} />
      </Button>

      <div className="overflow-y-auto flex gap-6 pt-11 px-6 pb-8">
        <Swiper
          className="w-130 h-130 shrink-0 relative"
          modules={[Navigation]}
          onSwiper={setMainSwiper}
          initialSlide={initialSlide}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          navigation={{
            nextEl: ".review-gallery-next",
            prevEl: ".review-gallery-prev",
          }}
          allowTouchMove={false}
        >
          {review.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Фото от ${idx}`}
                className="w-full h-full aspect-square object-contain bg-slate-150"
                draggable={false}
              />
            </SwiperSlide>
          ))}
          <Button
            aria-label="prev slide"
            className="absolute top-1/2 -translate-y-1/2 left-4 z-10 review-gallery-prev disabled:opacity-[.3] disabled:cursor-not-allowed"
          >
            <Icon
              icon="chevron-right-gallery"
              height={32}
              width={32}
              className="rotate-180"
            />
          </Button>
          <Button
            aria-label="next slide"
            className="absolute top-1/2 -translate-y-1/2 right-4 z-10 review-gallery-next disabled:opacity-[.3] disabled:cursor-not-allowed"
          >
            <Icon icon="chevron-right-gallery" height={32} width={32} />
          </Button>
        </Swiper>

        <div className="min-w-86 max-h-130 pt-6">
          <div className="flex items-center text-[12px] leading-normal">
            <img
              className="w-5.5 h-5.5 aspect-square rounded-full"
              src={review.avatar}
              alt=""
            />

            <div className="ml-1">{review.username}</div>
            <div className="text-slate-500">{review.date}</div>
          </div>
          <div className="flex gap-1 items-center mt-2">
            <Icon icon="star" width={14} height={14} />{" "}
            <Icon icon="star" width={14} height={14} />{" "}
            <Icon icon="star" width={14} height={14} />{" "}
            <Icon icon="star" width={14} height={14} />{" "}
            <Icon icon="star" width={14} height={14} />
          </div>
          <div className="mt-4 leading-4.5 text-[12px]">{review.text}</div>
          <div className="mt-3 grid grid-cols-3 gap-px">
            {review.images.map((item, index) => (
              <img
                key={index}
                className={cn(
                  "w-28.5 h-28.5 aspect-square border cursor-pointer object-cover",
                  activeIndex === index ? "border-slate-950" : "border-white",
                )}
                src={item}
                onClick={() => handleThumbClick(index)}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDetailModal;
