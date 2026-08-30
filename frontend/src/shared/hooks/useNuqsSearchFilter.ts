import {
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useCallback } from "react";


export function useFiltersNuqs() {
  const [filters, setFilters] = useQueryStates({
    keyword: parseAsString,
  });

  const updateFilters = useCallback(
    async (values: Partial<typeof filters>) => {
      await setFilters(values);
    },
    [setFilters],
  );

  const updateFilter = useCallback(
    async <K extends keyof typeof filters>(
      key: K,
      value: (typeof filters)[K],
    ) => {
      await setFilters({ [key]: value });
    },
    [setFilters],
  );

  const resetFilters = async () => {
    await setFilters(
      Object.fromEntries(
        Object.keys(filters).map((key) => [key, key === "page" ? 1 : null]),
      ),
    );
  };


  return {
    filters,
    setFilters,
    resetFilters,
    updateFilter,
    updateFilters,
  };
}