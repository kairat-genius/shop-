import type { FacetType } from "./category-filters.type";
import type { ProductType } from "./product.type";

export type ProductListSearchResponseType = {
  searchSpuList: {
    noResultsTitle: string;
    total: number;
    spuList: ProductType[];
    fallbackSpuList?: ProductType[];
  };
  facetList: Array<FacetType>;
  facetPanel: Array<FacetType>;
};

export type ProductListSearchFilterType = {
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
  keyword?: string;
};
