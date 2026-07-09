"use client";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";

interface FilterProps {
  category_slug: string;
}

const Filter = ({  }: FilterProps) => {
  const { filters, updateFilter } = useFiltersNuqs();

  const handleSortClick = (slug: string) => {
    updateFilter("sort", slug);
  };

  const handlePriceClick = () => {
    const current = filters.sort;
    if (current === "price_asc") {
      updateFilter("sort", "price_desc");
    } else {
      updateFilter("sort", "price_asc");
    }
  };

  const isPriceAsc = filters.sort === "price_asc";
  const isPriceDesc = filters.sort === "price_desc";
  const isPriceActive = isPriceAsc || isPriceDesc;

  return (
    <div className="pb-[3.2vw] bg-white sticky top-12 flex flex-col items-center w-full">
      <div className="flex h-[10.667vw] relative items-center w-full">
        <div className="flex h-full px-[3.733vw] gap-[5.333vw] text-[3.2vw] text-slate-500 overflow-x-auto scrollbar-none min-w-0 w-full items-center">
          <Button
            onClick={() => handleSortClick("default")}
            className={cn(
              "shrink-0",
              filters.sort === "default" && "font-semibold text-slate-950",
            )}
          >
            По умолчанию
          </Button>
          <Button
            onClick={() => handleSortClick("top_sales")}
            className={cn(
              "shrink-0",
              filters.sort === "top_sales" && "font-semibold text-slate-950",
            )}
          >
            Популярные
          </Button>
          <Button
            onClick={handlePriceClick}
            className={cn(
              "shrink-0",
              isPriceActive && "font-semibold text-slate-950",
            )}
          >
            Цена
            <div className="h-[3.733vw] w-[3.733vw] flex flex-col items-center justify-center ml-[.533vw] gap-[1.067vw]">
              <svg
                width="1.6vw"
                height="0.8vw"
                viewBox="0 0 6 3"
                fill="none"
                className={isPriceAsc ? "text-slate-950" : "text-slate-500"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2.56136C6 2.45703 5.95569 2.35814 5.87914 2.29164L3.33387 0.0803326C3.27411 0.0284089 3.19897 -1.15982e-07 3.1214 -1.12591e-07L2.87921 -1.02005e-07C2.80165 -9.86142e-08 2.72651 0.0284089 2.66674 0.0803327L0.120856 2.29217C0.044311 2.35867 -2.37107e-08 2.45756 -1.91503e-08 2.56189L-3.0661e-09 2.92986C-4.76629e-10 2.9891 0.0656948 3.02156 0.109159 2.9838L3.00031 0.472003L5.89084 2.98327C5.93431 3.02103 6 2.98856 6 2.92932L6 2.56136Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                width="1.6vw"
                height="0.8vw"
                viewBox="0 0 6 3"
                fill="none"
                className={isPriceDesc ? "text-slate-950" : "text-slate-500"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0.438643C6 0.542971 5.95569 0.641862 5.87914 0.708363L3.33387 2.91967C3.27411 2.97159 3.19897 3 3.1214 3L2.87921 3C2.80165 3 2.72651 2.97159 2.66674 2.91967L0.120856 0.707829C0.044311 0.641327 -2.37107e-08 0.542437 -1.91503e-08 0.438108L-3.0661e-09 0.0701438C-4.76629e-10 0.0109037 0.0656948 -0.0215614 0.109159 0.0161996L3.00031 2.528L5.89084 0.0167346C5.93431 -0.0210265 6 0.0114386 6 0.0706787L6 0.438643Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Button>
          <Button
            onClick={() => handleSortClick("newest")}
            className={cn(
              "shrink-0",
              filters.sort === "newest" && "font-semibold text-slate-950",
            )}
          >
            Новые
          </Button>
        </div>
        <div className="relative pr-[3.733vw] pl-[3.2vw] flex h-full items-center justify-center gap-[1.067vw] shrink-0">
          <div className="w-[.5px] bg-slate-300 h-[4.267vw] absolute left-0 top-1/2 -translate-y-1/2" />
          <Icon icon="funnel" className="w-[3.733vw] h-[3.733vw]" />
          <div className="text-[3.467vw] leading-4.5 font-semibold">(1)</div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
