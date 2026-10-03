"use client";
import type { ReactNode } from "react";

import { CatalogContext } from "../model/CatalogContext";
import { CategoryListResponseType } from "@/types/category-list.type";


interface CategoryProviderProps {
  children: ReactNode;
  categoryData: CategoryListResponseType;
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
