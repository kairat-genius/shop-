"use client";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import { cn } from "@/shared/utils/clsx";
import ProductCard from "@/entities/product-card";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import productsData from "@/shared/data/productData.json";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

// Заглушки для вкладок (позже можно заменить реальными данными)
const recommendedTabs = [
  { title: "Рекомендуемые", slug: "recommended" },
  { title: "Баскетбол", slug: "basketball" },
  { title: "Волейбольные кроссовки", slug: "volleyball" },
  { title: "Беговые кроссовки", slug: "running" },
  { title: "Детская обувь в стиле Ханьфу", slug: "hanfu" },
  { title: "Детская обувь с кристаллами и стразами", slug: "crystals" },
  { title: "Детские сабо", slug: "sabot" },
  { title: "Детские уличные тапочки", slug: "slippers" },
  { title: "Детские домашние тапочки", slug: "home-slippers" },
  { title: "Бейсбольные бутсы", slug: "baseball" },
];

const RecommendedProducts = () => {
  // Формируем слайды – для каждой вкладки берём пока все товары (реальная фильтрация будет по slug)
  const allSlides = useMemo(() => {
    return recommendedTabs.map((tab) => ({
      ...tab,
      items: productsData, // или productsData.filter(p => p.subcategory === tab.slug)
    }));
  }, []);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
    () => {
      const initial: Record<string, number> = {};
      for (const slide of allSlides) {
        initial[slide.slug] = Math.min(20, slide.items.length);
      }
      return initial;
    },
  );

  const handleShowMore = (slug: string) => {
    const total = allSlides.find((s) => s.slug === slug)?.items.length ?? 0;
    setVisibleCounts((prev) => ({
      ...prev,
      [slug]: Math.min((prev[slug] || 0) + 4, total),
    }));
  };

  return (
    <section className="mt-[3.2vw]">
      <h2 className="text-[4.8vw] font-bold font-roboto_condensed px-[3.733vw] leading-[5.6vw] mb-[2.133vw]">
        ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ
      </h2>

      {/* Thumbs Swiper (вкладки) */}
      <div className="sticky top-[12.8vw] bg-white z-10 pb-[2.667vw]">
        <Swiper
          onSwiper={(swiper) => {
            setThumbsSwiper(swiper);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          slidesPerView="auto"
          freeMode
          watchSlidesProgress
          modules={[FreeMode]}
          className="flex-1 h-full select-none w-full"
        >
          {allSlides.map((slide) => (
            <SwiperSlide
              key={slide.slug}
              className="max-w-fit h-full flex items-center"
            >
              <Button
                className={cn(
                  "px-[2.667vw] h-full items-start text-center font-light text-slate-800 relative flex flex-col justify-center",
                  "in-[.swiper-slide-thumb-active]:font-medium first:pl-[4.267vw] last:pr-[4.267vw]",
                )}
              >
                <span className="z-1 relative leading-[5.333vw] text-[3.2vw]">
                  {slide.title}
                </span>
                <div className="top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2 w-[1.333vw] h-[5.333vw] bg-teal-300 opacity-0 pointer-events-none rotate-40 transition-opacity duration-200 in-[.swiper-slide-thumb-active]:opacity-100" />
              </Button>
            </SwiperSlide>
          ))}
          <div
            className={cn(
              "absolute left-0 inset-y-0 w-[8vw] h-full bg-linear-to-r from-white to-transparent pointer-events-none z-10 transition-opacity duration-300",
              isBeginning && "opacity-0",
            )}
          />
          <div
            className={cn(
              "absolute right-0 inset-y-0 w-[8vw] h-full bg-linear-to-l from-white to-transparent pointer-events-none z-10 transition-opacity duration-300",
              isEnd && "opacity-0",
            )}
          />
        </Swiper>
      </div>

      {/* Основной Swiper (контент) */}
      <Swiper
        modules={[Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        slidesPerView={1}
        className="w-full h-full"
        touchStartPreventDefault={false}
        speed={400}
      >
        {allSlides.map((slide) => {
          const itemsToShow = slide.items.slice(
            0,
            visibleCounts[slide.slug] ?? 20,
          );
          const hasMore = (visibleCounts[slide.slug] ?? 0) < slide.items.length;

          return (
            <SwiperSlide key={slide.slug}>
              <div className="grid grid-cols-2">
                {itemsToShow.length > 0 ? (
                  itemsToShow.map((product, idx) => {
                    const isLeft = idx % 2 === 0;
                    const isFirstRow = idx < 2;
                    return (
                      <ProductCard
                        key={product.slug}
                        product={product}
                        className={cn(
                          "border-b",
                          isLeft && "border-r",
                          isFirstRow && "border-t",
                        )}
                      />
                    );
                  })
                ) : (
                  <div className="col-span-2 text-center py-8 text-slate-400">
                    В этой подборке пока нет товаров
                  </div>
                )}
              </div>
              {hasMore && (
                <Button
                  onClick={() => handleShowMore(slide.slug)}
                  className="h-[5.333vw] gap-[2.667vw] text-[2.933vw] font-semibold px-[3.2vw] mx-auto my-[5.333vw] border rounded-xl border-slate-800"
                >
                  <span>Показать больше</span>
                  <Icon
                    icon="chevron-down"
                    width={14}
                    height={14}
                    className="rotate-180"
                  />
                </Button>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default RecommendedProducts;
