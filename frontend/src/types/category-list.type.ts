export type CategoryListResponseType = {
  categories: {
    id: string;
    name: string;
    groups: {
      title: string;
      items: {
        id: string;
        name: string;
        imageUrl: string;
      }[];
    }[];
  }[];
};
