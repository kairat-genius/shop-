import { CategoryTreeResponseDto } from "@/shared/api/openapi";
import { createContext } from "react";

interface CatalogContextType {
  categoryData: CategoryTreeResponseDto;
}

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined,
);
