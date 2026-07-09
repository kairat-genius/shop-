import type { StateCreator } from "zustand/vanilla";
import type { GlobalErrorStateType } from "./type";

export const createGlobalErrorSlice: StateCreator<
  GlobalErrorStateType,
  [],
  [],
  GlobalErrorStateType
> = (set) => ({
  apiErrorStatus: null,
  setApiErrorStatus: (status) => set({ apiErrorStatus: status }),
  clearApiError: () => set({ apiErrorStatus: null }),
});
