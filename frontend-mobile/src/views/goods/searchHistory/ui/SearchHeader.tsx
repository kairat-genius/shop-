"use client";
import { useSearchInput } from "../model/useSearchInput";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text;
  const regex = new RegExp(
    `(${query.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)})`,
    "gi",
  );
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-slate-950 font-semibold">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

interface SearchHeaderProps {
  onSearch: (query: string) => void;
}

const SearchHeader = ({ onSearch }: SearchHeaderProps) => {
  const router = useRouter();
  const {
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
    closeModal,
  } = useSearchInput({ onSearch });

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <header className="px-[3.733vw] h-[11.733vw] sticky top-0 bg-white z-30 flex items-center">
      <Button className="w-[6.4vw] h-[6.4vw]" onClick={handleBack}>
        <Icon
          icon="chevron-right"
          className="w-full h-full rotate-180 text-slate-500"
        />
      </Button>
      <div className="ml-[2.133vw] h-[8.533vw] flex items-center w-full border-scale before:rounded-[2.133vw] before:border before:border-slate-300">
        <div className="flex-1 p-[2.4vw] min-h-[6.4vw]">
          <input
            ref={inputRef}
            className="min-h-[1.5em] leading-normal text-[3.2vw] w-full outline-none caret-teal-400"
            placeholder="adidas taekwondo"
            value={inputValue}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {inputValue.length > 0 && (
          <Button
            className="w-[3.2vw] h-[3.2vw] mr-[2.4vw]"
            onClick={handleClear}
          >
            <Icon icon="x" className="w-full h-full text-slate-500" />
          </Button>
        )}
        <Button
          onClick={() => handleSearch()}
          className="w-[9.6vw] bg-[rgba(199,199,215,.1)] h-full border-scale before:border-l before:border-slate-300"
        >
          <Icon icon="search" className="w-[4.8vw] h-[4.8vw]" />
        </Button>
      </div>
      {isModalOpen && filteredSuggestions.length > 0 && (
        <Modal
          className="h-full py-[1.6vw] px-[3.733vw]"
          overlayClassName="top-[11.733vw]"
          onClose={closeModal}
        >
          {filteredSuggestions.map((item) => (
            <div
              key={item}
              onClick={() => handleSelectSuggestion(item)}
              className="border-scale before:border-b before:border-slate-300 py-[2.667vw] flex items-center justify-between text-[3.733vw] text-slate-500 leading-[normal]"
            >
              <div className="truncate flex-1">
                {highlightMatch(item, inputValue)}
              </div>
              <Icon
                icon="move-up-left"
                className="w-[4.267vw] h-[4.267vw] text-slate-300"
              />
            </div>
          ))}
        </Modal>
      )}
    </header>
  );
};

export default SearchHeader;
