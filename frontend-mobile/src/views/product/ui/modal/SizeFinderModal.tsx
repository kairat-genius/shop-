import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { SIZE_COLUMNS, SIZE_ROWS } from "../../data/SizeFinder.data";
import { useState } from "react";

interface SizeFinderModalProps {
  onClose: () => void;
}

const SizeFinderModal = ({ onClose }: SizeFinderModalProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useBodyScrollLock(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollLeft > 0);
  };

  return (
    <Modal onClose={onClose} className="bg-white h-full flex flex-col">
      <div className="flex items-center justify-between px-[3.733vw] py-[2.667vw] w-full relative">
        <Button
          className="text-slate-500 w-[6.4vw] h-[6.4vw]"
          onClick={onClose}
        >
          <Icon icon="chevron-right" className="w-6 h-6 rotate-180" />
        </Button>
        <h2 className="leading-[.94] text-[4.8vw] font-bold text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Найдите свой размер
        </h2>
      </div>

      <div className="overflow-y-auto h-full pt-[3.733vw] px-[3.733vw] pb-[14.933vw]">
        <div className="flex justify-between items-center mb-[2.133vw] h-[6.4vw]">
          <div className="font-bold font-roboto_condensed text-[3.733vw] leading-[normal]">
            Таблица размеров
          </div>
          <div className="flex items-center">
            <Button
              className="min-w-[10.667vw] px-[3.2vw] h-[6.4vw] shrink-0 bg-slate-100 text-slate-500 rounded-s-[1.067vw] text-[3.733vw] font-bold leading-[normal]"
              dir="ltr"
            >
              inch
            </Button>
            <Button
              className="min-w-[10.667vw] h-[6.4vw] px-[3.2vw] shrink-0 bg-white border border-slate-950 rounded-s-[1.067vw] text-[3.733vw] font-bold leading-[normal]"
              dir="rtl"
            >
              cm
            </Button>
          </div>
        </div>
        <div
          onScroll={handleScroll}
          className="mb-[3.2vw] overflow-x-auto scrollbar-none rounded border border-slate-200"
        >
          <table className="min-w-max text-center w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-[3.2vw] font-semibold font-roboto_condensed leading-[normal]">
                {SIZE_COLUMNS.map((column, index) => {
                  const isFirst = index === 0;

                  const cellStyle = {
                    minWidth: "11.57vw",
                    ...(isFirst && {
                      position: "sticky" as const,
                      left: 0,
                      zIndex: 20,
                      // Тень появляется динамически
                      boxShadow: isScrolled
                        ? "1.6vw 0 2.667vw -1.067vw rgba(0, 0, 0, 0.15)"
                        : "none",
                      // Плавный переход для тени, чтобы она не прыгала резко
                      transition: "box-shadow 0.2s ease-in-out",
                    }),
                  };

                  return (
                    <th
                      key={index}
                      style={cellStyle}
                      className="text-center border-r border-b border-slate-200 text-slate-500 bg-slate-100 py-[1.6vw] px-[1.067vw]"
                    >
                      {Array.isArray(column)
                        ? column.map((word) => <div key={word}>{word}</div>)
                        : column}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="text-[2.933vw] leading-[normal] whitespace-nowrap">
              {SIZE_ROWS.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    const isFirst = cellIndex === 0;
                    const cellStyle = {
                      minWidth: "11.57vw",
                      ...(isFirst && {
                        position: "sticky" as const,
                        left: 0,
                        zIndex: 20,
                        boxShadow: isScrolled
                          ? "1.6vw 0 2.667vw -1.067vw rgba(0, 0, 0, 0.15)"
                          : "none",
                        transition: "box-shadow 0.2s ease-in-out",
                      }),
                    };

                    return (
                      <td
                        key={cellIndex}
                        style={cellStyle}
                        className={`border-r border-slate-200 py-[1.6vw] px-[1.067vw] ${
                          rowIndex % 2 === 0 ? "bg-white" : "bg-[#f6f6f7]"
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-[2.133vw] text-[2.933vw] font-light text-slate-500 leading-[normal]">
          На товаре не указан RU размер. Российский размер зависит от бренда и
          обычно соответствует EU размеру минус 1.
        </div>
        <div className="mt-[3.2vw]">
          <div className="text-[3.733vw] font-roboto_condensed font-medium leading-[normal]">
            Как выбрать размер
          </div>
          <div className="mt-[2.133vw] rounded-[1.067vw] overflow-hidden">
            <img
              className="w-full h-auto"
              src="https://cdn-img.thepoizon.ru/node-common/08d8201c-cd58-a138-e67e-c2327e7cad68-1278-720.png?x-oss-process=image/format,webp"
              alt="Как выбрать размер"
            />
          </div>
        </div>
      </div>
      <div className="h-[12.267vw] w-[92.533vw] rounded-[1.067vw] bg-[#dcdcdd] p-[2.133vw] sticky bottom-[2.667vw] left-[3.733vw] z-30 flex items-center justify-between">
        <div className="text-[3.2vw] leading-[3.749vw] text-left flex flex-col">
          <span className="mb-[.533vw] font-semibold">
            Рекомендуемый: 43,5 RU (44,5 EU)
          </span>
          <span className="text-slate-500 font-light">
            Хотите изменить? Нажмите здесь.
          </span>
        </div>
        <div className="bg-[#e8e8e9] font-bold font-roboto_condensed leading-[4.376vw] text-[3.733vw] rounded-[1.067vw] border border-slate-950 py-[1.067vw] px-[2.133vw]">
          Укажите
        </div>
      </div>
    </Modal>
  );
};

export default SizeFinderModal;
