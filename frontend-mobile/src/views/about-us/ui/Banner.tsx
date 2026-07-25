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
              <span class="block h-1 w-1 rounded-full bg-white opacity-20 group-[.swiper-pagination-bullet-active]:opacity-100 transition-opacity"></span>
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
            <div className="relative w-full">
              <div className="w-full h-[89.6vw] pt-[6.4vw] px-[3.733vw]">
                <div className="leading-[normal] font-bold text-[6.4vw] font-roboto_condensed">
                  {slide.titleLine1}
                </div>
                <div className="leading-[normal] font-bold text-[6.4vw] font-roboto_condensed">
                  {slide.titleLine2}
                </div>
                <div className="mt-[1.067vw] text-[3.2vw] font-light leading-[normal]">
                  {slide.description}
                </div>
              </div>
              <img
                className="absolute inset-0 -z-1 w-full h-full object-cover"
                src={slide.image}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-pagination absolute bottom-[3.733vw] left-1/2 flex -translate-x-1/2 z-10" />
      </Swiper>
    </section>
  );
};

export default Banner;
