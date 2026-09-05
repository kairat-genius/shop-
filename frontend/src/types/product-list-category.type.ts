export type ProductType = {
  saleTag: string;
  googleProductCategory: string;
  minSpuPrice?: {
    symbol: string;
    localizedDisplayText: string;
    money: {
      amount: string;
      minUnitVal: number;
      currency: string;
    };
    amountText: string;
    sign: string;
    absText: string;
  };
  rankingTags: [];
  language: string;
  favoriteStatus: number;
  title: string;
  articleNumber: string;
  level1CategoryId: number;
  skuId: number;
  imageCutSize: number;
  logoUrl: string;
  url: string;
  displayRecommendLabels: {
    labelSource: 3;
    labelIcons?: string[];
    hasMore?: boolean;
    labelId: number;
    labelText: string;
  }[];

  contentCategory: number;
  tradingRoles: number[];
  trackingInfo: string;
  brandId: number;
  spuId: number;
  level2CategoryId: number;
  sellDate: number;
  labelModel: {
    id: number;
    labelName: string;
  };
  region: string;
  globalSpuId: number;
  algoAcmItem: {
    requestId: string;
    acm: string;
  };
  categoryId: number;
  status: number;
};

export type ProductListCategoryResponseType = {
  searchSpuList: {
    noResultsTitle: string;
    total: number;
    spuList: ProductType[]
  };
};

export type CategoryProductListFilterType = {
  categoryId: string;
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
