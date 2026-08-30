"use client";
import type { FiltersState } from "@/shared/hooks/useNuqsFilter";
import FilterCheckboxList from "./filter/FilterCheckboxList";
import Accordion from "@/shared/ui/accordion";
import { genders } from "../data/filter.data";
import PriceRangeFilter from "./filter/PriceRangeFilter";

interface FilterAsideProps {
  filters: FiltersState;
  updateFilter: <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K],
  ) => void;
  updateFilters: (values: Partial<FiltersState>) => void;
}

const FilterAside = ({
  filters,
  updateFilter,
  updateFilters,
}: FilterAsideProps) => {
  return (
    <aside className="min-w-55 space-y-10">
      {/* <Accordion
        title={
          <h2 className="font-roboto_condensed text-[20px] font-bold leading-[1.2]">
            Категория
          </h2>
        }
      >
        <FilterCheckboxList
          items={categories}
          value={filters.categories}
          onChange={(value) => updateFilter("categories", value)}
        />
      </Accordion>
      <Accordion
        title={
          <h2 className="font-roboto_condensed text-[20px] font-bold leading-[1.2]">
            Бренд
          </h2>
        }
        defaultOpen={false}
      >
        <FilterCheckboxList
          items={brands}
          value={filters.brands}
          onChange={(value) => updateFilter("brands", value)}
        />
      </Accordion> */}

      <Accordion
        title={
          <h2 className="font-roboto_condensed text-[20px] font-bold leading-[1.2]">
            Пол
          </h2>
        }

      >
        <FilterCheckboxList
          items={genders}
          value={filters.genders}
          onChange={(value) => updateFilter("genders", value as string[])}
        />
      </Accordion>

      {/* <Accordion
        title={
          <h2 className="font-roboto_condensed text-[20px] font-bold leading-[1.2]">
            Российский размер обуви
          </h2>
        }
        defaultOpen={false}
      >
        <FilterCheckboxList
          items={russianSizes}
          value={filters.sizes}
          onChange={(value) => updateFilter("sizes", value)}
        />
      </Accordion> */}
      <Accordion
        title={
          <h2 className="font-roboto_condensed text-[20px] font-bold leading-[1.2]">
            Цена
          </h2>
        }
      >
        <PriceRangeFilter
          min={0}
          max={30_885}
          priceMin={filters.priceMin}
          priceMax={filters.priceMax}
          onChange={(min, max) =>
            updateFilters({ priceMin: min, priceMax: max })
          }
          step={1}
        />
      </Accordion>
    </aside>
  );
};

export default FilterAside;
