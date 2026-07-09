// @/shared/store/basketSlice.ts
import type { StateCreator } from "zustand";
import {
  getCartProducts,
  addCartProduct,
  deleteCartProduct,
  updateCartProductCount,
  getCartProductsCount,
} from "./api/cart";
import type { BasketStateType } from "./type";

export const createBasketSlice: StateCreator<BasketStateType> = (set, get) => ({
  cart: null,
  cartCount: 0,
  isLoading: false,

  fetchCartCount: async () => {
    try {
      const data = await getCartProductsCount();
      set({ cartCount: data.count });
    } catch (error) {
      console.error("Failed to fetch cart count", error);
    }
  },

  fetchCart: async (currency: string) => {
    set({ isLoading: true });
    try {
      const cart = await getCartProducts(currency);
      set({ cart, cartCount: cart.total_items });
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (productId: number, currency: string, qty = 1) => {
    set({ isLoading: true });
    try {
      await addCartProduct(productId, qty);
      await get().fetchCartCount();
      if (get().cart) {
        await get().fetchCart(currency);
      }
    } catch (error) {
      console.error("Failed to add item", error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (itemId: number, currency: string) => {
    set({ isLoading: true });
    try {
      await deleteCartProduct(itemId);
      if (get().cart) {
        await get().fetchCart(currency);
      }
    } catch (error) {
      console.error("Failed to remove item", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setQuantity: async (itemId: number, qty: number, currency: string) => {
    if (qty <= 0) {
      await get().removeItem(itemId, currency);
      return;
    }
    set({ isLoading: true });
    try {
      await updateCartProductCount(itemId, qty);
      if (get().cart) {
        await get().fetchCart(currency);
      }
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      set({ isLoading: false });
    }
  },
  
});
