"use client";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Thumbs } from "swiper/modules";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import CategorySection from "@/widgets/category-section";

import "swiper/css";
import "swiper/css/thumbs";

import type { BrandFeedResponseType } from "@/types/brand-feed.type";
import { useBrandFeed } from "../model/useBrandFeed";
import { BrandCard } from "./BrandCard";
import { PopularBrands } from "./PopularBrands";
import { LoadMoreSentinel } from "./LoadMoreSentinel";

interface AllBrandsViewProps {
  initialData: BrandFeedResponseType;
}

const AllBrandsView = ({ initialData }: AllBrandsViewProps) => {
  const allSlides = useMemo(() => {
    const tabs =
      initialData.categoryRecommend?.firstCategoryRecommendList ?? [];
    return tabs.map((tab) => ({
      title: tab.categoryName,
      slug: tab.categoryId === undefined ? "all" : String(tab.categoryId),
      categoryId: tab.categoryId,
    }));
  }, [initialData.categoryRecommend]);

  const popularBrands = initialData.accessBrand?.brandList ?? [];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = allSlides[activeSlideIndex];

  const { brandsByCategory, handleShowMore } = useBrandFeed(
    initialData,
    "all",
    activeSlide?.categoryId,
  );

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <main>
      <Breadcrumbs
        items={[{ title: "Главная", href: "/" }, { title: "Бренды" }]}
      />

      <PopularBrands brands={popularBrands} />

      <CategorySection
        setThumbsSwiper={setThumbsSwiper}
        allSlides={allSlides}
      />

      <Swiper
        modules={[Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        slidesPerView={1}
        className="w-full bg-slate-100 min-h-[calc(100dvh-45vw)]"
        touchStartPreventDefault={false}
        speed={400}
        // noSwipingClass можно вообще убрать, если нигде не используешь
        onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
      >
        {allSlides.map((slide, index) => {
          const categoryKey =
            slide.categoryId === undefined ? "all" : String(slide.categoryId);
          const category = brandsByCategory[categoryKey];

          const shouldRender = Math.abs(activeSlideIndex - index) <= 1;
          const items = shouldRender ? (category?.items ?? []) : [];
          const hasMore = category?.hasMore ?? false;
          const isFetching = category?.isFetchingMore ?? false;
          const isLoading =
            !category && activeSlideIndex === index && shouldRender;

          return (
            <SwiperSlide
              key={slide.slug}
              className="w-full py-[1.6vw] px-[2.667vw] !h-full"
            >
              <div>
                {isLoading ? (
                  <div className="text-center py-8 text-slate-400">
                    Загрузка брендов...
                  </div>
                ) : items.length > 0 ? (
                  items.map((brand, i) => (
                    <BrandCard key={`${brand.brandId}-${i}`} brand={brand} />
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    В этой категории пока нет брендов
                  </div>
                )}

                {shouldRender && hasMore && (
                  <LoadMoreSentinel
                    onIntersect={() => handleShowMore(slide.categoryId)}
                    disabled={isFetching}
                  />
                )}
                {isFetching && (
                  <div className="text-center py-4 text-slate-400 text-[3vw]">
                    Загрузка...
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
};

export default AllBrandsView;
