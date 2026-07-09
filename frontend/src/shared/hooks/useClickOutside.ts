'use client'
import { useEffect, type RefObject } from "react";

/**
 * Хук для обработки клика вне указанного элемента
 * @param ref — ссылка на элемент, за которым следим
 * @param handler — функция, которая выполнится при клике вне
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Ничего не делаем, если клик был внутри элемента
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}