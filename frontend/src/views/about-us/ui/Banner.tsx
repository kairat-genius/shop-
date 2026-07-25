"use client";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BANNER_SLIDES } from "../data/banner.data";

const Banner = () => {
  return (
    <section>
      <Swiper
        className="w-full h-full"
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          renderBullet: (index, className) => {
            return `<span class="${className} inline-block p-1.25 cursor-pointer group">
              <span class="block h-1.5 w-1.5 rounded-full bg-white opacity-20 group-[.swiper-pagination-bullet-active]:opacity-100 transition-opacity"></span>
            </span>`;
          },
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {BANNER_SLIDES.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[18rem] w-full">
              <div className="w-[72rem] h-full mx-auto pt-[4.5rem] px-[6rem]">
                <div className="leading-none font-bold text-[2.5rem] font-roboto_condensed">
                  {slide.titleLine1}
                </div>
                <div className="leading-none font-bold text-[2.5rem] font-roboto_condensed">
                  {slide.titleLine2}
                </div>
                <div className="mt-2 w-[27rem] text-[1rem] font-light leading-normal">
                  {slide.description}
                </div>
              </div>
              <img
                className="absolute  inset-0 -z-1 w-full h-[18rem]"
                src={slide.image}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-pagination absolute bottom-4 left-1/2 flex -translate-x-1/2 z-10" />
      </Swiper>
    </section>
  );
};

export default Banner;
