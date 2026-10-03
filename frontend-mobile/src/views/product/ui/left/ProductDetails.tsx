"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { useRef, useState } from "react";
import { cn } from "@/shared/utils/clsx";
import type { DetailImageListType } from "@/types/product-detail.type";


interface ProductDetailsProps {
  detailImageList: DetailImageListType[];
}

const ProductDetails = ({ detailImageList }: ProductDetailsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (isExpanded) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="px-[3.733vw] pt-[2.667vw] pb-[3.2vw]" ref={sectionRef}>
      <h2 className="text-[4.8vw] leading-[5.6vw] font-bold font-roboto_condensed">
        ПОДРОБНЕЕ
      </h2>
      <div
        className={cn(
          "relative mt-[3.2vw] flex flex-col gap-[.533vw] overflow-hidden",
          !isExpanded &&
            "max-h-[52vw] overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-[11.733vw] after:bg-linear-to-t after:from-white after:to-transparent",
        )}
      >
        {detailImageList.map((image, index) => (
          <img
            key={index}
            className="object-contain h-full w-full"
            src={image.url}
            alt=""
            loading="lazy"
          />
        ))}
      </div>
      <Button
        onClick={handleToggle}
        className="mt-[2.133vw] h-[3.733vw] text-slate-500 gap-[.533vw] w-full"
      >
        <div className="text-[3.2vw] leading-[3.749vw]">
          {isExpanded ? "Показать меньше" : "Показать больше"}
        </div>
        <Icon
          icon="chevron-down"
          className={cn(
            "transition-transform duration-300 w-[3.2vw] h-[3.2vw]",
            isExpanded && "rotate-180",
          )}
        />
      </Button>
    </div>
  );
};

export default ProductDetails;
