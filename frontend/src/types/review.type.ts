export type ReviewType = {
  images?: {
      imageUrl: string;
      width: number;
      height: number;
    }[];
  publishDate: string
  userName: string
  userId: number;
  skuProperty:string
  sizeFeelingText: string
  score: string
  originType: number;
  reviewData: string[];
  poizonReply:string
  userIcon: string
  reviewId: string
  trackingId: string
};

export type ReviewsListType = {
  total: number;
  pages: number;
  contents: ReviewType[];
  pageSize: number;
  pageNum: number;
};
