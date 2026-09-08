"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { useRef, useState } from "react";
import { cn } from "@/shared/utils/clsx";
import { DetailImageListType } from "@/types/product-detail.type";

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
    <div className="mt-10" ref={sectionRef}>
      <div className="text-[24px] leading-7 font-bold font-roboto_condensed">
        ПОДРОБНЕЕ
      </div>
      <div
        className={cn(
          "relative mt-3 flex flex-col gap-0.5 overflow-hidden",
          !isExpanded &&
            "max-h-86.75 overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-28 after:bg-linear-to-t after:from-white after:to-transparent",
        )}
      >
        {detailImageList.map((image, index) => (
          <img
            key={index}
            className="aspect-square object-cover"
            src={image.url}
            alt=""
            loading="lazy"
          />
        ))}
      </div>
      <Button
        onClick={handleToggle}
        className="mt-2 text-slate-500 gap-0.5 w-full"
      >
        <div className="text-[14px] leading-4">
          {isExpanded ? "Показать меньше" : "Показать больше"}
        </div>
        <Icon
          icon="chevron-down"
          width={16}
          height={16}
          className={cn(
            "transition-transform duration-300 shrink-0",
            isExpanded && "rotate-180",
          )}
        />
      </Button>
    </div>
  );
};

export default ProductDetails;
