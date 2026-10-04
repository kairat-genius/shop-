"use client";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/shared/utils/clsx";
import type { SalePropertiesType } from "@/types/product-detail.type";
import { getImageUrl } from "@/shared/utils/getImageUrl";
import { useProductDetailData } from "../../context/useCatalogData";

import "swiper/css";
import { GalleryImage } from "../../model/useGalleryData";

interface GalleryModalProps {
  onClose: (lastIndex: number) => void;
  initialSlide: number;
  colorProperty?: SalePropertiesType;
  getImagesForColor: (colorValueId: number | null) => GalleryImage[];
}

const GalleryModal = ({
  onClose,
  initialSlide,
  colorProperty,
  getImagesForColor,
}: GalleryModalProps) => {
  const {
    activeSku,
    selectSku,
    selectProduct,
    selectedPropertyValueIds,
    isLoading,
    productData: {
      buyDialogModel: {
        detail: { spuId: currentSpuId },
      },
    },
  } = useProductDetailData();

  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const [optimisticColorValueId, setOptimisticColorValueId] = useState<
    number | null
  >(null);

  const mainSwiperRef = useRef<import("swiper").Swiper | null>(null);

  useBodyScrollLock(true);

  const colorItems = useMemo(
    () =>
      colorProperty?.propertyList.flatMap((group) =>
        group.propertyItemModels.map((item) => ({
          propertyValueId: item.propertyValueId,
          spuId: item.spuId,
          url: item.url,
          value: item.value,
        })),
      ) ?? [],
    [colorProperty],
  );

  const hasColors = colorItems.length > 0;

  const globalColorValueId = useMemo(
    () =>
      (colorProperty
        ? selectedPropertyValueIds[colorProperty.definitionId]
        : undefined) ??
      activeSku?.properties.find((property) =>
        colorItems.some(
          (item) => item.propertyValueId === property.propertyValueId,
        ),
      )?.propertyValueId ??
      null,
    [colorProperty, selectedPropertyValueIds, activeSku, colorItems],
  );

  // Инициализация + синхронизация с глобальным состоянием
  useEffect(() => {
    setOptimisticColorValueId((prev) =>
      prev === null ? globalColorValueId : prev,
    );
  }, [globalColorValueId]);

  useEffect(() => {
    // Когда глобальный цвет догнал оптимистичный — фиксируем его как эталон
    if (globalColorValueId === optimisticColorValueId) return;
    if (!isLoading) setOptimisticColorValueId(globalColorValueId);
  }, [globalColorValueId, isLoading, optimisticColorValueId]);

  const displayColorValueId = optimisticColorValueId ?? globalColorValueId;

  const galleryImages = useMemo(
    () => getImagesForColor(displayColorValueId),
    [getImagesForColor, displayColorValueId],
  );

  // Сброс слайда при смене цвета — через ref, без remount Swiper
  useEffect(() => {
    setCurrentSlide(0);
    mainSwiperRef.current?.slideTo(0, 0);
  }, [displayColorValueId]);

  const handleColorChange = (item: (typeof colorItems)[number]) => {
    if (item.propertyValueId === displayColorValueId) return;

    // 1. Мгновенный UI-отклик
    setOptimisticColorValueId(item.propertyValueId);
    setCurrentSlide(0);
    mainSwiperRef.current?.slideTo(0, 0);

    // 2. Глобальное состояние (SKU/SPU)
    if (item.spuId === currentSpuId) {
      selectSku(item.propertyValueId);
    } else {
      void selectProduct(item.spuId);
    }
  };

  return (
    <Modal onClose={() => onClose(currentSlide)} className="bg-black h-full">
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

      {/* Основной свайпер — БЕЗ key, чтобы не пересоздавать */}
      <div className="mt-[27.733vw] relative">
        <Swiper
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          initialSlide={0}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="w-full h-full"
        >
          {galleryImages.map((item, idx) => (
            <SwiperSlide
              key={`main-${item.id}-${idx}`}
              className="flex items-center justify-center"
            >
              <img
                src={getImageUrl(item.url, 720)}
                alt=""
                className="max-w-full max-h-full object-contain aspect-square"
                draggable={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {isLoading && (
          <div className=" absolute inset-0 z-50 flex items-center justify-center bg-black/30 pointer-events-none">
            <div className="w-[8vw] h-[8vw] border-[.6vw] border-white/80 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {hasColors && (
        <div className="bg-black shrink-0 pb-[6vw] pt-[4vw] px-[4vw]">
          <Swiper
            spaceBetween={10}
            slidesPerView={5.5}
            watchSlidesProgress
            className="w-full h-full"
          >
            {colorItems.map((color) => {
              const isActive = displayColorValueId === color.propertyValueId;

              return (
                <SwiperSlide
                  key={`color-${color.propertyValueId}`}
                  onClick={() => handleColorChange(color)}
                  className={cn(
                    "rounded-[1vw] overflow-hidden cursor-pointer transition-all duration-200",
                    isActive
                      ? "opacity-100 border-[.4vw] border-white"
                      : "opacity-50",
                  )}
                >
                  <img
                    src={getImageUrl(color.url, 720)}
                    className="w-full h-full object-cover aspect-square"
                    alt={color.value}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </Modal>
  );
};

export default GalleryModal;
