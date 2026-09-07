import type { ProductType } from "./product.type";

export type ProductListCategoryResponseType = {
  searchSpuList: {
    noResultsTitle: string;
    total: number;
    spuList: ProductType[];
  };
};

export type ProductListFilterType = {
  categoryId?: string;
  brandId?: string;
  page?: number;
  pageSize?: number;
  sortType?: number;
  sortMode?: string;
  brandIds?: Array<number>;
  categoryIds?: Array<string>;
  seriesIds?: Array<string>;
  fitIds?: Array<number>;
  colors?: Array<string>;
  sizes?: Array<string>;
  priceMin?: number;
  priceMax?: number;
};
