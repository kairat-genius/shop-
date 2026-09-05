export type FacetType = {
  module: string;
  name: string;
  defaultShow: boolean;
  type: number;
  items: {
    name: string;
    count: number;
    btnType: number;
    value: string;
  }[];
  nested: boolean;
  key: string;
  unfold: boolean;
  nestedFacets?: {
    module: string;
    name: string;
    defaultShow: boolean;
    type?: number;
    value?: string;
    items: {
      name: string;
      count: number;
      btnType: number;
      value: string;
    }[];
    nested: boolean;
    nestedFacets: [
      {
        module: string;
        name: string;
        defaultShow: boolean;
        type: number;
        items: {
          name: string;
          count: number;
          btnType: number;
          value: string;
        }[];
        nested: boolean;
        key: string;
        unfold: boolean;
      },
    ];
    key: string;
    unfold: boolean;
  }[];
};

export type CategoryFiltersResponseType = {
  facets: Array<FacetType>;
};
