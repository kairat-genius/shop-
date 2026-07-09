import { useBoundStore } from "@/shared/store";

const useModal = () => {
  const currentModal = useBoundStore((state) => state.currentModal);
  const openModal = useBoundStore((state) => state.openModal);
  const closeModal = useBoundStore((state) => state.closeModal);
  return { currentModal, openModal, closeModal };
};

export default useModal;
