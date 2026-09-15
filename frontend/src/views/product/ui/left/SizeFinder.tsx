"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/shared/utils/clsx";
import { useSizeTable } from "../../model/useSizeTable";
import { SizeAssistantModuleType } from "@/types/product-detail.type";
import FittingReportTable from "./FittingReportTable";
import SizeTable from "@/shared/ui/size-table";

const SizeFinderModal = dynamic(() => import("../modal/SizeFinderModal"), {
  ssr: false,
});

interface SizeFinderProps {
  sizeAssistantModule: SizeAssistantModuleType;
  productId: number;
}

const SizeFinder = ({ sizeAssistantModule, productId }: SizeFinderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { activeUnit, setActiveUnit, tableData, fittingReportData } =
    useSizeTable(
      sizeAssistantModule.size,
      sizeAssistantModule.fittingReportTable,
    );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollLeft > 0);
  };

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
        className="flex justify-between items-center gap-3 mt-4 bg-slate-50 rounded-sm p-2.5 cursor-pointer mb-4"
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

      <SizeTable
        columns={tableData.columns}
        rows={tableData.rows}
        isScrolled={isScrolled}
        onScroll={handleScroll}
        onClick={() => setIsModalOpen(true)}
        stickyFirstColumn
        isManyColumns
      />
      {fittingReportData && (
        <div className="mt-4">
          <div className="mb-2.5 font-medium text-[14px] font-roboto_condensed">
            Параметры примерки
          </div>
          <FittingReportTable
            data={fittingReportData}
            models={sizeAssistantModule.fittingReportTable.models}
            isScrolled={isScrolled}
            onScroll={handleScroll}
            onClick={() => setIsModalOpen(true)}
            stickyFirstColumn
          />
          <div className="mt-4 text-[12px] text-slate-500 leading-[normal]">
            * Данные примерки носят справочный характер. Выбирайте размер,
            основываясь на своих параметрах.
          </div>
        </div>
      )}

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
          productId={productId}
        />
      )}
    </div>
  );
};

export default SizeFinder;
