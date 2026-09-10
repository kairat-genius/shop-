"use client";

import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import { SizeFeelingModuleType } from "@/types/product-detail.type";
import dynamic from "next/dynamic";
import { useState } from "react";

const StarRatingInfoModal = dynamic(
  () => import("../modal/StarRatingInfoModal"),
  {
    ssr: false,
  },
);

interface RatingSummaryCardProps {
  className?: string;
  sizeFeelingModule: SizeFeelingModuleType[];
  spuAvgScore: string;
}

const RatingSummaryCard = ({
  className,
  sizeFeelingModule,
  spuAvgScore,
}: RatingSummaryCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const score = Number(spuAvgScore);

  return (
    <div
      className="mt-3 p-4 rounded-sm gap-4 w-full flex"
      style={{ backgroundColor: "rgba(245, 245, 249, .6)" }}
    >
      <div
        className={cn(
          "w-80 flex items-center justify-center flex-col",
          className,
        )}
      >
        <div className="text-[32px] font-bold leading-7 font-roboto_condensed">
          {spuAvgScore}
        </div>
        <div className="mt-2 flex gap-1 items-center justify-center">
          <div className="flex gap-1 items-center">
            {Array.from({ length: 5 }, (_, starIndex) => (
              <Icon
                key={starIndex}
                icon="star"
                className={cn(
                  starIndex > Math.floor(score) && "text-slate-500",
                )}
                width={14}
                height={14}
              />
            ))}
          </div>

          <Icon
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            icon="circle-question-mark"
            width={14}
            height={14}
            className="shrink-0 text-slate-500"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {sizeFeelingModule.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 text-[12px] text-slate-500 leading-4"
          >
            <div className="max-w-20 w-full truncate text-left">
              {item.title}
            </div>
            <div className="rounded-xs h-1 relative bg-gray-200 w-full">
              <div
                className="bg-slate-500 rounded-sm absolute left-0 h-1"
                style={{ width: item.rateText }}
              />
            </div>
            <div className="w-8 text-right shrink-0">{item.rateText}</div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <StarRatingInfoModal onClose={() => setIsModalOpen(false)}  />
      )}
    </div>
  );
};

export default RatingSummaryCard;
