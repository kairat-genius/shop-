import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { SIZE_COLUMNS, SIZE_ROWS } from "../../data/SizeFinder.data";
import { cn } from "@/shared/utils/clsx";

interface SizeFinderModalProps {
  onClose: () => void;
}

const SizeFinderModal = ({ onClose }: SizeFinderModalProps) => {
  useBodyScrollLock(true);

  return (
    <Modal onClose={onClose} className="bg-white max-w-160 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 h-13.75 w-full relative border-b border-slate-100">
        <h2 className="text-[20px] font-bold text-center tracking-[-.5px] leading-5.75 font-roboto_condensed">
          Найдите свой размер
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" width={20} height={20} />
        </Button>
      </div>

      <div className="overflow-y-auto h-full pt-4 px-6 pb-8 max-h-[70vh]">
        <div className="h-11.5 bg-[rgba(20,21,26,.15)] p-2 flex items-center justify-between mb-6">
          <div className="text-[12px] leading-[14.06px] text-left flex flex-col">
            <span className="mb-0.5 font-semibold">
              Рекомендуемый: 43,5 RU (44,5 EU)
            </span>
            <span className="text-slate-500 font-light">
              Хотите изменить? Нажмите здесь.
            </span>
          </div>
          <div className="font-bold font-roboto_condensed leading-[16.41px] text-[14px] rounded border border-slate-950 py-1 px-2">
            Укажите
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="font-bold font-roboto_condensed text-[16px] leading-[1.17]">
            Таблица размеров
          </div>
          <div className="flex items-center mb-4">
            <Button
              className="min-w-12 px-3.5 h-7 shrink-0 bg-slate-100 text-slate-500 rounded-s text-[14px] font-bold leading-normal"
              dir="ltr"
            >
              inch
            </Button>
            <Button
              className="min-w-12 px-3.5 h-7 shrink-0 bg-white border border-slate-950 rounded-s text-[14px] font-bold leading-normal"
              dir="rtl"
            >
              cm
            </Button>
          </div>
        </div>
        <div className="rounded border border-slate-200 overflow-hidden">
          <table className="text-center border-separate border-spacing-0 max-w-max table-fixed min-w-full">
            <thead>
              <tr className="text-[14px] font-semibold leading-[normal] font-roboto_condensed">
                {SIZE_COLUMNS.map((column, index) => (
                  <th
                    key={index}
                    className="text-center border-r border-b border-slate-200 px-1 py-1.5 text-slate-500 bg-slate-100"
                  >
                    {Array.isArray(column)
                      ? column.map((word) => <div key={word}>{word}</div>)
                      : column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-[12px] leading-[normal]">
              {SIZE_ROWS.map((row, rowIndex) => (
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
