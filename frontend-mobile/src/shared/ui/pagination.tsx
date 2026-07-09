import { cn } from "@/shared/utils/clsx";
import { Button } from "./action";
import Icon from "../icon";

type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

const getPagination = (page: number, total: number): PaginationItem[] => {
  const range: PaginationItem[] = [];

  const delta = 2;

  const isStart = page <= 3;
  const isEnd = page >= total - 2;

  range.push(1);

  if (isStart) {
    for (let i = 2; i <= Math.min(5, total - 1); i++) {
      range.push(i);
    }

    if (total > 6) range.push("end-ellipsis");
    if (total > 1) range.push(total);

    return range;
  }

  if (isEnd) {
    range.push("start-ellipsis");

    for (let i = Math.max(total - 4, 2); i <= total; i++) {
      range.push(i);
    }

    return range;
  }

  const left = page - delta;
  const right = page + delta;

  if (left > 2) range.push("start-ellipsis");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) range.push("end-ellipsis");

  range.push(total);

  return range;
};

interface PaginationProps {
  page?: number;
  total: number;
  onChange?: (page: number) => void;
  className?: string;
}

const Pagination = ({
  page = 1,
  total,
  onChange,
  className,
}: PaginationProps) => {
  const pages = getPagination(page, total);

  const handleChange = (newPage: number) => {
    if (newPage < 1 || newPage > total || newPage === page) return;
    onChange?.(newPage);
  };

  const handleJump = (direction: "start" | "end") => {
    handleChange(
      direction === "start" ? Math.max(1, page - 5) : Math.min(total, page + 5),
    );
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-end gap-2", className)}
    >
      {page > 1 && (
        <Button
          aria-label="Предыдущая страница"
          onClick={() => handleChange(page - 1)}
          className="w-8 h-8 border border-transparent hover:bg-black/5 transition-all duration-200"
        >
          <Icon icon="chevron-right-pagination" width={14} height={14} />
        </Button>
      )}

      {pages.map((item, index) => {
        if (item === "start-ellipsis" || item === "end-ellipsis") {
          const isStart = item === "start-ellipsis";

          return (
            <Button
              key={`${item}-${index}`}
              aria-label={
                isStart
                  ? "Перейти на 5 страниц назад"
                  : "Перейти на 5 страниц вперед"
              }
              title={
                isStart
                  ? "Перейти на 5 страниц назад"
                  : "Перейти на 5 страниц вперед"
              }
              onClick={() => handleJump(isStart ? "start" : "end")}
              className="group relative h-8 w-8"
            >
              <Icon
                icon="ellipsis"
                width={24}
                height={24}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group-hover:scale-75 group-hover:opacity-0"
              />

              <Icon
                icon="chevrons-right"
                width={14}
                height={14}
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100",
                  isStart && "rotate-180",
                )}
              />
            </Button>
          );
        }

        const isActive = item === page;

        return (
          <Button
            key={item}
            title={`Страница ${item}`}
            aria-label={`Страница ${item}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => handleChange(item)}
            className={cn(
              "w-7.5 h-7.5 border border-transparent rounded-xs text-sm font-bold font-roboto_condensed bg-slate-150 hover:border-black hover:bg-[linear-gradient(0deg,#fff,#fff),linear-gradient(0deg,#000,#000)] transition-all duration-200",
              isActive &&
                "bg-black text-white cursor-default pointer-events-none",
            )}
          >
            {item}
          </Button>
        );
      })}

      {page < total && (
        <Button
          aria-label="Следующая страница"
          onClick={() => handleChange(page + 1)}
          className="w-8 h-8 border border-transparent hover:bg-black/5 transition-all duration-200 rotate-180"
        >
          <Icon icon="chevron-right-pagination" width={14} height={14} />
        </Button>
      )}
    </nav>
  );
};

export default Pagination;
