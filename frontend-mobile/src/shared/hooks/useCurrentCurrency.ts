"use client";

import { useCatalogData } from "@/shared/context/catalog-data";
import { useMemo } from "react";

export function useCurrentCurrency() {
  const { currenciesData } = useCatalogData();

  const currentCurrency = useMemo(() => {
    if (globalThis.window === undefined) {
      return currenciesData?.[0] ?? null;
    }

    const hostname = globalThis.window.location.hostname;

    return (
      currenciesData.find((item) =>
        hostname.includes(item.domain),
      ) ?? currenciesData?.[0] ?? null
    );
  }, [currenciesData]);

  return {
    currentCurrency,
  };
}