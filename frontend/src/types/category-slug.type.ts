import {
  CategoriesResponseWithPaginationDto,
  CategoryDto,
} from "@/shared/api/openapi";

export type CategoryWithSlug = CategoryDto & { slug: string };

export type CategoryTreeItem = CategoryWithSlug & {
  children: CategoryTreeItem[];
};

export type CategoriesWithSlugsResponse = Omit<
  CategoriesResponseWithPaginationDto,
  "data"
> & {
  data: CategoryWithSlug[];
};

export type CategoryTreeResponse = Omit<
  CategoriesResponseWithPaginationDto,
  "data"
> & {
  data: CategoryTreeItem[];
};
