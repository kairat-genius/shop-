import type { ReviewType } from "@/entities/review-card/types/review-card.type";

export type ReviewsListType = {
  count: number;
  next: null | string;
  previous: null | string;
  results: ReviewType[];
};

export type ReviewsListFilterType = {
  category_id?: string;
  is_gallery?: boolean;
  page: number;
  page_size: number;
  rating?: number | null;
  sort?: string;
};
