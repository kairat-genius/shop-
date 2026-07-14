import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";
import { useState } from "react";
import Link from "next/link";
import { TRENDING_SEARCHES } from "../data/trending-searches.data";

export const TrendingSearches = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = isExpanded
    ? TRENDING_SEARCHES
    : TRENDING_SEARCHES.slice(0, 7);

  return (
    <section className="px-[3.733vw]">
      <div className="flex items-center justify-between pt-[8vw] pb-[3.2vw]">
        <div className="font-roboto_condensed font-bold text-[4.267vw] leading-[5.333vw]">
          Часто ищут
        </div>
        <Button>
          <Icon
            className="w-[4.267vw] h-[4.267vw] text-[#AAAABB]"
            icon="rotate-cw"
          />
        </Button>
      </div>
      <div className="flex flex-wrap text-[3.2vw] leading-[normal]">
        {visibleItems.map((item, index) => (
          <Link
            href={`/search?keyword=${encodeURIComponent(item.title)}`}
            key={index}
            className="h-[10.133vw] pr-[2.133vw] rounded-[.533vw] bg-slate-150 mr-[1.6vw] mb-[1.6vw] flex items-center"
          >
            <img
              className="w-[9.6vw] h-[9.6vw] mr-[1.6vw] ml-px"
              src={item.image}
              alt=""
            />

            <div className="truncate">{item.title}</div>
          </Link>
        ))}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-[10.133vw] w-[10.133vw] rounded-[.533vw] bg-slate-50"
        >
          <Icon
            icon="chevron-down"
            width={12}
            height={12}
            className={cn(
              "transition-transform duration-300",
              isExpanded && "rotate-180",
            )}
          />
        </Button>
      </div>
    </section>
  );
};
