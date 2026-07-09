// hooks/useSearchHistory.ts
import { useState, useEffect, useCallback } from "react";

const SEARCH_HISTORY_KEY = "searchHistory";
const MAX_ITEMS = 10;

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setSearchHistory(JSON.parse(stored));
    } catch {}
  }, []);

  const saveToHistory = useCallback((keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item !== trimmed);
      const updated = [trimmed, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const confirmClearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    setShowConfirmClear(false);
  }, []);

  const cancelClearHistory = useCallback(() => {
    setShowConfirmClear(false);
  }, []);

  const handleOpenClearConfirm = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setShowConfirmClear(true);
    },
    []
  );

  return {
    searchHistory,
    showConfirmClear,
    saveToHistory,
    confirmClearHistory,
    cancelClearHistory,
    handleOpenClearConfirm,
  };
}