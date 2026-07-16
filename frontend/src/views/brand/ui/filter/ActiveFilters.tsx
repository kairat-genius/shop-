"use client";

import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import Select from "@/shared/ui/select";
import { sortOptions } from "../../data/sort.data";

const categoriesMap: Record<string, string> = {
  "1": "Скейтбординг",
  "2": "Баскетбол",
  "3": "Футбол",
};

const ActiveFilters = () => {
  const { filters, updateFilter, resetFilters } = useFiltersNuqs();

  const handleRemoveCategory = (idToRemove: string) => {
    const newCategories = filters.categories.filter((id) => id !== idToRemove);
    updateFilter("categories", newCategories);
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-wrap">
        <Button
          onClick={resetFilters}
          className="border border-slate-300 bg-white px-3 mr-3 mb-3 h-9 rounded-sm text-[16px]"
        >
          Сбросить все фильтры
        </Button>
        {filters.categories.map((catId) => (
          <div
            key={catId}
            className="flex gap-2 items-center justify-between mr-3 mb-3 px-3 h-9 text-[16px] bg-slate-150 rounded-sm"
          >
            {categoriesMap[catId] || `Категория ${catId}`}
            <Button onClick={() => handleRemoveCategory(catId)}>
              <Icon icon="x" width={16} height={16} />
            </Button>
          </div>
        ))}
      </div>
      <div className="mb-4 ml-4 lg:ml-8 flex gap-2 items-center justify-end">
        <span className="text-[20px] font-bold font-roboto_condensed leading-[1.2]">
          СОРТИРОВАТЬ ПО:
        </span>
        <Select
          value={filters.sort}
          className="max-w-60"
          items={sortOptions}
          onChange={(item) => updateFilter("sort", item)}
          placeholder="Сортировать"
        />
      </div>
    </div>
  );
};

export default ActiveFilters;
