import type { ModalStateType } from "@/shared/store/modal/type";
import type { BasketStateType } from "@/shared/store/basket/type";
import type { UserStateType } from "@/shared/store/user/type";
import type { GlobalErrorStateType } from "@/shared/store/global-error/type";

export type StoreState = ModalStateType  & BasketStateType & UserStateType & GlobalErrorStateType;
