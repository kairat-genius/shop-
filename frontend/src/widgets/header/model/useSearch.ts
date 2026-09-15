import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsSearchFilter";
import { getSuggest } from "../api/getSuggest";

export function useSearch() {
  const router = useRouter();
  const { filters } = useFiltersNuqs();
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.keyword || "");

  // Добавляем стейт для хранения подсказок
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFocus = useCallback(() => setIsFocused(true), []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (dropdownRef.current?.contains(e.relatedTarget as Node)) return;
    setIsFocused(false);
  }, []);

  const handleOverlayClick = useCallback(() => {
    setIsFocused(false);
    inputRef.current?.blur();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    [],
  );

  const navigateToSearch = useCallback(
    (keyword: string) => {
      const trimmed = keyword.trim();
      if (trimmed) {
        router.push(`/search?keyword=${encodeURIComponent(trimmed)}`);
        setIsFocused(false);
        inputRef.current?.blur();
      }
    },
    [router],
  );

  const handleClear = useCallback(() => {
    setSearchQuery("");
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const data = await getSuggest(query);
        setSuggestions(data.suggestions || []);
      } catch (error) {
        console.error("Ошибка загрузки подсказок:", error);
      }
    };

    // Устанавливаем таймер на 300 миллисекунд
    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return {
    isFocused,
    searchQuery,
    suggestions,
    inputRef,
    dropdownRef,
    handleFocus,
    handleBlur,
    handleOverlayClick,
    handleChange,
    navigateToSearch,
    handleClear,
  };
}
