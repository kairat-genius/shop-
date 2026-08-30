import { useState, useCallback } from "react";

export interface FiltersState {
  page: number;
  cursor?: string | null;
  sortBy: string;
  categories: (string | number)[];
  brands: (string | number)[];
  genders: string[];
  sizes: (string | number)[];
  priceMin: number | null;
  priceMax: number | null;
}

const defaultFilters: FiltersState = {
  page: 1,
  cursor: null,
  sortBy: "relevance",
  categories: [],
  brands: [],
  genders: [],
  sizes: [],
  priceMin: null,
  priceMax: null,
};

export function useFiltersNuqs() {
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);

  const updateFilters = useCallback((values: Partial<FiltersState>) => {
    setFilters((prev) => ({ ...prev, ...values }));
  }, []);

  const updateFilter = useCallback(
    <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const resetFilterByKey = useCallback(
    <K extends keyof FiltersState>(key: K) => {
      setFilters((prev) => ({ ...prev, [key]: defaultFilters[key] }));
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
