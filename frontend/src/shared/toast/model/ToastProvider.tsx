'use client'
import {
  useState,
  type ReactNode,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import Toast from "../ui/Toast";

import type { ToastType, ToastMessage } from "./type";
import { createPortal } from "react-dom";
import { ToastContext } from "./ToastContext";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      setToastMessage({ message, type });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toastMessage &&
        createPortal(
          <Toast message={toastMessage.message} type={toastMessage.type} />,
          document.body,
        )}
    </ToastContext.Provider>
  );
};
