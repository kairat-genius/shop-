export type ProductType = {
  id: number;
  title: string;
  price: number;
  compare_price: number | null;
  discount_percent: number | null;
  cover: string;
  design: string;
  slug: string;
  promotion: {
    id: number;
    buy_quantity: number;
    pay_quantity: number;
    gift_quantity: number;
  } | null;
};
