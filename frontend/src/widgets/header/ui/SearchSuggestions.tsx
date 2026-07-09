// components/SearchSuggestions.tsx
import Icon from "@/shared/icon";
import Link from "next/link";

interface Props {
  searchHistory: string[];
  showConfirmClear: boolean;
  onSaveToHistory: (keyword: string) => void;
  onOpenClearConfirm: (e: React.MouseEvent) => void;
  onConfirmClear: () => void;
  onCancelClear: () => void;
}

const SearchSuggestions = ({
  searchHistory,
  showConfirmClear,
  onSaveToHistory,
  onOpenClearConfirm,
  onConfirmClear,
  onCancelClear,
}: Props) => {
  return (
    <div
      className="absolute rounded-sm top-10 left-0 right-0 bg-white max-h-110 overflow-auto px-4 py-3 w-full z-50"
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, .15)" }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {searchHistory.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <div className="text-base font-roboto_condensed font-bold leading-[18.75px]">
              Вы искали
            </div>
            <div className="relative">
              <button
                onClick={onOpenClearConfirm}
                aria-label="Очистить историю поиска"
                className="inline-flex items-center"
              >
                <Icon
                  icon="trash-2"
                  width={16}
                  height={17}
                  className="shrink-0 text-slate-500 hover:text-red-500 transition-colors"
                />
              </button>
              {showConfirmClear && (
                <div
                  className="absolute top-5 right-0 mt-1 bg-white rounded-sm shadow-lg border border-slate-150 p-3 z-50 w-48"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <p className="text-sm text-slate-800 mb-2">
                    Вы уверены, что хотите очистить историю запросов?
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={onConfirmClear}
                      className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors"
                    >
                      Да
                    </button>
                    <button
                      onClick={onCancelClear}
                      className="px-3 py-1 text-xs font-medium bg-slate-150 text-slate-700 rounded-sm hover:bg-slate-300 transition-colors"
                    >
                      Отменить
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.75">
            {searchHistory.map((keyword, idx) => (
              <Link
                key={idx}
                href={`/search?keyword=${encodeURIComponent(keyword)}`}
                className="px-2.5 py-1.5 max-w-100 bg-slate-50 hover:bg-slate-100 text-sm rounded-xs leading-4 truncate"
                onClick={() => onSaveToHistory(keyword)}
              >
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className={`space-y-2.5 ${searchHistory.length > 0 ? "mt-5" : ""}`}>
        <div className="flex justify-between items-center">
          <div className="text-base font-roboto_condensed font-bold leading-[18.75px]">
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
              className="px-2.5 py-1.5 max-w-100 bg-slate-50 hover:bg-slate-100 text-sm rounded-xs leading-4 truncate"
              onClick={() => onSaveToHistory(term)}
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
