import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/clsx";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  overlayClassName?: string;
  closeButtonClassName?: string;
}

const Modal = ({
  children,
  onClose,
  className,
  overlayClassName,
}: ModalProps) => {
  return createPortal(
    <div
      data-state="open"
      className={cn(
        "fixed inset-0 z-60 flex items-center justify-center bg-black/40",
        overlayClassName,
      )}
      onClick={onClose}
    >
      <div
        data-state="open"
        className={cn("relative w-full bg-white", className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
