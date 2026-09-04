"use client";

import type { FiltersState } from "@/widgets/product-list/model/useFilter";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import Select from "@/shared/ui/select";
import { sortOptions } from "../../data/sort.data";
import type { CategoryFiltersResponseDto } from "@/shared/api/openapi";
import { getFacetList } from "../../utils/getFacetList";

interface ActiveFiltersProps {
  filters: FiltersState;
  updateFilter: <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K],
  ) => void;
  updateFilters?: (values: Partial<FiltersState>) => void;
  resetFilters: () => void;
  filtersData: CategoryFiltersResponseDto;
}

const ActiveFilters = ({
  filters,
  updateFilter,
  resetFilters,
  filtersData,
}: ActiveFiltersProps) => {
  const facets = filtersData?.facets ?? [];

  const categories = getFacetList(facets, "Категория", true);
  const brands = getFacetList(facets, "Бренды", true);
  const genders = getFacetList(facets, "Пол");
  const sizes = getFacetList(facets, "Размер");

  const categoryMap = new Map(categories.map((item) => [item.id, item.title]));

  const brandMap = new Map(brands.map((item) => [item.id, item.title]));

  const genderMap = new Map(genders.map((item) => [item.id, item.title]));

  const sizeMap = new Map(sizes.map((item) => [item.id, item.title]));

  const activeFilters = [
    ...filters.categories.map((id) => ({
      type: "category" as const,
      id: String(id),
      title: categoryMap.get(String(id)) ?? String(id),
    })),

    ...filters.brandIds.map((id) => ({
      type: "brand" as const,
      id: String(id),
      title: brandMap.get(String(id)) ?? String(id),
    })),

    ...filters.fitIds.map((id) => ({
      type: "gender" as const,
      id: String(id),
      title: genderMap.get(String(id)) ?? String(id),
    })),

    ...filters.sizes.map((id) => ({
      type: "size" as const,
      id: String(id),
      title: sizeMap.get(String(id)) ?? String(id),
    })),
  ];

  const hasAnyActiveFilter = activeFilters.length > 0;

  const handleRemoveFilter = (
    type: "category" | "brand" | "gender" | "size",
    id: string,
  ) => {
    switch (type) {
      case "category": {
        updateFilter(
          "categories",
          filters.categories.filter((item) => String(item) !== id),
        );
        break;
      }

      case "brand": {
        updateFilter(
          "brandIds",
          filters.brandIds.filter((item) => String(item) !== id),
        );
        break;
      }

      case "gender": {
        updateFilter(
          "fitIds",
          filters.fitIds.filter((item) => String(item) !== id),
        );
        break;
      }

      case "size": {
        updateFilter(
          "sizes",
          filters.sizes.filter((item) => String(item) !== id),
        );
        break;
      }
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-wrap">
        {hasAnyActiveFilter && (
          <Button
            onClick={resetFilters}
            className="mr-3 mb-3 h-9 rounded-sm border border-slate-300 bg-white px-3 text-[16px]"
          >
            Сбросить все фильтры
          </Button>
        )}

        {activeFilters.map(({ type, id, title }) => (
          <div
            key={`${type}-${id}`}
            className="mr-3 mb-3 flex h-9 items-center justify-between gap-2 rounded-sm bg-slate-150 px-3 text-[16px]"
          >
            {title}

            <button
              type="button"
              onClick={() => handleRemoveFilter(type, id)}
              className="flex cursor-pointer items-center justify-center"
              aria-label={`Удалить фильтр ${title}`}
            >
              <Icon icon="x" width={16} height={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mb-4 ml-4 flex items-center justify-end gap-2 lg:ml-8">
        <span className="font-roboto_condensed text-[20px] font-bold leading-[1.2]">
          СОРТИРОВАТЬ ПО:
        </span>

        <Select
          value={filters.sortType}
          className="max-w-60"
          items={sortOptions}
          onChange={(item) => updateFilter("sortType", item)}
          placeholder="Сортировать"
        />
      </div>
    </div>
  );
};

export default ActiveFilters;
