"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/shared/utils/clsx";
import { useCatalogData } from "@/shared/context/catalog-data";
import { generateProductSlug } from "@/shared/utils/slug";
import { useState } from "react";
import Icon from "@/shared/icon";

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
  const { categoryData } = useCatalogData();

  const [expandedCats, setExpandedCats] = useState<(number | string)[]>([]);

  const handleShowMore = (categoryId: number | string) => {
    setExpandedCats((prev) => [...prev, categoryId]);
  };
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
        <div className="flex flex-col gap-6 max-w-360 min-w-[1024px] max-h-[520px] mx-auto px-[2.4rem]">
          <div className="flex gap-[2.7rem] pt-6">
            {categoryData.categories.slice(0, 6).map((cat) => {
              // Собираем все подкатегории в один плоский массив
              const allItems = cat.groups.flatMap((group) => group.items);
              const isExpanded = expandedCats.some(
                (id) => String(id) === String(cat.id),
              );
              // Отрезаем первые 9, если категория не раскрыта
              const visibleItems = isExpanded ? allItems : allItems.slice(0, 9);
              const hasMore = allItems.length > 9;

              return (
                <div key={cat.id}>
                  <Link
                    href={`/category/${generateProductSlug(cat.name, cat.id)}`}
                    className="block text-[14px] font-medium mb-4 hover:underline leading-4"
                    onClick={onClose}
                  >
                    {cat.name}
                  </Link>

                  <div className="flex flex-col gap-3 text-[12px] leading-3.5">
                    {visibleItems.map((child) => (
                      <Link
                        key={child.id}
                        href={`/category/${generateProductSlug(child.name, child.id)}`}
                        className="hover:underline"
                        onClick={onClose}
                      >
                        {child.name}
                      </Link>
                    ))}
                    {!isExpanded && hasMore && (
                      <button
                        onClick={() => handleShowMore(cat.id)}
                        className="hover:underline flex items-center gap-1 text-[12px] leading-3.5 cursor-pointer"
                      >
                        Показать еще
                        <Icon
                          icon="chevron-down"
                          width={12}
                          height={12}
                          className="rotate-180"
                        />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-px w-full shrink-0 bg-slate-100" />
          <div className="flex gap-[2.7rem] pb-6">
            {categoryData.categories.slice(6).map((cat) => {
              const allItems = cat.groups.flatMap((group) => group.items);
              const isExpanded = expandedCats.some(
                (id) => String(id) === String(cat.id),
              );
              const visibleItems = isExpanded ? allItems : allItems.slice(0, 9);
              const hasMore = allItems.length > 9;

              return (
                <div key={cat.id}>
                  <Link
                    href={`/category/${generateProductSlug(cat.name, cat.id)}`}
                    className="mb-4 block text-[14px] font-medium leading-4 hover:underline"
                    onClick={onClose}
                  >
                    {cat.name}
                  </Link>

                  <div className="flex flex-col gap-3 text-[12px] leading-3.5">
                    {visibleItems.map((child) => (
                      <Link
                        key={child.id}
                        href={`/category/${generateProductSlug(child.name, child.id)}`}
                        className="hover:underline"
                        onClick={onClose}
                      >
                        {child.name}
                      </Link>
                    ))}

                    {!isExpanded && hasMore && (
                      <button
                        type="button"
                        onClick={() => handleShowMore(cat.id)}
                        className="flex cursor-pointer items-center gap-1 text-[12px] leading-3.5 hover:underline"
                      >
                        Показать еще
                        <Icon
                          icon="chevron-down"
                          width={12}
                          height={12}
                          className="rotate-180"
                        />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default CategoriesDropdownPortal;
