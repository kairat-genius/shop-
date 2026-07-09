import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";

const columns = [
  "EU",
  "RU",
  "UK",
  ["US", "Мужские"],
  ["US", "Женские"],
  "JP",
  "KR",
  ["Длина", "стопы"],
];
const rows = ["44,5", "43,5", "9,5", "10,5", "12", "28,5", "285", "28,5"];

const SizeFinder = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <div className="font-bold font-roboto_condensed text-lg leading-[1.2]">
          Найдите свой размер
        </div>
        <div className="flex items-center text-sm font-bold">
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
      <div className="flex justify-between items-center gap-3 mt-4 bg-slate-50 rounded-sm p-2.5">
        <div className="text-sm leading-[1.2] flex gap-1">
          <span>Рекомендуем: </span>
          <span className="text-teal-400">43,5 RU (44,5 EU)</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-sm leading-[1.2]">
          <span>Длина стопы: 28.5</span>
          <Icon icon="pen-line" width={14} height={14} className="shrink-0" />
        </div>
      </div>
      <div className="mt-4 overflow-x-auto rounded border border-slate-200">
        <table className="min-w-max text-center w-full">
          <thead>
            <tr className="text-sm font-semibold">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-center border-r border-b border-slate-200 px-1 py-1.5 min-w-18 text-slate-500 bg-slate-100"
                >
                  {Array.isArray(column)
                    ? column.map((word) => <div key={word}>{word}</div>)
                    : column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="text-xs">
              {rows.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="whitespace-nowrap border-r border-slate-200 px-1 py-1.5"
                >
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <Button className="mt-4 pt-2 gap-1 text-slate-500 w-full">
        <span className="text-[13px] font-light leading-[1.2]">
          Показать больше
        </span>
        <Icon
          icon="chevron-right"
          width={12}
          height={12}
          className="shrink-0"
        />
      </Button>
    </div>
  );
};

export default SizeFinder;
