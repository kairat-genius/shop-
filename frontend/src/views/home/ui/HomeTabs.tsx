"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";

interface HomeTabsProps {
  categories: string[]; // уже с добавленной "Все" и ограничением до 7
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const activeClasses =
  "font-medium relative after:absolute after:z-[1] after:bg-teal-300 after:w-2 after:h-8 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-40";

const HomeTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: HomeTabsProps) => {
  const [hiddenTabs, setHiddenTabs] = useState<string[]>([]);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkOverflowAndScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth, children } =
      scrollContainerRef.current;

    setShowLeftShadow(scrollLeft > 0);
    setShowRightShadow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);

    const newHiddenTabs: string[] = [];
    const childrenArray = [...children] as HTMLElement[];

    // children соответствуют кнопкам в том же порядке, что и категории
    for (const [index, child] of childrenArray.entries()) {
      const childLeft = child.offsetLeft;
      const childRight = childLeft + child.offsetWidth;

      if ((
        childRight > scrollLeft + clientWidth ||
        childLeft < scrollLeft
      ) && // используем имя категории по индексу
        index < categories.length) {
          newHiddenTabs.push(categories[index]);
        }
    }
    setHiddenTabs(newHiddenTabs);
  };

  useEffect(() => {
    checkOverflowAndScroll();
    window.addEventListener("resize", checkOverflowAndScroll);
    return () => window.removeEventListener("resize", checkOverflowAndScroll);
  }, [categories]);

  const handleTabClick = (tab: string) => {
    onCategoryChange(tab);

    setTimeout(() => {
      if (scrollContainerRef.current) {
        const tabElement = scrollContainerRef.current.querySelector(
          `[data-tab="${tab}"]`,
        );
        if (tabElement) {
          tabElement.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      }
    }, 0);
  };

  return (
    <div
      role="tablist"
      className="mb-2 border-b border-slate-300 flex items-center w-full"
    >
      <div
        className={cn(
          "flex-1 relative overflow-hidden",
          "[&::before,&::after]:content-[''] [&::before,&::after]:absolute [&::before,&::after]:top-0 [&::before,&::after]:h-full [&::before,&::after]:w-8 [&::before,&::after]:transition-opacity [&::before,&::after]:duration-300 [&::before,&::after]:pointer-events-none [&::before,&::after]:z-10",
          "after:right-0 after:[box-shadow:inset_-10px_0_8px_-8px_rgba(0,0,0,0.08)]",
          "before:left-0 before:[box-shadow:inset_10px_0_8px_-8px_rgba(0,0,0,0.08)]",
          showLeftShadow ? "before:opacity-100" : "before:opacity-0",
          showRightShadow ? "after:opacity-100" : "after:opacity-0",
        )}
      >
        <div
          ref={scrollContainerRef}
          onScroll={checkOverflowAndScroll}
          className="flex items-center gap-20 overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {categories.map((tab) => (
            <Button
              key={tab}
              data-tab={tab}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "py-2.5 text-[20px] leading-normal shrink-0 whitespace-nowrap transition-colors",
                activeCategory === tab && activeClasses,
              )}
            >
              <span className="relative z-10">{tab}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="relative group shrink-0">
        <Button className="px-4 h-12.5 cursor-pointer">
          <Icon icon="ellipsis" width={14} height={14} aria-hidden="true" />
        </Button>

        {hiddenTabs.length > 0 && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-150 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
            {hiddenTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={cn(
                  "w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors",
                  activeCategory === tab
                    ? "font-medium text-teal-500"
                    : "text-slate-700",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeTabs;