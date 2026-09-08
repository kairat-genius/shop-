
import type { CategoryListResponseType } from "@/types/category-list.type";
import { createContext } from "react";

interface CatalogContextType {
  categoryData: CategoryListResponseType;
}

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined,
);
