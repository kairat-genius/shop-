import { useBoundStore } from "@/shared/store";

const useBasket = () => {
  const cart = useBoundStore((s) => s.cart);
  const cartCount = useBoundStore((s) => s.cartCount);
  const isLoading = useBoundStore((s) => s.isLoading);
  const fetchCart = useBoundStore((s) => s.fetchCart);
  const fetchCartCount = useBoundStore((s) => s.fetchCartCount);
  const addItem = useBoundStore((s) => s.addItem);
  const removeItem = useBoundStore((s) => s.removeItem);
  const setQuantity = useBoundStore((s) => s.setQuantity);

 
  return {
    cart,
    isLoading,
    fetchCart,
    addItem,
    removeItem,
    setQuantity,
    fetchCartCount,
    cartCount
  };
};

export default useBasket;
