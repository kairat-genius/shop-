import type { ProductType } from "./product.type";

export type BrandFeedAlgoAcmDto = {
  itemId?: string;
  extMap?: Record<string, unknown>;
  itemType?: string;
  requestId?: string;
  channelName?: string;
  acm?: string;
};

export type BrandItemType = {
  brandName: string;
  spuList: ProductType[];
  brandId: number;
  statisticalData: {
    soldNumText: string;
    productNumText: string;
    interestedNumText: string;
    newNumText: string;
  };
  brandIcon: string;
  algoAcmItemDto: BrandFeedAlgoAcmDto;
};

export type AccessBrandItemType = {
  brandName: string;
  brandId: number;
  icon: string;
  type: string; // "all" | "normal"
  algoAcmItemDto?: BrandFeedAlgoAcmDto;
};

export type CategoryRecommendItemType = {
  categoryName: string;
  categoryId?: number;
  trackingTabType?: string;
  algoAcmItemDto?: BrandFeedAlgoAcmDto;
};

export type BrandFeedResponseType = {
  floorModularList: BrandItemType[];

  accessBrand: {
    algoAcmDto: { requestId?: string };
    brandList: AccessBrandItemType[];
  };

  categoryRecommend: {
    algoAcmDto: { requestId?: string };
    firstCategoryRecommendList: CategoryRecommendItemType[];
  };
};

export type BrandFeedFilterType = {
  page?: number;
  pageSize?: number;
  categoryId?: string;
};