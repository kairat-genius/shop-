"use client";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Link from "next/link";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { categorySwiperData } from "../data/categorySwiper.data";
import "swiper/css";
import { cn } from "@/shared/utils/clsx";

const CategorySwiper = () => {
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className="relative w-full min-w-0">
      <div
        style={{
          maxWidth: "calc(100% - 68px)",
          WebkitMaskImage: isEnd
            ? "none"
            : "linear-gradient(90deg, #fff 95%, transparent)",
          maskImage: isEnd
            ? "none"
            : "linear-gradient(90deg, #fff 95%, transparent)",
        }}
      >
        <Swiper
          slidesPerView={"auto"}
          modules={[Navigation]}
          navigation={{
            nextEl: ".category-header-next",
            prevEl: ".category-header-prev",
          }}
          onReachEnd={() => setIsEnd(true)}
          onFromEdge={() => setIsEnd(false)}
          spaceBetween={32}
          className="w-full"
          allowTouchMove={false}
          simulateTouch={false}
          slidesPerGroup={4}
        >
          {categorySwiperData.map((category, index) => (
            <SwiperSlide
              key={category.href}
              className={cn(
                "max-w-fit",
                index === categorySwiperData.length - 1 && "pr-1.5",
              )}
            >
              <Link href={category.href} className="text-sm whitespace-nowrap">
                {category.title}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-17 absolute flex items-center gap-6 right-0 top-1/2 -translate-y-1/2">
        <Button className="shrink-0 category-header-prev rotate-180 disabled:cursor-not-allowed disabled:opacity-[0.3]">
          <Icon icon="chevron-right" width={22} height={22} />
        </Button>
        <Button className="shrink-0 category-header-next disabled:cursor-not-allowed disabled:opacity-[0.3]">
          <Icon icon="chevron-right" width={22} height={22} />
        </Button>
      </div>
    </div>
  );
};

export default CategorySwiper;
