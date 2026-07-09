"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { useRef, useState } from "react";
import { cn } from "@/shared/utils/clsx";

const images = [
  "https://cdn-img.thepoizon.ru/trade/gondor/10667402/20260527-a3b572501ffa90fb-w2048h2048.png?x-oss-process=image/resize,s_720/format,webp",
  "https://cdn-web.poizon.com/web-dewu-static/node-common/2f5a6652-9855-4d1e-decc-edf7be694821-6144-6144.jpg?x-oss-process=image/resize,s_720/format,webp",
  "https://cdn-img.thepoizon.ru/node-common/25650c23-2b87-b1e9-481c-22fd39c26725-694-886.jpg?x-oss-process=image/resize,s_720/format,webp",
];

const ProductDetails = () => {
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
      <div className="text-2xl leading-7 font-bold font-roboto_condensed">
        ПОДРОБНЕЕ
      </div>
      <div
        className={cn(
          "relative mt-3 flex flex-col gap-0.5 overflow-hidden",
          !isExpanded &&
            "max-h-86.75 overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-28 after:bg-linear-to-t after:from-white after:to-transparent",
        )}
      >
        {images.map((src, i) => (
          <img
            key={i}
            className="aspect-square object-cover"
            src={src}
            alt=""
            loading="lazy"
          />
        ))}
      </div>
      <Button
        onClick={handleToggle}
        className="mt-2 text-slate-500 gap-0.5 w-full"
      >
        <div className="text-sm leading-4">
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
