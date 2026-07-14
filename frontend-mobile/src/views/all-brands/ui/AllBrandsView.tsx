"use client";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import { BRANDS_PREVIEW, POPULAR_BRANDS } from "../data/popylar-brands.data";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Thumbs } from "swiper/modules"; // Импортируем модуль Thumbs
import { categoriesData } from "@/shared/data/category.data";
import products from "@/shared/data/productData.json";
import CategorySection from "@/widgets/category-section";

import "swiper/css";
import "swiper/css/thumbs";
import Icon from "@/shared/icon";

const AllBrandsView = () => {
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

  return (
    <main>
      <Breadcrumbs
        items={[{ title: "Главная", href: "/" }, { title: "Бренды" }]}
      />
      <div className="overflow-x-auto scrollbar-none w-full">
        <div className="px-[3.733vw] inline-flex min-w-max items-center gap-2.5 h-[19.2vw] bg-white">
          {POPULAR_BRANDS.map((brand) => (
            <Link
              key={brand.href}
              className="flex items-center justify-center w-[13.867vw] h-[13.867vw] rounded-full border border-slate-100"
              href={brand.href}
            >
              <img
                className="w-[9.067vw] h-[9.067vw] object-contain"
                src={brand.logoSrc}
                alt={brand.alt}
              />
            </Link>
          ))}
        </div>
      </div>
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
        className="w-full h-full bg-slate-100"
        // Оптимизация тач-событий для мобилок (убирает микро-фризы)
        touchStartPreventDefault={false}
        speed={400}
        noSwipingClass="swiper-no-swiping"
      >
        {allSlides.map((slide) => {
          return (
            <SwiperSlide
              key={slide.slug}
              className="w-full py-[1.6vw] px-[2.667vw]"
            >
              {BRANDS_PREVIEW.map((brand) => (
                <Link
                  key={brand.href}
                  className="mb-[1.6vw] bg-white rounded-[1.067vw] block pt-[2.133vw] px-[2.667vw] pb-[3.2vw]"
                  href={brand.href}
                >
                  <div className="h-[11.2vw] flex items-center">
                    <img
                      className="w-[11.2vw] h-[11.2vw] rounded-[.533vw] object-contain"
                      src={brand.logo}
                      alt={brand.name}
                    />

                    <div className="h-[9.333vw] ml-[2.667vw] flex-1 w-[56.8vw]">
                      <div className="mb-[.533vw] font-roboto_condensed text-[4.267vw] leading-[5.067vw] font-bold truncate">{brand.name}</div>
                      <div className="flex flex-wrap gap-[1.6vw] text-slate-500 font-light text-[3.2vw] leading-[1.3]">
                        <span>71&nbsp;тыс. товаров</span>
                        <span className="w-[.533vw] h-[.533vw] bg-slate-500"/>
                        <span>925 новинок</span>
                      </div>
                    </div>
                    <Icon icon="chevron-right" className="text-slate-400 w-[2.667vw] h-[2.667vw]" />
                  </div>
                  <div className="flex items-center justify-between">
                    {brand.products.map((product, index) => (
                      <div key={index} className="h-[29.333vw] relative overflow-hidden">
                        <img
                          className="w-[26.667vw] h-[26.667vw]"
                          src={product.image}
                          alt=""
                        />

                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 truncate leading-[4.267vw] text-[3.733vw] font-bold font-roboto_condensed">
                          {product.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
};

export default AllBrandsView;
