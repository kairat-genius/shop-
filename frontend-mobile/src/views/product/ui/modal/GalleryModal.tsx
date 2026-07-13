import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "@/shared/utils/clsx";

import "swiper/css";
import "swiper/css/thumbs";

interface GalleryModalProps {
  onClose: (lastIndex: number) => void;
  galleryImages: {
    file: string;
    media_type: string;
    preview_file: string | null;
  }[];
  initialSlide: number;
}

const GalleryModal = ({
  onClose,
  initialSlide,
  galleryImages,
}: GalleryModalProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  // Стейт для счетчика (1 / 8)
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  useBodyScrollLock(true);

  return (
    <Modal onClose={() => onClose(currentSlide)} className="bg-black h-full">
      {/* Шапка: счетчик и кнопка закрытия */}
      <Button
        onClick={() => onClose(currentSlide)}
        className="text-white fixed w-[6.4vw] h-[6.4vw] top-[2.667vw] left-[3.733vw] justify-start items-start z-10"
      >
        <Icon
          icon="chevron-right"
          width={24}
          height={24}
          className="rotate-180"
        />
      </Button>
      <div className="text-[5.333vw] font-bold fixed top-[2.667vw] left-1/2 -translate-x-1/2 font-roboto_condensed leading-[6.133vw] text-white z-10">
        {currentSlide + 1}/{galleryImages.length}
      </div>

      {/* Основной свайпер (на весь экран по центру) */}
      <div className="mt-[27.733vw]">
        <Swiper
          modules={[Thumbs]}
          // Синхронизация с нижним свайпером
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          initialSlide={initialSlide}
          // Обновляем счетчик при свайпе
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="w-full h-full"
        >
          {galleryImages.map((item, idx) => (
            <SwiperSlide
              key={`main-${idx}`}
              className="flex items-center justify-center"
            >
              {item.media_type === "video" ? (
                <video
                  src={item.file}
                  poster={item.preview_file || undefined}
                  controls
                  playsInline
                  className="max-w-full max-h-full object-contain aspect-square"
                />
              ) : (
                <img
                  src={item.file}
                  alt=""
                  className="max-w-full max-h-full object-contain aspect-square"
                  draggable={false}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Нижний Thumbs-свайпер (миниатюры) */}
      <div className="bg-black shrink-0 pb-[6vw] pt-[4vw] px-[4vw]">
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5.5}
          watchSlidesProgress
          className="w-full h-full"
        >
          {galleryImages.map((item, idx) => {
            const isVideo = item.media_type === "video";
            // Если видео, пробуем подставить превью, если его нет — само видео как картинку-заглушку
            const thumbSrc = isVideo ? item.preview_file : item.file;

            return (
              <SwiperSlide
                key={`thumb-${idx}`}
                className={cn(
                  "rounded-[1vw] overflow-hidden cursor-pointer transition-all duration-200",
                  // Выделяем активную миниатюру визуально
                  currentSlide === idx
                    ? "opacity-100 border-[.4vw] border-white"
                    : "opacity-50",
                )}
              >
                {isVideo && !thumbSrc ? (
                  <video
                    src={item.file}
                    className="w-full h-full object-cover aspect-square"
                  />
                ) : (
                  <img
                    src={thumbSrc || ""}
                    className="w-full h-full object-cover aspect-square"
                    alt="thumb"
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Modal>
  );
};

export default GalleryModal;
