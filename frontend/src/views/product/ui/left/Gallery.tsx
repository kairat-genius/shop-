"use client";

import {
  FreeMode,
  Navigation,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";

interface GalleryProps {
  medias: {
    file: string;
    media_type: string;
    preview_file: string | null;
  }[];
}

const Gallery = ({ medias }: GalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative pl-[4rem]">
      <div className="absolute inset-y-0 left-0 w-[4.1rem] pr-[.3rem]">
        <Swiper
          onSwiper={setThumbsSwiper}
          className="h-full w-[3.8rem]"
          slidesPerView={"auto"}
          spaceBetween={4}
          direction={"vertical"}
          freeMode
          watchSlidesProgress
          modules={[Thumbs, FreeMode]}
        >
          {medias.map((item, index) => (
            <SwiperSlide
              key={index}
              onMouseEnter={() => mainSwiperRef.current?.slideTo(index, 300)}
              className="max-h-[3.8rem] w-[3.8rem] h-[3.8rem] rounded-sm border border-slate-100 [&.swiper-slide-thumb-active]:border-[1.3px] [&.swiper-slide-thumb-active]:border-slate-950 overflow-hidden"
            >
              <img
                src={
                  (item.media_type === "video"
                    ? item.preview_file
                    : item.file) || ""
                }
                alt=""
                width={73}
                height={73}
                className="cursor-pointer aspect-square object-contain w-full h-full"
                loading="lazy"
                decoding="async"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Navigation]}
        className="w-full max-w-130 group"
        wrapperClass="h-full"
        allowTouchMove={false}
        onSwiper={(swiper) => {
          mainSwiperRef.current = swiper;
        }}
        loop
        navigation={{
          nextEl: ".gallery-next",
          prevEl: ".gallery-prev",
        }}
      >
        {medias.map((item, index) => (
          <SwiperSlide key={index}>
              <img
                src={
                  (item.media_type === "video"
                    ? item.preview_file
                    : item.file) || ""
                }
                alt=""
                height={520}
                width={520}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className="aspect-square w-full h-auto object-cover bg-white"
                draggable={false}
              />
          </SwiperSlide>
        ))}
        <Button
          aria-label="prev slide"
          className="z-1 absolute shrink-0 left-4 top-1/2 -translate-y-1/2 gallery-prev opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200"
        >
          <Icon
            icon="chevron-right-gallery"
            height={24}
            width={24}
            className="rotate-180"
          />
        </Button>
        <Button
          aria-label="next slide"
          className="z-1 absolute shrink-0 right-4 top-1/2 -translate-y-1/2 gallery-next opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200"
        >
          <Icon icon="chevron-right-gallery" height={24} width={24} />
        </Button>
      </Swiper>
    </div>
  );
};

export default Gallery;
