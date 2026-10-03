import { create } from "zustand";
import type { StoreState } from "./type";
import { createModalSlice } from "./modal/slice";
import { createGlobalErrorSlice } from "./global-error/slice";

export const useBoundStore = create<StoreState>()((...args) => ({
  ...createModalSlice(...args),
  ...createGlobalErrorSlice(...args),
}));
