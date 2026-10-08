"use client";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import { cn } from "@/shared/utils/clsx";
import ProductCard from "@/entities/product-card";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import FavoriteButton from "@/features/favorites-button";

import type { ProductListSearchResponseType } from "@/types/product-list-search.type";
import type { NormalizedFacetItem } from "@/widgets/product-list/utils/getFacetList"; // ← поправь путь
import { useCategoryProducts } from "../model/useCategoryProducts";

interface RecommendedProductsProps {
  initialData: ProductListSearchResponseType;
  frontCategoryId: number;
  categoryList: NormalizedFacetItem[];
}

const RecommendedProducts = ({
  initialData,
  frontCategoryId,
  categoryList,
}: RecommendedProductsProps) => {
  // Собираем слайды: [Рекомендуемые, ...категории из фасета]
  const allSlides = useMemo(() => {
    const recommended = {
      title: "Рекомендуемые",
      slug: "recommended",
      categoryId: frontCategoryId,
    };

    const categorySlides = categoryList.map((item) => ({
      title: item.title,
      slug: item.id, // уникальный ключ для Swiper
      categoryId: Number(item.id),
    }));

    return [recommended, ...categorySlides];
  }, [frontCategoryId, categoryList]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = allSlides[activeSlideIndex];

  const { productsByCategory, handleShowMore } = useCategoryProducts(
    initialData,
    frontCategoryId,
    activeSlide?.categoryId,
  );

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Если категорий в фасете нет — ничего не рендерим
  if (allSlides.length === 0) return null;

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
        onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
      >
        {allSlides.map((slide, index) => {
          const categoryKey =
            slide.categoryId === undefined ? "all" : String(slide.categoryId);
          const categoryProducts = productsByCategory[categoryKey];

          const shouldRenderContent = Math.abs(activeSlideIndex - index) <= 1;
          const itemsToShow = shouldRenderContent
            ? (categoryProducts?.items ?? [])
            : [];
          const hasMore = categoryProducts?.hasMore ?? false;
          const isLoading =
            !categoryProducts &&
            activeSlideIndex === index &&
            slide.categoryId !== undefined;

          return (
            <SwiperSlide key={slide.slug}>
              <div className="grid grid-cols-2">
                {shouldRenderContent &&
                  (isLoading ? (
                    <div className="col-span-2 text-center py-8 text-slate-400">
                      Загрузка товаров...
                    </div>
                  ) : itemsToShow.length > 0 ? (
                    itemsToShow.map((product, productIndex) => {
                      const isLeft = productIndex % 2 === 0;
                      const isFirstRow = productIndex < 2;
                      return (
                        <ProductCard
                          key={product.spuId}
                          product={product}
                          className={cn(
                            "border-b",
                            isLeft && "border-r",
                            isFirstRow && "border-t",
                          )}
                        >
                          <FavoriteButton className=" absolute top-[4.8vw] right-[4vw] text-slate-500">
                            <Icon
                              icon="heart"
                              className="w-[4.8vw] h-[4.8vw]"
                            />
                          </FavoriteButton>
                        </ProductCard>
                      );
                    })
                  ) : (
                    <div className="col-span-2 text-center py-8 text-slate-400">
                      В этой подборке пока нет товаров
                    </div>
                  ))}
              </div>

              {shouldRenderContent && hasMore && (
                <Button
                  onClick={() => handleShowMore(slide.categoryId)}
                  disabled={categoryProducts?.isFetchingMore}
                  className="h-[5.333vw] gap-[2.667vw] text-[2.933vw] font-semibold px-[3.2vw] mx-auto my-[5.333vw] border rounded-xl border-slate-800"
                >
                  <span>
                    {categoryProducts?.isFetchingMore
                      ? "Загрузка..."
                      : "Показать больше"}
                  </span>
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