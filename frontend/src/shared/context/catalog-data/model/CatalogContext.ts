import type { CategoryTreeResponse } from "@/types/category-slug.type";
import { createContext } from "react";

interface CatalogContextType {
  categoryData: CategoryTreeResponse;
}

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined,
);
