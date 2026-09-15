import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { cn } from "@/shared/utils/clsx";
import { useSizeTable } from "../../model/useSizeTable";
import SizeTable from "@/shared/ui/size-table";
import FittingReportTable from "../left/FittingReportTable";
import { SizeTableType } from "@/types/size-table.type";
import { useEffect, useState } from "react";
import { getSizeTable } from "../../api/getSizeTable";

interface SizeFinderModalProps {
  onClose: () => void;
  productId: number;
}

const SizeFinderModal = ({ onClose, productId }: SizeFinderModalProps) => {
  useBodyScrollLock(true);

  const [data, setData] = useState<SizeTableType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSizeTable = async () => {
      try {
        setIsLoading(true);

        const data = await getSizeTable(Number(productId));

        if (isMounted) {
          setData(data);
        }
      } catch (error) {
        console.error("Ошибка загрузки таблицы размеров:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSizeTable();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return (
    <Modal onClose={onClose} className="bg-white max-w-160 flex flex-col">
      {isLoading ? (
        <div className="p-8 text-center text-slate-500 min-h-[300px] flex items-center justify-center">
          Загрузка таблицы размеров...
        </div>
      ) : data ? (
        <SizeFinderModalContent sizeAssistantModule={data} onClose={onClose} />
      ) : (
        <div className="p-6 text-center text-slate-500">
          Не удалось загрузить таблицу размеров.
          <div className="mt-4">
            <Button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 rounded text-[14px]"
            >
              Закрыть
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SizeFinderModal;

const SizeFinderModalContent = ({
  sizeAssistantModule,
  onClose,
}: {
  sizeAssistantModule: SizeTableType;
  onClose: () => void;
}) => {
  const { activeUnit, setActiveUnit, tableData, fittingReportData } =
    useSizeTable(
      sizeAssistantModule.size,
      sizeAssistantModule.fittingReportTable,
    );

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 h-13.75 w-full relative border-b border-slate-100 shrink-0">
        <h2 className="text-[20px] font-bold text-center tracking-[-.5px] leading-5.75 font-roboto_condensed">
          Найдите свой размер
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" width={20} height={20} />
        </Button>
      </div>

      <div className="overflow-y-auto h-full pt-4 px-6 pb-8 max-h-[70vh]">
        {sizeAssistantModule.offSizeInfo?.shortDeviationSizeTips && (
          <div className="h-11.5 bg-slate-50 p-2 flex items-center justify-between mb-6 rounded-sm">
            <div className="flex flex-col gap-1 text-slate-500 text-[14px] font-light leading-[normal]">
              {sizeAssistantModule.offSizeInfo.shortDeviationSizeTips}{" "}
              {sizeAssistantModule.recommendSizeInfo.tips}
            </div>
            <Icon
              icon="pen-line"
              width={14}
              height={14}
              className="text-slate-500"
            />
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="font-bold font-roboto_condensed text-[16px] leading-[1.17]">
            Таблица размеров
          </div>
          <div className="flex items-center mb-4">
            {sizeAssistantModule.size.sizeList.map((size, index) => {
           const isActive = activeUnit === size.title;
              return (
                <Button
                  key={size.title}
                  onClick={() => setActiveUnit(size.title)}
                  className={cn(
                    "min-w-12 px-3.5 h-7 shrink-0 text-[14px] font-bold leading-normal transition-colors",
                    isActive
                      ? "bg-white border border-slate-950 text-slate-900 z-10 relative"
                      : "bg-slate-100 text-slate-500 border border-transparent",
                    index === 0
                      ? "rounded-s rounded-r-none"
                      : "rounded-e rounded-l-none",
                  )}
                  dir={index === 0 ? "ltr" : "rtl"}
                >
                  {size.title}
                </Button>
              );
            })}
          </div>
        </div>

        <SizeTable columns={tableData.columns} rows={tableData.rows} />
        {sizeAssistantModule.disclaimerText && (
          <div className="mt-3 text-[12px] font-light text-slate-500 leading-[14.06px]">
            {sizeAssistantModule.disclaimerText}
          </div>
        )}

        {fittingReportData && sizeAssistantModule.fittingReportTable && (
          <div className="mt-4">
            <div className="mb-2.5 font-medium text-[14px] font-roboto_condensed">
              Параметры примерки
            </div>
            <FittingReportTable
              data={fittingReportData}
              models={sizeAssistantModule.fittingReportTable.models}
            />
            <div className="mt-4 text-[12px] text-slate-500 leading-[normal]">
              * Данные примерки носят справочный характер. Выбирайте размер,
              основываясь на своих параметрах.
            </div>
          </div>
        )}
        {sizeAssistantModule.sizeImageList.map((item, index) => (
          <div className="mt-6" key={index}>
            <div className="text-[16px] font-roboto_condensed font-bold leading-[normal]">
              {item.title}
            </div>
            <div className="mt-3 overflow-hidden">
              {item.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  className="w-full h-auto"
                  src={image.url}
                  alt={item.title}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
