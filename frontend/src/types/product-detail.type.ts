export type ShareInfoType = {
  shareImageUrl: string;
  shareContent: string;
  shareTitle: string;
  shareUrl: string;
};

export type ImageModelType = {
  modelWear: boolean;
  imageId: number;
  propertyValueId: number;
  channel: number;
  sort: number;
  label: number;
  genericTypeSort: number;
  imgEvenTrace: string;
  url: string;
  colorStyle: string;
  genericType: string;
  imgType: number;
  burialImgType: number;
};

export type AuthenticatedGuaranteeModuleType = {
  width: number;
  title: string;
  url: string;
  height: number;
};

export type DetailImageListType = {
  imageId: number;
  sort: number;
  genericType: string;
  genericTypeSort: number;
  imgEvenTrace: string;
  url: string;
  imgType: number;
  burialImgType: number;
};

export type DetailTextModuleType = {
  detailTextList: {
    generalType: string;
    subTitle: string;
    imgEvenTrace: string;
    content: string;
  }[];
  title: string;
};

export type PropertyModuleType = {
  propertyBlocks: {
    propertyList: {
      name: string;
      value: string;
    }[];
    isShowTitle: boolean;
    title: string;
    type: string;
  }[];
  iconUrl: string;
};

export type SeriesItemsModelType = {
  customSortState: boolean;
  itemType: string;
  name: string;
  linkUrl: string;
  defaultShow: number;
  value: string;
  key: string;
  seriesId: number;
  primaryKey: string;
};

export type BrandItemsModelType = {
  isShowBrand: number;
  brandName: string;
  brandId: number;
  linkUrl: string;
  brandItems: string;
  brandLogo: string;
};

export type SeriesDialogModelType = {
  seriesSpuList: {
    spuId: number;
    logoUrl: string;
  }[];
  dialogTitle: string;
  spuCount: number;
  dialogSeriesTitle: string;
  seriesId: number;
  dialogSeriesSpuCnt: string;
};

export type RankingModuleType = {
  rankingList: {
    icon: string;
    name: string;
    rank: string;
    id: number;
    url: string;
  }[];
};

export type PriceType = {
  symbol: "₽";
  localizedDisplayText: "10 890 ₽";
  money: {
    amount: "10890.00";
    minUnitVal: 1089000;
    currency: "RUB";
  };
  amountText: "10 890";
  sign: "+";
  absText: "10 890";
};

export type ProductDetailType = {
  shareInfo: ShareInfoType;
  imageModels: ImageModelType[];
  authenticatedGuaranteeModule: AuthenticatedGuaranteeModuleType;
  detailImageList: DetailImageListType[];
  detailTextModule: DetailTextModuleType;
  propertyModule?: PropertyModuleType;
  seriesItemsModel?: SeriesItemsModelType[];
  brandItemsModel?: BrandItemsModelType;
  seriesDialogModel?: SeriesDialogModelType;
  rankingModule?: RankingModuleType;
  price: PriceType;
};
