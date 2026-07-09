import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";

const sizes = [
  { sizeRu: "34,5", sizeEu: "35,5", price: null, isActive: false },
  { sizeRu: "35", sizeEu: "36", price: null, isActive: false },
  { sizeRu: "35,5", sizeEu: "36,5", price: null, isActive: false },
  { sizeRu: "36,5", sizeEu: "37,5", price: null, isActive: false },
  { sizeRu: "37", sizeEu: "38", price: null, isActive: false },
  { sizeRu: "37,5", sizeEu: "38,5", price: null, isActive: false },
  { sizeRu: "38", sizeEu: "39", price: null, isActive: false },
  { sizeRu: "39", sizeEu: "40", price: null, isActive: false },
  { sizeRu: "39,5", sizeEu: "40,5", price: 10_711, isActive: false },
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
  { sizeRu: "47,5", sizeEu: "48,5", price: null, isActive: false },
];

const SizeSelector = () => (
  <div className="mt-6">
    <div className="flex items-center justify-between gap-2 mb-2">
      <span className="truncate font-bold font-roboto_condensed text-base">
        Размер:
        <span className="text-sm font-roboto font-bold ml-0.5">
          <span className="btp">RU</span>
          <span className="ml-0.5 text-slate-500">&nbsp;(EU)</span>
        </span>
      </span>
      <div className="flex items-center">
        <img
          className="pS"
          src="https://cdn-img.thepoizon.ru/node-common/935e5df6-1d97-27c8-3944-f1ad4784f80d.svg"
          alt="showsizeguide"
        />

        <div className="text-xs text-slate-500">Рек: 43,5 RU (44,5 EU)</div>
        <Icon
          icon="chevron-right"
          width={12}
          height={12}
          className="shrink-0 text-slate-500"
        />
      </div>
    </div>
    <div className="grid grid-cols-4 text-center [&>*:nth-child(-n+4)]:border-t [&>*:nth-child(-n+4)]:border-t-slate-100 [&>*:nth-child(4n+1)]:border-l [&>*:nth-child(4n+1)]:border-l-slate-100">
      {sizes.map((item, index) => (
        <div
          className={cn(
            "px-2 flex flex-col items-center justify-center h-12 border-r border-b border-slate-100",
            item.isActive &&
              "relative after:-top-px after:-left-px after:w-full after:h-full after:absolute after:border after:border-slate-950",
          )}
          key={index}
        >
          <div className="font-medium text-sm leading-4 truncate">
            {item.sizeRu}
            <span className="ml-0.5">({item.sizeEu})</span>
          </div>
          <div className="text-xs mt-0.5 leading-3.5 truncate">
            {item.price == null
              ? "-- ₽"
              : `${item.price.toLocaleString("ru-RU")} ₽`}
          </div>
        </div>
      ))}
    </div>
    <div
      className="px-3 py-1 mt-2 rounded-sm flex items-center justify-between"
      style={{ backgroundColor: "rgba(245, 245, 249, .6)" }}
    >
      <div className="text-xs leading-[14.06px]">
        <span className="text-slate-500 ml-0.5 font-light">Длина стопы: </span>
        <span className="ml-0.5">26 cm</span>
      </div>
      <Icon
        icon="chevron-right"
        width={12}
        height={12}
        className="shrink-0 text-slate-500"
      />
    </div>
  </div>
);

export default SizeSelector;
