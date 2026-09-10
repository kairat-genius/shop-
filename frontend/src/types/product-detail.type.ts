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

export type SizeAssistantModuleType = {
  sizeUnits: {
    unit: string;
    selected: boolean;
  }[];
  size: {
    sizeList: {
      sizeKeyList: {
        sizeKey: string;
        sizeValue: string;
        sizeValueList: string[];
      }[];
      sizeParameterList: {
        sizeKey: string;
        sizeValue: string;
        sizeValueList: string[];
      }[];
      title: string;
    }[];
    freezeColumnNum: number;
    sizeConversionAsianToUS: boolean;
  };
  heightWeightSizeTableFlag: boolean;
  title: string;
  sizeRecommend: {
    recommendTitle: string;
    recommendTitleRichText: string;
  };
};

export type DetailType = {
  ageRange: "adult";
  fitId: 3;
  chineseMade: false;
  gender: "unisex";
  language: "bbmax";
  title: "PAUL FRANK Покрытие противоскользящее устойчивое к истиранию легкое дышащее низкий топ кеды немецкой армии (GAT) женские";
  frontCategoryId: number;
  frontCategoryName: string;
  sourceSpuId: 38878018;
  areaName: "BBMAX";
  level1CategoryId: 29;
  brandName: "PAUL FRANK";
  sizeSystem: "RU";
  bagWatchAccessory: false;
  logoUrl: "https://cdn-img.thepoizon.ru/pro-img/origin-img/20260301/b1fee62d355e440ab36da24b70829736.png";
  labelList: {
    id: 90;
    labelName: "";
  }[];

  createdBy: "DEWU";
  brandId: 1002261;
  buyStatus: 1;
  spuId: 8900224306213268;
  level2CategoryId: 35;
  sourceName: "default";
  globalSpuId: 14013093268;
  categoryId: 1005843;
  status: 1;
};

export type SalePropertiesType = {
  displayStyle: 4;
  level: 1;
  pvIdSourceOverseaMap?: {
    "8904311802913268": 1022243956;
  };
  propertyList: {
    propertyKey: "DEFAULT";
    propertyItemModels: {
      level: 1;
      propertyValueId: number;
      name: "Цвет";
      spuId: number;
      sort: 0;
      propertyId: 8904311802913268;
      value: "Пыльно-розовый";
      url?: "https://cdn-img.thepoizon.ru/pro-img/origin-img/20260301/b1fee62d355e440ab36da24b70829736.png";
      selected: true;
      definitionId: 1;
      sizeParameterList?: [
        {
          sizeKey: "Длина стопы: ";
          sizeValue: "22,5 cm";
        },
      ];
      suffix?: "RU";
    }[];
  }[];

  name: "Цвет";
  defaultShow: "DEFAULT";
  governType: 1;
  giftProp: false;
  definitionId: number;

  guideTip?: "Гайд размера";
  showGuide?: 1;
};

export type SkusType = {
  skuTitle: "Anta KAI SPEED 2 Low Баскетбольные кроссовки Мужские Черные Розовые Черный Розовый 38";
  skuSpeedInfo: [
    {
      minDay: 17;
      speedInfoTip: "17-24 дней";
      deliveryInfoModel: {
        deliveryItems: [
          {
            deliveryTimeText: "26 сент. – 3 окт.";
            deliveryTypeText: "Бесплатная доставка";
            deliveryType: 0;
          },
          {
            deliveryTimeText: "16 сент. – 23 сент.";
            deliveryTypeText: "Ускоренная доставка";
            deliveryType: 1;
          },
        ];
        deliveryText: '<poizon style="color:#14151A; poizon-font:POIZONText12Regular;">Срок доставки по адресу: <u>Москву,ЦФО</u></poizon>';
        icon: {
          icon: "https://cdn-img.thepoizon.ru/node-common/4bdd1249-8c93-6364-0f24-468aa275fc24-48-48.png";
          width: 24;
          height: 24;
        };
      };
      easyBuyModel: {
        easyBuyFlag: true;
        easyBuyText: "Покупка с уверенностью";
      };
      labelInfo: {
        name: "Международная";
      };
      saleInventoryNo: "BBMAX1516739920780-677";
      maxDay: 24;
      tradeLabel: "Международная";
      speedPrice: {
        symbol: "₽";
        localizedDisplayText: "8 559 ₽";
        money: {
          amount: "8559.00";
          minUnitVal: 855900;
          currency: "RUB";
        };
        amountText: "8 559";
        sign: "+";
        absText: "8 559";
      };
      tradeLabelId: 2;
      skuDeliveryDesc: '<poizon style="color:#14151A; poizon-font:POIZONText12Regular;">Срок доставки по адресу: <u>Москву,ЦФО</u>, 26 сент. – 3 окт.</poizon>';
    },
  ];
  couponInfo: {
    backgroundColorHex: "";
    content: "";
  };
  hitBizTags: [
    {
      name: "Почти распродано";
      type: 2;
    },
  ];
  minPrice: {
    symbol: "₽";
    localizedDisplayText: "8 559 ₽";
    money: {
      amount: "8559.00";
      minUnitVal: 855900;
      currency: "RUB";
    };
    amountText: "8 559";
    sign: "+";
    absText: "8 559";
  };
  spuId: 8900164346829474;
  sourceSkuId: 936061575;
  subscribeFlag: false;
  bizTag: {
    name: "Почти распродано";
    type: 2;
  };
  skuId: 8901996266829474;
  authPrice: 0;
  properties: [
    {
      level: 1;
      propertyValueId: 8903158768159474;
    },
    {
      level: 2;
      propertyValueId: 8903158768169474;
    },
  ];
  status: 1;
};

export type BuyDialogModelType = {
  detail: DetailType;
  saleProperties: SalePropertiesType[];
  skus: SkusType[];
  offSizeInfo?: {
    deviationSizeTips: string;
    shortDeviationSizeTips: string;
    tipsPrefix: string;
  };
};

export type SizeFeelingModuleType = {
  rateText: string;
  thousandRate: number;
  title: string;
};

export type CommodityReviewsType = {
  spuAvgScoreNumber?: "4.9";
  reviewsDescription: "4,9(235)";
  spuAvgScore?: "4,9";
  reviewsCount: "235";
  title: "ОТЗЫВЫ";
  contentTagList: {
    tagId: 1953;
    count: 18;
    tagName: "Ощущения при носке";
  }[];
  reviewsDetailList: {
    score: "5.0";
    reviewData: "Кроссовки пришли раньше на два дня положенного срока доставки. Все супер. Точно в размер, качество на высоте. Стопу облегают плотно, при этом движения не затрудняют. ";
    originType: 2;
    defaultIcon: "https://cdn-img.thepoizon.ru/node-common/66515c7d-af48-3130-f558-cd98c46d9f7b-70-70.png";
    publishDate: "31 июл. 2026 г.";
    hasImage: 1;
    userName: "+***1";
    userIcon: "https://cdn-img.thepoizon.ru/node-common/1138ecdd-6fed-9d55-7c40-1f413d0302cd-160-160.png";
    userId: 1109991421868116;
    firstLetter: "+";
    skuProperty: "Размер: 42 RU (43 EU), Цвет: Черный Розовый";
    trackingId: "1462538638";
  }[];
  sizeFeelingModule?: SizeFeelingModuleType[];
  goodsContents?: {
    images: {
      imageUrl: "https://cdn.thepoizon.ru/app/bbmax-app/1109991421868116/87a2b21951f31ed667554cb682962427_android_1785496044177_3060h4080.jpg";
      width: 3060;
      mediaType: 1;
      height: 4080;
    }[];

    contentData: string[];
    contentId: "1462538638_2";
    publishDate: "31 июл. 2026 г.";
    likeCount: 1;
    userName: "+***1";
    userId: 1109991421868116;
    skuProperty: "Размер: 42 RU (43 EU), Цвет: Черный Розовый";
    score: "5.0";
    originType: 2;
    likeStatus: 3;
    userIcon: "https://cdn-img.thepoizon.ru/node-common/1138ecdd-6fed-9d55-7c40-1f413d0302cd-160-160.png";
    firstLetter: "+";
    trackingId: "1462538638";
  }[];

  scoreDesc: string;
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
  sizeAssistantModule: SizeAssistantModuleType;
  buyDialogModel: BuyDialogModelType;

  saleImages: [];
  commodityReviews: CommodityReviewsType;
};
