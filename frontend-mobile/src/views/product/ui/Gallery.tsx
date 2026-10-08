"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";
import { useGalleryData } from "../model/useGalleryData";
import { getImageUrl } from "@/shared/utils/getImageUrl";

const GalleryModal = dynamic(() => import("./modal/GalleryModal"), {
  ssr: false,
});

const ShareModal = dynamic(() => import("./modal/ShareModal"), { ssr: false });

type GalleryTab = "products" | "styles" | "outfits" | "sizes";

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const mainSwiperRef = useRef<import("swiper").Swiper | null>(null);

  const [activeTab, setActiveTab] = useState<GalleryTab>("products");
  const [activeImageIndex, setActiveImageIndex] = useState(1);

  const {
    colorProperty,
    activeColorValueId,
    gallerySections,
    displayImages,
    firstSectionId,
    getSectionState,
    getImagesForColor,
  } = useGalleryData();

  useEffect(() => {
    if (!firstSectionId) return;

    const resetId = window.setTimeout(() => {
      setActiveTab(firstSectionId);
      setActiveImageIndex(1);
      mainSwiperRef.current?.slideToLoop(0, 0);
    }, 0);

    return () => window.clearTimeout(resetId);
  }, [activeColorValueId, firstSectionId]);

  const tabs = gallerySections.map((section) => ({
    id: section.id,
    label: `${section.label} ${
      activeTab === section.id ? activeImageIndex : 1
    }/${section.images.length}`,
  }));

  const handleTabChange = (tab: GalleryTab) => {
    const imageIndex = gallerySections
      .slice(
        0,
        gallerySections.findIndex((section) => section.id === tab),
      )
      .reduce((total, section) => total + section.images.length, 0);

    mainSwiperRef.current?.slideToLoop(imageIndex, 300);
  };

  if (displayImages.length === 0) {
    return null;
  }

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
          {colorProperty && activeColorValueId && (
            <>
              {
                colorProperty.propertyList
                  .flatMap((group) => group.propertyItemModels)
                  .find((item) => item.propertyValueId === activeColorValueId)
                  ?.value
              }
            </>
          )}
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        className="w-full group"
        wrapperClass="h-full"
        onSlideChange={(swiper) => {
          const sectionState = getSectionState(swiper.realIndex);
          setActiveTab(sectionState.id);
          setActiveImageIndex(sectionState.imageIndex);
        }}
      >
        {displayImages.map((item, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <div className="relative h-full w-full overflow-hidden">
              {item.hasBackdrop && (
                <div
                  className="absolute inset-0 z-2 scale-[1.1] bg-cover bg-position-[50%] blur-[20px]"
                  style={{ backgroundImage: `url(${item.url})` }}
                />
              )}
              <img
                src={getImageUrl(item.url, 720)}
                alt=""
                height={520}
                width={520}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className="relative z-5 aspect-square object-contain w-screen h-[100vw]"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="absolute bottom-0 left-0 z-20 px-4 pb-4">
          <div className="bg-[rgba(245,245,248,.7)] rounded-[40px] backdrop-blur-[20px] flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "leading-[normal] cursor-pointer whitespace-nowrap text-[10px] p-1.5 rounded-[33px]",
                  activeTab === tab.id
                    ? "text-slate-950 bg-white"
                    : "text-slate-500",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Swiper>
      {isModalOpen && (
        <GalleryModal
          initialSlide={mainSwiperRef.current?.realIndex ?? 0}
          colorProperty={colorProperty}
          getImagesForColor={getImagesForColor}
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