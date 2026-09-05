"use client";
import type { FiltersState } from "@/widgets/product-list/model/useFilter";
import FilterCheckboxList from "./filter/FilterCheckboxList";
import Accordion from "@/shared/ui/accordion";

import PriceRangeFilter from "./filter/PriceRangeFilter";
import { getFacetList } from "../utils/getFacetList";

import type { CategoryFiltersResponseType } from "@/types/category-filters.type";

interface FilterAsideProps {
  filters: FiltersState;
  updateFilter: <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K],
  ) => void;
  updateFilters: (values: Partial<FiltersState>) => void;
  filtersData: CategoryFiltersResponseType;
  categoryId: string;
}

const FilterAside = ({
  filters,
  updateFilter,
  updateFilters,
  filtersData,
  categoryId,
}: FilterAsideProps) => {
  // Вычисляем списки внутри компонента, используя данные из пропсов
  const facets = filtersData?.facets ?? [];
  const categories = getFacetList(facets, "Категория", true);
  const brands = getFacetList(facets, "Бренды", true);
  const genders = getFacetList(facets, "Пол");
  const russianSizes = getFacetList(facets, "Размер");

  return (
    <aside className="min-w-55 space-y-10">
      {categories.length > 0 && (
        <Accordion
          title={
            <h2 className="font-roboto_condensed text-[20px] font-bold leading-[1.2]">
              Категория
            </h2>
          }
        >
          <FilterCheckboxList
            items={categories.filter((item) => item.id !== String(categoryId))}
            value={filters.categories}
            onChange={(value) => updateFilter("categories", value)}
          />
        </Accordion>
      )}

      {brands.length > 0 && (
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
            value={filters.brandIds}
            onChange={(value) => updateFilter("brandIds", value)}
          />
        </Accordion>
      )}

      {genders.length > 0 && (
        <Accordion
          title={
            <h2 className="font-roboto_condensed text-[20px] font-bold leading-[1.2]">
              Пол
            </h2>
          }
          defaultOpen={false}
        >
          <FilterCheckboxList
            items={genders}
            value={filters.fitIds}
            onChange={(value) => updateFilter("fitIds", value)}
          />
        </Accordion>
      )}

      {russianSizes.length > 0 && (
        <Accordion
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
        </Accordion>
      )}

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
