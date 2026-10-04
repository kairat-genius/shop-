"use client";

import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
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
  sizeFeelingModule: SizeFeelingModuleType[];
  spuAvgScore: string;
}

const RatingSummaryCard = ({
  sizeFeelingModule,
  spuAvgScore,
}: RatingSummaryCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const score = Number(spuAvgScore);

  return (
    <>
      <div className="flex items-center justify-between mt-[3.2vw] p-[3.2vw] rounded-[1.067vw] gap-[3.2vw] w-full bg-[rgba(245,245,249,.6)]">
        <div className="w-[27.733vw] flex flex-col items-center">
          <div className="text-[6.4vw] font-bold leading-[7.467vw] font-roboto_condensed">
            {spuAvgScore}
          </div>
          <div className="mt-[1.067vw] flex gap-[1.067vw] items-center justify-center">
            <div className="flex gap-[1.067vw] items-center">
              {Array.from({ length: 5 }, (_, starIndex) => (
                <Icon
                  key={starIndex}
                  icon="star"
                  className={cn(
                    "w-[3.2vw] h-[3.2vw]",
                    starIndex > Math.floor(score) && "text-slate-500",
                  )}
                />
              ))}
            </div>
            <Icon
              icon="circle-question-mark"
              className="w-[3.2vw] h-[3.2vw] text-slate-500"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex-col gap-[2.133vw] flex-1 w-full"
        >
          {sizeFeelingModule.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-[1.067vw] text-[2.933vw] text-slate-500 leading-[3.467vw] w-full"
            >
              <div className="max-w-[21.333vw] w-full truncate text-left">
                {item.title}
              </div>
              <div className="rounded-[.533vw] h-[1.067vw] relative bg-gray-200 w-full">
                <div
                  className="bg-slate-500 rounded-[.533vw] absolute left-0 h-[1.067vw]"
                  style={{ width: item.rateText }}
                />
              </div>
              <div className="w-[7.467vw] text-right shrink-0">
                {item.rateText}
              </div>
            </div>
          ))}
        </Button>
        {isModalOpen && (
          <StarRatingInfoModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </>
  );
};

export default RatingSummaryCard;
