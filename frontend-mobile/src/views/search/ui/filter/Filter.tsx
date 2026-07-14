"use client";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import PriceSortButton from "./PriceSortButton";

const GENDER_OPTIONS = [
  { label: "Унисекс", value: "unisex" },
  { label: "Мужской", value: "male" },
  { label: "Женский", value: "female" },
  { label: "Дети", value: "kids" },
  { label: "Дошкольный возраст", value: "preschool" },
  { label: "Школьный возраст", value: "school" },
];

const SORT_OPTIONS = [
  { type: "button" as const, label: "По умолчанию", value: "default" },
  { type: "button" as const, label: "Популярные", value: "top_sales" },
  { type: "price" as const, label: "Цена" },
  { type: "button" as const, label: "Новые", value: "newest" },
];

const FILTER_TAGS: { key: string; label: string }[] = [
  { key: "sizes", label: "Размер" },
  { key: "genders", label: "Пол" },
  { key: "brands", label: "Бренды" },
  { key: "priceRange", label: "Цена" },
  { key: "colors", label: "Цвет" },
];

const Filter = () => {
  const { filters, updateFilter } = useFiltersNuqs();

  // Разделяем на два состояния: открыта ли модалка и какой фильтр сейчас выбран
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openedFilter, setOpenedFilter] = useState<string | null>("genders");

  const containerRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpenModal);

  useClickOutside(containerRef, () => {
    setIsOpenModal(false);
  });

  const toggleFilter = useCallback(
    (filter: string) => {
      if (isOpenModal && openedFilter === filter) {
        // Если модалка уже открыта и мы кликаем по активному табу — закрываем
        setIsOpenModal(false);
      } else {
        // Иначе меняем таб и открываем модалку (без закрытия)
        setOpenedFilter(filter);
        setIsOpenModal(true);
      }
    },
    [isOpenModal, openedFilter],
  );

  const handleSortClick = useCallback(
    (slug: string) => updateFilter("sort", slug),
    [updateFilter],
  );

  const handlePriceClick = useCallback(() => {
    const current = filters.sort;
    updateFilter("sort", current === "price_asc" ? "price_desc" : "price_asc");
  }, [filters.sort, updateFilter]);

  return (
      <div className="bg-white sticky top-12 flex flex-col items-center w-full z-10">
        <div className="flex h-[10.667vw] relative items-center w-full">
          <div className="flex h-full px-[3.733vw] gap-[5.333vw] text-[3.2vw] text-slate-500 overflow-x-auto scrollbar-none min-w-0 w-full items-center">
            {SORT_OPTIONS.map((opt) => {
              if (opt.type === "price") {
                return (
                  <PriceSortButton
                    key="price"
                    currentSort={filters.sort}
                    onPriceClick={handlePriceClick}
                  />
                );
              }
              return (
                <Button
                  key={opt.value}
                  onClick={() => handleSortClick(opt.value)}
                  className={cn(
                    "shrink-0",
                    filters.sort === opt.value &&
                      "font-semibold text-slate-950",
                  )}
                >
                  {opt.label}
                </Button>
              );
            })}
          </div>
          <Button
            className="relative pr-[3.733vw] pl-[3.2vw] h-full gap-[1.067vw] shrink-0"
            onClick={() => toggleFilter("all")}
          >
            <div className="w-[.5px] bg-slate-300 h-[4.267vw] absolute left-0 top-1/2 -translate-y-1/2" />
            <Icon icon="funnel" className="w-[3.733vw] h-[3.733vw]" />
          </Button>
        </div>
        <div className="pb-[3.2vw] relative w-full" ref={containerRef}>
          <div className="overflow-x-auto scrollbar-none w-full">
            <div className="px-[3.733vw] inline-flex min-w-max items-center gap-[2.133vw]">
              {FILTER_TAGS.map(({ key, label }) => {
                // Активное состояние зависит и от того, открыта ли модалка
                const isActive = isOpenModal && openedFilter === key;

                return (
                  <Button
                    key={key}
                    data-filter-toggle
                    onClick={() => toggleFilter(key)}
                    className={cn(
                      "bg-slate-150 px-[2.133vw] h-[6.933vw] rounded-[1.067vw] text-[3.2vw] leading-none transition-colors",
                      isActive ? "text-slate-950" : "text-slate-500",
                    )}
                  >
                    {label}
                    <Icon
                      icon="chevron-down"
                      className={cn(
                        "w-[3.2vw] h-[3.2vw] ml-[.533vw] transition-transform duration-300",
                        isActive && "rotate-180",
                      )}
                    />
                  </Button>
                );
              })}
            </div>
          </div>
          <div
            className={cn(
              "absolute top-full z-20 w-full transition-all duration-300 ease-out",
              isOpenModal
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none",
            )}
          >
            <div className="bg-slate-50 rounded-b-[2.133vw] overflow-hidden">
              <div className="max-h-116.5 py-[2.133vw] px-[3.733vw]">
                {openedFilter === "genders" && (
                  <div className="flex flex-wrap gap-[1.6vw]">
                    {GENDER_OPTIONS.map((item) => (
                      <Button
                        key={item.value}
                        className="h-[6.4vw] px-[2.667vw] rounded-[1.067vw] border border-slate-300"
                      >
                        <span className="truncate text-[3.2vw] leading-[3.749vw]">
                          {item.label}
                        </span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              <div className="h-[14.933vw] font-bold font-roboto_condensed flex items-center gap-[3.2vw] px-[3.733vw] bg-slate-150">
                <Button className="text-[4.267vw] w-[26.667vw] leading-[1.4] bg-white py-[2vw] rounded-[1.067vw] border border-slate-950">
                  <span className="truncate">Очистить</span>
                </Button>
                <Button className="w-[62.667vw] text-[4.267vw] font-bold font-roboto_condensed leading-[1.4] bg-teal-350 py-[2vw] rounded-[1.067vw]">
                  <span className="truncate">
                    Смотреть 60&nbsp;тыс. товаров
                  </span>
                </Button>
              </div>
            </div>
            <div
              className="h-screen bg-[rgba(0,0,0,.55)]"
              onClick={() => setIsOpenModal(false)}
            />
          </div>
        </div>
      </div>
  );
};

export default Filter;
