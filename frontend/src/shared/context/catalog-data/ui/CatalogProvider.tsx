"use client";
import type { ReactNode } from "react";

import { CatalogContext } from "../model/CatalogContext";
import type { CategoryTreeResponse } from "@/types/category-slug.type";

interface CategoryProviderProps {
  children: ReactNode;
  categoryData: CategoryTreeResponse;
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
