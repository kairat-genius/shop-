export type BrandListResponseType = {
  brandInfo: {
    sortLabel: string;
    itemList: {
      brandUrl: string;
      brandId: number;
      name: string;
      icon: string;
    }[];
    sort: string;
  }[];
};
