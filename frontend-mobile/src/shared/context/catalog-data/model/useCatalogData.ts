"use client";
import { useContext } from "react";
import { CatalogContext } from "./CatalogContext";

export const useCatalogData = () => {
  const context = useContext(CatalogContext);
  if (!context)
    throw new Error(
      "useCatalogData must be used within a CatalogProvider",
    );
  return context;
};
