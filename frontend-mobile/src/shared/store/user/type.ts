import type { UserType } from "./api/type";


export type UserStateType = {
  userData: UserType;
  isUserDataLoading: boolean;
  isInitialized: boolean;
  syncUserData: () => Promise<void>;
};
