"use client";

import { useEffect, useState } from "react";

import {
  getViewedProducts,
  VIEWED_PRODUCTS_EVENT,
} from "./storage";
import { ProductType } from "@/types/product.type";

export const useViewedProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const sync = () => setProducts(getViewedProducts());

    sync();
    window.addEventListener(VIEWED_PRODUCTS_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(VIEWED_PRODUCTS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return products;
};