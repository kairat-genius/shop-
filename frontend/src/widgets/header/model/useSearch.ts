import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";

export function useSearch() {
  const router = useRouter();
  const { filters } = useFiltersNuqs();
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.keyword || "");
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

  return {
    isFocused,
    searchQuery,
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
