"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";

export interface FilterOption {
  id: string;
  title: string;
  label?: string;
  labelUrl?: string;
}

interface FilterOptionsProps {
  items: FilterOption[];
  selectedValues: (string | number)[];
  onToggle: (id: string) => void;
  showColors?: boolean;
}

const FilterOptions = ({
  items,
  selectedValues,
  onToggle,
  showColors = false,
}: FilterOptionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(items.length);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const children = [...container.children].filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement && child.dataset.type === "item",
    );

    if (children.length === 0) {
      setIsMeasuring(false);
      return;
    }

    let currentTop = children[0].offsetTop;
    let rowCount = 1;
    let cutOffIndex = -1;

    for (const [index, child] of children.entries()) {
      if (child.offsetTop > currentTop + 5) {
        currentTop = child.offsetTop;
        rowCount += 1;
      }

      if (rowCount > 3) {
        cutOffIndex = index;
        break;
      }
    }

    if (cutOffIndex === -1) {
      setVisibleCount(items.length);
      setHasMore(false);
    } else {
      setVisibleCount(Math.max(1, cutOffIndex - 1));
      setHasMore(true);
    }

    setIsMeasuring(false);
  }, []);

  const handleExpand = () => {
    setIsExpanded(true);
    setVisibleCount(items.length);
  };

  const displayedItems = isExpanded
    ? items
    : items.slice(0, visibleCount);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-wrap gap-[1.6vw] transition-opacity duration-200",
        isMeasuring
          ? "pointer-events-none opacity-0"
          : "opacity-100",
      )}
    >
      {displayedItems.map((item) => {
        const isSelected = selectedValues.includes(item.id);

        return (
          <Button
            key={item.id}
            data-type="item"
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(item.id)}
            className={cn(
              "min-h-[6.4vw] rounded-[1.067vw] border px-[2.667vw] text-[3.2vw] leading-[3.749vw]",
              isSelected
                ? "border-slate-950 bg-slate-100 font-medium"
                : "border-slate-300",
            )}
          >
            {showColors &&
              (item.labelUrl ? (
                <img
                  src={item.labelUrl}
                  alt=""
                  className="mr-[1.067vw] h-[3.2vw] w-[3.2vw] rounded-[.533vw] border border-black/10 object-cover"
                />
              ) : item.label ? (
                <span
                  aria-hidden="true"
                  className="mr-[1.067vw] h-[3.2vw] w-[3.2vw] rounded-[.533vw] border border-black/10"
                  style={{ backgroundColor: item.label }}
                />
              ) : null)}

            <span className="truncate">{item.title}</span>
          </Button>
        );
      })}

      {hasMore && !isExpanded && !isMeasuring && (
        <Button
          type="button"
          onClick={handleExpand}
          aria-label="Показать все фильтры"
          className="ml-auto flex h-[6.4vw] items-center"
        >
          <Icon
            icon="chevron-down"
            className="h-[3.2vw] w-[3.2vw]"
          />
        </Button>
      )}
    </div>
  );
};

export default FilterOptions;