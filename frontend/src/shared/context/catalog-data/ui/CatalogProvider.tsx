"use client";
import type { ReactNode } from "react";

import { CatalogContext } from "../model/CatalogContext";
import { CategoryTreeResponseDto } from "@/shared/api/openapi";

interface CategoryProviderProps {
  children: ReactNode;
  categoryData: CategoryTreeResponseDto;
}

export const CatalogProvider = ({
  children,
  categoryData,
}: CategoryProviderProps) => {
  return (
    <CatalogContext.Provider value={{ categoryData }}>
      {children}
    </CatalogContext.Provider>
  );
};
