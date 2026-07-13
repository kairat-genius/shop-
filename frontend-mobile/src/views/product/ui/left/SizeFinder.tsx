"use client";

import { useState } from "react"; // Импортируем useState
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { SIZE_COLUMNS, SIZE_ROWS } from "../../data/SizeFinder.data";
import dynamic from "next/dynamic";

const SizeFinderModal = dynamic(() => import("../modal/SizeFinderModal"), {
  ssr: false,
});

const SizeFinder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Функция-обработчик скролла
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollLeft > 0);
  };

  return (
    <div className="py-[3.2vw] px-[3.733vw]">
      <div className="flex justify-between items-center mb-[3.2vw] h-[6.4vw]">
        <div
          className="font-bold font-roboto_condensed text-[4.8vw] leading-[normal]"
          onClick={() => setIsModalOpen(true)}
        >
          Найдите свой размер
        </div>
        <div className="flex items-center">
          <Button
            className="min-w-[10.667vw] h-[6.4vw] shrink-0 bg-slate-100 text-slate-500 rounded-s-[1.067vw] text-[3.733vw] font-bold leading-[normal]"
            dir="ltr"
          >
            inch
          </Button>
          <Button
            className="min-w-[10.667vw] h-[6.4vw] shrink-0 bg-white border border-slate-950 rounded-s-[1.067vw] text-[3.733vw] font-bold leading-[normal]"
            dir="rtl"
          >
            cm
          </Button>
        </div>
      </div>

      <div
        className="flex justify-between items-center gap-[2.667vw] bg-slate-50 rounded-[.533vw] p-[2.667vw] mb-[3.2vw]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="text-[3.2vw] leading-[normal]">
          <span>Получите персональные рекомендации.</span>
        </div>
        <div className="flex items-center justify-center w-[3.733vw] h-[3.733vw] text-slate-500">
          <Icon icon="pen-line" width={14} height={14} />
        </div>
      </div>

      {/* Добавили onScroll для отслеживания движения */}
      <div
        onScroll={handleScroll}
        className="mb-[3.2vw] overflow-x-auto scrollbar-none border border-slate-200 rounded-[1.067vw]"
      >
        <table
          className="min-w-max text-center w-full border-separate border-spacing-0"
          onClick={() => setIsModalOpen(true)}
        >
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

          <tbody>
            {SIZE_ROWS.slice(0, 1).map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="text-[2.933vw] leading-[normal] whitespace-nowrap"
              >
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

      <Button
        className="gap-[.533vw] text-slate-500 w-full"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="text-[3.2vw] font-light leading-[1.17]">
          Показать больше
        </span>
        <Icon
          icon="chevron-right"
          width={12}
          height={12}
          className="text-slate-400"
        />
      </Button>

      {isModalOpen && <SizeFinderModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default SizeFinder;
