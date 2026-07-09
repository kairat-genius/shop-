"use client";

import { createPortal } from "react-dom";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Link from "next/link";
import { useSearch } from "../model/useSearch";
import { useSearchHistory } from "../model/useSearchHistory";
import SearchSuggestions from "./SearchSuggestions";

const Search = () => {
  const {
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
  } = useSearch();

  const {
    searchHistory,
    showConfirmClear,
    saveToHistory,
    confirmClearHistory,
    cancelClearHistory,
    handleOpenClearConfirm,
  } = useSearchHistory();

  const handleSearchSubmit = () => {
    saveToHistory(searchQuery.trim());
    navigateToSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <>
      {isFocused &&
        createPortal(
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            onClick={handleOverlayClick}
          />,
          document.body
        )}

      <div className="relative bg-white py-0.5 border border-teal-400 rounded-sm flex items-center h-8.5 w-full">
        <div className="px-2 md:px-3 flex items-center w-full gap-1">
          <input
            ref={inputRef}
            id="search-input"
            name="search"
            className="w-full text-xs md:text-sm outline-none leading-normal caret-teal-400"
            type="text"
            placeholder="anta kai 2"
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          {searchQuery && (
            <Button onClick={handleClear} aria-label="Очистить поле поиска">
              <Icon
                icon="x"
                width={16}
                height={16}
                className="shrink-0 text-slate-500"
              />
            </Button>
          )}
        </div>
        <Button
          className="w-9 md:w-11 border-l h-8.5 shrink-0 text-teal-400"
          style={{
            backgroundColor: "rgba(0,254,255,.06)",
            borderColor: "rgba(1,194,195,.3)",
          }}
          onClick={handleSearchSubmit}
          aria-label="Поиск"
        >
          <Icon icon="search" width={22} height={22} className="w-4.5 md:w-5.5 h-4.5 md:h-5.5" />
        </Button>

        {isFocused && searchQuery.trim() === "" && (
          <SearchSuggestions
            searchHistory={searchHistory}
            showConfirmClear={showConfirmClear}
            onSaveToHistory={saveToHistory}
            onOpenClearConfirm={handleOpenClearConfirm}
            onConfirmClear={confirmClearHistory}
            onCancelClear={cancelClearHistory}
          />
        )}

        {isFocused && searchQuery.trim() !== "" && (
          <div
            ref={dropdownRef}
            className="absolute rounded-sm top-10 left-0 right-0 bg-white max-h-100 overflow-auto w-full z-50"
            style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, .15)" }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Link
              href={`/search?keyword=${encodeURIComponent(searchQuery.trim())}`}
              className="h-10 px-3 items-center flex justify-between gap-2 border-t border-slate-100"
              onClick={() => saveToHistory(searchQuery.trim())}
            >
              <div className="flex-1 text-sm text-slate-500 leading-[16.41px] truncate">
                <span className="font-medium text-slate-950">
                  {searchQuery.trim()}
                </span>
              </div>
              <Icon
                icon="move-up-left"
                width={16}
                height={17}
                className="shrink-0 text-slate-300"
              />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;