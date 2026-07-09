// src/widgets/header/ui/CategoriesDropdown.tsx
"use client";

import dynamic from "next/dynamic";
import Icon from "@/shared/icon";
import { useRef, useState } from "react";
import { cn } from "@/shared/utils/clsx";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";

const CategoriesDropdownPortal = dynamic(
  () => import("./CategoriesDropdownPortal"),
  { ssr: false }
);

const CategoriesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useBodyScrollLock(isOpen);

  const clearCloseTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startCloseTimer = () => {
    clearCloseTimer();
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = null;
    }, 150);
  };

  const handleTriggerMouseEnter = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const handleTriggerMouseLeave = () => {
    startCloseTimer();
  };

  const handleDropdownMouseEnter = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    startCloseTimer();
  };

  return (
    <>
      <div
        className="relative"
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
      >
        <div className="flex items-center gap-1 text-sm cursor-pointer select-none">
          Категории
          <Icon
            icon="chevron-down"
            width={14}
            height={14}
            className={cn(
              "transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </div>

      <CategoriesDropdownPortal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      />
    </>
  );
};

export default CategoriesDropdown;