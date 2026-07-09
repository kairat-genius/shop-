import type { ProductType } from "@/entities/product-card";

export type ProductListType = {
  data: ProductType[];
  meta: {
    total: number;
    page: number;
    page_size: number;
    pages: number;
    source: string;
  };
};

export type ProductListFilterType = {
    category__slug?: string;
    collection__slug?: string[];
    design__id?: string[];
    device__id?: number | null;
    page: number;
    page_size: number;
    q?: string | null;
    sort?: string;
    currency: string;
}
