"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/shared/utils/clsx";
import { categoriesData } from "@/shared/data/category.data";

interface CategoriesDropdownPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CategoriesDropdownPortal = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: CategoriesDropdownPortalProps) => {
  return createPortal(
    <>
      {/* Бэкдроп */}
      <div
        className={cn(
          "fixed inset-0 bg-black/30 z-40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Модалка с категориями */}
      <div
        className={cn(
          "fixed left-0 top-27.25 w-full bg-white shadow-xl z-50",
          "max-h-[calc(100vh-109px)] overflow-y-auto",
          "transition-all duration-200 origin-top",
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none",
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="grid grid-cols-6 gap-5 gap-y-10 max-w-360 min-w-[1024px] mx-auto px-[2.4rem] py-6">
          {categoriesData.map((cat) => (
            <div key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className="block text-[14px] font-medium mb-4 hover:underline leading-4"
                onClick={onClose}
              >
                {cat.title}
              </Link>

              <div className="flex flex-col gap-3 text-[12px] leading-3.5">
                {cat.children.map((child) => (
                  <Link
                    key={child.slug}
                    href={`/category/${child.slug}`}
                    className="hover:underline"
                    onClick={onClose}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default CategoriesDropdownPortal;
