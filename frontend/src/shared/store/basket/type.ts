export type BasketItems = Record<string, number>;

export type CartProductType = {
  items: {
    id: number;
    product_id: number;
    title: string;
    slug: string;
    cover: string;
    price: number;
    compare_price: number;
    discount_percent: number;
    quantity: number;
    gift_quantity: number;
    line_total: number;
    promotion: {
      id: number;
      buy_quantity: number;
      pay_quantity: number;
      gift_quantity: number;
    };
  }[];
  total: number;
  total_without_discount: number;
  total_items: number;
};

export interface BasketStateType {
  cart: CartProductType | null;
  cartCount: number;
  isLoading: boolean;
  fetchCart: (currency: string) => Promise<void>;
  fetchCartCount: () => Promise<void>;
  addItem: (productId: number, currency: string, qty?: number) => Promise<void>;
  removeItem: (itemId: number, currency: string) => Promise<void>;
  setQuantity: (itemId: number, qty: number, currency: string) => Promise<void>;
}
