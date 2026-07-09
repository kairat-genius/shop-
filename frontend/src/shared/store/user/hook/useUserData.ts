import { useCallback } from "react";
import { useBoundStore } from "@/shared/store";

export const useUserData = () => {
  const userData = useBoundStore((state) => state.userData);
  const isUserDataLoading = useBoundStore((state) => state.isUserDataLoading);
  const syncUserData = useBoundStore((state) => state.syncUserData);

  // Синхронизация данных пользователя с сервером
  const syncData = useCallback(async () => {
    await syncUserData(); // syncUserData должна быть асинхронной функцией
  }, [syncUserData]);

  return {
    userData,
    isUserDataLoading,
    syncData,
  };
};
