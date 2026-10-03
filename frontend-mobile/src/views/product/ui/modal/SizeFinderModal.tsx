"use client";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { useEffect, useState } from "react";
import { useSizeTable } from "../../model/useSizeTable";
import { SizeTableType } from "@/types/size-table.type";
import { getSizeTable } from "../../api/getSizeTable";
import { cn } from "@/shared/utils/clsx";
import SizeTable from "@/shared/ui/size-table";
import FittingReportTable from "../left/FittingReportTable";

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
    <Modal onClose={onClose} className="bg-white h-full flex flex-col">
      {isLoading ? (
        <div className="p-8 text-center text-slate-500 min-h-[70vh] flex items-center justify-center">
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
    <>
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
            {sizeAssistantModule.size.sizeList.map((size, index) => {
              const isActive = activeUnit === size.title;
              return (
                <Button
                  key={size.title}
                  onClick={() => setActiveUnit(size.title)}
                  className={cn(
                    "min-w-[10.667vw] h-[6.4vw] px-[3.2vw] shrink-0 border rounded-s-[1.067vw] text-[3.733vw] font-bold leading-[normal] transition-colors",
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
        <SizeTable
          columns={tableData.columns}
          rows={tableData.rows}
          isScrolled={isScrolled}
          onScroll={handleScroll}
          stickyFirstColumn
        />
        {sizeAssistantModule.disclaimerText && (
          <div className="mt-[2.133vw] text-[2.933vw] font-light text-slate-500 leading-[normal]">
            {sizeAssistantModule.disclaimerText}
          </div>
        )}
        {fittingReportData && (
          <div className="mb-[3.2vw] mt-[2.133vw]">
            <div className="mb-[2.133vw] font-medium text-[3.733vw] font-roboto_condensed">
              Параметры примерки
            </div>
            <FittingReportTable
              data={fittingReportData}
              models={sizeAssistantModule.fittingReportTable.models}
              stickyFirstColumn
            />
            <div className="mt-[3.2vw] text-[2.933vw] font-light text-slate-500 leading-[normal]">
              * Данные примерки носят справочный характер. Выбирайте размер,
              основываясь на своих параметрах.
            </div>
          </div>
        )}
        {sizeAssistantModule.sizeImageList.map((item, index) => (
          <div className="mt-[3.2vw]" key={index}>
            <div className="text-[3.733vw] font-roboto_condensed font-medium leading-[normal]">
              {item.title}
            </div>
            <div className="mt-[2.133vw] rounded-[1.067vw] overflow-hidden">
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
      {/* <div className="h-[12.267vw] w-[92.533vw] rounded-[1.067vw] bg-[#dcdcdd] p-[2.133vw] sticky bottom-[2.667vw] left-[3.733vw] z-30 flex items-center justify-between">
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
      </div> */}
    </>
  );
};
