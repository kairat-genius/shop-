"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "@/entities/product-card";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { useViewedProducts } from "../model/useViewedProducts";

const ViewedProducts = () => {
  const viewedProducts = useViewedProducts();


  // не рендерим пустой блок
  if (viewedProducts.length === 0) return null;
  return (
    <section className="w-[60rem] mx-auto mt-10">
      <h2 className="text-[24px] font-bold font-roboto_condensed leading-7">
        ВЫ СМОТРЕЛИ
      </h2>
      <div className="mt-5">
        <Swiper
          slidesPerView={6}
          slidesPerGroup={6}
          modules={[Navigation]}
          className="w-full"
          navigation={{
            nextEl: ".viewed-next",
            prevEl: ".viewed-prev",
          }}
          allowTouchMove={false}
        >
          {viewedProducts.map((product, index) => (
            <SwiperSlide
              key={product.spuId}
              className={(index + 1) % 6 === 0 ? "" : "pr-[.8rem]"}
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
          <Button
            aria-label="prev slide"
            className="z-1 absolute left-0 top-29.25 viewed-prev [&.swiper-button-lock]:hidden"
          >
            <Icon
              icon="chevron-right-gallery"
              height={32}
              width={32}
              className="rotate-180"
            />
          </Button>
          <Button
            aria-label="next slide"
            className="z-1 absolute right-0 top-29.25 viewed-next [&.swiper-button-lock]:hidden"
          >
            <Icon icon="chevron-right-gallery" height={32} width={32} />
          </Button>
        </Swiper>
      </div>
    </section>
  );
};

export default ViewedProducts;
