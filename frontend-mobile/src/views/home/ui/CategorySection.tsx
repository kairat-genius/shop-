import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode } from "swiper/modules";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";

import "swiper/css/free-mode";

interface CategorySectionProps {
  setThumbsSwiper: (swiper: SwiperType) => void;
  allSlides: Array<{ title: string; slug: string }>;
}

const CategorySection = ({
  setThumbsSwiper,
  allSlides,
}: CategorySectionProps) => {
  return (
    <section className="flex items-center h-[9.067vw] bg-white top-[12.8vw] z-10 sticky">
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView="auto"
        freeMode
        watchSlidesProgress
        modules={[FreeMode]}
        className="flex-1 h-full select-none w-full"
      >
        {allSlides.map((slide) => (
          <SwiperSlide
            key={slide.slug}
            className="max-w-fit h-full flex items-center first:pl-[2.133vw] last:pr-[2.133vw]"
          >
            <Button
              className={cn(
                "px-[2.133vw] h-full items-start text-center font-light text-slate-500 relative flex flex-col justify-center",
                "in-[.swiper-slide-thumb-active]:font-roboto_condensed in-[.swiper-slide-thumb-active]:font-bold in-[.swiper-slide-thumb-active]:text-slate-950",
              )}
            >
              <span
                className={cn(
                  "relative leading-[7.467vw] transition-all",
                  slide.slug === "all" ? "text-[4.267vw]" : "text-[3.733vw]",
                )}
              >
                {slide.title}
              </span>

              <div className="bottom-px absolute left-1/2 -translate-x-1/2 w-[9.6vw] h-[0.533vw] bg-slate-950 rounded-[0.533vw] opacity-0 pointer-events-none transition-opacity duration-200 in-[.swiper-slide-thumb-active]:opacity-100" />
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link
        href="/"
        className="shrink-0 flex items-center w-[9.067vw] h-[8vw] mb-[1.333vw] pl-[1.067vw] bg-white z-20"
      >
        <Icon
          icon="menu"
          width={23}
          height={23}
          className="h-[5.333vw] w-[5.333vw]"
        />
      </Link>
    </section>
  );
};

export default CategorySection;
