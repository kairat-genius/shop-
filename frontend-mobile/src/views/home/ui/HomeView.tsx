"use client";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Thumbs } from "swiper/modules"; // Импортируем модуль Thumbs
import { cn } from "@/shared/utils/clsx";
import ProductCard from "@/entities/product-card";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { categoriesData } from "@/shared/data/category.data";
import products from "@/shared/data/productData.json";
import OurAdvantages from "./OurAdvantages";
import Catalog from "./Catalog";
import CategorySection from "./CategorySection";

import "swiper/css";
import "swiper/css/thumbs";

const HomeView = () => {
  // Переносим генерацию слайдов вверх, добавляя "Все" сразу в массив
  const allSlides = useMemo(() => {
    const allSlide = {
      title: "Все",
      slug: "all",
      items: products,
    };
    const categorySlides = categoriesData.map((cat) => ({
      ...cat,
      items: products.filter((p) => p.category === cat.slug),
    }));
    return [allSlide, ...categorySlides];
  }, []);

  // Храним ссылку на инстанс Thumbs Swiper
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // Сколько товаров показывать в каждом слайде
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const slide of allSlides) {
      initial[slide.slug] = Math.min(20, slide.items.length);
    }
    return initial;
  });

  const handleShowMore = (slug: string) => {
    const totalInSlide = allSlides.find(s => s.slug === slug)?.items.length ?? 0;
    setVisibleCounts(prev => ({
      ...prev,
      [slug]: Math.min((prev[slug] || 0) + 4, totalInSlide),
    }));
  };

  return (
    <main>
      {/* Передаем функцию сеттера для связки Thumbs */}
      <CategorySection setThumbsSwiper={setThumbsSwiper} allSlides={allSlides} />

      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        slidesPerView={1}
        className="w-full h-full"
        // Оптимизация тач-событий для мобилок (убирает микро-фризы)
        touchStartPreventDefault={false}
        speed={400} 
      >
        {allSlides.map((slide) => {
          const isAll = slide.slug === "all";
          const itemsToShow = slide.items.slice(0, visibleCounts[slide.slug] ?? 20);
          const hasMore = (visibleCounts[slide.slug] ?? 0) < slide.items.length;

          return (
            <SwiperSlide key={slide.slug} className="w-full">
              <Catalog />
              
              {isAll && <OurAdvantages />}
              
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
                          isFirstRow && "border-t"
                        )}
                      />
                    );
                  })
                ) : (
                  <div className="col-span-2 text-center py-8 text-slate-400">
                    В этой категории пока нет товаров
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
    </main>
  );
};

export default HomeView;