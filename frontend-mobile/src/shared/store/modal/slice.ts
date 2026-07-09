import type { StateCreator } from "zustand/vanilla";
import type { ModalStateType, ModalType } from "./type";

export const createModalSlice: StateCreator<
  ModalStateType,
  [],
  [],
  ModalStateType
> = (set) => ({
  currentModal: null,

  openModal: (type: ModalType) => set({ currentModal: type }),

  closeModal: () => set({ currentModal: null }),
});
