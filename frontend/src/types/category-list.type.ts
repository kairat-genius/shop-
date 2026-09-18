export type CatalogCategoryNode = {
  level: number;
  id: number;
  pic: string;
  title: string;
  isEnd: number;
  url: string;
  parentId: number;
  childTreeNode: CatalogCategoryNode[];
};

export type CategoryListResponseType = {
  categories: CatalogCategoryNode[];
};
