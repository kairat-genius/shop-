"use client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";

const SUGGESTIONS = [
  "fireberry",
  "nike air force",
  "adidas samba",
  "new balance 530",
  "puma suede",
  "jordan bag",
  "баскетбол и обувь",
  "air force nike man",
  "vans old skool",
  "men crossbody bag",
];

interface UseSearchInputOptions {
  onSearch?: (query: string) => void;
}

export function useSearchInput({ onSearch }: UseSearchInputOptions) {
  const { filters } = useFiltersNuqs();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Локальное значение поля
  const [inputValue, setInputValue] = useState(filters.keyword ?? "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Фильтруем подсказки по локальному тексту
  const filteredSuggestions = useMemo(() => {
    if (!inputValue.trim()) return [];
    const lower = inputValue.toLowerCase();
    return SUGGESTIONS.filter((item) => item.toLowerCase().includes(lower));
  }, [inputValue]);

  // Обновление локального текста (не трогаем глобальный keyword)
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsModalOpen(value.trim().length > 0);
  }, []);

  // Фокус: открываем модалку, если уже есть текст
  const handleFocus = useCallback(() => {
    if (inputValue.trim().length > 0) {
      setIsModalOpen(true);
    }
  }, [inputValue]);

  // Очистка поля и глобального keyword
  const handleClear = useCallback(() => {
    setInputValue("");
    setIsModalOpen(false);
    inputRef.current?.focus();
  }, []);

  // Подтверждение поиска: синхронизируем глобальный keyword и переходим
  const handleSearch = useCallback(
    (searchValue?: string) => {
      const query = (searchValue ?? inputValue).trim();
      if (!query) return;

      onSearch?.(query);
      router.push(`/search?keyword=${encodeURIComponent(query)}`);
      setIsModalOpen(false);
    },
    [inputValue, router, onSearch],
  );

  // Выбор подсказки
  const handleSelectSuggestion = useCallback(
    (suggestion: string) => {
      setInputValue(suggestion);
      handleSearch(suggestion);
    },
    [handleSearch],
  );

  // Обработка нажатия Enter в поле ввода
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  return {
    inputValue,
    isModalOpen,
    filteredSuggestions,
    inputRef,
    handleChange,
    handleFocus,
    handleClear,
    handleSearch,
    handleSelectSuggestion,
    handleKeyDown,
    closeModal: () => setIsModalOpen(false),
  };
}
