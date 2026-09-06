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
