"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { useState } from "react";
import dynamic from "next/dynamic";
import { SIZE_COLUMNS, SIZE_ROWS } from "../../data/SizeFinder.data";
import { cn } from "@/shared/utils/clsx";

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
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <div
          className="font-bold font-roboto_condensed text-lg leading-[1.2]"
          onClick={() => setIsModalOpen(true)}
        >
          Найдите свой размер
        </div>
        <div className="flex items-center text-[14px] font-bold">
          <Button
            className="w-12 h-6 shrink-0 bg-slate-100 text-slate-500 rounded-s-sm"
            dir="ltr"
          >
            inch
          </Button>
          <Button
            className="w-12 h-6 shrink-0 bg-white border border-slate-950 rounded-s-sm"
            dir="rtl"
          >
            cm
          </Button>
        </div>
      </div>
      <div
        className="flex justify-between items-center gap-3 mt-4 bg-slate-50 rounded-sm p-2.5"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="text-[14px] leading-[1.2] flex gap-1">
          <span>Рекомендуем: </span>
          <span className="text-teal-400">43,5 RU (44,5 EU)</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-[14px] leading-[1.2]">
          <span>Длина стопы: 28.5</span>
          <Icon icon="pen-line" width={14} height={14} />
        </div>
      </div>
      <div
        onScroll={handleScroll}
        className="mt-4 max-[1180px]:overflow-x-auto scrollbar rounded border border-slate-200 overflow-hidden"
      >
        <table
          onClick={() => setIsModalOpen(true)}
          className="text-center border-separate border-spacing-0 max-w-max"
        >
          <thead>
            <tr className="text-[14px] font-semibold leading-[normal] font-roboto_condensed">
              {SIZE_COLUMNS.map((column, index) => {
                const isFirst = index === 0;
                return (
                  <th
                    key={index}
                    style={
                      isFirst
                        ? {
                            position: "sticky",
                            left: 0,
                            zIndex: 20,
                            boxShadow: isScrolled
                              ? "1.6vw 0 2.667vw -1.067vw rgba(0,0,0,.15)"
                              : "none",
                            transition: "box-shadow .2s ease-in-out",
                          }
                        : undefined
                    }
                    className="min-w-[clamp(53.375px,calc(53.375px+(100vw-1025px)*0.0522343),75px)] text-center border-r border-b border-slate-200 px-1 py-1.5 text-slate-500 bg-slate-100"
                  >
                    {Array.isArray(column)
                      ? column.map((word) => <div key={word}>{word}</div>)
                      : column}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="text-[12px] leading-[normal]">
            {SIZE_ROWS.slice(0, 1).map((row, rowIndex) => (
              <tr key={rowIndex} className="whitespace-nowrap">
                {row.map((cell, cellIndex) => {
                  const isFirst = cellIndex === 0;
                  const cellStyle = {
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
                      className={cn(
                        "border-r border-slate-200 px-1 py-1.5 min-w-[53.375px]",
                        rowIndex % 2 === 0 ? "bg-white" : "bg-[#f6f6f7]",
                      )}
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
        className="mt-4 pt-2 gap-1 text-slate-500 w-full"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="text-[13px] font-light leading-[1.2]">
          Показать больше
        </span>
        <Icon icon="chevron-right" width={12} height={12} />
      </Button>
      {isModalOpen && <SizeFinderModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default SizeFinder;
