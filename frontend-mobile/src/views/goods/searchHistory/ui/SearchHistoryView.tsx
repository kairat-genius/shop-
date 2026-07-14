"use client";
import { Button } from "@/shared/ui/action";
import SearchHeader from "./SearchHeader";
import { useSearchHistory } from "../model/useSearchHistory";
import { TrendingSearches } from "./TrendingSearches";
import { SearchHistory } from "./SearchHistory";
import Modal from "@/shared/ui/modal";

const SearchHistoryView = () => {
  const {
    searchHistory,
    showConfirmClear,
    saveToHistory,
    confirmClearHistory,
    cancelClearHistory,
    handleOpenClearConfirm,
  } = useSearchHistory();

  return (
    <>
      <SearchHeader onSearch={saveToHistory} />

      <main className="bg-white min-h-[192vw]">
        <SearchHistory items={searchHistory} onClear={handleOpenClearConfirm} />
        <TrendingSearches />
        {showConfirmClear && (
          <Modal
            className="p-[5.333vw] min-w-[72vw] max-w-[75vw] rounded-[1.067vw]"
            onClose={cancelClearHistory}
          >
            <div className="text-[4.8vw] font-bold leading-[6.4vw] font-roboto_condensed mb-[5.333vw] text-center">
              Вы уверены, что хотите очистить историю запросов?
            </div>
            <div className="grid grid-cols-2 gap-[2.133vw]">
              <Button
                onClick={cancelClearHistory}
                className="rounded-[1.067vw] py-[2vw] border border-slate-300 h-[10.667vw] text-[4.8vw] leading-[6.667vw] font-bold font-roboto_condensed"
              >
                Отменить
              </Button>
              <Button
                onClick={confirmClearHistory}
                className="rounded-[1.067vw] py-[2vw] bg-teal-350 h-[10.667vw] text-[4.8vw] leading-[6.667vw] font-bold font-roboto_condensed"
              >
                Да
              </Button>
            </div>
          </Modal>
        )}
      </main>
    </>
  );
};

export default SearchHistoryView;
