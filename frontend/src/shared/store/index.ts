import { create } from "zustand";
import type { StoreState } from "./type";
import { createModalSlice } from "./modal/slice";
import { createBasketSlice } from "./basket/slice";
import { createUserSlice } from "./user/slice";
import { createGlobalErrorSlice } from "./global-error/slice";

export const useBoundStore = create<StoreState>()((...args) => ({
  ...createModalSlice(...args),
  ...createBasketSlice(...args),
  ...createUserSlice(...args),
  ...createGlobalErrorSlice(...args),
}));
