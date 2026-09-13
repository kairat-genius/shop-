// components/SearchSuggestions.tsx
"use client";

import Icon from "@/shared/icon";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useRef, useState, useEffect } from "react";

interface Props {
  searchHistory: string[];
  showConfirmClear: boolean;
  onSaveToHistory: (keyword: string) => void;
  onOpenClearConfirm: (e: React.MouseEvent) => void;
  onConfirmClear: () => void;
  onCancelClear: () => void;
  onClose: () => void;
}

const SearchSuggestions = ({
  searchHistory,
  showConfirmClear,
  onSaveToHistory,
  onOpenClearConfirm,
  onConfirmClear,
  onCancelClear,
  onClose,
}: Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Заменяем right на left
  const [popoverCoords, setPopoverCoords] = useState({ top: 0, left: 0 });

  // Вычисляем координаты для центрирования
  useEffect(() => {
    if (showConfirmClear && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopoverCoords({
        top: rect.bottom + 8, // Отступ 8px вниз от кнопки
        left: rect.left + rect.width / 2, // Находим точный центр иконки по горизонтали
      });
    }
  }, [showConfirmClear]);

  return (
    <div
      className="absolute rounded-sm top-10 left-0 right-0 bg-white max-h-110 overflow-auto px-4 py-3 w-full z-50"
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, .15)" }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {searchHistory.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <div className="text-[16px] font-roboto_condensed font-bold leading-[18.75px]">
              Вы искали
            </div>
            <div>
              <button
                ref={triggerRef}
                onClick={onOpenClearConfirm}
                aria-label="Очистить историю поиска"
                className="inline-flex items-center p-1 cursor-pointer"
              >
                <Icon
                  icon="trash-2"
                  width={16}
                  height={17}
                  className="shrink-0 text-slate-500 hover:text-red-500 transition-colors"
                />
              </button>

              {showConfirmClear &&
                typeof document !== "undefined" &&
                createPortal(
                  <>
                    <div
                      className="fixed inset-0 z-100"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCancelClear();
                      }}
                    />

                    {/* Popover */}
                    <div
                      className="fixed z-101 bg-white rounded-sm px-4 py-3 w-60 -translate-x-1/2"
                      style={{
                        top: `${popoverCoords.top}px`,
                        left: `${popoverCoords.left}px`,
                        boxShadow:
                          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      {/* Маленький "треугольник-стрелочка" сверху для красоты (опционально) */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-150 rotate-45" />

                      <p className="relative text-[14px] text-[#626265] mb-4 flex text-start z-10 leading-6">
                        Вы уверены, что хотите очистить историю запросов?
                      </p>
                      <div className="relative flex justify-end z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCancelClear();
                          }}
                          className="h-8 text-[14px] rounded-sm border border-slate-950 cursor-pointer ml-2 font-roboto_condensed font-bold px-3.75"
                        >
                          Отменить
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onConfirmClear();
                          }}
                          className="h-8 text-[14px] rounded-sm bg-teal-350 cursor-pointer ml-2 font-roboto_condensed font-bold px-3.75"
                        >
                          Да
                        </button>
                      </div>
                    </div>
                  </>,
                  document.body,
                )}
            </div>
          </div>
          {/* ... остальной код рендера истории */}
          <div className="flex flex-wrap gap-1.75">
            {searchHistory.map((keyword, idx) => (
              <Link
                key={idx}
                href={`/search?keyword=${encodeURIComponent(keyword)}`}
                className="px-2.5 py-1.5 max-w-100 bg-slate-50 hover:bg-slate-100 text-[14px] rounded-xs leading-4 truncate"
                onClick={() => {
                  onSaveToHistory(keyword);
                  onClose();
                }}
              >
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Часто ищут */}
      <div className={`space-y-2.5 ${searchHistory.length > 0 ? "mt-5" : ""}`}>
        <div className="flex justify-between items-center">
          <div className="text-[16px] font-roboto_condensed font-bold leading-[18.75px]">
            Часто ищут
          </div>
          <button aria-label="Обновить частые запросы">
            <Icon
              icon="rotate-cw"
              width={16}
              height={17}
              className="shrink-0 text-slate-500"
            />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.75">
          {["asics gel", "nike air"].map((term) => (
            <Link
              key={term}
              href={`/search?keyword=${encodeURIComponent(term)}`}
              className="px-2.5 py-1.5 max-w-100 bg-slate-50 hover:bg-slate-100 text-[14px] rounded-xs leading-4 truncate"
              onClick={() => {
                onSaveToHistory(term);
                onClose();
              }}
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
