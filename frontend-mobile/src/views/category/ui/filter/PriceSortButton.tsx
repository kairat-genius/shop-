import { Button } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";

const PriceSortButton = ({
  currentSort,
  onPriceClick,
}: {
  currentSort: string;
  onPriceClick: () => void;
}) => {
  const isPriceActive =
    currentSort === "price_asc" || currentSort === "price_desc";
  const isPriceAsc = currentSort === "price_asc";
  const isPriceDesc = currentSort === "price_desc";

  return (
    <Button
      onClick={onPriceClick}
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
  );
};

export default PriceSortButton;