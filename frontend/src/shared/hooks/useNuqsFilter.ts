import {
  createParser,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useCallback } from "react";

export const parseAsFromTo = createParser<[number, number] | null>({
  parse: (value) => {
    if (!value) return null;

    const [minStr, maxStr] = value.split("~");
    const min = parseAsInteger.parse(minStr) ?? 0;
    const max = parseAsInteger.parse(maxStr) ?? min;

    return [min, max];
  },
  serialize: (value) => {
    if (!value) return "";
    const [min, max] = value;
    return `${min}~${max}`;
  },
});

export function useFiltersNuqs(initialDeviceId?: number) {
  const [filters, setFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    sort: parseAsString.withDefault("default"),
    design__id: parseAsArrayOf(parseAsString).withDefault([]),
    collection__slug: parseAsArrayOf(parseAsString).withDefault([]),
    device__id: parseAsInteger.withDefault(initialDeviceId ?? 0),
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    brands: parseAsArrayOf(parseAsString).withDefault([]),
    genders: parseAsArrayOf(parseAsString).withDefault([]),
    sizes: parseAsArrayOf(parseAsString).withDefault([]),
    priceRange: parseAsFromTo,
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

  // 🔹 Сброс конкретного фильтра
  const resetFilterByKey = async <K extends keyof typeof filters>(key: K) => {
    let defaultValue: unknown = null;

    if (key === "page") {
      defaultValue = 1;
    } else if (Array.isArray(filters[key])) {
      defaultValue = [];
    }

    await setFilters({ [key]: defaultValue });
  };

  return {
    filters,
    setFilters,
    resetFilters,
    resetFilterByKey,
    updateFilter,
    updateFilters,
  };
}
