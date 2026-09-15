export type SizeType = {
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

export type FittingReportTableType = {
  models: {
    cells: {
      nickname: string;
      id: number;
    }[];
    title: string;
  };
  sizeUnitGroups: {
    unit: string;
    sizeColumns: {
      cells: string[];
      title: string;
    }[];
  }[];
};

export type SizeTableType = {
  //   conversionAsianToUSText: true;
  //   commoditySizeTipsKey: "";
  //   deviationCodePrompt: "";
  //   tableStyle: "flat";
  recommendSizeInfo: {
    buttonTitle: string;
    recommendContent: string;
    showRecommendEnter: boolean;
    noResultReason: string;
    tips: string;
  };
  size: SizeType;
  disclaimerTextType: string;
  fittingReportTable: FittingReportTableType;
  disclaimerText: string;
  offSizeInfo: {
    deviationSizeTips: string;
    shortDeviationSizeTips: string;
    tipsPrefix: string;
  };
  sizeImageList: {
    images: {
      width: number;
      genericType: string;
      imgEvenTrace: string;
      url: string;
      height: number;
    }[];

    title: string;
  }[];

  //   disclaimerTextKey: "pzn_ProductPage_SizeGuide_Shoes_Reference_Overlay";
};
