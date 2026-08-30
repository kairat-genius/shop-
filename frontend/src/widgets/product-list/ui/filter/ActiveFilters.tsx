"use client";

import type { FiltersState } from "@/shared/hooks/useNuqsFilter";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import Select from "@/shared/ui/select";
import { sortOptions } from "../../data/sort.data";
import { genders } from "../../data/filter.data";

interface ActiveFiltersProps {
  filters: FiltersState;
  updateFilter: <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K],
  ) => void;
  updateFilters?: (values: Partial<FiltersState>) => void;
  resetFilters: () => void;
}

const genderMap = Object.fromEntries(
  genders.map((item) => [item.id, item.title]),
) as Record<string, string>;

const ActiveFilters = ({
  filters,
  updateFilter,
  resetFilters,
}: ActiveFiltersProps) => {
  const activeGenderFilters = filters.genders.map((genderId) => ({
    id: genderId,
    title: genderMap[genderId] ?? genderId,
  }));

  const handleRemoveGender = (genderId: string) => {
    updateFilter(
      "genders",
      filters.genders.filter((item) => item !== genderId),
    );
  };

  const hasAnyActiveFilter = filters.genders.length > 0;

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-wrap">
        {hasAnyActiveFilter && (
          <Button
            onClick={resetFilters}
            className="border border-slate-300 bg-white px-3 mr-3 mb-3 h-9 rounded-sm text-[16px]"
          >
            Сбросить все фильтры
          </Button>
        )}

        {activeGenderFilters.map(({ id, title }) => (
          <div
            key={id}
            className="flex items-center justify-between gap-2 mr-3 mb-3 h-9 rounded-sm bg-slate-150 px-3 text-[16px]"
          >
            {title}
            <button
              type="button"
              onClick={() => handleRemoveGender(id)}
              className="flex items-center justify-center cursor-pointer"
              aria-label={`Удалить фильтр ${title}`}
            >
              <Icon icon="x" width={16} height={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mb-4 ml-4 lg:ml-8 flex gap-2 items-center justify-end">
        <span className="text-[20px] font-bold font-roboto_condensed leading-[1.2]">
          СОРТИРОВАТЬ ПО:
        </span>
        <Select
          value={filters.sortBy}
          className="max-w-60"
          items={sortOptions}
          onChange={(item) => updateFilter("sortBy", item)}
          placeholder="Сортировать"
        />
      </div>
    </div>
  );
};

export default ActiveFilters;
