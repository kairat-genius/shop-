"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import dynamic from "next/dynamic";
import { Button } from "@/shared/ui/action";

const GalleryModal = dynamic(() => import("./modal/GalleryModal"), {
  ssr: false,
});

const ShareModal = dynamic(() => import("./modal/ShareModal"), { ssr: false });

interface GalleryProps {
  medias: {
    file: string;
    media_type: string;
    preview_file: string | null;
  }[];
}

const Gallery = ({ medias }: GalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const mainSwiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative">
      <Button
        className="right-[3.733vw] top-[4.8vw] absolute z-10"
        onClick={() => setIsShareModalOpen(true)}
      >
        <img
          src="/static-media/detail/share.png"
          alt="share"
          className="aspect-square w-[6.4vw] h-[6.4vw]"
        />
      </Button>
      <div className="bottom-[12.267vw] left-1/2 -translate-x-1/2 absolute z-10 py-[.8vw] px-[1.6vw] rounded-[1.067vw] bg-[hsla(0,0%,100%,.8)] pointer-events-none">
        <div className="leading-[3.125vw] text-[2.667vw] max-w-[92.533vw] text-slate-500 ">
          Белый Серый
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        className="w-full group"
        wrapperClass="h-full"
      >
        {medias.map((item, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            {item.media_type === "video" ? (
              <video
                src={item.file}
                poster={item.preview_file ? `${item.preview_file}` : undefined}
                preload="auto"
                muted
                playsInline
                controls={false}
                loop
                className="aspect-square w-screen h-[100vw] object-contain bg-white"
              />
            ) : (
              <img
                src={`${item.file}`}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className="aspect-square w-screen h-[100vw] object-cover bg-white"
                draggable={false}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {isModalOpen && (
        <GalleryModal
          galleryImages={medias}
          // eslint-disable-next-line react-hooks/refs
          initialSlide={mainSwiperRef.current?.realIndex ?? 0}
          onClose={(newIndex) => {
            setIsModalOpen(false);

            if (mainSwiperRef.current) {
              mainSwiperRef.current.slideToLoop(newIndex, 0);
            }
          }}
        />
      )}
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}
    </div>
  );
};

export default Gallery;
