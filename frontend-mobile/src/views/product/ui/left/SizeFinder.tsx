"use client";

import { useState } from "react"; // Импортируем useState
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import dynamic from "next/dynamic";
import { useSizeTable } from "../../model/useSizeTable";
import type { SizeAssistantModuleType } from "@/types/product-detail.type";
import { cn } from "@/shared/utils/clsx";
import SizeTable from "@/shared/ui/size-table";
import FittingReportTable from "./FittingReportTable";

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
    <div className="py-[3.2vw] px-[3.733vw]">
      <div className="flex justify-between items-center mb-[3.2vw] h-[6.4vw]">
        <div
          className="font-bold font-roboto_condensed text-[4.8vw] leading-[normal]"
          onClick={() => setIsModalOpen(true)}
        >
          {sizeAssistantModule.title}
        </div>
        <div className="flex items-center">
          {sizeAssistantModule.sizeUnits.map((unitObj, idx) => {
            const isActive = activeUnit === unitObj.unit;
            return (
              <Button
                key={unitObj.unit}
                onClick={() => setActiveUnit(unitObj.unit)}
                className={cn(
                  "transition-colors min-w-[10.667vw] h-[6.4vw] shrink-0 rounded-s-[1.067vw] text-[3.733vw] font-bold leading-[normal]",
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
        className="flex justify-between items-center gap-[2.667vw] bg-slate-50 rounded-[.533vw] p-[2.667vw] mb-[3.2vw]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="text-[3.2vw] leading-[normal]">
          {sizeAssistantModule.sizeRecommend.recommendTitleRichText}
        </div>
        <div className="flex items-center justify-center w-[3.733vw] h-[3.733vw] text-slate-500">
          <Icon icon="pen-line" width={14} height={14} />
        </div>
      </div>

      <SizeTable
        columns={tableData.columns}
        rows={tableData.rows}
        isScrolled={isScrolled}
        onScroll={handleScroll}
        onClick={() => setIsModalOpen(true)}
        stickyFirstColumn
      />
      {fittingReportData && (
        <div className="mb-[3.2vw]">
          <div className="mb-[2.133vw] font-medium text-[3.733vw] font-roboto_condensed">
            Параметры примерки
          </div>
          <FittingReportTable
            data={fittingReportData}
            models={sizeAssistantModule.fittingReportTable.models}
            onClick={() => setIsModalOpen(true)}
            stickyFirstColumn
          />
          <div className="mt-[3.2vw] text-[2.933vw] font-light text-slate-500 leading-[normal]">
            * Данные примерки носят справочный характер. Выбирайте размер,
            основываясь на своих параметрах.
          </div>
        </div>
      )}

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

      {isModalOpen && <SizeFinderModal onClose={() => setIsModalOpen(false)} productId={productId} />}
    </div>
  );
};

export default SizeFinder;
