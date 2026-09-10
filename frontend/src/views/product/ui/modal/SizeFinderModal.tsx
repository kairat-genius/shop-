import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { cn } from "@/shared/utils/clsx";
import { useSizeTable } from "../../model/useSizeTable";
import type { SizeAssistantModuleType } from "@/types/product-detail.type";


interface SizeFinderModalProps {
  onClose: () => void;
  sizeAssistantModule: SizeAssistantModuleType;
}

const SizeFinderModal = ({
  onClose,
  sizeAssistantModule,
}: SizeFinderModalProps) => {
  useBodyScrollLock(true);

  const { activeUnit, setActiveUnit, tableData } =
    useSizeTable(sizeAssistantModule);

  return (
    <Modal onClose={onClose} className="bg-white max-w-160 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 h-13.75 w-full relative border-b border-slate-100">
        <h2 className="text-[20px] font-bold text-center tracking-[-.5px] leading-5.75 font-roboto_condensed">
          {sizeAssistantModule.title}
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" width={20} height={20} />
        </Button>
      </div>

      <div className="overflow-y-auto h-full pt-4 px-6 pb-8 max-h-[70vh]">
        <div className="h-11.5 bg-[rgba(20,21,26,.15)] p-2 flex items-center justify-between mb-6 rounded-sm">
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

        <div className="flex justify-between items-center">
          <div className="font-bold font-roboto_condensed text-[16px] leading-[1.17]">
            Таблица размеров
          </div>
          <div className="flex items-center mb-4">
            {sizeAssistantModule.sizeUnits.map((unitObj, idx) => {
              const isActive = activeUnit === unitObj.unit;
              return (
                <Button
                  key={unitObj.unit}
                  onClick={() => setActiveUnit(unitObj.unit)}
                  className={cn(
                    "min-w-12 px-3.5 h-7 shrink-0 text-[14px] font-bold leading-normal transition-colors",
                    isActive
                      ? "bg-white border border-slate-950 text-slate-900 z-10 relative"
                      : "bg-slate-100 text-slate-500 border border-transparent",
                    idx === 0
                      ? "rounded-s rounded-r-none"
                      : "rounded-e rounded-l-none"
                  )}
                  dir={idx === 0 ? "ltr" : "rtl"}
                >
                  {unitObj.unit}
                </Button>
              );
            })}
          </div>
        </div>
        
        <div className="rounded border border-slate-200 overflow-hidden">
          <table className="text-center border-separate border-spacing-0 max-w-max table-fixed min-w-full">
            <thead>
              <tr className="text-[14px] font-semibold leading-[normal] font-roboto_condensed">
                {tableData.columns.map((column, index) => (
                  <th
                    key={index}
                    className="text-center border-r border-b border-slate-200 px-1 py-1.5 text-slate-500 bg-slate-100"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-[12px] leading-[normal]">
              {tableData.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="whitespace-nowrap">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "border-r border-slate-200 px-1 py-1.5 min-w-[53.375px]",
                        rowIndex % 2 === 0 ? "bg-white" : "bg-[#f6f6f7]",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-3 text-[12px] font-light text-slate-500 leading-[14.06px]">
          На товаре не указан RU размер. Российский размер зависит от бренда и
          обычно соответствует EU размеру минус 1.
        </div>
        <div className="mt-6">
          <div className="text-[16px] font-roboto_condensed font-bold leading-[normal]">
            Как выбрать размер
          </div>
          <div className="mt-3 overflow-hidden">
            <img
              className="w-full h-auto"
              src="https://cdn-img.thepoizon.ru/node-common/08d8201c-cd58-a138-e67e-c2327e7cad68-1278-720.png?x-oss-process=image/format,webp"
              alt="Как выбрать размер"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SizeFinderModal;