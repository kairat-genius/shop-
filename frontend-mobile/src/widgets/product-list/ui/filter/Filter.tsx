"use client";

import { useCallback, useRef, useState } from "react";
import type { RefObject } from "react";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import type { FiltersState } from "../../model/useFilter";
import type { FacetType } from "@/types/category-filters.type";
import { getFacetList } from "../../utils/getFacetList";
import { getFacetGroups, type FacetGroup } from "../../utils/getFacetGroups";
import PriceSortButton from "./PriceSortButton";
import BrandFilter from "./BrandFilter";
import FilterOptions from "./FilterOptions";

type FilterKey =
  | "sizes"
  | "fitIds"
  | "brandIds"
  | "categories"
  | "series"
  | "priceRange"
  | "colors"
  | "all";
type SectionKey = Exclude<FilterKey, "all">;

const SORT_OPTIONS = [
  {
    type: "button" as const,
    label: "По умолчанию",
    sortType: 0,
    sortMode: "DESC",
  },
  {
    type: "button" as const,
    label: "Популярные",
    sortType: 1,
    sortMode: "DESC",
  },
  { type: "price" as const, label: "Цена", sortType: 4 },
  { type: "button" as const, label: "Новые", sortType: 3, sortMode: "DESC" },
];

const FILTER_TAGS: { key: SectionKey; label: string }[] = [
  { key: "sizes", label: "Размер" },
  { key: "fitIds", label: "Пол" },
  { key: "brandIds", label: "Бренды" },
  { key: "categories", label: "Категория" },
  { key: "series", label: "Серия" },
  { key: "priceRange", label: "Цена" },
  { key: "colors", label: "Цвет" },
];

interface FilterProps {
  filters: FiltersState;
  updateFilter: <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K],
  ) => void;
  updateFilters: (values: Partial<FiltersState>) => void;
  resetFilters: () => void;
  filtersData?: FacetType[];
}

const toggleArrayItem = <T,>(values: T[], item: T): T[] =>
  values.includes(item)
    ? values.filter((value) => value !== item)
    : [...values, item];

const Filter = ({
  filters,
  updateFilter,
  updateFilters,
  resetFilters,
  filtersData,
}: FilterProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openedFilter, setOpenedFilter] = useState<FilterKey>("sizes");
  const [activeAllFilter, setActiveAllFilter] = useState<SectionKey>("sizes");

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs: Record<SectionKey, RefObject<HTMLDivElement | null>> = {
    sizes: useRef<HTMLDivElement>(null),
    fitIds: useRef<HTMLDivElement>(null),
    brandIds: useRef<HTMLDivElement>(null),
    categories: useRef<HTMLDivElement>(null),
    series: useRef<HTMLDivElement>(null),
    priceRange: useRef<HTMLDivElement>(null),
    colors: useRef<HTMLDivElement>(null),
  };

  const facets = filtersData ?? [];

  // плоские списки
  const genderList = getFacetList(facets, "Пол");
  const categoryList = getFacetList(facets, "Категория", true);
  const seriesList = getFacetList(facets, "Серия", true);
  const colorList = getFacetList(facets, "Цвет");

  // размеры — с сохранением групп (Российский размер обуви → Популярные / Все)
  const sizeGroups = getFacetGroups(facets, "Размер");
  const hasSizes = sizeGroups.some(
    (group) =>
      group.items.length > 0 ||
      group.groups.some((nested) => nested.items.length > 0),
  );

  // бренды — две группы: featured_brands и all_brands (с подгруппами по буквам)
  const brandGroups = getFacetGroups(facets, "Бренды");
  const featuredBrands =
    brandGroups.find((group) => group.id === "featured_brands") ??
    brandGroups.find(
      (group) => group.items.length > 0 && group.groups.length === 0,
    );
  const allBrands =
    brandGroups.find((group) => group.id === "all_brands") ??
    brandGroups.find((group) => group.groups.length > 0);
  const hasBrands =
    (featuredBrands?.items.length ?? 0) > 0 ||
    (allBrands?.groups.some((letter) => letter.items.length > 0) ?? false);

  const sectionOptions: {
    key: SectionKey;
    label: string;
    available: boolean;
  }[] = [
    { key: "sizes", label: "Размер", available: hasSizes },
    { key: "fitIds", label: "Пол", available: genderList.length > 0 },
    { key: "brandIds", label: "Бренды", available: hasBrands },
    {
      key: "categories",
      label: "Категория",
      available: categoryList.length > 0,
    },
    { key: "series", label: "Серия", available: seriesList.length > 0 },
    { key: "priceRange", label: "Цена", available: true },
    { key: "colors", label: "Цвет", available: colorList.length > 0 },
  ];
  const allSections = sectionOptions.filter((section) => section.available);

  const filterCounts: Record<SectionKey, number> = {
    sizes: filters.sizes.length,
    fitIds: filters.fitIds.length,
    brandIds: filters.brandIds.length,
    categories: filters.categories.length,
    series: filters.seriesIds.length,
    priceRange: filters.priceMin !== null || filters.priceMax !== null ? 1 : 0,
    colors: filters.colors.length,
  };
  const totalFilterCount = Object.values(filterCounts).reduce(
    (total, count) => total + count,
    0,
  );

  useBodyScrollLock(isOpenModal);
  useClickOutside(containerRef, () => setIsOpenModal(false));

  const toggleFilter = useCallback(
    (filter: FilterKey) => {
      if (isOpenModal && openedFilter === filter) {
        setIsOpenModal(false);
      } else {
        setOpenedFilter(filter);
        setIsOpenModal(true);
      }
    },
    [isOpenModal, openedFilter],
  );

  const handleSortClick = useCallback(
    (sortType: number, sortMode: string) => {
      updateFilters({ sortType, sortMode });
      setIsOpenModal(false);
    },
    [updateFilters],
  );
  const handlePriceClick = useCallback(() => {
    const isPriceActive = filters.sortType === 4;
    const sortMode =
      isPriceActive && filters.sortMode === "ASC" ? "DESC" : "ASC";
    updateFilters({ sortType: 4, sortMode });
  }, [filters.sortType, filters.sortMode, updateFilters]);

  const renderPriceInput = (
    key: "priceMin" | "priceMax",
    placeholder: string,
  ) => (
    <input
      type="number"
      step="any"
      min="0"
      className={cn(
        "caret-[#04e0e1] w-full h-full min-w-0 flex-1 px-[6.4vw] text-[7.467vw] leading-normal rounded-[2.133vw] font-medium border outline-none",
        filters[key] ? "border-slate-950" : "border-slate-500",
      )}
      placeholder={placeholder}
      inputMode="decimal"
      value={filters[key] ?? ""}
      onChange={(event) => {
        const value = event.target.value;
        updateFilters({ [key]: value === "" ? null : Number(value) });
      }}
    />
  );

  // ---- Размеры ----
  const renderSizeGroups = (
    groups: FacetGroup[],
    depth = 0,
  ): React.ReactNode => (
    <div className="space-y-[3.2vw]">
      {groups.map((group) => (
        <div key={group.id || group.name} className="space-y-[1.6vw]">
          {group.name && (
            <div
              className={cn(
                depth === 0
                  ? "text-[3.467vw] font-medium leading-[normal]"
                  : "text-[3.2vw] mb-[.533vw] leading-[normal]",
              )}
            >
              {group.name}
            </div>
          )}

          {group.items.length > 0 && (
            <FilterOptions
              items={group.items}
              selectedValues={filters.sizes}
              onToggle={(id) =>
                updateFilter("sizes", toggleArrayItem(filters.sizes, id))
              }
            />
          )}

          {group.groups.length > 0 && renderSizeGroups(group.groups, depth + 1)}
        </div>
      ))}
    </div>
  );

  const renderSection = (key: FilterKey, showTitle = false) => {
    const title = FILTER_TAGS.find((tag) => tag.key === key)?.label;
    const heading =
      showTitle && title ? (
        <h3 className="text-[3.733vw] font-medium">{title}</h3>
      ) : null;
    let options: React.ReactNode;

    switch (key) {
      case "sizes": {
        options = sizeGroups.length > 0 ? renderSizeGroups(sizeGroups) : null;
        break;
      }
      case "fitIds": {
        options = (
          <FilterOptions
            items={genderList}
            selectedValues={filters.fitIds}
            onToggle={(id) =>
              updateFilter("fitIds", toggleArrayItem(filters.fitIds, id))
            }
          />
        );
        break;
      }
      case "brandIds": {
        options = (
          <BrandFilter
            featuredBrands={featuredBrands}
            allBrands={allBrands}
            selectedIds={filters.brandIds}
            onToggle={(id) =>
              updateFilter("brandIds", toggleArrayItem(filters.brandIds, id))
            }
          />
        );
        break;
      }
      case "categories": {
        options = (
          <FilterOptions
            items={categoryList}
            selectedValues={filters.categories}
            onToggle={(id) =>
              updateFilter(
                "categories",
                toggleArrayItem(filters.categories, id),
              )
            }
          />
        );
        break;
      }
      case "series": {
        options = (
          <FilterOptions
            items={seriesList}
            selectedValues={filters.seriesIds}
            onToggle={(id) =>
              updateFilter("seriesIds", toggleArrayItem(filters.seriesIds, id))
            }
          />
        );
        break;
      }
      case "priceRange": {
        options = (
          <div className="flex items-center">
            <div className="relative flex-1">
              <div className="h-[10.667vw]">
                <div className="max-h-[200%] max-w-[200%] h-[200%] w-[200%] origin-top-left scale-50 min-h-[6.4vw]">
                  {renderPriceInput("priceMin", "Низкая, ₽")}
                </div>
              </div>
            </div>
            <div className="mx-[1.333vw] h-[.5px] w-[3.2vw] shrink-0 bg-slate-950" />
            <div className="relative flex-1">
              <div className="h-[10.667vw]">
                <div className="max-h-[200%] max-w-[200%] h-[200%] w-[200%] origin-top-left scale-50 min-h-[6.4vw]">
                  {renderPriceInput("priceMax", "Высокая, ₽")}{" "}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      }
      case "colors": {
        options = (
          <FilterOptions
            items={colorList}
            selectedValues={filters.colors}
            onToggle={(id) =>
              updateFilter("colors", toggleArrayItem(filters.colors, id))
            }
            showColors
          />
        );

        break;
      }
      default: {
        return null;
      }
    }

    return (
      <div
        ref={sectionRefs[key as SectionKey]}
        className={showTitle ? "space-y-[2.133vw]" : ""}
      >
        {heading}
        {options}
      </div>
    );
  };

  const scrollToSection = (key: SectionKey) => {
    sectionRefs[key].current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  return (
    <div
      className="bg-white sticky top-12 flex flex-col items-center w-full z-10"
      ref={containerRef}
    >
      <div className="flex h-[10.667vw] relative items-center w-full">
        <div className="flex h-full px-[3.733vw] gap-[5.333vw] text-[3.2vw] text-slate-500 overflow-x-auto scrollbar-none min-w-0 w-full items-center">
          {SORT_OPTIONS.map((option) => {
            if (option.type === "price") {
              const currentSort =
                filters.sortType === 4
                  ? filters.sortMode === "ASC"
                    ? "price_asc"
                    : "price_desc"
                  : "default";
              return (
                <PriceSortButton
                  key="price"
                  currentSort={currentSort}
             onPriceClick={handlePriceClick}
                />
              );
            }

            return (
              <Button
                key={option.sortType}
                onClick={() =>
                  handleSortClick(option.sortType, option.sortMode)
                }
                className={cn(
                  "shrink-0",
                  filters.sortType === option.sortType &&
                    "font-semibold text-slate-950",
                )}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
        <Button
          className="relative pr-[3.733vw] pl-[3.2vw] h-full gap-[1.067vw] shrink-0 text-[3.467vw] leading-none font-semibold"
          onClick={() => toggleFilter("all")}
        >
          <div className="w-[.5px] bg-slate-300 h-[4.267vw] absolute left-0 top-1/2 -translate-y-1/2" />
          <Icon icon="funnel" className="w-[3.733vw] h-[3.733vw]" />
          {totalFilterCount > 0 && `(${totalFilterCount})`}
        </Button>
      </div>

      <div className="pb-[3.2vw] relative w-full">
        <div className="overflow-x-auto scrollbar-none w-full">
          <div className="px-[3.733vw] inline-flex min-w-max items-center gap-[2.133vw]">
            {FILTER_TAGS.filter(
              ({ key }) =>
                key === "priceRange" ||
                allSections.some((section) => section.key === key),
            ).map(({ key, label }) => {
              const isSelected = filterCounts[key] > 0;
              const isActive = isOpenModal && openedFilter === key;
              return (
                <Button
                  key={key}
                  data-filter-toggle
                  onClick={() => toggleFilter(key)}
                  className={cn(
                    "bg-slate-150 px-[2.133vw] h-[6.933vw] rounded-[1.067vw] text-[3.2vw] leading-none transition-colors",
                    isActive || isSelected
                      ? "text-slate-950 font-semibold"
                      : "text-slate-500",
                  )}
                >
                  {label}
                  {isSelected && `(${filterCounts[key]})`}
                  <Icon
                    icon="chevron-down"
                    className={cn(
                      "w-[3.2vw] h-[3.2vw] ml-[.533vw] transition-transform duration-300 text-slate-500",
                      isActive && "rotate-180 text-slate-950",
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
            <div className="max-h-116.5">
              {openedFilter === "all" ? (
                <div className="flex items-stretch">
                  <div className="w-[21.333vw] shrink-0 overflow-y-auto bg-slate-150 text-[3.2vw] leading-[normal]">
                    {allSections.map((section) => (
                      <button
                        key={section.key}
                        type="button"
                        onClick={() => {
                          setActiveAllFilter(section.key);
                          scrollToSection(section.key);
                        }}
                        className={cn(
                          "flex min-h-[10.133vw] w-full items-center px-[2.667vw] py-[3.2vw] text-left",
                          activeAllFilter === section.key
                            ? "bg-white text-slate-950 font-semibold"
                            : "text-slate-500",
                        )}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                  <div className="max-h-100 flex-1 space-y-[3.2vw] overflow-y-auto bg-white px-[3.2vw] py-[2.133vw]">
                    {allSections.map((section) => (
                      <div key={section.key}>
                        {renderSection(section.key, true)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="max-h-100 overflow-y-auto bg-white px-[3.733vw] py-[2.133vw]">
                  {renderSection(openedFilter)}
                </div>
              )}
            </div>
            <div className="h-[14.933vw] font-bold font-roboto_condensed flex items-center gap-[3.2vw] px-[3.733vw] bg-slate-150">
              <Button
                onClick={resetFilters}
                className="text-[4.267vw] w-[26.667vw] leading-[1.4] bg-white py-[2vw] rounded-[1.067vw] border border-slate-950"
              >
                <span className="truncate">Очистить</span>
              </Button>
              <Button
                onClick={() => setIsOpenModal(false)}
                className="w-[62.667vw] text-[4.267vw] font-bold font-roboto_condensed leading-[1.4] bg-teal-350 py-[2vw] rounded-[1.067vw]"
              >
                <span className="truncate">Смотреть товаров</span>
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
