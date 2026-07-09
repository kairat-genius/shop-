"use client";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";
import FilterCheckboxList from "./FilterCheckboxList";
import Accordion from "@/shared/ui/accordion";
import {
  brands,
  categories,
  genders,
  russianSizes,
} from "../../data/filter.data";
import PriceRangeFilter from "./PriceRangeFilter";

const FilterAside = () => {
  const { filters, updateFilter } = useFiltersNuqs();
  return (
    <aside className="min-w-55 space-y-10">
      <Accordion
        title={
          <h2 className="font-roboto_condensed text-xl font-bold leading-[1.2]">
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
          <h2 className="font-roboto_condensed text-xl font-bold leading-[1.2]">
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
      </Accordion>

      <Accordion
        title={
          <h2 className="font-roboto_condensed text-xl font-bold leading-[1.2]">
            Пол
          </h2>
        }
        defaultOpen={false}
      >
        <FilterCheckboxList
          items={genders}
          value={filters.genders}
          onChange={(value) => updateFilter("genders", value)}
        />
      </Accordion>

      <Accordion
        title={
          <h2 className="font-roboto_condensed text-xl font-bold leading-[1.2]">
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
      </Accordion>
      <Accordion
        title={
          <h2 className="font-roboto_condensed text-xl font-bold leading-[1.2]">
            Цена
          </h2>
        }
      >
        <PriceRangeFilter
          min={0}
          max={30_885}
          value={filters.priceRange}
          onChange={(value) => updateFilter("priceRange", value)}
          step={1}
        />
      </Accordion>
    </aside>
  );
};

export default FilterAside;
