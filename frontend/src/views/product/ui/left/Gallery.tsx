"use client";

import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import { useProductDetailData } from "../../context/useCatalogData";

type GalleryTab = "products" | "styles" | "outfits" | "sizes";

type GalleryImage = {
  id: number;
  url: string;
  hasBackdrop?: boolean;
};

const Gallery = () => {
  const mainSwiperRef = useRef<import("swiper").Swiper | null>(null);
  const [activeTab, setActiveTab] = useState<GalleryTab>("products");
  const [activeImageIndex, setActiveImageIndex] = useState(1);

  const {
    activeSku,
    selectedPropertyValueIds,
    productData: {
      imageModels,
      mainImgWearStyleResp,
      buyDialogModel: { imageModelList, saleImages, saleProperties },
    },
  } = useProductDetailData();
  const allImageModels = [...imageModels, ...(imageModelList ?? [])].filter(
    (item, index, images) =>
      images.findIndex((candidate) => candidate.imageId === item.imageId) ===
      index,
  );

  const activeColorValueId =
    selectedPropertyValueIds[1] ??
    activeSku?.properties.find((property) =>
      saleProperties.some(
        (saleProperty) =>
          saleProperty.definitionId === 1 &&
          saleProperty.propertyList.some((group) =>
            group.propertyItemModels.some(
              (item) => item.propertyValueId === property.propertyValueId,
            ),
          ),
      ),
    )?.propertyValueId ??
    null;

  const productImageModels =
    saleImages?.[String(activeColorValueId)] ?? imageModels;
  const productImagesByColor: GalleryImage[] = productImageModels
    .filter(
      (item) =>
        item.genericType.startsWith("PHOTO") &&
        (activeColorValueId === null ||
          item.propertyValueId === activeColorValueId),
    )
    .map((item) => ({ id: item.imageId, url: item.url }));
  const selectedColorImage = saleProperties
    .find((saleProperty) => saleProperty.definitionId === 1)
    ?.propertyList.flatMap((group) => group.propertyItemModels)
    .find((item) => item.propertyValueId === activeColorValueId)?.url;
  const productImages: GalleryImage[] =
    productImagesByColor.length > 0
      ? productImagesByColor
      : selectedColorImage
        ? [{ id: activeColorValueId ?? 0, url: selectedColorImage }]
        : [];
  const styleImages: GalleryImage[] =
    mainImgWearStyleResp?.spuItems.map((item) => ({
      id: item.contentId,
      url: item.url,
      hasBackdrop: true,
    })) ?? [];
  const outfitImages: GalleryImage[] = allImageModels
    .filter(
      (item) =>
        item.label === 1 ||
        item.genericType.includes("OUTFIT") ||
        item.imgEvenTrace.includes('"position":"outfits"'),
    )
    .map((item) => ({ id: item.imageId, url: item.url }));
  const sizeImages: GalleryImage[] = allImageModels
    .filter(
      (item) =>
        item.label === 2 ||
        item.genericType.startsWith("SIZE_CAPACITY_DIAGRAM"),
    )
    .map((item) => ({ id: item.imageId, url: item.url }));

  const gallerySections = [
    { id: "products" as const, label: "Товары", images: productImages },
    { id: "styles" as const, label: "Стили", images: styleImages },
    { id: "outfits" as const, label: "Наряды", images: outfitImages },
    { id: "sizes" as const, label: "Размер", images: sizeImages },
  ].filter((section) => section.images.length > 0);
  const displayImages = gallerySections.flatMap((section) => section.images);
  const firstSectionId = gallerySections[0]?.id;

  useEffect(() => {
    if (!firstSectionId) return;

    const resetId = window.setTimeout(() => {
      setActiveTab(firstSectionId);
      setActiveImageIndex(1);
      mainSwiperRef.current?.slideToLoop(0, 0);
    }, 0);

    return () => window.clearTimeout(resetId);
  }, [activeColorValueId, firstSectionId]);

  const getSectionState = (imageIndex: number) => {
    let sectionStart = 0;

    for (const section of gallerySections) {
      const sectionEnd = sectionStart + section.images.length;

      if (imageIndex < sectionEnd) {
        return {
          id: section.id,
          imageIndex: imageIndex - sectionStart + 1,
        };
      }

      sectionStart = sectionEnd;
    }

    return { id: "products" as const, imageIndex: 1 };
  };

  const tabs = gallerySections.map((section) => ({
    id: section.id,
    label: `${section.label} ${activeTab === section.id ? activeImageIndex : 1}/${section.images.length}`,
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
    <div className="relative pl-[4rem]">
      <div className="absolute inset-y-0 left-0 w-[4.1rem] pr-[.3rem]">
        <Swiper
          className="h-full w-[3.8rem]"
          slidesPerView={"auto"}
          spaceBetween={4}
          direction="vertical"
          freeMode
          watchSlidesProgress
          modules={[FreeMode]}
        >
          {displayImages.map((item, index) => (
            <SwiperSlide
              key={`${item.id}-${index}`}
              onMouseEnter={() =>
                mainSwiperRef.current?.slideToLoop(index, 300)
              }
              className="max-h-[3.8rem] w-[3.8rem] h-[3.8rem] rounded-sm border border-slate-100 [&.swiper-slide-thumb-active]:border-[1.3px] [&.swiper-slide-thumb-active]:border-slate-950 overflow-hidden"
            >
              <img
                src={item.url}
                alt=""
                width={73}
                height={73}
                className="cursor-pointer aspect-square object-cover w-full h-full"
                loading="lazy"
                decoding="async"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        slidesPerView={1}
        modules={[FreeMode, Navigation]}
        className="w-full max-w-130 group"
        wrapperClass="h-full"
        allowTouchMove={false}
        onSwiper={(swiper) => {
          mainSwiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          const sectionState = getSectionState(swiper.realIndex);
          setActiveTab(sectionState.id);
          setActiveImageIndex(sectionState.imageIndex);
        }}
        loop
        navigation={{
          nextEl: ".gallery-next",
          prevEl: ".gallery-prev",
        }}
      >
        {displayImages.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`}>
            <div className="relative h-full w-full overflow-hidden">
              {item.hasBackdrop && (
                <div
                  className="absolute inset-0 z-2 scale-[1.1] bg-cover bg-position-[50%] blur-[20px]"
                  style={{ backgroundImage: `url(${item.url})` }}
                />
              )}
              <img
                src={item.url}
                alt=""
                height={520}
                width={520}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className="relative z-5 aspect-square w-full h-auto object-contain"
                draggable={false}
              />
            </div>
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
    </div>
  );
};

export default Gallery;
