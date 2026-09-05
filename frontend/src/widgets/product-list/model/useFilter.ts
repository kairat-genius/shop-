import { useState, useCallback } from "react";

export interface FiltersState {
  page: number;
  sortType: number | string;
  sortMode?: string;
  categories: (string | number)[];
  brandIds: (string | number)[];
  fitIds: (string | number)[];
  sizes: (string | number)[];
  priceMin: number | null;
  priceMax: number | null;
}

const defaultFilters: FiltersState = {
  page: 1,
  sortType: 0,
  categories: [],
  brandIds: [],
  fitIds: [],
  sizes: [],
  priceMin: null,
  priceMax: null,
};

export function useFilter() {
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);

  const updateFilters = useCallback(
    (values: Partial<FiltersState>) => {
      setFilters((prev) => ({
        ...prev,
        ...values,
        ...(values.page === undefined && { page: 1 }),
      }));
    },
    [],
  );

  const updateFilter = useCallback(
    <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
      setFilters((prev) => {
        if (key === "page") {
          return {
            ...prev,
            page: value as number,
          };
        }

        return {
          ...prev,
          [key]: value,
          page: 1,
        };
      });
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const resetFilterByKey = useCallback(
    <K extends keyof FiltersState>(key: K) => {
      setFilters((prev) => {
        if (key === "page") {
          return {
            ...prev,
            page: defaultFilters.page,
          };
        }

        return {
          ...prev,
          [key]: defaultFilters[key],
          page: 1,
        };
      });
    },
    [],
  );

  return {
    filters,
    setFilters,
    resetFilters,
    resetFilterByKey,
    updateFilter,
    updateFilters,
  };
}