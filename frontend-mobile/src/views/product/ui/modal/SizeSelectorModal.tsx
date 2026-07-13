import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { cn } from "@/shared/utils/clsx";

interface SizeSelectorModalProps {
  onClose: () => void;
}

export const sizes = [
  { sizeRu: "40", sizeEu: "41", price: 10_344, isActive: true },
  { sizeRu: "41", sizeEu: "42", price: 11_103, isActive: false },
  { sizeRu: "41,5", sizeEu: "42,5", price: 13_118, isActive: false },
  { sizeRu: "42", sizeEu: "43", price: 12_594, isActive: false },
  { sizeRu: "43", sizeEu: "44", price: 12_609, isActive: false },
  { sizeRu: "43,5", sizeEu: "44,5", price: 13_572, isActive: false },
  { sizeRu: "44", sizeEu: "45", price: 11_877, isActive: false },
  { sizeRu: "44,5", sizeEu: "45,5", price: null, isActive: false },
  { sizeRu: "45", sizeEu: "46", price: 13_760, isActive: false },
  { sizeRu: "46", sizeEu: "47", price: null, isActive: false },
  { sizeRu: "46,5", sizeEu: "47,5", price: 15_524, isActive: false },
  { sizeRu: "47", sizeEu: "48", price: null, isActive: false },
];

const SizeSelectorModal = ({ onClose }: SizeSelectorModalProps) => {
  useBodyScrollLock(true);
  return (
    <Modal
      onClose={onClose}
      className="bg-white rounded-t-[2.133vw]"
      overlayClassName="justify-end items-end"
    >
      <div className="flex items-center justify-between py-[4.267vw] px-[3.733vw] border-b border-slate-100 h-[14.4vw]">
        <h2 className="font-roboto_condensed leading-[5.6vw] text-[4.267vw] font-bold mr-[2.133vw] tracking-[-.03em]">
          Выбрать ваш стиль
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" className="w-[4.267vw] h-[4.267vw]" />
        </Button>
      </div>
      <div className="pt-[3.733vw] px-[3.733vw] pb-[28.8vw]">
        <div className="p-[3.2vw] bg-[rgba(245,245,249,.6)] mb-[5.333vw] rounded-[1.067vw]">
          <div className=" leading-[3.749vw] text-[3.2vw]">
            <span>Цвет:</span>
            <span className="ml-[1.6vw] font-semibold">Циановый оранжевый</span>
          </div>
        </div>
        <div>
          <div className="mb-[2.133vw] flex items-center justify-between gap-[4.267vw]">
            <div className="text-[4.267vw] font-bold font-roboto_condensed flex items-center leading-[normal]">
              Размер:
              <div className="max-w-[73.867vw] text-[3.2vw] ml-[.533vw] font-roboto flex items-center h-full">
                <div>RU</div>
                <div className="text-slate-500">&nbsp;(EU)</div>
              </div>
            </div>
            <div className="h-[5.067vw] min-w-[2.667vw] flex items-center">
              <img
                className="w-[3.2vw] h-[3.2vw] mr-[.533vw]"
                src="https://cdn-img.thepoizon.ru/node-common/665c0d50-2e08-59f4-4e83-f0be5fcba9da-48-48.png?x-oss-process=image/resize,s_96/format,webp"
                alt="showsizeguide"
              />

              <span className="text-[3.2vw] text-slate-500 leading-[normal]">
                Гайд размера
              </span>
              <Icon
                icon="chevron-right"
                className="w-[3.2vw] h-[3.2vw] text-slate-400"
              />
            </div>
          </div>
          <div className="mt-[2.133vw]">
            <div className="grid grid-cols-3 text-center [&>*:nth-child(-n+4)]:border-t [&>*:nth-child(-n+4)]:border-t-slate-100 [&>*:nth-child(4n+1)]:border-l [&>*:nth-child(4n+1)]:border-l-slate-100">
              {sizes.map((item, index) => (
                <div
                  className={cn(
                    "px-[2.133vw] flex flex-col items-center justify-center h-[13.867vw] border-r border-b border-slate-100",
                    item.isActive &&
                      "relative after:-top-px after:-left-px after:w-full after:h-full after:absolute after:border after:border-slate-950",
                  )}
                  key={index}
                >
                  <div className="font-bold text-[3.733vw] leading-[4.267vw] truncate">
                    {item.sizeRu}
                    <span className="ml-[.533vw] leading-[100%] text-slate-500">
                      ({item.sizeEu})
                    </span>
                  </div>
                  <div className="text-[3.2vw] mt-[.533vw] leading-[3.733vw] truncate">
                    {item.price == null
                      ? "-- ₽"
                      : `${item.price.toLocaleString("ru-RU")} ₽`}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[rgba(245,245,249,.6)] py-[1.067vw] px-[3.2vw] flex items-center justify-between rounded-[1.067vw] my-[2.133vw]">
              <div className="text-[3.2vw] leading-[3.749vw]">
                <span className="mr-[.533vw] text-slate-500 font-light">
                  Длина стопы:{" "}
                </span>
                <span>25,5 cm</span>
              </div>
              <Icon
                icon="chevron-right"
                className="w-[3.2vw] h-[3.2vw] text-slate-400"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 bg-white z-10 w-full px-[3.733vw] pt-[3.2vw] ">
          <div className="h-[4.8vw] text-[3.2vw] leading-[100%] text-slate-500">
            <span className="mr-[1.6vw]">ВЫБРАЛИ: </span>
            <span className="font-semibold">
              Циановый оранжевый, 40 RU (41 EU)
            </span>
          </div>

          <Button className="mt-[1.6vw] mb-[2.667vw] h-[11.733vw] font-roboto_condensed text-[#002f35] bg-teal-350 w-full font-bold text-[4.8vw] rounded-[1.067vw] leading-[11.733vw]">
            <span>Купить за 6&nbsp;345&nbsp;₽</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SizeSelectorModal;
