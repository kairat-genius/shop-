import type { ModalStateType } from "@/shared/store/modal/type";
import type { GlobalErrorStateType } from "@/shared/store/global-error/type";

export type StoreState = ModalStateType & GlobalErrorStateType;
