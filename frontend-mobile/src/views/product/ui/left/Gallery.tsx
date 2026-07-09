"use client";

// Добавили Mousewheel в импорты
import {
  FreeMode,
  Mousewheel,
  Navigation,
  Scrollbar,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import { getImageUrl } from "@/shared/utils/getImageUrl";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  const handleVideo = (swiper: SwiperType | null) => {
    if (!swiper) return;

    for (const video of swiper.el.querySelectorAll("video")) {
      video.pause();
    }

    if (!isVisible.current) return;

    const activeVideo =
      swiper.slides[swiper.activeIndex]?.querySelector("video");

    if (activeVideo) {
      activeVideo.play().catch((error) => {
        console.log("Autoplay blocked", error);
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible.current = entry.isIntersecting;
          handleVideo(mainSwiperRef.current);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute inset-y-0 left-0 w-20.5">
        <div className="custom-gallery-scrollbar absolute right-0 top-0 bottom-0 w-1.5 bg-slate-100 rounded-full z-10 [&>.swiper-scrollbar-drag]:bg-slate-300 [&>.swiper-scrollbar-drag]:rounded-full cursor-pointer hover:[&>.swiper-scrollbar-drag]:bg-slate-400 transition-colors" />
        <Swiper
          onSwiper={setThumbsSwiper}
          className="h-full w-full"
          slidesPerView={"auto"}
          spaceBetween={4}
          direction={"vertical"}
          freeMode
          watchSlidesProgress
          mousewheel
          modules={[Thumbs, FreeMode, Scrollbar, Mousewheel]}
          scrollbar={{
            el: ".custom-gallery-scrollbar",
            draggable: true,
            hide: true,
          }}
        >
          {medias.map((item, index) => (
            <SwiperSlide
              key={index}
              onMouseEnter={() => mainSwiperRef.current?.slideTo(index, 300)}
              className="max-w-19 max-h-19 w-19 h-19 rounded-sm border border-slate-100 [&.swiper-slide-thumb-active]:border-[1.3px] [&.swiper-slide-thumb-active]:border-slate-950"
            >
              <img
                src={
                  item.media_type === "video"
                    ? getImageUrl(`${item.preview_file}?width=520`)
                    : getImageUrl(`${item.file}?width=520`)
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

      <div className="pl-20">
        <Swiper
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs, Navigation]}
          className="w-full max-w-130 group"
          wrapperClass="h-full"
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
            handleVideo(swiper);
          }}
          onSlideChange={(swiper) => {
            handleVideo(swiper);
          }}
          loop
          navigation={{
            nextEl: ".gallery-next",
            prevEl: ".gallery-prev",
          }}
        >
          {medias.map((item, index) => (
            <SwiperSlide key={index}>
              {item.media_type === "video" ? (
                <video
                  src={getImageUrl(item.file)}
                  poster={
                    item.preview_file
                      ? getImageUrl(`${item.preview_file}?width=520`)
                      : undefined
                  }
                  preload="auto"
                  muted
                  playsInline
                  controls={false}
                  loop
                  className="aspect-square w-full h-auto object-contain bg-white"
                />
              ) : (
                <img
                  src={getImageUrl(`${item.file}?width=520`)}
                  alt=""
                  height={520}
                  width={520}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  className="aspect-square w-full h-auto object-cover bg-white"
                  draggable={false}
                />
              )}
            </SwiperSlide>
          ))}
          <Button
            aria-label="prev slide"
            className="z-1 absolute left-4 top-1/2 -translate-y-1/2 gallery-prev opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200"
          >
            <Icon
              icon="chevron-right-gallery"
              height={24}
              width={24}
              className="shrink-0 rotate-180"
            />
          </Button>
          <Button
            aria-label="next slide"
            className="z-1 absolute right-4 top-1/2 -translate-y-1/2 gallery-next opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200"
          >
            <Icon
              icon="chevron-right-gallery"
              height={24}
              width={24}
              className="shrink-0"
            />
          </Button>
        </Swiper>
      </div>
    </div>
  );
};

export default Gallery;
