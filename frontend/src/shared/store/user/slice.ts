import type { StateCreator } from "zustand";

import type { UserStateType } from "./type";
import { getUser } from "./api/getUser";

export const createUserSlice: StateCreator<
  UserStateType,
  [],
  [],
  UserStateType
> = (set, get) => {
  return {
    userData: null,
    isUserDataLoading: true,
    isInitialized: false, // <-- Новый флаг

    syncUserData: async () => {
      // Ставим лоадер только если данные еще ни разу не загружались
      if (!get().isInitialized) {
        set({ isUserDataLoading: true });
      }

      try {
        const fresh = await getUser();
        if (!fresh) return;

        const prev = get().userData;
        const isSame =
          prev &&
          prev.last_name === fresh.last_name &&
          prev.first_name === fresh.first_name &&
          prev.email === fresh.email;

        if (!isSame) {
          set({ userData: fresh });
        }
      } finally {
        // Помечаем, что первая загрузка прошла, и выключаем лоадер
        set({ isUserDataLoading: false, isInitialized: true });
      }
    },
  };
};
