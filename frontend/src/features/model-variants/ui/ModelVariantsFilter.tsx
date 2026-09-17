"use client";

import { useRef, useState } from "react";
import { Button } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";
import { FacetType } from "@/types/category-filters.type";
import { getFacetList } from "@/widgets/product-list/utils/getFacetList";
import ModelVariantsPriceFilter from "./ModelVariantsPriceFilter";

export type FilterType = "size" | "gender" | "price" | "color" | "all" | null;

const toggleArrayItem = <T,>(array: T[], item: T): T[] =>
  array.includes(item) ? array.filter((i) => i !== item) : [...array, item];

interface FilterState {
  sizes: string[];
  fitIds: number[];
  priceMin?: number;
  priceMax?: number;
  colors: string[];
}

interface ModelVariantsFilterProps {
  facets: FacetType[];
  activeFilter: FilterType;
  onCloseFilter: () => void;
  filters: FilterState;
  onChangeFilters: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

export const ModelVariantsFilter = ({
  facets,
  activeFilter,
  onCloseFilter,
  filters,
  onChangeFilters,
  onResetFilters,
}: ModelVariantsFilterProps) => {
  const [activeTab, setActiveTab] = useState<
    "size" | "gender" | "price" | "color"
  >("size");

  // Рефы для навигации по скроллу в режиме "all"
  const sizeRef = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  // Получение данных из фасетов с помощью утилиты
  const sizeList = getFacetList(facets, "Размер");
  const genderList = getFacetList(facets, "Пол");
  const colorList = getFacetList(facets, "Цвет");

  const sectionClassName = cn(
    activeFilter === "all" && "px-3 pt-3.5 mb-1.5 flex items-start flex-col",
  );

  const optionClassName = (isSelected: boolean) =>
    cn(
      "flex items-center justify-center h-6 px-2.5 rounded-xs text-[14px] border cursor-pointer",
      isSelected
        ? "border-slate-950 bg-slate-100 font-medium"
        : "border-[rgba(198,198,215,.3)]",
    );

  const scrollToSection = (
    tab: "size" | "gender" | "price" | "color",
    ref: React.RefObject<HTMLDivElement | null>,
  ) => {
    setActiveTab(tab);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // Рендер каждого сектора фильтра
  const renderSizeSection = () => (
    <div ref={sizeRef} className={sectionClassName}>
      {activeFilter === "all" && (
        <div className="mb-3 text-[14px] font-medium leading-[16.41px]">
          Размер
        </div>
      )}
      <div className="flex items-start flex-wrap gap-1.5 leading-[14.06px]">
        {sizeList.map((item) => {
          const isSelected = filters.sizes.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onChangeFilters({
                  sizes: toggleArrayItem(filters.sizes, item.id),
                })
              }
              className={optionClassName(isSelected)}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderGenderSection = () => (
    <div ref={genderRef} className={sectionClassName}>
      {activeFilter === "all" && (
        <div className="mb-3 text-[14px] font-medium leading-[16.41px]">
          Пол
        </div>
      )}
      <div className="flex items-start flex-wrap gap-1.5 leading-[14.06px]">
        {genderList.map((item) => {
          const idNum = Number(item.id);
          const isSelected = filters.fitIds.includes(idNum);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onChangeFilters({
                  fitIds: toggleArrayItem(filters.fitIds, idNum),
                })
              }
              className={optionClassName(isSelected)}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderPriceSection = () => (
    <div ref={priceRef} className={sectionClassName}>
      {activeFilter === "all" && (
        <div className="mb-3 text-[14px] font-medium leading-[16.41px]">
          Цена
        </div>
      )}
      <div className="flex items-center w-full">
        <ModelVariantsPriceFilter
          min={0}
          max={90000}
          priceMin={filters.priceMin || null}
          priceMax={filters.priceMax || null}
          onChange={(min, max) =>
            onChangeFilters({ priceMin: min, priceMax: max })
          }
          step={1}
        />
      </div>
    </div>
  );

  const renderColorSection = () => (
    <div ref={colorRef} className={sectionClassName}>
      {activeFilter === "all" && (
        <div className="mb-3 text-[14px] font-medium leading-[16.41px]">
          Цвет
        </div>
      )}
      <div className="flex items-start flex-wrap gap-1.5 leading-[14.06px]">
        {colorList.map((color) => {
          const isSelected = filters.colors.includes(color.id);
          return (
            <button
              key={color.id}
              type="button"
              onClick={() =>
                onChangeFilters({
                  colors: toggleArrayItem(filters.colors, color.id),
                })
              }
              className={optionClassName(isSelected)}
            >
              {color.labelUrl ? (
                <div className="w-3 h-3 border border-[rgba(0,0,0,.1)] mr-1 rounded-xs shrink-0">
                  <img className="w-full h-full" src={color.labelUrl} alt="" />
                </div>
              ) : (
                <span
                  className="w-3 h-3 border border-[rgba(0,0,0,.1)] mr-1 rounded-xs shrink-0"
                  style={{
                    backgroundColor: color.label,
                  }}
                />
              )}
              {color.title}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (!activeFilter) return null;

  return (
    <div className="max-h-150 bg-white top-full absolute z-30 w-full overflow-hidden shadow-lg left-0 border-t border-slate-100">
      {/* Полный режим с боковым меню */}
      {activeFilter === "all" ? (
        <div className="bg-slate-50 mt-4 max-h-100 min-h-75 flex w-full">
          {/* Боковое меню */}
          <div className="bg-slate-150 w-32 shrink-0">
            <div className="flex flex-col pb-10 leading-[16.41px] text-slate-500 text-[14px]">
              <button
                type="button"
                onClick={() => scrollToSection("size", sizeRef)}
                className={`px-5 pt-3.5 pb-3 text-left cursor-pointer ${
                  activeTab === "size"
                    ? "text-slate-950 font-semibold bg-white"
                    : ""
                }`}
              >
                Размер
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("gender", genderRef)}
                className={`px-5 pt-3.5 pb-3 text-left cursor-pointer ${
                  activeTab === "gender"
                    ? "text-slate-950 font-semibold bg-white"
                    : ""
                }`}
              >
                Пол
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("price", priceRef)}
                className={`px-5 pt-3.5 pb-3 text-left cursor-pointer ${
                  activeTab === "price"
                    ? "text-slate-950 font-semibold bg-white"
                    : ""
                }`}
              >
                Цена
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("color", colorRef)}
                className={`px-5 pt-3.5 pb-3 text-left cursor-pointer ${
                  activeTab === "color"
                    ? "text-slate-950 font-semibold bg-white"
                    : ""
                }`}
              >
                Цвет
              </button>
            </div>
          </div>

          {/* Правая часть с прокруткой ко всем секциям */}
          <div className="flex flex-col bg-white pb-5 overflow-y-auto w-full">
            {renderSizeSection()}
            {renderGenderSection()}
            {renderPriceSection()}
            {renderColorSection()}
          </div>
        </div>
      ) : (
        /* Быстрый режим фильтрации без боковой навигации */
        <div className="bg-white p-4 max-h-100 overflow-y-auto">
          {activeFilter === "size" && renderSizeSection()}
          {activeFilter === "gender" && renderGenderSection()}
          {activeFilter === "price" && renderPriceSection()}
          {activeFilter === "color" && renderColorSection()}
        </div>
      )}

      {/* Панель с кнопками сброса и применения */}
      <div className="p-3.5 flex gap-3 h-16 items-center justify-end w-full border-t border-slate-100 bg-white">
        <Button
          onClick={onResetFilters}
          className="w-25 h-9 text-[16px] border border-slate-950 font-bold font-roboto_condensed rounded-sm"
        >
          Очистить
        </Button>
        <Button
          onClick={onCloseFilter}
          className="w-58.75 bg-teal-350 h-9 text-[16px] font-bold font-roboto_condensed rounded-sm"
        >
          Посмотреть товары
        </Button>
      </div>
    </div>
  );
};
