export type ModalType = 'country-selector' | 'filter-by' | 'basket' | 'search' | 'edit-profile' | 'case-type' | null;

export type ModalStateType = {
  currentModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};
