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
import { useCatalogData } from "@/shared/context/catalog-data";
import { useHomeProducts } from "../model/useHomeProducts";
import OurAdvantages from "./OurAdvantages";
import Catalog from "./Catalog";
import CategorySection from "@/widgets/category-section";

import "swiper/css";
import "swiper/css/thumbs";
import FavoriteButton from "@/features/favorites-button";
import Link from "next/link";
import type { ProductListSearchResponseType } from "@/types/product-list-search.type";

interface HomeViewProps {
  initialData: ProductListSearchResponseType;
}

const HomeView = ({ initialData }: HomeViewProps) => {
  const { categoryData } = useCatalogData();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const allSlides = useMemo(() => {
    const allSlide = { title: "Все", slug: "all", categoryId: undefined };
    const categorySlides = categoriesData.slice(0, 7).map((cat) => ({
      ...cat,
      categoryId: categoryData.categories.find(
        (category) => category.title === cat.title,
      )?.id,
    }));
    return [allSlide, ...categorySlides];
  }, [categoryData.categories]);

  // Храним ссылку на инстанс Thumbs Swiper
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const activeSlide = allSlides[activeSlideIndex];
  const { productsByCategory, handleShowMore } = useHomeProducts(
    initialData,
    activeSlide?.categoryId,
  );

  return (
    <main>
      {/* Передаем функцию сеттера для связки Thumbs */}
      <CategorySection setThumbsSwiper={setThumbsSwiper} allSlides={allSlides}>
        <Link
          href="/all-categories"
          className="shrink-0 flex items-center w-[9.067vw] h-[8vw] mb-[1.333vw] pl-[1.067vw] bg-white z-20"
        >
          <Icon
            icon="menu"
            width={23}
            height={23}
            className="h-[5.333vw] w-[5.333vw]"
          />
        </Link>
      </CategorySection>

      <Swiper
        modules={[Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        slidesPerView={1}
        className="w-full h-full"
        // Оптимизация тач-событий для мобилок (убирает микро-фризы)
        touchStartPreventDefault={false}
        speed={400}
        noSwipingClass="swiper-no-swiping"
        onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
      >
        {allSlides.map((slide, index) => {
          const isAll = slide.slug === "all";
          const categoryKey = slide.categoryId?.toString() ?? "all";
          const categoryProducts = productsByCategory[categoryKey];
          const shouldRenderContent = Math.abs(activeSlideIndex - index) <= 1;
          const itemsToShow = shouldRenderContent
            ? (categoryProducts?.items ?? [])
            : [];
          const hasMore = categoryProducts?.hasMore ?? false;
          const isLoading =
            !categoryProducts &&
            !isAll &&
            activeSlideIndex === index &&
            slide.categoryId !== undefined;

          return (
            <SwiperSlide key={slide.slug} className="w-full">
              {shouldRenderContent && (
                <div
                  className="swiper-no-swiping"
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {isAll ? (
                    <Catalog categoryId="all" />
                  ) : (
                    slide.categoryId !== undefined && (
                      <Catalog categoryId={slide.categoryId} />
                    )
                  )}
                  {isAll && <OurAdvantages />}
                </div>
              )}
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
                    <div className="col-span-2 text-center py-8 text-slate-400 h-full">
                      В этой категории пока нет товаров
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
    </main>
  );
};

export default HomeView;
