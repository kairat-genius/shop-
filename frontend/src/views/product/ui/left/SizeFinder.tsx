"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/shared/utils/clsx";
import { useProductDetailData } from "../../context/useCatalogData";
import { useSizeTable } from "../../model/useSizeTable";

const SizeFinderModal = dynamic(() => import("../modal/SizeFinderModal"), {
  ssr: false,
});

const SizeFinder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    productData: { sizeAssistantModule },
  } = useProductDetailData();

  const { activeUnit, setActiveUnit, tableData, isManyColumns } =
    useSizeTable(sizeAssistantModule);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollLeft > 0);
  };
  const visibleRowsCount = isManyColumns ? 1 : 3;

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <div
          className="font-bold font-roboto_condensed text-[18px] leading-[1.2] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {sizeAssistantModule.title}
        </div>
        <div className="flex items-center text-[14px] font-bold">
          {sizeAssistantModule.sizeUnits.map((unitObj, idx) => {
            const isActive = activeUnit === unitObj.unit;
            return (
              <Button
                key={unitObj.unit}
                onClick={() => setActiveUnit(unitObj.unit)}
                className={cn(
                  "w-12 h-6 shrink-0 transition-colors",
                  isActive
                    ? "bg-white border border-slate-950 text-slate-900 z-10 relative"
                    : "bg-slate-100 text-slate-500 border border-transparent",
                  idx === 0
                    ? "rounded-s-sm rounded-r-none"
                    : "rounded-e-sm rounded-l-none",
                )}
                dir={idx === 0 ? "ltr" : "rtl"}
              >
                {unitObj.unit}
              </Button>
            );
          })}
        </div>
      </div>

      <div
        className="flex justify-between items-center gap-3 mt-4 bg-slate-50 rounded-sm p-2.5 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-col gap-1 text-slate-500 text-[14px] leading-[normal]">
          <div />
          {sizeAssistantModule.sizeRecommend.recommendTitleRichText}
        </div>
        <Icon
          icon="pen-line"
          width={14}
          height={14}
          className="text-slate-500"
        />
      </div>

      <div
        onScroll={handleScroll}
        className="mt-4 max-[1180px]:overflow-x-auto scrollbar rounded border border-slate-200 overflow-hidden cursor-pointer"
      >
        <table
          onClick={() => setIsModalOpen(true)}
          // Если колонок 8 и больше, таблица занимает ширину контента (max-w-max), иначе - всю доступную ширину (w-full)
          className={cn(
            "text-center border-separate border-spacing-0",
            isManyColumns ? "max-w-max" : "w-full",
          )}
        >
          <thead>
            <tr className="text-[14px] font-semibold leading-[normal] font-roboto_condensed">
              {tableData.columns.map((column, index) => {
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
                    {column}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="text-[12px] leading-[normal]">
            {/* Ограничиваем количество строк: 1 для 8+ колонок, иначе до 3 */}
            {tableData.rows.slice(0, visibleRowsCount).map((row, rowIndex) => (
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
      {isModalOpen && (
        <SizeFinderModal
          onClose={() => setIsModalOpen(false)}
          sizeAssistantModule={sizeAssistantModule}
        />
      )}
    </div>
  );
};

export default SizeFinder;
